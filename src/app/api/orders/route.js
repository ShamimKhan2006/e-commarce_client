import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = "e-commerce";

// GET -> current user's orders (or all orders for admin)
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await client.connect();
    const db = client.db(dbName);
    const coll = db.collection("orders");

    const query = session.user.role === "admin" ? {} : { userId: session.user.id };
    const orders = await coll.find(query).sort({ createdAt: -1 }).toArray();

    const clean = orders.map((o) => ({
      id: o._id.toString(),
      userId: o.userId,
      email: o.email,
      items: o.items || [],
      total: o.total || 0,
      status: o.status || "Processing",
      createdAt: o.createdAt,
    }));

    return NextResponse.json({ orders: clean });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}
