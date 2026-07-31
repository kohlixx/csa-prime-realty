import * as React from "react";
import { X, ChevronDown, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface BulkAction<T = unknown> {
  id: string;
  label: string;
  icon?: LucideIcon;
  /** Highlights the button as destructive. Also triggers confirm() when set. */
  destructive?: boolean;
  /** Optional confirmation copy; when present, user must confirm before run. */
  confirm?: string;
  onRun: (selectedIds: string[], rows?: T[]) => void | Promise<void>;
}

export interface BulkActionsBarProps<T = unknown> {
  selectedIds: string[];
  rows?: T[];
  totalCount?: number;
  actions: BulkAction<T>[];
  /** Primary actions rendered as buttons (first N); rest collapse into a menu. */
  primaryCount?: number;
  onClear: () => void;
  onSelectAll?: () => void;
  className?: string;
  /** Sticky floating variant vs. inline strip. */
  variant?: "floating" | "inline";
}

export function BulkActionsBar<T = unknown>({
  selectedIds,
  rows,
  totalCount,
  actions,
  primaryCount = 2,
  onClear,
  onSelectAll,
  className,
  variant = "inline",
}: BulkActionsBarProps<T>) {
  const [busy, setBusy] = React.useState<string | null>(null);
  const count = selectedIds.length;
  if (count === 0) return null;

  const primary = actions.slice(0, primaryCount);
  const overflow = actions.slice(primaryCount);

  const run = async (action: BulkAction<T>) => {
    if (action.confirm && !window.confirm(action.confirm)) return;
    try {
      setBusy(action.id);
      await action.onRun(selectedIds, rows);
    } finally {
      setBusy(null);
    }
  };

  const shell =
    variant === "floating"
      ? "fixed bottom-6 left-1/2 z-40 -translate-x-1/2 shadow-2xl shadow-primary/10"
      : "";

  return (
    <div
      role="region"
      aria-label="Bulk actions"
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-3 py-2 backdrop-blur-md",
        shell,
        className
      )}
    >
      <div className="flex items-center gap-2 pr-1">
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
          {count}
        </span>
        <span className="text-sm text-foreground">
          selected
          {typeof totalCount === "number" ? (
            <span className="ml-1 text-muted-foreground">of {totalCount}</span>
          ) : null}
        </span>
        {onSelectAll && typeof totalCount === "number" && count < totalCount ? (
          <Button
            variant="link"
            size="sm"
            className="h-6 px-1 text-xs"
            onClick={onSelectAll}
          >
            Select all {totalCount}
          </Button>
        ) : null}
      </div>

      <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

      <div className="flex flex-wrap items-center gap-1.5">
        {primary.map((a) => {
          const Icon = a.icon;
          return (
            <Button
              key={a.id}
              size="sm"
              variant={a.destructive ? "destructive" : "outline"}
              disabled={busy !== null}
              onClick={() => run(a)}
            >
              {Icon ? <Icon className="mr-1.5 h-4 w-4" /> : null}
              {busy === a.id ? "Working…" : a.label}
            </Button>
          );
        })}

        {overflow.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" disabled={busy !== null}>
                More
                <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {overflow.map((a, i) => {
                const Icon = a.icon;
                return (
                  <React.Fragment key={a.id}>
                    {i > 0 && a.destructive && !overflow[i - 1].destructive ? (
                      <DropdownMenuSeparator />
                    ) : null}
                    <DropdownMenuItem
                      onSelect={() => run(a)}
                      className={cn(
                        a.destructive && "text-destructive focus:text-destructive"
                      )}
                    >
                      {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
                      {a.label}
                    </DropdownMenuItem>
                  </React.Fragment>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        className="ml-auto h-8 w-8"
        aria-label="Clear selection"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
