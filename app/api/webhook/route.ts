/* eslint-disable prettier/prettier */
import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleDateString();

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log(res.data)

    return NextResponse.json({ status: "success", event: event.type, response: res });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}