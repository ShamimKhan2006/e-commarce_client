import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = "e-commerce";

export async function DELETE(req, { params }) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    await client.connect();
    const db = client.db(dbName);
    const result = await db
      .collection("blog")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/blog/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
