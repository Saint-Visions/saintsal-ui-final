import { NextRequest, NextResponse } from "next/server"
import { createAzureCognitiveClient } from "@/lib/integrations/azure-cognitive"
import { createGHLClient } from "@/lib/integrations/ghl-api"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [], context = {} } = await req.json()

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    // Initialize Azure Cognitive Services
    const azureClient = createAzureCognitiveClient()
    if (!azureClient) {
      return NextResponse.json(
        { error: "GOTTA GUY™ temporarily unavailable - Azure not configured" },
        { status: 503 }
      )
    }

    // Get user context from Supabase
    const supabase = createServerClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()

    let userProfile = null
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      userProfile = profile
    }

    // Enhance context with user data
    const enrichedContext = {
      ...context,
      userProfile,
      ghlIntegration: !!process.env.GHL_API_KEY,
      platform: "SaintVisionAI™",
      timestamp: new Date().toISOString()
    }

    // Process request with Azure Cognitive Services
    const response = await azureClient.processGottaGuyRequest(
      message,
      conversationHistory,
      enrichedContext
    )

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 500 })
    }

    // Handle special GOTTA GUY™ commands
    let additionalData = {}
    if (
      message.toLowerCase().includes("find leads") ||
      message.toLowerCase().includes("discover leads")
    ) {
      additionalData = await handleLeadDiscovery(message, azureClient)
    } else if (
      message.toLowerCase().includes("analyze deals") ||
      message.toLowerCase().includes("pipeline")
    ) {
      additionalData = await handleDealAnalysis(
        message,
        azureClient,
        userProfile
      )
    } else if (
      message.toLowerCase().includes("automation") ||
      message.toLowerCase().includes("workflow")
    ) {
      additionalData = await handleAutomationSuggestions(message, azureClient)
    }

    // Store conversation in database
    if (user) {
      await supabase.from("conversations").insert({
        user_id: user.id,
        message_type: "gotta_guy",
        user_message: message,
        ai_response: response.response,
        context: enrichedContext,
        metadata: {
          usage: response.usage,
          additional_data: additionalData
        }
      })
    }

    return NextResponse.json({
      success: true,
      response: response.response,
      timestamp: response.timestamp,
      additionalData,
      context: {
        hasGHL: !!process.env.GHL_API_KEY,
        hasAzure: true,
        userTier: userProfile?.tier || "free"
      }
    })
  } catch (error) {
    console.error("GOTTA GUY™ Chat Error:", error)
    return NextResponse.json(
      {
        error:
          "Your GOTTA GUY™ encountered an unexpected issue. Please try again."
      },
      { status: 500 }
    )
  }
}

// Handle Lead Discovery Requests
async function handleLeadDiscovery(message: string, azureClient: any) {
  try {
    // Extract intent and criteria from message using Azure
    const analysisResponse = await azureClient.analyzeText(message, "entities")

    // Mock lead data for demonstration
    const mockLeads = [
      {
        company: "TechStartup Inc",
        industry: "Software",
        size: "50-100 employees",
        score: 85,
        reasoning: "High growth potential, matches target criteria"
      },
      {
        company: "FinanceFlow LLC",
        industry: "Financial Services",
        size: "100-500 employees",
        score: 78,
        reasoning: "Strong revenue indicators, good fit for SaaS solutions"
      }
    ]

    return {
      type: "lead_discovery",
      leads: mockLeads,
      analysis: analysisResponse.analysis
    }
  } catch (error) {
    console.error("Lead discovery error:", error)
    return {
      type: "lead_discovery",
      error: "Lead discovery temporarily unavailable"
    }
  }
}

// Handle Deal Analysis Requests
async function handleDealAnalysis(
  message: string,
  azureClient: any,
  userProfile: any
) {
  try {
    // Mock deal data
    const mockDeals = [
      {
        id: "deal-1",
        name: "Enterprise SaaS Deal",
        value: 50000,
        stage: "Proposal",
        probability: 75,
        closeDate: "2024-02-15"
      },
      {
        id: "deal-2",
        name: "Marketing Automation",
        value: 25000,
        stage: "Negotiation",
        probability: 60,
        closeDate: "2024-01-30"
      }
    ]

    const analysisResponse = await azureClient.analyzeDealPipeline(mockDeals, {
      totalValue: 75000,
      averageProbability: 67.5
    })

    return {
      type: "deal_analysis",
      deals: mockDeals,
      analysis: analysisResponse.pipelineAnalysis,
      recommendations: [
        "Focus on Enterprise SaaS Deal - highest probability",
        "Accelerate Marketing Automation deal closing",
        "Pipeline health: Strong with $75K total value"
      ]
    }
  } catch (error) {
    console.error("Deal analysis error:", error)
    return {
      type: "deal_analysis",
      error: "Deal analysis temporarily unavailable"
    }
  }
}

// Handle Automation Suggestions
async function handleAutomationSuggestions(message: string, azureClient: any) {
  try {
    const ghlClient = createGHLClient()
    const hasGHL = !!ghlClient

    const suggestions = [
      {
        title: "Lead Nurture Sequence",
        description: "Automated email sequence for new leads",
        enabled: hasGHL,
        action: "Setup in GHL"
      },
      {
        title: "Deal Follow-up Automation",
        description: "Automated follow-ups for stalled deals",
        enabled: hasGHL,
        action: "Configure workflow"
      },
      {
        title: "Client Onboarding Flow",
        description: "Automated welcome sequence for new clients",
        enabled: hasGHL,
        action: "Activate workflow"
      }
    ]

    return {
      type: "automation_suggestions",
      suggestions,
      ghlIntegrated: hasGHL
    }
  } catch (error) {
    console.error("Automation suggestions error:", error)
    return {
      type: "automation_suggestions",
      error: "Automation suggestions temporarily unavailable"
    }
  }
}
