"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Package,
  ArrowRight,
  Truck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import StatCard from "@/components/dashboard/StatCard";

const DEMO_ORDERS = [
  { id: "#ORD-1042", date: "2026-07-18", total: "$240.00", status: "Delivered", items: 3 },
  { id: "#ORD-1037", date: "2026-07-15", total: "$120.00", status: "Processing", items: 1 },
];

export default function UserDashboardOverview() {
  const { data: session } = authClient.useSession();
  const [wishlist, setWishlist] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem("wishlist");
    if (raw) {
      try {
        setWishlist(JSON.parse(raw).length || 0);
      } catch {}
    }
  }, []);

  const stats = [
    { title: "My Orders", value: "2", icon: ShoppingBag, change: "2 this month", changeType: "up" },
    { title: "Wishlist", value: String(wishlist), icon: Heart, change: "Saved items", changeType: "up" },
    { title: "Active Cart", value: "1", icon: Package, change: "In cart", changeType: "up" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Hello, {session?.user?.name?.split(" ")[0] || "there"} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Welcome to your account dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent orders */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Orders
            </h2>
            <Link
              href="/dashboard/user/orders"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {DEMO_ORDERS.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-xl border border-border p-4"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{o.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {o.date} · {o.items} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {o.total}
                  </p>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      o.status === "Delivered"
                        ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-foreground">
            Quick Links
          </h2>
          <div className="space-y-3">
            <Link
              href="/products"
              className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/40"
            >
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Continue Shopping
                </p>
                <p className="text-xs text-muted-foreground">
                  Browse new arrivals
                </p>
              </div>
            </Link>
            <Link
              href="/dashboard/user/orders"
              className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/40"
            >
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Track Orders
                </p>
                <p className="text-xs text-muted-foreground">
                  Check delivery status
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
