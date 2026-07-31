import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Bed, Bath, Maximize2, MapPin, Heart, Share2, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * PropertyCard — the workhorse listing card.
 * Purely presentational, all data injected via props (never fetched inside).
 *
 * Variants:
 *  - grid    Portrait card for grids (default)
 *  - horizontal   Wide card for search results / lists
 *  - compact Small dense card for shortlists/tooltips
 */

export interface PropertyCardData {
  slug: string;
  title: string;
  price: string;              // pre-formatted (e.g. "₹1.85 Cr")
  pricePerSqft?: string;
  configuration?: string;     // e.g. "3 BHK"
  bedrooms?: number;
  bathrooms?: number;
  area?: string;              // e.g. "1,650 sq.ft"
  location: string;           // "Sector 150, Noida"
  image: string;
  imageAlt?: string;
  photoCount?: number;
  badges?: { label: string; tone?: "accent" | "success" | "warning" | "premium" | "default" }[];
  developer?: string;
  possession?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onShare?: () => void;
  href?: string;              // override auto-generated route
}

export interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: PropertyCardData;
  variant?: "grid" | "horizontal" | "compact";
}

export function PropertyCard({ data, variant = "grid", className, ...props }: PropertyCardProps) {
  const href = data.href ?? `/properties/${data.slug}`;

  if (variant === "compact") return <CompactCard data={data} href={href} className={className} {...props} />;
  if (variant === "horizontal") return <HorizontalCard data={data} href={href} className={className} {...props} />;

  return (
    <Card
      variant="default"
      radius="lg"
      interactive
      className={cn("group flex-col", className)}
      {...props}
    >
      <div className="relative">
        <Link to={href} className="block">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-muted">
            <img
              src={data.image}
              alt={data.imageAlt ?? data.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-90" />
          </div>
        </Link>

        {/* Top-left badges */}
        {data.badges?.length ? (
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            {data.badges.map((b) => (
              <Badge
                key={b.label}
                variant={b.tone === "default" ? "glass" : (b.tone ?? "premium")}
                size="sm"
              >
                {b.label}
              </Badge>
            ))}
          </div>
        ) : null}

        {/* Top-right actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            aria-label={data.isFavorite ? "Remove from shortlist" : "Add to shortlist"}
            onClick={data.onFavoriteToggle}
            className="grid size-9 place-items-center rounded-full bg-white/90 text-foreground shadow-luxury-sm backdrop-blur transition-colors hover:bg-white"
          >
            <Heart className={cn("size-4", data.isFavorite && "fill-danger text-danger")} />
          </button>
          <button
            type="button"
            aria-label="Share"
            onClick={data.onShare}
            className="grid size-9 place-items-center rounded-full bg-white/90 text-foreground shadow-luxury-sm backdrop-blur transition-colors hover:bg-white"
          >
            <Share2 className="size-4" />
          </button>
        </div>

        {/* Bottom-left location + photos */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-medium">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{data.location}</span>
          </div>
          {data.photoCount ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-[11px] font-medium backdrop-blur">
              <Camera className="size-3" /> {data.photoCount}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="min-w-0">
          {data.developer ? (
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
              {data.developer}
            </p>
          ) : null}
          <Link to={href}>
            <h3 className="mt-1 line-clamp-1 text-[17px] font-semibold tracking-tight text-foreground group-hover:text-accent">
              {data.title}
            </h3>
          </Link>
        </div>

        {(data.bedrooms || data.bathrooms || data.area) ? (
          <ul className="flex flex-wrap items-center gap-4 text-[13px] text-text-secondary">
            {data.configuration ? (
              <li className="font-medium text-foreground">{data.configuration}</li>
            ) : data.bedrooms ? (
              <li className="inline-flex items-center gap-1.5">
                <Bed className="size-3.5" /> {data.bedrooms} Beds
              </li>
            ) : null}
            {data.bathrooms ? (
              <li className="inline-flex items-center gap-1.5">
                <Bath className="size-3.5" /> {data.bathrooms} Baths
              </li>
            ) : null}
            {data.area ? (
              <li className="inline-flex items-center gap-1.5">
                <Maximize2 className="size-3.5" /> {data.area}
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4">
          <div className="min-w-0">
            <p className="text-lg font-semibold tracking-tight text-foreground tabular">{data.price}</p>
            {data.pricePerSqft ? (
              <p className="text-xs text-text-tertiary">{data.pricePerSqft}</p>
            ) : null}
          </div>
          <Button asChild size="sm" variant="subtle" className="shrink-0">
            <Link to={href}>View details</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function HorizontalCard({
  data,
  href,
  className,
  ...props
}: { data: PropertyCardData; href: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card variant="default" radius="lg" interactive className={cn("group flex-row flex-col sm:flex-row", className)} {...props}>
      <Link to={href} className="relative block sm:w-[38%] sm:min-w-[280px]">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-muted sm:aspect-auto sm:h-full">
          <img
            src={data.image}
            alt={data.imageAlt ?? data.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
          {data.badges?.length ? (
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {data.badges.map((b) => (
                <Badge key={b.label} variant={b.tone === "default" ? "glass" : (b.tone ?? "premium")} size="sm">
                  {b.label}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        {data.developer ? (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">{data.developer}</p>
        ) : null}
        <Link to={href}>
          <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent">
            {data.title}
          </h3>
        </Link>
        <p className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
          <MapPin className="size-3.5" /> {data.location}
        </p>
        <ul className="flex flex-wrap items-center gap-4 text-[13px] text-text-secondary">
          {data.configuration ? <li className="font-medium text-foreground">{data.configuration}</li> : null}
          {data.bathrooms ? <li className="inline-flex items-center gap-1.5"><Bath className="size-3.5" /> {data.bathrooms}</li> : null}
          {data.area ? <li className="inline-flex items-center gap-1.5"><Maximize2 className="size-3.5" /> {data.area}</li> : null}
          {data.possession ? <li>Possession: {data.possession}</li> : null}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-xl font-semibold tracking-tight text-foreground tabular">{data.price}</p>
            {data.pricePerSqft ? <p className="text-xs text-text-tertiary">{data.pricePerSqft}</p> : null}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Enquire</Button>
            <Button asChild size="sm" variant="default">
              <Link to={href}>View</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CompactCard({
  data,
  href,
  className,
}: { data: PropertyCardData; href: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Link
      to={href}
      className={cn(
        "group flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5 pr-4 shadow-luxury-xs transition-shadow hover:shadow-luxury-md",
        className,
      )}
    >
      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
        <img src={data.image} alt={data.imageAlt ?? data.title} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground group-hover:text-accent">{data.title}</p>
        <p className="truncate text-xs text-text-secondary">{data.location}</p>
      </div>
      <p className="text-sm font-semibold tracking-tight text-foreground tabular">{data.price}</p>
    </Link>
  );
}
