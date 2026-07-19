import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const client = new MongoClient(process.env.MONGODB_URL);

export async function GET() {
  try {
    // Verify the requester is authenticated
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admins may view the customer list
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await client.connect();
    const db = client.db();

    const users = await db
      .collection("user")
      .find(
        {},
        {
          projection: {
            name: 1,
            email: 1,
            image: 1,
            role: 1,
            emailVerified: 1,
            createdAt: 1,
          },
        }
      )
      .sort({ createdAt: -1 })
      .toArray();

    const safe = users.map((u) => ({
      id: u._id.toString(),
      name: u.name || "",
      email: u.email || "",
      image: u.image || null,
      role: u.role || "user",
      emailVerified: !!u.emailVerified,
      createdAt: u.createdAt || null,
    }));

    return NextResponse.json({ users: safe });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to load customers" },
      { status: 500 }
    );
  }
}
