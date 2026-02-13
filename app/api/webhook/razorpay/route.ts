import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

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

    // Verify webhook signature
    const isValid = verifyWebhookSignature(
      body,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET || ""
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);
    console.log("Razorpay webhook received:", event.event);

    // Handle payment captured event
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const { notes } = payment;

      if (notes && notes.userId && notes.tier) {
        // Update user tier in database
        await prisma.user.upsert({
          where: { id: notes.userId },
          update: {
            tier: notes.tier
          },
          create: {
            id: notes.userId,
            email: payment.email || "",
            tier: notes.tier,
            shortCredits: notes.tier === "agency" ? 999 : 100,
            mediumCredits: notes.tier === "agency" ? 999 : 50
          }
        });

        console.log(`✅ User ${notes.userId} upgraded to ${notes.tier} via Razorpay`);
      }
    }


    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
