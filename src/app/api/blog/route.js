import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = "e-commerce";

export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const posts = await db
      .collection("blog")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const clean = posts.map((p) => ({
      id: p._id.toString(),
      title: p.title || "",
      slug: p.slug || "",
      excerpt: p.excerpt || "",
      content: p.content || "",
      coverImage: p.coverImage || "",
      author: p.author || "LUXE Team",
      tags: Array.isArray(p.tags) ? p.tags : [],
      published: !!p.published,
      createdAt: p.createdAt || null,
      updatedAt: p.updatedAt || null,
    }));

    return NextResponse.json({ posts: clean });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}

// Admin-only create
export async function POST(req) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title, excerpt, content, coverImage, tags, published } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection("blog").insertOne({
      title,
      slug,
      excerpt: excerpt || content.slice(0, 140),
      content,
      coverImage: coverImage || "",
      author: session.user.name || session.user.email || "LUXE Team",
      tags: Array.isArray(tags) ? tags : [],
      published: !!published,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { id: result.insertedId.toString(), slug },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/blog error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
