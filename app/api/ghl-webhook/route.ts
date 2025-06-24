import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("📡 GHL Webhook Received:", {
      type: body.type || "unknown",
      timestamp: new Date().toISOString(),
      data: body,
    });

    // Log to Supabase events
    const supabase = createClient();
    await supabase.from("events").insert({
      name: "ghl_webhook",
      type: body.type || "ghl_event",
      details: {
        event_type: body.type,
        contact_id: body.contact?.id,
        opportunity_id: body.opportunity?.id,
        location_id: body.location_id,
        webhook_data: body,
        timestamp: new Date().toISOString(),
      },
    });

    // Handle specific GHL event types
    switch (body.type) {
      case "ContactCreate":
        console.log(
          "👤 New Contact Created:",
          body.contact?.name || body.contact?.email,
        );
        break;
      case "OpportunityCreate":
        console.log("💰 New Opportunity Created:", body.opportunity?.name);
        break;
      case "AppointmentCreate":
        console.log("📅 New Appointment Scheduled:", body.appointment?.title);
        break;
      case "FormSubmit":
        console.log("📝 Form Submitted:", body.form?.name);
        break;
      default:
        console.log("🔄 GHL Event:", body.type);
    }

    // Always return 200 OK to GHL
    return NextResponse.json({
      status: "success",
      message: "Webhook received",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ GHL Webhook Error:", error);

    // Log error to Supabase
    const supabase = createClient();
    await supabase.from("events").insert({
      name: "ghl_webhook_error",
      type: "error",
      details: {
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    });

    // Still return 200 to prevent GHL retries
    return NextResponse.json({
      status: "error",
      message: "Webhook processing failed",
      timestamp: new Date().toISOString(),
    });
  }
}

// Handle GET for webhook verification
export async function GET() {
  return NextResponse.json({
    status: "GHL webhook endpoint active",
    timestamp: new Date().toISOString(),
  });
}
