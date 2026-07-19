import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = "e-commerce";

// GET -> current user's wishlist
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await client.connect();
    const db = client.db(dbName);
    const doc = await db.collection("wishlist").findOne({ userId: session.user.id });
    const items = doc?.items || [];
    return NextResponse.json({ items });
  } catch (error) {
    console.error("GET /api/wishlist error:", error);
    return NextResponse.json({ error: "Failed to load wishlist" }, { status: 500 });
  }
}

// POST -> add or remove an item (toggle). Body: { product }
export async function POST(req) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { product } = await req.json();
    if (!product?.id) {
      return NextResponse.json({ error: "Product required" }, { status: 400 });
    }

    await client.connect();
    const db = client.db(dbName);
    const coll = db.collection("wishlist");

    const doc = await coll.findOne({ userId: session.user.id });
    const existing = doc?.items || [];
    const already = existing.some((i) => i.id === product.id);

    const items = already
      ? existing.filter((i) => i.id !== product.id)
      : [...existing, product];

    await coll.updateOne(
      { userId: session.user.id },
      { $set: { items, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ items, removed: already });
  } catch (error) {
    console.error("POST /api/wishlist error:", error);
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}

// DELETE -> clear wishlist
export async function DELETE() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await client.connect();
    const db = client.db(dbName);
    await db
      .collection("wishlist")
      .updateOne(
        { userId: session.user.id },
        { $set: { items: [], updatedAt: new Date() } },
        { upsert: true }
      );
    return NextResponse.json({ items: [] });
  } catch (error) {
    console.error("DELETE /api/wishlist error:", error);
    return NextResponse.json({ error: "Failed to clear wishlist" }, { status: 500 });
  }
}
