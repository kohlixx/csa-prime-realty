import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Ban,
  Loader2,
  Sparkles,
  Archive,
  Eye,
  EyeOff,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StatusBadge — semantic status pill for admin tables and detail views.
 * Tone drives color; optional icon + pulsing dot communicate state at a glance.
 */
const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-medium tracking-tight transition-colors whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral:
          "bg-muted/60 text-muted-foreground border-border/60",
        info:
          "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/30",
        success:
          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
        warning:
          "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
        danger:
          "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30",
        premium:
          "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-900 border-amber-300 dark:from-amber-500/10 dark:to-amber-400/10 dark:text-amber-200 dark:border-amber-400/30",
        accent:
          "bg-primary/10 text-primary border-primary/20",
      },
      size: {
        sm: "h-5 px-2 text-[10px]",
        md: "h-6 px-2.5 text-xs",
        lg: "h-7 px-3 text-sm",
      },
      pulse: {
        true: "",
        false: "",
      },
    },
    defaultVariants: { tone: "neutral", size: "md", pulse: false },
  }
);

export type StatusTone = NonNullable<
  VariantProps<typeof statusBadgeVariants>["tone"]
>;

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  icon?: LucideIcon | null;
  dot?: boolean;
}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, tone, size, pulse, icon: Icon, dot, children, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(statusBadgeVariants({ tone, size, pulse }), className)}
        {...rest}
      >
        {dot ? (
          <span className="relative flex h-1.5 w-1.5">
            {pulse ? (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
            ) : null}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          </span>
        ) : Icon ? (
          <Icon className="h-3.5 w-3.5" aria-hidden />
        ) : null}
        <span>{children}</span>
      </span>
    );
  }
);
StatusBadge.displayName = "StatusBadge";

/**
 * Preset — declarative statuses for common admin entities.
 * Prefer <StatusBadgePreset preset="published" /> over hand-rolling tones.
 */
export type StatusPreset =
  | "draft"
  | "published"
  | "archived"
  | "pending"
  | "approved"
  | "rejected"
  | "active"
  | "inactive"
  | "sold"
  | "available"
  | "under_offer"
  | "hot"
  | "new"
  | "featured"
  | "hidden"
  | "processing"
  | "failed"
  | "success";

const PRESETS: Record<
  StatusPreset,
  { label: string; tone: StatusTone; icon: LucideIcon; pulse?: boolean }
> = {
  draft: { label: "Draft", tone: "neutral", icon: EyeOff },
  published: { label: "Published", tone: "success", icon: CheckCircle2 },
  archived: { label: "Archived", tone: "neutral", icon: Archive },
  pending: { label: "Pending", tone: "warning", icon: Clock },
  approved: { label: "Approved", tone: "success", icon: CheckCircle2 },
  rejected: { label: "Rejected", tone: "danger", icon: XCircle },
  active: { label: "Active", tone: "success", icon: CheckCircle2, pulse: true },
  inactive: { label: "Inactive", tone: "neutral", icon: Ban },
  sold: { label: "Sold Out", tone: "danger", icon: Ban },
  available: { label: "Available", tone: "success", icon: CheckCircle2 },
  under_offer: { label: "Under Offer", tone: "warning", icon: AlertTriangle },
  hot: { label: "Hot", tone: "danger", icon: Sparkles, pulse: true },
  new: { label: "New", tone: "info", icon: Sparkles },
  featured: { label: "Featured", tone: "premium", icon: Sparkles },
  hidden: { label: "Hidden", tone: "neutral", icon: EyeOff },
  processing: { label: "Processing", tone: "info", icon: Loader2 },
  failed: { label: "Failed", tone: "danger", icon: XCircle },
  success: { label: "Success", tone: "success", icon: CheckCircle2 },
};

export interface StatusBadgePresetProps
  extends Omit<StatusBadgeProps, "tone" | "icon" | "children"> {
  preset: StatusPreset;
  label?: string;
}

export function StatusBadgePreset({
  preset,
  label,
  ...rest
}: StatusBadgePresetProps) {
  const cfg = PRESETS[preset];
  return (
    <StatusBadge
      tone={cfg.tone}
      icon={cfg.icon}
      pulse={rest.pulse ?? cfg.pulse}
      {...rest}
    >
      {label ?? cfg.label}
    </StatusBadge>
  );
}

/** Convenience: visibility toggle indicator. */
export function VisibilityBadge({ visible }: { visible: boolean }) {
  return visible ? (
    <StatusBadge tone="success" icon={Eye} size="sm">
      Visible
    </StatusBadge>
  ) : (
    <StatusBadge tone="neutral" icon={EyeOff} size="sm">
      Hidden
    </StatusBadge>
  );
}
