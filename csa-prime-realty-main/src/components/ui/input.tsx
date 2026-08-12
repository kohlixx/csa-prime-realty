import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

/**
 * Input — luxury input with rounded pill styling.
 * For floating-label version use <FloatingInput />.
 */

const inputVariants = cva(
  [
    "peer flex w-full rounded-xl border bg-background text-sm text-foreground",
    "placeholder:text-text-tertiary",
    "transition-[border-color,box-shadow,background] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:border-accent/60",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-border",
        subtle:  "border-transparent bg-surface-muted focus-visible:bg-background",
        success: "border-success/60 focus-visible:ring-success/30 focus-visible:border-success",
        error:   "border-danger/60 focus-visible:ring-danger/25 focus-visible:border-danger",
      },
      inputSize: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-5 text-[15px]",
      },
    },
    defaultVariants: { variant: "default", inputSize: "md" },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", variant, inputSize, leftIcon, rightIcon, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative w-full">
          {leftIcon ? (
            <span className="pointer-events-none absolute inset-y-0 left-3.5 grid place-items-center text-text-tertiary [&_svg]:size-4">
              {leftIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            type={type}
            className={cn(
              inputVariants({ variant, inputSize }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className,
            )}
            {...props}
          />
          {rightIcon ? (
            <span className="pointer-events-none absolute inset-y-0 right-3.5 grid place-items-center text-text-tertiary [&_svg]:size-4">
              {rightIcon}
            </span>
          ) : null}
        </div>
      );
    }
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, inputSize }), className)}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

/**
 * FloatingInput — Apple-style floating label input.
 */
export interface FloatingInputProps extends Omit<InputProps, "placeholder"> {
  label: string;
  error?: string;
  success?: string;
  hint?: string;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, id, error, success, hint, className, variant, ...props }, ref) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const state: VariantProps<typeof inputVariants>["variant"] =
      error ? "error" : success ? "success" : variant ?? "default";

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            placeholder=" "
            className={cn(
              inputVariants({ variant: state, inputSize: "lg" }),
              "pt-5 pb-1.5",
              className,
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 origin-left text-sm text-text-secondary",
              "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-accent",
              "peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium",
            )}
          >
            {label}
          </label>
        </div>
        {error ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
            <AlertCircle className="size-3.5" /> {error}
          </p>
        ) : success ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-success">
            <CheckCircle2 className="size-3.5" /> {success}
          </p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-text-tertiary">{hint}</p>
        ) : null}
      </div>
    );
  },
);
FloatingInput.displayName = "FloatingInput";

export { inputVariants };
