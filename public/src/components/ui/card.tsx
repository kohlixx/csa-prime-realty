import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Card — luxury card primitive with soft borders and shadows.
 */
const cardVariants = cva(
  "flex flex-col overflow-hidden bg-card text-card-foreground transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
  {
    variants: {
      variant: {
        default:  "border border-border shadow-luxury-card",
        flat:     "border border-border",
        elevated: "shadow-luxury-elevated",
        outline:  "border border-border-strong",
        glass:    "glass",
        premium:  "border border-border shadow-luxury-card bg-gradient-to-b from-white to-surface-muted",
        ghost:    "",
      },
      radius: {
        md: "rounded-2xl",
        lg: "rounded-3xl",
        xl: "rounded-[2rem]",
      },
      interactive: {
        true:  "cursor-pointer hover:-translate-y-1 hover:shadow-luxury-elevated",
        false: "",
      },
    },
    defaultVariants: { variant: "default", radius: "lg", interactive: false },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, radius, interactive, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, radius, interactive }), className)} {...props} />
  ),
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold tracking-tight text-foreground", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-text-secondary leading-relaxed", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { cardVariants };
