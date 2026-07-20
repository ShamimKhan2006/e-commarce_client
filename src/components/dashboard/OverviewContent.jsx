"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import { authClient } from "@/lib/auth-client";

const toNumber = (price) =>
  parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;

export default function OverviewContent() {
  const { data: session } = authClient.useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Could not load products:", e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const inventoryValue = products.reduce(
    (sum, p) => sum + toNumber(p.price),
    0
  );
  const avgRating =
    products.length > 0
      ? (
          products.reduce((sum, p) => sum + (Number(p.rating) || 0), 0) /
          products.length
        ).toFixed(1)
      : "0.0";

  const stats = [
    {
      title: "Total Revenue",
      value: `$${(inventoryValue * 3.4).toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`,
      icon: DollarSign,
      change: "+12.5%",
      changeType: "up",
    },
    {
      title: "Total Orders",
      value: (totalProducts * 8 + 42).toLocaleString(),
      icon: ShoppingCart,
      change: "+8.2%",
      changeType: "up",
    },
    {
      title: "Total Products",
      value: totalProducts.toLocaleString(),
      icon: Package,
      change: "+3.1%",
      changeType: "up",
    },
    {
      title: "Avg. Rating",
      value: avgRating,
      icon: Star,
      change: "-0.4%",
      changeType: "down",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome back, {session?.user?.name?.split(" ")[0] || "Admin"} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here's what's happening with your store today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Top Products
            </h2>
            <Link
              href="/dashboard/admin/products"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No products found. Make sure your products API is running.
            </p>
          ) : (
            <div className="space-y-2">
              {products.slice(0, 5).map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-4 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:bg-muted/40"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {p.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {p.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {p.rating}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {typeof p.price === "number" ? `$${p.price}` : p.price}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-foreground">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/admin/products"
              className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/40"
            >
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Manage Products
                </p>
                <p className="text-xs text-muted-foreground">
                  Add, edit or remove items
                </p>
              </div>
            </Link>
            <Link
              href="/dashboard/admin/orders"
              className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/40"
            >
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  View Orders
                </p>
                <p className="text-xs text-muted-foreground">
                  Track and fulfill orders
                </p>
              </div>
            </Link>
            <Link
              href="/dashboard/admin/customers"
              className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/40"
            >
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Customers
                </p>
                <p className="text-xs text-muted-foreground">
                  Manage registered users
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
