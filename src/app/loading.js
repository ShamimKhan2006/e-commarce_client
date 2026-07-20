"use client";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex h-16 w-16">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/30" />
          <span className="relative inline-flex h-16 w-16 animate-spin rounded-full border-[3px] border-primary/20 border-t-primary" />
        </span>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
