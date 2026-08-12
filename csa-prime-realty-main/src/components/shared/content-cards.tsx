import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Star, Quote, ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/* BlogCard                                                            */
/* ------------------------------------------------------------------ */
export interface BlogCardData {
  slug: string;
  title: string;
  excerpt?: string;
  cover: string;
  category?: string;
  author?: { name: string; avatar?: string };
  readingTime?: string;
  publishedAt?: string; // pre-formatted
}

export function BlogCard({ data, className }: { data: BlogCardData; className?: string }) {
  return (
    <Card variant="default" radius="lg" interactive className={cn("group", className)}>
      <Link to={`/blog/${data.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted">
          <img src={data.cover} alt={data.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {data.category ? (
            <span className="absolute left-4 top-4"><Badge variant="glass" size="sm">{data.category}</Badge></span>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          {data.publishedAt ? <span>{data.publishedAt}</span> : null}
          {data.publishedAt && data.readingTime ? <span aria-hidden>•</span> : null}
          {data.readingTime ? <span>{data.readingTime}</span> : null}
        </div>
        <Link to={`/blog/${data.slug}`}>
          <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-foreground group-hover:text-accent">
            {data.title}
          </h3>
        </Link>
        {data.excerpt ? (
          <p className="line-clamp-2 text-sm text-text-secondary leading-relaxed">{data.excerpt}</p>
        ) : null}
        {data.author ? (
          <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
            <div className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-muted text-xs font-medium text-text-secondary">
              {data.author.avatar ? (
                <img src={data.author.avatar} alt={data.author.name} className="h-full w-full object-cover" />
              ) : (
                data.author.name.slice(0, 1)
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">{data.author.name}</p>
            </div>
            <ArrowUpRight className="ml-auto size-4 text-text-tertiary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>
        ) : null}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* TestimonialCard / ReviewCard                                        */
/* ------------------------------------------------------------------ */
export interface TestimonialCardData {
  quote: string;
  name: string;
  role?: string;
  avatar?: string;
  rating?: number; // 1-5
  property?: string;
}

export function TestimonialCard({ data, className }: { data: TestimonialCardData; className?: string }) {
  return (
    <Card variant="default" radius="lg" className={cn("p-7", className)}>
      <Quote className="size-8 text-accent/25" />
      {typeof data.rating === "number" ? (
        <div className="mt-4 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i < Math.round(data.rating ?? 0) ? "fill-warning text-warning" : "text-border-strong",
              )}
            />
          ))}
        </div>
      ) : null}
      <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground text-pretty">
        “{data.quote}”
      </blockquote>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-muted text-sm font-medium text-text-secondary">
          {data.avatar ? <img src={data.avatar} alt={data.name} className="h-full w-full object-cover" /> : data.name.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{data.name}</p>
          {data.role ? <p className="truncate text-xs text-text-secondary">{data.role}</p> : null}
        </div>
        {data.property ? (
          <Badge variant="outline" size="sm" className="ml-auto shrink-0">{data.property}</Badge>
        ) : null}
      </div>
    </Card>
  );
}

/** ReviewCard — compact review row (for property detail reviews list). */
export function ReviewCard({ data, className }: { data: TestimonialCardData; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5", className)}>
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-muted text-sm font-medium">
          {data.avatar ? <img src={data.avatar} alt={data.name} className="h-full w-full object-cover" /> : data.name.slice(0, 1)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-sm font-semibold text-foreground">{data.name}</p>
            {typeof data.rating === "number" ? (
              <span className="inline-flex items-center gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("size-3", i < Math.round(data.rating ?? 0) ? "fill-warning" : "text-border-strong")} />
                ))}
              </span>
            ) : null}
          </div>
          {data.role ? <p className="text-xs text-text-tertiary">{data.role}</p> : null}
          <p className="mt-2 text-sm leading-relaxed text-text-secondary text-pretty">{data.quote}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* StatsCard                                                           */
/* ------------------------------------------------------------------ */
export interface StatsCardData {
  label: string;
  value: React.ReactNode; // caller can use <Counter />
  helper?: string;
  icon?: React.ReactNode;
  tone?: "default" | "accent" | "premium";
}

export function StatsCard({ data, className }: { data: StatsCardData; className?: string }) {
  const isPremium = data.tone === "premium";
  const isAccent = data.tone === "accent";
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-3xl border p-6 transition-shadow",
        isPremium
          ? "border-transparent bg-luxury text-white shadow-luxury-elevated"
          : isAccent
            ? "border-accent/20 bg-accent-soft text-accent-foreground"
            : "border-border bg-card shadow-luxury-card",
        className,
      )}
    >
      {data.icon ? (
        <div className={cn(
          "grid size-11 place-items-center rounded-2xl",
          isPremium ? "bg-white/10 text-white" : isAccent ? "bg-accent text-accent-foreground" : "bg-accent-soft text-accent",
        )}>
          {data.icon}
        </div>
      ) : null}
      <div className={cn("text-4xl font-semibold tracking-tight tabular", isPremium ? "text-white" : "text-foreground")}>
        {data.value}
      </div>
      <div>
        <p className={cn("text-sm font-medium", isPremium ? "text-white" : "text-foreground")}>{data.label}</p>
        {data.helper ? (
          <p className={cn("mt-0.5 text-xs", isPremium ? "text-white/70" : "text-text-tertiary")}>{data.helper}</p>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FeatureCard                                                         */
/* ------------------------------------------------------------------ */
export interface FeatureCardData {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
}

export function FeatureCard({ data, className }: { data: FeatureCardData; className?: string }) {
  const inner = (
    <>
      {data.icon ? (
        <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105">
          {data.icon}
        </div>
      ) : null}
      <h3 className="text-lg font-semibold tracking-tight text-foreground">{data.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary text-pretty">{data.description}</p>
      {data.href ? (
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Learn more <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      ) : null}
    </>
  );

  const shared = cn(
    "group block rounded-3xl border border-border bg-card p-6 transition-shadow duration-500 hover:shadow-luxury-elevated",
    className,
  );

  return data.href ? <Link to={data.href} className={shared}>{inner}</Link> : <div className={shared}>{inner}</div>;
}

/* ------------------------------------------------------------------ */
/* PricingCard                                                         */
/* ------------------------------------------------------------------ */
export interface PricingCardData {
  name: string;
  price: string;         // pre-formatted e.g. "₹0" or "Custom"
  interval?: string;     // "/mo"
  description?: string;
  features: string[];
  cta: { label: string; href?: string; onClick?: () => void };
  highlight?: boolean;
  badge?: string;
}

export function PricingCard({ data, className }: { data: PricingCardData; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 rounded-3xl border p-8 transition-shadow",
        data.highlight
          ? "border-transparent bg-luxury text-white shadow-luxury-elevated"
          : "border-border bg-card shadow-luxury-card",
        className,
      )}
    >
      {data.badge ? (
        <span className="absolute -top-3 left-6">
          <Badge variant={data.highlight ? "glass" : "premium"} size="md">{data.badge}</Badge>
        </span>
      ) : null}
      <div>
        <p className={cn("text-sm font-medium", data.highlight ? "text-white/80" : "text-text-secondary")}>{data.name}</p>
        <p className={cn("mt-3 text-4xl font-semibold tracking-tight tabular", data.highlight ? "text-white" : "text-foreground")}>
          {data.price}
          {data.interval ? (
            <span className={cn("ml-1 text-base font-normal", data.highlight ? "text-white/60" : "text-text-tertiary")}>
              {data.interval}
            </span>
          ) : null}
        </p>
        {data.description ? (
          <p className={cn("mt-2 text-sm", data.highlight ? "text-white/70" : "text-text-secondary")}>{data.description}</p>
        ) : null}
      </div>
      <ul className={cn("flex flex-col gap-3 text-sm", data.highlight ? "text-white/90" : "text-foreground")}>
        {data.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className={cn(
              "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
              data.highlight ? "bg-white/15 text-white" : "bg-success-soft text-success",
            )}>
              <Check className="size-3" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        {data.cta.href ? (
          <Button asChild variant={data.highlight ? "glass" : "default"} size="lg" className="w-full">
            <Link to={data.cta.href}>{data.cta.label}</Link>
          </Button>
        ) : (
          <Button variant={data.highlight ? "glass" : "default"} size="lg" className="w-full" onClick={data.cta.onClick}>
            {data.cta.label}
          </Button>
        )}
      </div>
    </div>
  );
}
