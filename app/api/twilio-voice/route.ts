import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse Twilio webhook data
    const formData = await request.formData();
    const speechResult = formData.get("SpeechResult") as string;
    const confidence = formData.get("Confidence") as string;
    const callSid = formData.get("CallSid") as string;

    console.log("🔊 Twilio Voice Webhook:", {
      speechResult,
      confidence,
      callSid,
      timestamp: new Date().toISOString(),
    });

    // Log to Supabase events
    const supabase = createClient();
    await supabase.from("events").insert({
      name: "voice_transcript",
      type: "twilio_voice",
      details: {
        transcript: speechResult,
        confidence: parseFloat(confidence || "0"),
        call_sid: callSid,
        timestamp: new Date().toISOString(),
      },
    });

    // Return TwiML to continue or end call
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Thank you! Your message was received: ${speechResult}</Say>
  <Hangup/>
</Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error) {
    console.error("❌ Twilio Voice Webhook Error:", error);

    // Log error to Supabase
    const supabase = createClient();
    await supabase.from("events").insert({
      name: "voice_error",
      type: "error",
      details: {
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}

// Handle GET for webhook verification
export async function GET() {
  return NextResponse.json({
    status: "Twilio Voice webhook active",
    timestamp: new Date().toISOString(),
  });
}
