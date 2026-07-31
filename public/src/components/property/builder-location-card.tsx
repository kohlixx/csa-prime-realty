import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Building2, ArrowUpRight, Star, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * BuilderCard — developer / builder profile card.
 * Data injected via props; use in developer directory or homepage strip.
 */
export interface BuilderCardData {
  slug: string;
  name: string;
  logo?: string;
  cover?: string;
  established?: string;
  projectsCount?: number;
  rating?: number;
  cities?: string[];
  tagline?: string;
}

export function BuilderCard({ data, className }: { data: BuilderCardData; className?: string }) {
  return (
    <Link to={`/developers/${data.slug}`} className={cn("block", className)}>
      <Card variant="default" radius="lg" interactive className="group">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-muted">
          {data.cover ? (
            <img src={data.cover} alt={`${data.name} projects`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="grid h-full w-full place-items-center bg-luxury text-white">
              <Building2 className="size-10 opacity-70" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {data.logo ? (
            <div className="absolute bottom-3 left-3 grid size-14 place-items-center rounded-2xl bg-white p-1.5 shadow-luxury-md">
              <img src={data.logo} alt={`${data.name} logo`} className="h-full w-full object-contain" />
            </div>
          ) : null}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-accent">{data.name}</h3>
              {data.tagline ? <p className="mt-1 line-clamp-1 text-sm text-text-secondary">{data.tagline}</p> : null}
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-text-tertiary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
            {typeof data.rating === "number" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-warning-soft px-2 py-0.5 text-warning">
                <Star className="size-3 fill-current" /> <span className="tabular font-medium">{data.rating.toFixed(1)}</span>
              </span>
            ) : null}
            {typeof data.projectsCount === "number" ? (
              <span className="inline-flex items-center gap-1"><Users className="size-3.5" /> {data.projectsCount} projects</span>
            ) : null}
            {data.established ? <span>Since {data.established}</span> : null}
          </div>
          {data.cities?.length ? (
            <div className="mt-3 flex flex-wrap gap-1">
              {data.cities.slice(0, 3).map((c) => (
                <Badge key={c} variant="outline" size="sm">{c}</Badge>
              ))}
            </div>
          ) : null}
        </div>
      </Card>
    </Link>
  );
}

/**
 * LocationCard — city / locality tile.
 */
export interface LocationCardData {
  slug: string;
  name: string;
  city?: string;
  image: string;
  propertiesCount?: number;
  priceRange?: string;
}

export function LocationCard({ data, className }: { data: LocationCardData; className?: string }) {
  return (
    <Link
      to={`/localities/${data.slug}`}
      className={cn(
        "group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-luxury-card transition-transform duration-500 hover:-translate-y-1",
        className,
      )}
    >
      <img
        src={data.image}
        alt={data.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        {data.city ? (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">{data.city}</p>
        ) : null}
        <h3 className="mt-1 text-lg font-semibold tracking-tight">{data.name}</h3>
        <div className="mt-2 flex items-center justify-between text-xs text-white/80">
          {typeof data.propertiesCount === "number" ? <span>{data.propertiesCount} properties</span> : <span />}
          {data.priceRange ? <span className="tabular">{data.priceRange}</span> : null}
        </div>
      </div>
      <div className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-white group-hover:text-foreground">
        <MapPin className="size-4" />
      </div>
    </Link>
  );
}
