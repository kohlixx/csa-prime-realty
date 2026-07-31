import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton — shimmer loading placeholder.
 * Compose into <SkeletonPropertyCard />, <SkeletonList />, etc.
 */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "shimmer rounded-xl bg-surface-muted",
        className,
      )}
      {...props}
    />
  );
}

/** Property card skeleton (grid). */
export function SkeletonPropertyCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-luxury-card">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex items-center justify-between pt-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/** Text block skeleton. */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")} />
      ))}
    </div>
  );
}
