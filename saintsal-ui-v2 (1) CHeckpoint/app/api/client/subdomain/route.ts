import { NextRequest, NextResponse } from "next/server"
import { clientSubdomainService } from "@/lib/services/client-subdomain"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, companyName, planType, customDomain } =
      await req.json()

    // Authenticate user
    const supabase = createServerClient()
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    // Get user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      )
    }

    // Create subdomain
    const result = await clientSubdomainService.createClientSubdomain({
      clientId: user.id,
      email: user.email!,
      firstName: firstName || profile.full_name?.split(" ")[0] || "User",
      lastName: lastName || profile.full_name?.split(" ")[1] || "",
      companyName,
      planType,
      customDomain
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      subdomain: result.subdomain,
      ghlLocationId: result.ghlLocationId,
      features: result.features,
      message: "Your SaintVisionAI™ subdomain is ready! 🚀"
    })
  } catch (error) {
    console.error("Subdomain creation error:", error)
    return NextResponse.json(
      { error: "Failed to create subdomain" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const supabase = createServerClient()
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    // Get user's subdomain
    const result = await clientSubdomainService.getClientSubdomain(user.id)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      subdomain: result.subdomain
    })
  } catch (error) {
    console.error("Get subdomain error:", error)
    return NextResponse.json(
      { error: "Failed to retrieve subdomain" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { planType } = await req.json()

    // Authenticate user
    const supabase = createServerClient()
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    // Update subdomain plan
    const result = await clientSubdomainService.updateSubdomainPlan(
      user.id,
      planType
    )

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: `Plan upgraded to ${planType}! 🎉`
    })
  } catch (error) {
    console.error("Plan update error:", error)
    return NextResponse.json(
      { error: "Failed to update plan" },
      { status: 500 }
    )
  }
}
