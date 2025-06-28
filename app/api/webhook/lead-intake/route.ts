import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Webhook endpoint for Chrome Extension automation triggers
// Patent #10,290,222 Protected Technology

interface ChromeExtensionWebhook {
  email?: string
  domain: string
  actionType:
    | "visit"
    | "install"
    | "intent_detected"
    | "contact_extracted"
    | "outreach_triggered"
  userData?: {
    name?: string
    company?: string
    role?: string
    linkedinUrl?: string
  }
  intentSignals?: {
    hiring: number
    funding: number
    expansion: number
    techChange: number
    sources: string[]
  }
  extensionId?: string
  userId?: string
  timestamp: number
}

export async function POST(request: NextRequest) {
  try {
    const payload: ChromeExtensionWebhook = await request.json()
    const {
      email,
      domain,
      actionType,
      userData,
      intentSignals,
      extensionId,
      userId,
      timestamp
    } = payload

    console.log(`🧩 Chrome Extension Webhook: ${actionType} on ${domain}`)

    const supabase = createClient()

    // 1. Log the extension event
    const eventRecord = {
      action_type: actionType,
      domain,
      email: email || null,
      user_data: userData || null,
      intent_signals: intentSignals || null,
      extension_id: extensionId || null,
      user_id: userId || null,
      timestamp: new Date(timestamp).toISOString(),
      created_at: new Date().toISOString()
    }

    const { data: event, error: eventError } = await supabase
      .from("extension_events")
      .insert(eventRecord)
      .select()
      .single()

    if (eventError) {
      console.error("Failed to log extension event:", eventError)
    }

    // 2. Trigger automations based on action type
    const automationPromises = []

    switch (actionType) {
      case "install":
        // New Chrome Extension install
        automationPromises.push(triggerInstallAutomation(payload))
        break

      case "intent_detected":
        // High intent signals detected
        if (
          intentSignals &&
          (intentSignals.hiring > 30 || intentSignals.funding > 30)
        ) {
          automationPromises.push(triggerHotLeadAlert(payload))
        }
        break

      case "contact_extracted":
        // Contact information extracted from page
        if (email && userData) {
          automationPromises.push(triggerContactEnrichment(payload))
        }
        break

      case "outreach_triggered":
        // User triggered outreach action
        automationPromises.push(triggerOutreachSequence(payload))
        break

      case "visit":
        // Page visit tracking
        automationPromises.push(trackPageVisit(payload))
        break

      default:
        console.log(`Unknown action type: ${actionType}`)
    }

    // Execute automations
    try {
      await Promise.allSettled(automationPromises)
    } catch (error) {
      console.error("Some automations failed:", error)
    }

    return NextResponse.json({
      success: true,
      eventId: event?.id,
      automationsTriggered: automationPromises.length,
      message: `Webhook processed: ${actionType}`
    })
  } catch (error) {
    console.error("Chrome Extension webhook error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Automation trigger functions
async function triggerInstallAutomation(payload: ChromeExtensionWebhook) {
  console.log("🎉 New Chrome Extension install!")

  // Slack notification
  if (process.env.SLACK_WEBHOOK_URL) {
    const slackMessage = {
      text: "🧩 New PartnerTech.ai Chrome Extension Install!",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🧩 New Chrome Extension Install"
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Domain:* ${payload.domain}`
            },
            {
              type: "mrkdwn",
              text: `*Time:* ${new Date(payload.timestamp).toLocaleString()}`
            }
          ]
        }
      ]
    }

    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackMessage)
    })
  }

  // Welcome email sequence
  if (payload.email && process.env.SENDGRID_API_KEY) {
    const emailData = {
      to: payload.email,
      template_id: "chrome-extension-welcome",
      dynamic_template_data: {
        domain: payload.domain,
        installDate: new Date(payload.timestamp).toLocaleDateString(),
        dashboardLink: "https://app.partnertech.ai/dashboard",
        supportLink: "https://partnertech.ai/support"
      }
    }

    await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    })
  }
}

async function triggerHotLeadAlert(payload: ChromeExtensionWebhook) {
  console.log("🔥 HOT LEAD detected via Chrome Extension!")

  const { intentSignals, domain, userData } = payload

  // Immediate Slack alert for hot leads
  if (process.env.SLACK_WEBHOOK_URL) {
    const slackMessage = {
      text: "🔥 HOT LEAD ALERT from Chrome Extension!",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🔥 HOT LEAD - Chrome Extension Detection"
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Domain:* ${domain}`
            },
            {
              type: "mrkdwn",
              text: `*Company:* ${userData?.company || "Unknown"}`
            },
            {
              type: "mrkdwn",
              text: `*Hiring Signals:* ${intentSignals?.hiring || 0}%`
            },
            {
              type: "mrkdwn",
              text: `*Funding Signals:* ${intentSignals?.funding || 0}%`
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
                text: "View in Dashboard"
              },
              style: "primary",
              url: `https://app.partnertech.ai/leads?domain=${domain}`
            }
          ]
        }
      ]
    }

    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackMessage)
    })
  }

  // SMS alert for immediate attention
  if (process.env.TWILIO_WEBHOOK_URL) {
    const smsData = {
      message: `🔥 HOT LEAD: ${userData?.company || domain} - Hiring: ${intentSignals?.hiring}%, Funding: ${intentSignals?.funding}%. View: https://app.partnertech.ai/leads`,
      urgency: "high"
    }

    await fetch(process.env.TWILIO_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(smsData)
    })
  }
}

async function triggerContactEnrichment(payload: ChromeExtensionWebhook) {
  console.log("👥 Contact extracted via Chrome Extension")

  const { email, userData, domain } = payload

  // Add to CRM via Zapier webhook
  if (process.env.ZAPIER_WEBHOOK_URL) {
    const zapierData = {
      event: "contact_extracted",
      email,
      name: userData?.name,
      company: userData?.company,
      role: userData?.role,
      linkedinUrl: userData?.linkedinUrl,
      source: "chrome_extension",
      domain,
      timestamp: new Date().toISOString()
    }

    await fetch(process.env.ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(zapierData)
    })
  }
}

async function triggerOutreachSequence(payload: ChromeExtensionWebhook) {
  console.log("📧 Outreach triggered via Chrome Extension")

  // Start email sequence based on detected context
  if (payload.email && process.env.SENDGRID_API_KEY) {
    const emailData = {
      to: payload.email,
      template_id: "chrome-extension-outreach",
      dynamic_template_data: {
        name: payload.userData?.name || "there",
        company: payload.userData?.company || payload.domain,
        source: "Chrome Extension",
        personalizedMessage: generatePersonalizedMessage(payload)
      }
    }

    await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    })
  }
}

async function trackPageVisit(payload: ChromeExtensionWebhook) {
  // Update visit tracking in database
  const supabase = createClient()

  await supabase.from("page_visits").insert({
    domain: payload.domain,
    user_id: payload.userId,
    extension_id: payload.extensionId,
    timestamp: new Date(payload.timestamp).toISOString(),
    created_at: new Date().toISOString()
  })
}

function generatePersonalizedMessage(payload: ChromeExtensionWebhook): string {
  const { intentSignals, userData, domain } = payload

  let message = `I noticed you're browsing ${domain}`

  if (intentSignals?.hiring > 20) {
    message +=
      " and saw some hiring activity. Our AI can help automate your recruitment outreach."
  } else if (intentSignals?.funding > 20) {
    message +=
      " and it looks like there's some exciting funding news. Perfect timing to scale your sales operations."
  } else if (userData?.company) {
    message += ` and wanted to reach out about ${userData.company}. Our platform helps companies like yours automate lead generation.`
  } else {
    message +=
      ". Our Chrome extension can help you discover and engage leads more effectively."
  }

  return message
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "PartnerTech.ai Chrome Extension Webhook",
    patent: "10,290,222",
    timestamp: new Date().toISOString()
  })
}
