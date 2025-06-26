import { createGHLClient } from "@/lib/integrations/ghl-api"
import { createServerClient } from "@/lib/supabase/server"

interface ClientSubdomainConfig {
  clientId: string
  email: string
  firstName: string
  lastName: string
  companyName?: string
  planType:
    | "pro-monthly"
    | "pro-annual"
    | "command-pro"
    | "strategic-command"
    | "white-label"
  customDomain?: string
}

interface SubdomainFeatures {
  ghlAccess: boolean
  customBranding: boolean
  apiAccess: boolean
  teamSeats: number
  automationLevel: "basic" | "advanced" | "enterprise"
  supportLevel: "standard" | "priority" | "dedicated"
}

class ClientSubdomainService {
  private ghlClient

  constructor() {
    this.ghlClient = createGHLClient()
  }

  // Create Client Subdomain with Full Setup
  async createClientSubdomain(config: ClientSubdomainConfig): Promise<{
    success: boolean
    subdomain?: string
    ghlLocationId?: string
    features?: SubdomainFeatures
    error?: string
  }> {
    try {
      if (!this.ghlClient) {
        return {
          success: false,
          error: "GHL integration not configured"
        }
      }

      // Step 1: Create GHL subdomain and location
      const ghlResult = await this.ghlClient.createClientSubdomain({
        email: config.email,
        firstName: config.firstName,
        lastName: config.lastName,
        planType: config.planType,
        companyName: config.companyName
      })

      if (!ghlResult.success) {
        return {
          success: false,
          error: ghlResult.error
        }
      }

      // Step 2: Store in Supabase
      const supabase = createServerClient()
      const features = this.getPlanFeatures(config.planType)

      const { data: subdomainData, error: dbError } = await supabase
        .from("client_subdomains")
        .insert({
          client_id: config.clientId,
          subdomain: ghlResult.subdomain,
          ghl_location_id: ghlResult.subdomain, // This would be the actual location ID from GHL
          plan_type: config.planType,
          features: features,
          custom_domain: config.customDomain,
          is_active: true,
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (dbError) {
        console.error("Database error:", dbError)
        return {
          success: false,
          error: "Failed to store subdomain configuration"
        }
      }

      // Step 3: Set up initial automation
      if (this.ghlClient) {
        await this.ghlClient.triggerAutomation(config.clientId, "welcome")
      }

      return {
        success: true,
        subdomain: ghlResult.subdomain,
        ghlLocationId: ghlResult.subdomain,
        features
      }
    } catch (error) {
      console.error("Subdomain creation error:", error)
      return {
        success: false,
        error: "Unexpected error creating subdomain"
      }
    }
  }

  // Get Client Subdomain Info
  async getClientSubdomain(clientId: string): Promise<{
    success: boolean
    subdomain?: any
    error?: string
  }> {
    try {
      const supabase = createServerClient()

      const { data: subdomain, error } = await supabase
        .from("client_subdomains")
        .select("*")
        .eq("client_id", clientId)
        .eq("is_active", true)
        .single()

      if (error) {
        return {
          success: false,
          error: "Subdomain not found"
        }
      }

      return {
        success: true,
        subdomain
      }
    } catch (error) {
      console.error("Get subdomain error:", error)
      return {
        success: false,
        error: "Error retrieving subdomain"
      }
    }
  }

  // Update Subdomain Plan
  async updateSubdomainPlan(
    clientId: string,
    newPlanType: ClientSubdomainConfig["planType"]
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = createServerClient()
      const newFeatures = this.getPlanFeatures(newPlanType)

      const { error } = await supabase
        .from("client_subdomains")
        .update({
          plan_type: newPlanType,
          features: newFeatures,
          updated_at: new Date().toISOString()
        })
        .eq("client_id", clientId)

      if (error) {
        return {
          success: false,
          error: "Failed to update plan"
        }
      }

      // Trigger upgrade automation in GHL
      if (this.ghlClient) {
        await this.ghlClient.triggerAutomation(clientId, "upsell")
      }

      return { success: true }
    } catch (error) {
      console.error("Plan update error:", error)
      return {
        success: false,
        error: "Error updating plan"
      }
    }
  }

  // Manage Subdomain Status
  async toggleSubdomainStatus(
    clientId: string,
    isActive: boolean
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = createServerClient()

      const { error } = await supabase
        .from("client_subdomains")
        .update({
          is_active: isActive,
          updated_at: new Date().toISOString()
        })
        .eq("client_id", clientId)

      if (error) {
        return {
          success: false,
          error: "Failed to update status"
        }
      }

      return { success: true }
    } catch (error) {
      console.error("Status update error:", error)
      return {
        success: false,
        error: "Error updating status"
      }
    }
  }

  // Get All Client Subdomains (Admin)
  async getAllSubdomains(): Promise<{
    success: boolean
    subdomains?: any[]
    error?: string
  }> {
    try {
      const supabase = createServerClient()

      const { data: subdomains, error } = await supabase
        .from("client_subdomains")
        .select(
          `
          *,
          profiles:client_id (
            full_name,
            email,
            avatar_url
          )
        `
        )
        .order("created_at", { ascending: false })

      if (error) {
        return {
          success: false,
          error: "Failed to fetch subdomains"
        }
      }

      return {
        success: true,
        subdomains
      }
    } catch (error) {
      console.error("Get all subdomains error:", error)
      return {
        success: false,
        error: "Error fetching subdomains"
      }
    }
  }

  // Helper: Get Plan Features
  private getPlanFeatures(
    planType: ClientSubdomainConfig["planType"]
  ): SubdomainFeatures {
    const featureMap: Record<
      ClientSubdomainConfig["planType"],
      SubdomainFeatures
    > = {
      "pro-monthly": {
        ghlAccess: true,
        customBranding: false,
        apiAccess: false,
        teamSeats: 1,
        automationLevel: "basic",
        supportLevel: "standard"
      },
      "pro-annual": {
        ghlAccess: true,
        customBranding: false,
        apiAccess: true,
        teamSeats: 1,
        automationLevel: "basic",
        supportLevel: "priority"
      },
      "command-pro": {
        ghlAccess: true,
        customBranding: true,
        apiAccess: true,
        teamSeats: 1,
        automationLevel: "advanced",
        supportLevel: "priority"
      },
      "strategic-command": {
        ghlAccess: true,
        customBranding: true,
        apiAccess: true,
        teamSeats: 5,
        automationLevel: "advanced",
        supportLevel: "priority"
      },
      "white-label": {
        ghlAccess: true,
        customBranding: true,
        apiAccess: true,
        teamSeats: 999,
        automationLevel: "enterprise",
        supportLevel: "dedicated"
      }
    }

    return featureMap[planType]
  }
}

export const clientSubdomainService = new ClientSubdomainService()
export type { ClientSubdomainConfig, SubdomainFeatures }
