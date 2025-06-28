import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Webhook URLs for automation triggers
const WEBHOOK_ENDPOINTS = {
  slack: process.env.SLACK_WEBHOOK_URL,
  sendgrid: process.env.SENDGRID_API_KEY,
  twilio: process.env.TWILIO_API_KEY,
  zapier: process.env.ZAPIER_WEBHOOK_URL
}

interface LeadIntakePayload {
  leadData: {
    firstName: string
    lastName: string
    email: string
    company: string
    role: string
    industry: string
    urgency: string
    fundingStage: string
    teamSize: string
    useCase: string
    budget: string
    timeline: string
  }
  routing: {
    score: number
    tier: "HOT" | "WARM" | "NURTURE"
    route: "instant-demo" | "sales-call" | "email-sequence" | "nurture-drip"
    priority: "HIGH" | "MEDIUM" | "LOW"
    autoActions: string[]
    suggestedFollowUp: string
  }
  source: string
  timestamp: number
}

export async function POST(request: NextRequest) {
  try {
    const payload: LeadIntakePayload = await request.json()
    const { leadData, routing, source, timestamp } = payload

    const supabase = createClient()

    // 1. Create lead record in database
    const leadRecord = {
      first_name: leadData.firstName,
      last_name: leadData.lastName,
      email: leadData.email,
      company: leadData.company,
      role: leadData.role,
      industry: leadData.industry,
      urgency: leadData.urgency,
      funding_stage: leadData.fundingStage,
      team_size: leadData.teamSize,
      use_case: leadData.useCase,
      budget: leadData.budget,
      timeline: leadData.timeline,
      source,
      score: routing.score,
      tier: routing.tier,
      route: routing.route,
      priority: routing.priority,
      suggested_follow_up: routing.suggestedFollowUp,
      auto_actions: routing.autoActions,
      created_at: new Date(timestamp).toISOString(),
      status: "new"
    }

    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert(leadRecord)
      .select()
      .single()

    if (leadError) {
      console.error("Failed to create lead:", leadError)
      return NextResponse.json(
        { error: "Failed to create lead" },
        { status: 500 }
      )
    }

    // 2. Trigger automation based on routing
    const automationPromises = []

    // Slack notification for HOT leads
    if (routing.tier === "HOT" && WEBHOOK_ENDPOINTS.slack) {
      automationPromises.push(
        triggerSlackNotification({
          lead: leadRecord,
          routing,
          webhook: WEBHOOK_ENDPOINTS.slack
        })
      )
    }

    // Email automation trigger
    if (WEBHOOK_ENDPOINTS.sendgrid) {
      automationPromises.push(
        triggerEmailSequence({
          lead: leadRecord,
          routing,
          apiKey: WEBHOOK_ENDPOINTS.sendgrid
        })
      )
    }

    // SMS for high-priority leads
    if (
      routing.priority === "HIGH" &&
      routing.urgency === "immediate" &&
      WEBHOOK_ENDPOINTS.twilio
    ) {
      automationPromises.push(
        triggerSMSAlert({
          lead: leadRecord,
          routing,
          apiKey: WEBHOOK_ENDPOINTS.twilio
        })
      )
    }

    // Zapier webhook for CRM integration
    if (WEBHOOK_ENDPOINTS.zapier) {
      automationPromises.push(
        triggerZapierWebhook({
          lead: leadRecord,
          routing,
          webhook: WEBHOOK_ENDPOINTS.zapier
        })
      )
    }

    // Execute all automations
    try {
      await Promise.allSettled(automationPromises)
    } catch (error) {
      console.error("Some automations failed:", error)
      // Don't fail the request if automations fail
    }

    // 3. Create deal board entry based on routing
    const dealBoard = {
      lead_id: lead.id,
      stage: getDealStage(routing.route),
      value: estimateDealValue(leadData.budget, leadData.teamSize),
      close_date: calculateCloseDate(routing.tier, leadData.timeline),
      probability: getDealProbability(routing.score),
      next_action: routing.suggestedFollowUp,
      assigned_to: getAssignedSalesperson(routing.tier),
      notes: `Auto-created from smart intake. Score: ${routing.score}. Actions: ${routing.autoActions.join(", ")}`,
      created_at: new Date().toISOString()
    }

    const { error: dealError } = await supabase.from("deals").insert(dealBoard)

    if (dealError) {
      console.error("Failed to create deal:", dealError)
      // Don't fail the request if deal creation fails
    }

    // 4. Log the intake event
    await supabase.from("intake_events").insert({
      lead_id: lead.id,
      event_type: "smart_routing",
      event_data: {
        routing,
        automations_triggered: automationPromises.length,
        source
      },
      created_at: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      routing,
      message: `Lead routed as ${routing.tier} with ${routing.priority} priority`
    })
  } catch (error) {
    console.error("Lead intake error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Automation trigger functions
async function triggerSlackNotification({
  lead,
  routing,
  webhook
}: {
  lead: any
  routing: any
  webhook: string
}) {
  const message = {
    text: `🔥 HOT LEAD ALERT!`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🔥 HOT LEAD - Immediate Action Required"
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Name:* ${lead.first_name} ${lead.last_name}`
          },
          {
            type: "mrkdwn",
            text: `*Company:* ${lead.company}`
          },
          {
            type: "mrkdwn",
            text: `*Score:* ${routing.score}/100`
          },
          {
            type: "mrkdwn",
            text: `*Urgency:* ${lead.urgency}`
          },
          {
            type: "mrkdwn",
            text: `*Budget:* ${lead.budget}`
          },
          {
            type: "mrkdwn",
            text: `*Next Action:* ${routing.suggestedFollowUp}`
          }
        ]
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Book Demo"
            },
            style: "primary",
            url: `https://app.partnertech.ai/book-demo?lead=${lead.id}`
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "View Lead"
            },
            url: `https://app.partnertech.ai/leads/${lead.id}`
          }
        ]
      }
    ]
  }

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  })
}

async function triggerEmailSequence({
  lead,
  routing,
  apiKey
}: {
  lead: any
  routing: any
  apiKey: string
}) {
  // Determine email template based on routing
  let templateId = ""
  switch (routing.route) {
    case "instant-demo":
      templateId = "hot-lead-immediate"
      break
    case "sales-call":
      templateId = "warm-lead-discovery"
      break
    case "email-sequence":
      templateId = "nurture-sequence-start"
      break
    default:
      templateId = "general-welcome"
  }

  const emailData = {
    to: lead.email,
    template_id: templateId,
    dynamic_template_data: {
      first_name: lead.first_name,
      company: lead.company,
      score: routing.score,
      tier: routing.tier,
      next_action: routing.suggestedFollowUp,
      booking_link: `https://app.partnertech.ai/book-demo?lead=${lead.id}`,
      chrome_extension_link:
        "https://chrome.google.com/webstore/detail/partnertech-ai"
    }
  }

  await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(emailData)
  })
}

async function triggerSMSAlert({
  lead,
  routing,
  apiKey
}: {
  lead: any
  routing: any
  apiKey: string
}) {
  // SMS to sales team for immediate leads
  const message = `🔥 HOT LEAD: ${lead.first_name} ${lead.last_name} from ${lead.company} needs immediate attention. Score: ${routing.score}. View: https://app.partnertech.ai/leads/${lead.id}`

  // Note: You'd need to configure Twilio with actual phone numbers
  console.log("SMS Alert would be sent:", message)
}

async function triggerZapierWebhook({
  lead,
  routing,
  webhook
}: {
  lead: any
  routing: any
  webhook: string
}) {
  const zapierData = {
    event: "new_lead",
    lead,
    routing,
    partnertech_lead_url: `https://app.partnertech.ai/leads/${lead.id}`,
    timestamp: new Date().toISOString()
  }

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(zapierData)
  })
}

// Helper functions
function getDealStage(route: string): string {
  switch (route) {
    case "instant-demo":
      return "demo-scheduled"
    case "sales-call":
      return "discovery"
    case "email-sequence":
      return "nurturing"
    default:
      return "lead"
  }
}

function estimateDealValue(budget: string, teamSize: string): number {
  const budgetMultipliers: Record<string, number> = {
    "under-1k": 3000,
    "1k-5k": 18000,
    "5k-10k": 45000,
    "10k-25k": 105000,
    "25k-50k": 225000,
    "50k-100k": 450000,
    "100k+": 600000
  }

  const teamMultipliers: Record<string, number> = {
    "1-10": 1,
    "11-50": 1.5,
    "51-200": 2,
    "201-1000": 2.5,
    "1000+": 3
  }

  const baseBudget = budgetMultipliers[budget] || 30000
  const teamMultiplier = teamMultipliers[teamSize] || 1

  return Math.round(baseBudget * teamMultiplier)
}

function calculateCloseDate(tier: string, timeline: string): string {
  const now = new Date()
  let daysToAdd = 90 // Default 3 months

  if (tier === "HOT") {
    daysToAdd = timeline === "immediate" ? 7 : 30
  } else if (tier === "WARM") {
    daysToAdd = 60
  }

  now.setDate(now.getDate() + daysToAdd)
  return now.toISOString()
}

function getDealProbability(score: number): number {
  if (score >= 80) return 75
  if (score >= 60) return 50
  if (score >= 40) return 25
  return 10
}

function getAssignedSalesperson(tier: string): string {
  // In a real system, this would use actual user IDs
  switch (tier) {
    case "HOT":
      return "senior-sales-rep"
    case "WARM":
      return "sales-rep"
    default:
      return "marketing-qualified"
  }
}
