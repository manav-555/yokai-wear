import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = "INR", notes } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid order amount" },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured in environment" },
        { status: 500 }
      );
    }

    // Call official Razorpay Orders API with Basic Auth
    const amountInPaise = Math.round(amount * 100);
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency,
        receipt: `rcpt_${Date.now()}`,
        notes: notes || { brand: "Yokai Wear", drop: "Drop 001" },
      }),
    });

    const razorpayOrder = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      console.error("Razorpay API Error:", razorpayOrder);
      return NextResponse.json(
        { error: razorpayOrder.error?.description || "Razorpay rejected order creation" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId,
    });
  } catch (error) {
    console.error("Order creation route failure:", error);
    return NextResponse.json(
      { error: "Internal payment processing error" },
      { status: 500 }
    );
  }
}
