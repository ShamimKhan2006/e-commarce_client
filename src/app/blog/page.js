"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

function formatDate(d) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

const FALLBACK = [
  {
    id: "f1",
    title: "5 Timeless Wardrobe Essentials for 2026",
    excerpt:
      "Build a capsule wardrobe that never goes out of style with these premium staples.",
    coverImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
    author: "LUXE Team",
    tags: ["Style", "Guides"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "f2",
    title: "How to Care for Premium Leather Goods",
    excerpt:
      "Keep your leather accessories looking brand new for years with these simple tips.",
    coverImage:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    author: "LUXE Team",
    tags: ["Care", "Leather"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "f3",
    title: "The Rise of Quiet Luxury",
    excerpt:
      "Why understated elegance is dominating modern fashion and how to nail the look.",
    coverImage:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
    author: "LUXE Team",
    tags: ["Trends"],
    createdAt: new Date().toISOString(),
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/blogs`, { cache: "no-store" });
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const list = posts.length > 0 ? posts : loading ? [] : FALLBACK;

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <ScrollReveal className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            The Journal
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            LUXE Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Stories, style guides, and product insights from the LUXE team.
          </p>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug || post.id}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {post.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                        >
                          <Tag className="h-3 w-3" />
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="line-clamp-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium text-primary">
                        Read
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
