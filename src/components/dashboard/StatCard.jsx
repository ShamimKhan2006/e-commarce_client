"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = "up",
  delay = 0,
}) {
  const positive = changeType === "up";
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-border bg-background p-6 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        {Icon && (
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      {change && (
        <div className="mt-4 flex items-center gap-1.5 text-sm">
          <span
            className={`flex items-center gap-1 font-medium ${
              positive ? "text-green-600" : "text-red-500"
            }`}
          >
            {positive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {change}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}
