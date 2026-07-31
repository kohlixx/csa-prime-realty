import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Timeline — vertical timeline with dots and connectors.
 * Use for construction milestones, company story, project journey.
 */
export interface TimelineItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  date?: React.ReactNode;
  icon?: React.ReactNode;
  status?: "done" | "current" | "upcoming";
}

export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol className={cn("relative space-y-8 border-l border-border pl-8", className)}>
      {items.map((item, i) => {
        const status = item.status ?? (i === 0 ? "current" : "upcoming");
        return (
          <li key={i} className="relative">
            <span
              className={cn(
                "absolute -left-[calc(2rem+0.75rem)] top-0.5 grid size-6 place-items-center rounded-full ring-4 ring-background",
                status === "done"
                  ? "bg-success text-success-foreground"
                  : status === "current"
                    ? "bg-accent text-accent-foreground shadow-luxury-glow"
                    : "bg-surface-muted text-text-tertiary",
              )}
            >
              {item.icon ?? <span className="size-1.5 rounded-full bg-current" />}
            </span>
            {item.date ? (
              <p className="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">{item.date}</p>
            ) : null}
            <h4 className="mt-1 text-base font-semibold tracking-tight text-foreground">{item.title}</h4>
            {item.description ? (
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary text-pretty">{item.description}</p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
