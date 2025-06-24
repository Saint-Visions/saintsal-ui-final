import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    // Verify webhook signature if secret is available
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } else {
      // Parse without verification for development
      event = JSON.parse(body);
    }

    console.log("💳 Stripe Webhook:", {
      type: event.type,
      timestamp: new Date().toISOString(),
      id: event.id,
    });

    // Log to Supabase events
    const supabase = createClient();
    await supabase.from("events").insert({
      name: "stripe_webhook",
      type: event.type,
      details: {
        event_id: event.id,
        event_type: event.type,
        customer_id: (event.data.object as any)?.customer,
        amount:
          (event.data.object as any)?.amount_total ||
          (event.data.object as any)?.amount,
        currency: (event.data.object as any)?.currency,
        webhook_data: event.data.object,
        timestamp: new Date().toISOString(),
      },
    });

    // Handle specific Stripe events
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("✅ Payment Completed:", {
          customer: session.customer,
          amount: session.amount_total,
          currency: session.currency,
        });

        // TODO: Update user subscription in Supabase
        // await updateUserSubscription(session.customer, session.metadata)
        break;

      case "customer.subscription.created":
        const subscription = event.data.object as Stripe.Subscription;
        console.log("📱 Subscription Created:", {
          customer: subscription.customer,
          status: subscription.status,
          plan: subscription.items.data[0]?.price.id,
        });
        break;

      case "customer.subscription.updated":
        const updatedSub = event.data.object as Stripe.Subscription;
        console.log("🔄 Subscription Updated:", {
          customer: updatedSub.customer,
          status: updatedSub.status,
        });
        break;

      case "invoice.payment_succeeded":
        const invoice = event.data.object as Stripe.Invoice;
        console.log("💰 Payment Succeeded:", {
          customer: invoice.customer,
          amount: invoice.amount_paid,
          subscription: invoice.subscription,
        });
        break;

      case "invoice.payment_failed":
        const failedInvoice = event.data.object as Stripe.Invoice;
        console.log("❌ Payment Failed:", {
          customer: failedInvoice.customer,
          amount: failedInvoice.amount_due,
        });
        break;

      default:
        console.log(`🔄 Unhandled Stripe event: ${event.type}`);
    }

    return NextResponse.json({
      status: "success",
      received: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Stripe Webhook Error:", error);

    // Log error to Supabase
    const supabase = createClient();
    await supabase.from("events").insert({
      name: "stripe_webhook_error",
      type: "error",
      details: {
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 },
    );
  }
}

// Handle GET for webhook verification
export async function GET() {
  return NextResponse.json({
    status: "Stripe webhook endpoint active",
    timestamp: new Date().toISOString(),
  });
}
