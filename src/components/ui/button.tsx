import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Luxury Button system for CSA Prime Realty.
 * Extends shadcn's Button with brand-grade variants, sizes, ripple + loading.
 *
 * Variants:
 *  - default     Primary ink button (dark navy)
 *  - accent      Brand accent (blue #2563EB)
 *  - gradient    Luxury gradient CTA
 *  - outline     Bordered on white
 *  - ghost       Text button
 *  - subtle      Soft muted background
 *  - link        Inline text link
 *  - destructive Danger action
 *  - whatsapp    WhatsApp CTA (green)
 *  - call        Call CTA (accent)
 *  - glass       Glassmorphic button
 *
 * Sizes: xs | sm | default | lg | xl | icon | icon-sm | icon-lg
 */
const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-tight cursor-pointer select-none",
    "transition-[background,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-accent/60",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-primary text-primary-foreground shadow-luxury-sm hover:bg-primary-hover hover:shadow-luxury-md",
        accent:
          "rounded-full bg-accent text-accent-foreground shadow-luxury-sm hover:bg-accent-hover hover:shadow-luxury-glow",
        gradient:
          "rounded-full bg-luxury text-white shadow-luxury-md hover:shadow-luxury-elevated hover:-translate-y-0.5",
        outline:
          "rounded-full border border-border-strong bg-transparent text-foreground hover:bg-surface-muted hover:border-foreground/25",
        ghost:
          "rounded-full text-foreground hover:bg-surface-muted",
        subtle:
          "rounded-full bg-surface-muted text-foreground hover:bg-muted",
        link:
          "rounded-none px-0 text-accent underline-offset-4 hover:underline",
        destructive:
          "rounded-full bg-danger text-danger-foreground shadow-luxury-sm hover:bg-danger/90",
        whatsapp:
          "rounded-full bg-whatsapp text-whatsapp-foreground shadow-luxury-md hover:shadow-luxury-glow",
        call:
          "rounded-full bg-accent text-accent-foreground shadow-luxury-md hover:shadow-luxury-glow",
        glass:
          "rounded-full glass-strong text-foreground hover:bg-surface/90",
      },
      size: {
        xs:      "h-8 px-3 text-xs",
        sm:      "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg:      "h-12 px-7 text-[15px]",
        xl:      "h-14 px-9 text-base",
        icon:    "h-11 w-11",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-14 w-14",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ripple?: boolean;
}

interface Ripple { id: number; x: number; y: number; size: number }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      ripple = true,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const [ripples, setRipples] = React.useState<Ripple[]>([]);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (ripple && !asChild) {
        const target = e.currentTarget as HTMLButtonElement;
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const id = Date.now();
        setRipples((r) => [...r, { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size }]);
        window.setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
      }
      onClick?.(e);
    };

    // asChild has to receive a single child element
    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={cn(buttonVariants({ variant, size }), "ripple-container", className)}
          {...props}
        >
          {children as React.ReactElement}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), "ripple-container", className)}
        onClick={handleClick}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : leftIcon ? (
          <span className="-ml-0.5 inline-flex">{leftIcon}</span>
        ) : null}
        <span className="inline-flex items-center">{children}</span>
        {!loading && rightIcon ? (
          <span className="-mr-0.5 inline-flex transition-transform duration-300 group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        ) : null}
        {ripples.map((r) => (
          <span
            key={r.id}
            aria-hidden
            className="pointer-events-none absolute rounded-full bg-current/25"
            style={{
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
              animation: "ripple 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
            }}
          />
        ))}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
