import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth-server";
import { db } from "@/lib/db";
import crypto from "crypto";

// Verify Razorpay payment signature (frontend verification)
function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please sign in" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, tier } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment details" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    if (!secret) {
      return NextResponse.json(
        { error: "Payment verification not configured" },
        { status: 500 }
      );
    }

    // Verify payment signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      secret
    );

    if (!isValid) {
      console.error(`[VERIFY] Invalid payment signature for user ${userId}`);
      return NextResponse.json(
        { error: "Invalid payment signature", message: "Payment could not be verified" },
        { status: 400 }
      );
    }

    // Upgrade user tier
    const upgradeTier = tier || "pro";
    await db.user.update({
      where: { id: userId },
      data: {
        tier: upgradeTier,
        shortCredits: upgradeTier === "agency" ? 999 : 100,
        mediumCredits: upgradeTier === "agency" ? 999 : 50,
      },
    });

    console.log(`[VERIFY] User ${userId} upgraded to ${upgradeTier}. Payment: ${razorpay_payment_id}`);

    return NextResponse.json({
      success: true,
      message: `You are now on the ${upgradeTier} plan!`,
      tier: upgradeTier,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error("[VERIFY_ERROR]", error);
    return NextResponse.json(
      { error: "Verification failed", message: (error as Error).message },
      { status: 500 }
    );
  }
}

