import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = "e-commerce";

export const dynamic = "force-dynamic";

async function getPost(slugOrId) {
  await client.connect();
  const db = client.db(dbName);
  let query;
  try {
    query = { $or: [{ slug: slugOrId }, { _id: new ObjectId(slugOrId) }] };
  } catch {
    query = { slug: slugOrId };
  }
  const post = await db.collection("blog").findOne(query);
  if (!post) return null;
  return {
    id: post._id.toString(),
    title: post.title || "",
    excerpt: post.excerpt || "",
    content: post.content || "",
    coverImage: post.coverImage || "",
    author: post.author || "LUXE Team",
    tags: Array.isArray(post.tags) ? post.tags : [],
    createdAt: post.createdAt || null,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        {post.coverImage && (
          <div className="mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              <Tag className="h-3 w-3" />
              {t}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{post.author}</span>
          {post.createdAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        <p className="mt-6 text-lg text-muted-foreground">{post.excerpt}</p>

        <article className="mt-8 space-y-4 leading-relaxed text-foreground">
          {post.content.split("\n").map((line, i) =>
            line.trim() ? <p key={i}>{line}</p> : <br key={i} />
          )}
        </article>
      </div>
    </div>
  );
}
