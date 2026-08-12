import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Container — max-width wrapper with responsive gutters.
 * Variants: default (80rem), wide (88rem), narrow (64rem), prose (48rem).
 */
type Variant = "default" | "wide" | "narrow" | "prose";

const maxByVariant: Record<Variant, string> = {
  default: "max-w-[80rem]",
  wide:    "max-w-[88rem]",
  narrow:  "max-w-[64rem]",
  prose:   "max-w-[48rem]",
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  variant?: Variant;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Tag = "div", variant = "default", className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        maxByVariant[variant],
        className,
      )}
      {...props}
    />
  ),
);
Container.displayName = "Container";
