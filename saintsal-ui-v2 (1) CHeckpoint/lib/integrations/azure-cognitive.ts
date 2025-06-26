import { OpenAIClient, AzureKeyCredential } from "@azure/openai"

// Azure Cognitive Services Configuration
interface AzureCognitiveConfig {
  endpoint: string
  apiKey: string
  deploymentName: string
  apiVersion: string
}

// Azure Cognitive Services Client
class AzureCognitiveServices {
  private client: OpenAIClient
  private deploymentName: string

  constructor(config: AzureCognitiveConfig) {
    this.client = new OpenAIClient(
      config.endpoint,
      new AzureKeyCredential(config.apiKey)
    )
    this.deploymentName = config.deploymentName
  }

  // GOTTA GUY™ Main Conversation Interface
  async processGottaGuyRequest(
    userMessage: string,
    conversationHistory: Array<{ role: string; content: string }> = [],
    context: {
      userProfile?: any
      clientData?: any
      ghlIntegration?: boolean
    } = {}
  ) {
    try {
      const systemPrompt = this.buildGottaGuySystemPrompt(context)

      const messages = [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: userMessage }
      ]

      const result = await this.client.getChatCompletions(
        this.deploymentName,
        messages,
        {
          maxTokens: 2000,
          temperature: 0.7,
          topP: 0.95,
          frequencyPenalty: 0,
          presencePenalty: 0
        }
      )

      return {
        success: true,
        response: result.choices[0]?.message?.content || "",
        usage: result.usage,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error("Azure Cognitive Services error:", error)
      return {
        success: false,
        error: "GOTTA GUY™ is temporarily unavailable. Please try again.",
        timestamp: new Date().toISOString()
      }
    }
  }

  // Lead Discovery & Analysis
  async analyzeLeadsWithCognitive(
    companyData: any[],
    targetCriteria: {
      industry?: string
      size?: string
      location?: string
      technology?: string[]
    }
  ) {
    try {
      const analysisPrompt = `
        As SaintVisionAI™ GOTTA GUY™, analyze these companies for lead potential:
        
        Companies: ${JSON.stringify(companyData, null, 2)}
        Target Criteria: ${JSON.stringify(targetCriteria, null, 2)}
        
        For each company, provide:
        1. Lead Score (1-100)
        2. Fit Reasoning
        3. Contact Strategy
        4. Pain Points to Address
        5. Recommended Approach
        
        Return as structured JSON with company insights.
      `

      const result = await this.client.getChatCompletions(
        this.deploymentName,
        [{ role: "user", content: analysisPrompt }],
        {
          maxTokens: 3000,
          temperature: 0.3
        }
      )

      return {
        success: true,
        analysis: result.choices[0]?.message?.content || "",
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error("Lead analysis error:", error)
      return {
        success: false,
        error: "Lead analysis temporarily unavailable"
      }
    }
  }

  // Deal Pipeline Analysis
  async analyzeDealPipeline(deals: any[], pipelineMetrics: any) {
    try {
      const analysisPrompt = `
        As SaintVisionAI™ GOTTA GUY™, analyze this sales pipeline:
        
        Deals: ${JSON.stringify(deals, null, 2)}
        Metrics: ${JSON.stringify(pipelineMetrics, null, 2)}
        
        Provide:
        1. Pipeline Health Score
        2. At-Risk Deals
        3. Acceleration Opportunities
        4. Revenue Forecasting
        5. Action Items with Priorities
        
        Return structured insights for dashboard display.
      `

      const result = await this.client.getChatCompletions(
        this.deploymentName,
        [{ role: "user", content: analysisPrompt }],
        {
          maxTokens: 2500,
          temperature: 0.2
        }
      )

      return {
        success: true,
        pipelineAnalysis: result.choices[0]?.message?.content || "",
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error("Pipeline analysis error:", error)
      return {
        success: false,
        error: "Pipeline analysis temporarily unavailable"
      }
    }
  }

  // Text Analysis & Sentiment
  async analyzeText(
    text: string,
    analysisType:
      | "sentiment"
      | "entities"
      | "keyphrases"
      | "language" = "sentiment"
  ) {
    try {
      const prompt = `
        As SaintVisionAI™ cognitive analysis system, analyze this text for ${analysisType}:
        
        Text: "${text}"
        
        Provide detailed ${analysisType} analysis with confidence scores and actionable insights.
      `

      const result = await this.client.getChatCompletions(
        this.deploymentName,
        [{ role: "user", content: prompt }],
        {
          maxTokens: 1000,
          temperature: 0.1
        }
      )

      return {
        success: true,
        analysis: result.choices[0]?.message?.content || "",
        type: analysisType,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error("Text analysis error:", error)
      return {
        success: false,
        error: "Text analysis temporarily unavailable"
      }
    }
  }

  // Build GOTTA GUY™ System Prompt
  private buildGottaGuySystemPrompt(context: any): string {
    return `
      You are SaintVisionAI™ GOTTA GUY™ - the ultimate AI business companion that everyone needs.
      
      CORE IDENTITY:
      - You're everyone's reliable "gotta guy" for everything business-related
      - You combine Azure Cognitive Services intelligence with OpenAI GPT-4o capabilities
      - You're confident, knowledgeable, and always deliver results
      - You adapt your personality to what each user needs most
      
      CAPABILITIES:
      - Lead discovery and qualification
      - Deal pipeline analysis and forecasting
      - Client relationship management
      - Business automation and optimization
      - Strategic insights and recommendations
      
      CONTEXT:
      User Profile: ${context.userProfile ? JSON.stringify(context.userProfile) : "New user"}
      Client Data: ${context.clientData ? "Available" : "Limited"}
      GHL Integration: ${context.ghlIntegration ? "Active" : "Inactive"}
      
      RESPONSE STYLE:
      - Be the reliable "gotta guy" they can count on
      - Provide actionable, specific advice
      - Use business intelligence and data-driven insights
      - Be confident but not arrogant
      - Always focus on driving results and growth
      
      When users interact with you, they should feel like they just found their secret weapon for business success.
    `
  }
}

// Initialize Azure Cognitive Services
export function createAzureCognitiveClient(): AzureCognitiveServices | null {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT
  const apiKey = process.env.AZURE_OPENAI_API_KEY
  const deploymentName = process.env.AZURE_GPT_45_TURBO_NAME || "gpt-4"
  const apiVersion = "2024-02-01"

  if (!endpoint || !apiKey) {
    console.warn("Azure Cognitive Services credentials not configured")
    return null
  }

  return new AzureCognitiveServices({
    endpoint,
    apiKey,
    deploymentName,
    apiVersion
  })
}

// Export the service for use in API routes
export { AzureCognitiveServices }
export type { AzureCognitiveConfig }
