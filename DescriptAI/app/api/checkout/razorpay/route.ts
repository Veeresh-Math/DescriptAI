import { NextRequest, NextResponse } from "next/server";
import { PRICING } from "@/lib/payments";

// Razorpay API credentials (test mode)
const RAZORPAY_KEY_ID = "rzp_test_SJdDboYozTtwFe";
const RAZORPAY_KEY_SECRET = "Pk4kEQs1geexdd3cVW3O52TG";

export async function POST(req: NextRequest) {
  try {
    console.log("API endpoint called");
    
    // Always use demo user for testing
    const userId = "demo_user_" + Date.now();
    console.log("Creating demo checkout for user:", userId);

    const body = await req.json();
    console.log("Request body:", body);

    const { tier, billingCycle = "monthly", isIndia = true } = body;

    if (!tier || !['pro', 'agency'].includes(tier)) {
      console.error("Invalid tier:", tier);
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
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

    // Apply annual discount if billing cycle is annual
    if (billingCycle === "annual") {
      amount = Math.round(amount * 12 * 0.8); // 20% discount for annual billing
    }

    // Razorpay expects amount in smallest unit (paise for INR, cents for USD)
    const amountInSmallestUnit = Math.round(amount * 100);

    console.log("Calculated amount:", amount, "Currency:", currency);

    // Create Razorpay order with shorter receipt (max 40 chars)
    const receipt = `dai_${userId.slice(-10)}_${Date.now().toString().slice(-10)}`;
    const orderData = {
      amount: amountInSmallestUnit,
      currency: currency,
      receipt: receipt.slice(0, 40), // Ensure receipt is <= 40 characters
      notes: {
        userId: userId,
        tier: tier,
        plan: planName,
        billingCycle: billingCycle
      }
    };

    console.log("Razorpay order data:", orderData);
    console.log("Razorpay credentials available:", !!(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET));

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')}`
      },
      body: JSON.stringify(orderData)
    });

    console.log("Razorpay API response status:", response.status);
    console.log("Razorpay API response headers:", response.headers);

    if (!response.ok) {
      const error = await response.text();
      console.error("Razorpay error response:", error);
      return NextResponse.json({ error: "Failed to create order: " + error }, { status: 500 });
    }

    const order = await response.json();
    console.log("Razorpay order created:", order);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
      tier: tier,
      planName: planName
    });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error as Error).message },
      { status: 500 }
    );
  }
}
