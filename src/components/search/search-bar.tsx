import * as React from "react";
import { Search, MapPin, Building2, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * SearchBar — hero search bar for properties.
 * Presentational only; page code wires it to the search route/store.
 *
 * Variants:
 *  - hero       Large, glassy, for hero sections
 *  - inline     Compact for sub-pages
 *  - minimal    Icon + input, for headers
 */

export interface SearchBarProps {
  variant?: "hero" | "inline" | "minimal";
  onSubmit?: (query: { q: string; city?: string; type?: string }) => void;
  cities?: string[];
  types?: string[];
  defaultQuery?: string;
  defaultCity?: string;
  defaultType?: string;
  className?: string;
}

export function SearchBar({
  variant = "hero",
  onSubmit,
  cities,
  types,
  defaultQuery = "",
  defaultCity,
  defaultType,
  className,
}: SearchBarProps) {
  const [q, setQ] = React.useState(defaultQuery);
  const [city, setCity] = React.useState(defaultCity ?? "");
  const [type, setType] = React.useState(defaultType ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ q, city: city || undefined, type: type || undefined });
  };

  if (variant === "minimal") {
    return (
      <form
        onSubmit={submit}
        className={cn(
          "flex h-11 items-center gap-2 rounded-full border border-border bg-background px-4 shadow-luxury-xs",
          className,
        )}
      >
        <Search className="size-4 text-text-tertiary" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search properties, projects…"
          className="flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-text-tertiary"
          aria-label="Search"
        />
        {q ? (
          <button type="button" onClick={() => setQ("")} className="text-text-tertiary hover:text-foreground" aria-label="Clear">
            <X className="size-4" />
          </button>
        ) : null}
      </form>
    );
  }

  if (variant === "inline") {
    return (
      <form
        onSubmit={submit}
        className={cn(
          "flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-luxury-card sm:flex-row sm:items-center",
          className,
        )}
      >
        <div className="flex flex-1 items-center gap-2 px-3">
          <Search className="size-4 text-text-tertiary" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Locality, project or landmark"
            className="h-11 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-text-tertiary"
            aria-label="Search"
          />
        </div>
        <Button type="submit" size="default" leftIcon={<Search />}>Search</Button>
      </form>
    );
  }

  // hero
  return (
    <form
      onSubmit={submit}
      className={cn(
        "grid gap-2 rounded-3xl border border-border bg-card p-2 shadow-luxury-elevated",
        "sm:grid-cols-[1fr_auto_1fr_auto_auto] sm:items-center sm:gap-0",
        className,
      )}
    >
      <div className="flex items-center gap-2 rounded-2xl px-4 py-2 sm:py-3">
        <MapPin className="size-4 text-text-tertiary" />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City"
          className="h-9 w-full border-0 bg-transparent text-sm text-foreground outline-none"
        >
          <option value="">All cities</option>
          {cities?.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <span className="mx-1 hidden h-8 w-px bg-border sm:block" />
      <div className="flex items-center gap-2 rounded-2xl px-4 py-2 sm:py-3">
        <Building2 className="size-4 text-text-tertiary" />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Type"
          className="h-9 w-full border-0 bg-transparent text-sm text-foreground outline-none"
        >
          <option value="">Any type</option>
          {types?.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <span className="mx-1 hidden h-8 w-px bg-border sm:block" />
      <div className="flex items-center gap-2 rounded-2xl px-4 py-2 sm:py-3">
        <Search className="size-4 text-text-tertiary" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="BHK, project, developer…"
          className="h-9 w-full border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-text-tertiary"
          aria-label="Query"
        />
      </div>
      <div className="flex items-center gap-2 p-1 sm:p-0 sm:pl-2 sm:pr-1">
        <Button type="button" variant="ghost" size="icon" aria-label="More filters">
          <SlidersHorizontal />
        </Button>
        <Button type="submit" size="lg" variant="default">
          <Search /> Search
        </Button>
      </div>
    </form>
  );
}
