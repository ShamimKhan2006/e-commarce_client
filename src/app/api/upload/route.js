import { NextResponse } from "next/server";

const IMGBB_API_KEY = process.env.NEXT_IMAGE || process.env.IMGBB_API_KEY || "";

export async function POST(req) {
  try {
    if (!IMGBB_API_KEY) {
      return NextResponse.json({ error: "Image upload service is not configured." }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 });
    }

    // Validate size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Image must be under 5MB." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    const body = new FormData();
    body.append("key", IMGBB_API_KEY);
    body.append("image", base64);

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body,
    });

    const data = await res.json();

    if (!data.success || !data?.data?.url) {
      const errMsg = data?.error?.message || data?.data?.error?.message || "Upload failed.";
      return NextResponse.json({ error: errMsg }, { status: 500 });
    }

    return NextResponse.json({
      url: data.data.url,
      thumb: data.data.thumb?.url || data.data.url,
      deleteUrl: data.data.delete_url || null,
    });
  } catch (error) {
    console.error("/api/upload error:", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
