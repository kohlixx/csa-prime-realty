import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Price — formatted price display with size + tone variants.
 * Accepts pre-formatted string (from lib/format.ts formatINR).
 */
export function Price({
  value,
  suffix,
  size = "md",
  tone = "default",
  className,
}: {
  value: React.ReactNode;
  suffix?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "default" | "accent" | "muted";
  className?: string;
}) {
  const sizeClass = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl sm:text-4xl",
  }[size];
  const toneClass = {
    default: "text-foreground",
    accent:  "text-accent",
    muted:   "text-text-secondary",
  }[tone];

  return (
    <span className={cn("font-semibold tracking-tight tabular", sizeClass, toneClass, className)}>
      {value}
      {suffix ? (
        <span className="ml-1 text-[0.65em] font-medium uppercase tracking-widest text-text-tertiary">
          {suffix}
        </span>
      ) : null}
    </span>
  );
}
