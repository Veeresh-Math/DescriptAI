import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

// Verify Razorpay webhook signature
function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    if (!secret) {
      console.error("[WEBHOOK] RAZORPAY_WEBHOOK_SECRET not configured");
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(body, signature, secret);
    if (!isValid) {
      console.error("[WEBHOOK] Invalid signature received");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);
    console.log("[WEBHOOK] Razorpay event:", event.event);

    // Handle payment captured event
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const { notes } = payment;

      if (notes?.userId && notes?.tier) {
        const userId = notes.userId;
        const tier = notes.tier;

        // Update user tier in database
        await db.user.update({
          where: { id: userId },
          data: {
            tier: tier,
            shortCredits: tier === "agency" ? 999 : tier === "pro" ? 100 : 3,
            mediumCredits: tier === "agency" ? 999 : tier === "pro" ? 50 : 2,
          },
        });

        // Log the payment
        console.log(`[WEBHOOK] User ${userId} upgraded to ${tier} via Razorpay. Payment ID: ${payment.id}`);
      }
    }

    // Also handle order.paid for redundancy
    if (event.event === "order.paid") {
      const order = event.payload.order.entity;
      const { notes } = order;

      if (notes?.userId && notes?.tier) {
        const userId = notes.userId;
        const tier = notes.tier;

        await db.user.update({
          where: { id: userId },
          data: {
            tier: tier,
            shortCredits: tier === "agency" ? 999 : tier === "pro" ? 100 : 3,
            mediumCredits: tier === "agency" ? 999 : tier === "pro" ? 50 : 2,
          },
        });

        console.log(`[WEBHOOK] User ${userId} upgraded to ${tier} via order.paid. Order ID: ${order.id}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[WEBHOOK_ERROR]", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

