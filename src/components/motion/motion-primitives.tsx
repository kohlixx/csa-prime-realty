import * as React from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Motion primitives. Framer Motion powered reusable animation building blocks.
 * Never inline motion variants in page code — compose these instead.
 */

const luxuryEase = [0.22, 1, 0.36, 1] as const;

// ---------- FadeIn --------------------------------------------------------
export interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

export function FadeIn({
  delay = 0,
  duration = 0.7,
  y = 16,
  once = true,
  className,
  children,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: luxuryEase }}
      className={cn(className)}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}

// ---------- SlideUp -------------------------------------------------------
export function SlideUp(props: FadeInProps) {
  return <FadeIn y={40} duration={0.8} {...props} />;
}

// ---------- Stagger -------------------------------------------------------
export interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  stagger?: number;
  delay?: number;
  once?: boolean;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: luxuryEase } },
};

export function Stagger({ stagger = 0.08, delay = 0, once = true, className, children, ...props }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: { opacity: 1 },
        show:   { opacity: 1, transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={cn(className)}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(className)}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
Stagger.Item = StaggerItem;

// ---------- Reveal (mask reveal for text/media) ---------------------------
export interface RevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function Reveal({ delay = 0, duration = 1, once = true, className, children, ...props }: RevealProps) {
  return (
    <span className={cn("relative inline-block overflow-hidden align-baseline", className)} {...props}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once, margin: "-40px" }}
        transition={{ duration, delay, ease: luxuryEase }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ---------- Counter -------------------------------------------------------
export interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function Counter({ value, duration = 2, suffix, prefix, decimals = 0, className }: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const rounded = useTransform(spring, (v) => {
    const n = Number(v);
    return `${prefix ?? ""}${n.toFixed(decimals)}${suffix ?? ""}`;
  });

  React.useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  return <motion.span ref={ref} className={cn("tabular", className)}>{rounded}</motion.span>;
}

// ---------- Parallax ------------------------------------------------------
export function Parallax({
  offset = 40,
  className,
  children,
  ...props
}: { offset?: number } & React.HTMLAttributes<HTMLDivElement>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [y, setY] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setY((progress - 0.5) * offset);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)} {...props}>
      <div style={{ transform: `translate3d(0, ${y}px, 0)` }}>{children}</div>
    </div>
  );
}

// ---------- MagneticButton wrapper ---------------------------------------
export function Magnetic({
  strength = 0.25,
  className,
  children,
}: {
  strength?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}
