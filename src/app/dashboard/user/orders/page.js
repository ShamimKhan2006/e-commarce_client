"use client";

import { Search, ShoppingCart } from "lucide-react";

const DEMO_ORDERS = [
  { id: "#ORD-1042", customer: "You", date: "2026-07-18", total: "$240.00", items: 3, status: "Delivered" },
  { id: "#ORD-1041", customer: "You", date: "2026-07-18", total: "$85.00", items: 1, status: "Processing" },
  { id: "#ORD-1040", customer: "You", date: "2026-07-17", total: "$150.00", items: 2, status: "Shipped" },
  { id: "#ORD-1039", customer: "You", date: "2026-07-16", total: "$65.00", items: 1, status: "Delivered" },
  { id: "#ORD-1038", customer: "You", date: "2026-07-15", total: "$320.00", items: 4, status: "Cancelled" },
];

const STATUS_STYLES = {
  Delivered: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
  Processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
  Shipped: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

export default function UserOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          My Orders
        </h1>
        <p className="mt-1 text-muted-foreground">
          Track and review your order history.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DEMO_ORDERS.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {o.id}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.items}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Demo data — connect your orders API to show real customer orders.
      </p>
    </div>
  );
}
