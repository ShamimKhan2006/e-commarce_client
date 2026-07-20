"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">
        404 — Page not found
      </p>
      <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
        Oops!
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you’re looking for doesn’t exist or has been moved. Let’s get you
        back to shopping.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition-all"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <button
          onClick={() => history.back()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 active:scale-95 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
