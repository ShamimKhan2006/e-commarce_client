"use client";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-20 w-20">
          {/* outer glow pulse */}
          <span className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />

          {/* outer ring - spins clockwise */}
          <span
            className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary border-r-primary/60 animate-spin"
            style={{ animationDuration: "1s" }}
          />

          {/* inner ring - spins counter-clockwise, slower */}
          <span
            className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-primary/70 border-l-primary/30 animate-[spin_1.4s_linear_infinite_reverse]"
          />

          {/* center pulsing dot */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
            <span className="absolute h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
        </div>

        {/* animated label with staggered bouncing dots */}
        <p className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
          Loading
          <span className="flex gap-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" />
          </span>
        </p>
      </div>
    </div>
  );
}
