import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * PageLoader — luxury full-screen loader.
 * Use during route transitions or long-running loads. Fades out gracefully.
 */
export function PageLoader({ label = "Loading", className }: { label?: string; className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed inset-0 z-[100] grid place-items-center bg-background/70 backdrop-blur-md",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-14 w-14">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-accent/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="absolute inset-2 rounded-full border-2 border-accent border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
          {label}
        </span>
      </div>
    </div>
  );
}

/** InlineSpinner — used inline in buttons or lists. */
export function InlineSpinner({ className }: { className?: string }) {
  return (
    <motion.span
      className={cn("inline-block size-4 rounded-full border-2 border-current border-t-transparent", className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      aria-hidden
    />
  );
}

/** BrandMarkLoader — brand initials pulse (use during first paint). */
export function BrandMarkLoader({ className }: { className?: string }) {
  return (
    <div className={cn("grid min-h-screen place-items-center bg-hero", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-6"
      >
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-luxury text-white shadow-luxury-elevated">
          <span className="text-lg font-semibold tracking-tight">CSA</span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
          CSA Prime Realty
        </span>
      </motion.div>
    </div>
  );
}
