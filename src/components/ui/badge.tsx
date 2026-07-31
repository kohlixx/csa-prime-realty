import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium tracking-tight whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default:     "bg-surface-muted text-foreground",
        outline:     "border border-border-strong text-foreground",
        accent:      "bg-accent-soft text-accent",
        success:     "bg-success-soft text-success",
        warning:     "bg-warning-soft text-warning",
        danger:      "bg-danger-soft text-danger",
        inverted:    "bg-primary text-primary-foreground",
        glass:       "glass text-foreground",
        premium:     "bg-luxury text-white shadow-luxury-sm",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px]",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  icon?: React.ReactNode;
}

export function Badge({ className, variant, size, dot, icon, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" /> : null}
      {icon ? <span className="inline-flex [&_svg]:size-3.5">{icon}</span> : null}
      {children}
    </span>
  );
}

export { badgeVariants };
