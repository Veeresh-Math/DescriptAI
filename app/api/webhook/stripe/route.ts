import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();

// Lazy initialization - only create Stripe instance when needed
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  return new Stripe(key, {
    apiVersion: "2026-01-28.clover",
  });
}

function getWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET not configured");
  }
  return secret;
}


export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature") || "";

    let event: Stripe.Event;

    try {
      const stripe = getStripe();
      const webhookSecret = getWebhookSecret();
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Webhook signature verification failed:", errorMessage);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    console.log("Stripe webhook received:", event.type);

    // Handle checkout session completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, tier } = session.metadata || {};

      if (userId && tier) {
        // Update user tier in database
        await prisma.user.upsert({
          where: { id: userId },
          update: {
            tier: tier
          },
          create: {
            id: userId,
            email: session.customer_details?.email || "",
            tier: tier,
            shortCredits: tier === "agency" ? 999 : 100,
            mediumCredits: tier === "agency" ? 999 : 50
          }
        });

        console.log(`✅ User ${userId} upgraded to ${tier} via Stripe`);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
