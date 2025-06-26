// GoHighLevel API Integration for SaintVisionAI™
interface GHLConfig {
  apiKey: string
  baseUrl: string
  locationId: string
}

interface GHLContact {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  companyName?: string
  tags?: string[]
  customFields?: Record<string, any>
  source?: string
}

interface GHLOpportunity {
  id?: string
  contactId: string
  name: string
  value: number
  status: string
  stageId: string
  pipelineId: string
  assignedTo?: string
  source?: string
}

interface GHLSubdomain {
  subdomain: string
  clientId: string
  planType:
    | "pro-monthly"
    | "pro-annual"
    | "command-pro"
    | "strategic-command"
    | "white-label"
  features: string[]
  createdAt: string
  isActive: boolean
}

class GoHighLevelAPI {
  private config: GHLConfig

  constructor(config: GHLConfig) {
    this.config = config
  }

  // Contact Management
  async createContact(
    contact: GHLContact
  ): Promise<{ success: boolean; contactId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          Version: "2021-07-28"
        },
        body: JSON.stringify({
          locationId: this.config.locationId,
          ...contact,
          tags: [...(contact.tags || []), "SaintVisionAI", "GOTTA_GUY"]
        })
      })

      const data = await response.json()

      if (response.ok) {
        return {
          success: true,
          contactId: data.contact.id
        }
      } else {
        return {
          success: false,
          error: data.message || "Failed to create contact"
        }
      }
    } catch (error) {
      console.error("GHL Contact creation error:", error)
      return {
        success: false,
        error: "Network error creating contact"
      }
    }
  }

  async updateContact(
    contactId: string,
    updates: Partial<GHLContact>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/contacts/${contactId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            "Content-Type": "application/json",
            Version: "2021-07-28"
          },
          body: JSON.stringify(updates)
        }
      )

      const data = await response.json()

      return {
        success: response.ok,
        error: response.ok ? undefined : data.message
      }
    } catch (error) {
      console.error("GHL Contact update error:", error)
      return {
        success: false,
        error: "Network error updating contact"
      }
    }
  }

  // Opportunity Management
  async createOpportunity(
    opportunity: GHLOpportunity
  ): Promise<{ success: boolean; opportunityId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/opportunities`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          Version: "2021-07-28"
        },
        body: JSON.stringify({
          locationId: this.config.locationId,
          ...opportunity,
          source: opportunity.source || "SaintVisionAI™ GOTTA GUY™"
        })
      })

      const data = await response.json()

      if (response.ok) {
        return {
          success: true,
          opportunityId: data.opportunity.id
        }
      } else {
        return {
          success: false,
          error: data.message || "Failed to create opportunity"
        }
      }
    } catch (error) {
      console.error("GHL Opportunity creation error:", error)
      return {
        success: false,
        error: "Network error creating opportunity"
      }
    }
  }

  // Client Subdomain Management
  async createClientSubdomain(clientData: {
    email: string
    firstName: string
    lastName: string
    planType: GHLSubdomain["planType"]
    companyName?: string
  }): Promise<{ success: boolean; subdomain?: string; error?: string }> {
    try {
      // Generate unique subdomain
      const baseSubdomain = clientData.companyName
        ? clientData.companyName.toLowerCase().replace(/[^a-z0-9]/g, "")
        : `${clientData.firstName}${clientData.lastName}`
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "")

      const subdomain = `${baseSubdomain}-${Date.now().toString().slice(-4)}`

      // Create GHL sub-account
      const response = await fetch(`${this.config.baseUrl}/locations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          Version: "2021-07-28"
        },
        body: JSON.stringify({
          companyId: this.config.locationId,
          name:
            clientData.companyName ||
            `${clientData.firstName} ${clientData.lastName}`,
          address: "",
          city: "",
          state: "",
          country: "US",
          postalCode: "",
          website: `https://${subdomain}.saintvisionai.com`,
          timezone: "America/New_York",
          firstName: clientData.firstName,
          lastName: clientData.lastName,
          email: clientData.email,
          phone: "",
          businessType: "Digital Marketing Agency",
          settings: {
            allowDuplicateContact: false,
            allowDuplicateOpportunity: false,
            allowFacebookNameMerge: true,
            disableContactTimezone: false
          }
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Store subdomain mapping in your database
        await this.storeSubdomainMapping({
          subdomain,
          clientId: data.location.id,
          planType: clientData.planType,
          features: this.getPlanFeatures(clientData.planType),
          createdAt: new Date().toISOString(),
          isActive: true
        })

        return {
          success: true,
          subdomain: `${subdomain}.saintvisionai.com`
        }
      } else {
        return {
          success: false,
          error: data.message || "Failed to create client subdomain"
        }
      }
    } catch (error) {
      console.error("GHL Subdomain creation error:", error)
      return {
        success: false,
        error: "Network error creating subdomain"
      }
    }
  }

  // Automation Workflows
  async triggerAutomation(
    contactId: string,
    workflowType: "welcome" | "nurture" | "upsell" | "win-back"
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const workflowIds = {
        welcome: process.env.GHL_WELCOME_WORKFLOW_ID,
        nurture: process.env.GHL_NURTURE_WORKFLOW_ID,
        upsell: process.env.GHL_UPSELL_WORKFLOW_ID,
        "win-back": process.env.GHL_WINBACK_WORKFLOW_ID
      }

      const workflowId = workflowIds[workflowType]
      if (!workflowId) {
        return {
          success: false,
          error: `Workflow ${workflowType} not configured`
        }
      }

      const response = await fetch(
        `${this.config.baseUrl}/workflows/${workflowId}/subscribe`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            "Content-Type": "application/json",
            Version: "2021-07-28"
          },
          body: JSON.stringify({
            contactId,
            eventStartTime: new Date().toISOString()
          })
        }
      )

      return {
        success: response.ok,
        error: response.ok ? undefined : "Failed to trigger automation"
      }
    } catch (error) {
      console.error("GHL Automation trigger error:", error)
      return {
        success: false,
        error: "Network error triggering automation"
      }
    }
  }

  // Analytics & Reporting
  async getClientMetrics(
    locationId: string,
    dateRange: { start: string; end: string }
  ) {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/locations/${locationId}/analytics`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            Version: "2021-07-28"
          }
        }
      )

      const data = await response.json()

      return {
        success: response.ok,
        metrics: response.ok ? data : null,
        error: response.ok ? undefined : data.message
      }
    } catch (error) {
      console.error("GHL Analytics error:", error)
      return {
        success: false,
        error: "Network error fetching metrics"
      }
    }
  }

  // Helper Methods
  private getPlanFeatures(planType: GHLSubdomain["planType"]): string[] {
    const featureMap = {
      "pro-monthly": [
        "basic-automation",
        "lead-tracking",
        "email-sequences",
        "basic-reports"
      ],
      "pro-annual": [
        "basic-automation",
        "lead-tracking",
        "email-sequences",
        "basic-reports",
        "priority-support"
      ],
      "command-pro": [
        "advanced-automation",
        "lead-scoring",
        "custom-funnels",
        "advanced-reports",
        "api-access"
      ],
      "strategic-command": [
        "team-management",
        "white-label-basic",
        "advanced-integrations",
        "custom-dashboards",
        "5-seats"
      ],
      "white-label": [
        "full-white-label",
        "unlimited-seats",
        "custom-domain",
        "priority-support",
        "dedicated-success-manager"
      ]
    }

    return featureMap[planType] || []
  }

  private async storeSubdomainMapping(mapping: GHLSubdomain): Promise<void> {
    // This should integrate with your Supabase database
    // For now, we'll store it in environment or external storage
    console.log("Storing subdomain mapping:", mapping)
    // TODO: Implement database storage
  }
}

// Initialize GHL API
export function createGHLClient(): GoHighLevelAPI | null {
  const apiKey = process.env.GHL_API_KEY
  const baseUrl =
    process.env.GHL_BASE_URL || "https://services.leadconnectorhq.com"
  const locationId = process.env.GHL_LOCATION_ID

  if (!apiKey || !locationId) {
    console.warn("GoHighLevel credentials not configured")
    return null
  }

  return new GoHighLevelAPI({
    apiKey,
    baseUrl,
    locationId
  })
}

export { GoHighLevelAPI }
export type { GHLConfig, GHLContact, GHLOpportunity, GHLSubdomain }
