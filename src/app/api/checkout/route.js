import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
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
      console.warn("Stripe package is not installed. Falling back to mock checkout. Run 'npm install stripe' to use actual Stripe payments.");
      return NextResponse.json({ url: "/success?session_id=mock_" + Date.now() });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const lineItems = items.map((item) => {
      // Clean and parse price (e.g. "$120.00" or 120 -> 12000 cents)
      const priceString = String(item.price);
      const numericPrice = parseFloat(priceString.replace(/[^0-9.]/g, ""));
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
        quantity: item.quantity,
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
