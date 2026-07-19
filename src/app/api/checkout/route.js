import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = "e-commerce";

const toNumber = (price) => {
  const n = parseFloat(String(price).replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, email, userId } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const total = items.reduce(
      (sum, i) => sum + toNumber(i.price) * (i.quantity || 1),
      0
    );

    // Persist the order in MongoDB (real data, not localStorage)
    try {
      await client.connect();
      const db = client.db(dbName);
      await db.collection("orders").insertOne({
        userId: userId || null,
        email: email || "guest",
        items: items.map((i) => ({
          id: i.id,
          title: i.title || i.name,
          price: i.price,
          image: i.image,
          quantity: i.quantity || 1,
        })),
        total,
        status: "Processing",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (e) {
      console.error("Failed to save order to DB:", e);
      // Continue to checkout even if order save fails
    }

    // Fallback if Stripe key is missing
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn("STRIPE_SECRET_KEY is missing. Falling back to mock checkout.");
      return NextResponse.json({ url: "/success?session_id=mock_" + Date.now() });
    }

    // Dynamic import to avoid errors if the developer hasn't installed Stripe yet
    let Stripe;
    try {
      const stripeModule = await import("stripe");
      Stripe = stripeModule.default;
    } catch (e) {
      console.warn("Stripe package is not installed. Falling back to mock checkout.");
      return NextResponse.json({ url: "/success?session_id=mock_" + Date.now() });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const lineItems = items.map((item) => {
      const numericPrice = toNumber(item.price);
      const amountInCents = Math.round(numericPrice * 100);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title || item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: amountInCents,
        },
        quantity: item.quantity || 1,
      };
    });

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
