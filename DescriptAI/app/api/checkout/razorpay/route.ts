import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth-server";
import { PRICING } from "@/lib/payments";

// Razorpay API credentials from environment variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please sign in to upgrade" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { tier, billingCycle = "monthly", isIndia = true } = body;

    // Validate tier
    if (!tier || !["pro", "agency"].includes(tier)) {
      return NextResponse.json(
        { error: "Invalid tier", message: "Tier must be 'pro' or 'agency'" },
        { status: 400 }
      );
    }

    const priceData = PRICING[tier as keyof typeof PRICING];
    const planName = priceData.name;

    let amount: number;
    let currency: string;

    if (isIndia) {
      amount = priceData.inr;
      currency = "INR";
    } else {
      amount = priceData.usd;
      currency = "USD";
    }

    // Apply annual discount (20% off)
    if (billingCycle === "annual") {
      amount = Math.round(amount * 12 * 0.8);
    }

    // Razorpay expects amount in smallest unit (paise for INR, cents for USD)
    const amountInSmallestUnit = Math.round(amount * 100);

    // Check if Razorpay credentials are configured
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      console.error("[RAZORPAY] Missing credentials. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET env vars.");
      return NextResponse.json(
        {
          error: "Payment gateway not configured",
          message: "Razorpay credentials are missing. Please contact support.",
        },
        { status: 503 }
      );
    }

    // Create Razorpay order
    const receipt = `dai_${userId.slice(-8)}_${Date.now().toString().slice(-8)}`;
    const orderData = {
      amount: amountInSmallestUnit,
      currency: currency,
      receipt: receipt.slice(0, 40),
      notes: {
        userId: userId,
        tier: tier,
        plan: planName,
        billingCycle: billingCycle,
        originalAmount: amount.toString(),
      },
    };

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[RAZORPAY] Order creation failed:", errorText);
      return NextResponse.json(
        { error: "Failed to create payment order", message: errorText },
        { status: 500 }
      );
    }

    const order = await response.json();
    console.log(`[RAZORPAY] Order created: ${order.id} for user ${userId}, tier ${tier}`);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
      tier: tier,
      planName: planName,
      billingCycle: billingCycle,
      userId: userId,
    });
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

