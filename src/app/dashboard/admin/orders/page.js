"use client";

import { useState } from "react";
import { Search, ShoppingCart, Eye } from "lucide-react";

// Demo orders — replace with real data once you have an orders collection/API
const DEMO_ORDERS = [
  { id: "#ORD-1042", customer: "Sarah Jenkins", email: "sarah@example.com", date: "2026-07-18", total: "$240.00", items: 3, status: "Delivered" },
  { id: "#ORD-1041", customer: "Michael Torres", email: "michael@example.com", date: "2026-07-18", total: "$85.00", items: 1, status: "Processing" },
  { id: "#ORD-1040", customer: "Emily Rogers", email: "emily@example.com", date: "2026-07-17", total: "$150.00", items: 2, status: "Shipped" },
  { id: "#ORD-1039", customer: "James Wilson", email: "james@example.com", date: "2026-07-16", total: "$65.00", items: 1, status: "Delivered" },
  { id: "#ORD-1038", customer: "Olivia Brown", email: "olivia@example.com", date: "2026-07-15", total: "$320.00", items: 4, status: "Cancelled" },
  { id: "#ORD-1037", customer: "Daniel Lee", email: "daniel@example.com", date: "2026-07-15", total: "$120.00", items: 1, status: "Processing" },
];

const STATUS_STYLES = {
  Delivered: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
  Processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
  Shipped: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

const FILTERS = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = DEMO_ORDERS.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Orders
        </h1>
        <p className="mt-1 text-muted-foreground">
          Track and manage customer orders.
        </p>
      </div>

      {/* Filters + search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative max-w-xs">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Order ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Items</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((o) => (
                  <tr key={o.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {o.id}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">
                          {o.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {o.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {o.items}
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {o.total}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          STATUS_STYLES[o.status]
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                        aria-label="View order"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Note: Orders are demo data. Connect your orders collection/API to show
        real orders.
      </p>
    </div>
  );
}
