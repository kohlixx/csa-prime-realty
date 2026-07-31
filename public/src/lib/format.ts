/**
 * Formatting utilities. All display strings pass through here so we keep
 * one source of truth for INR, area, dates, etc.
 */

/** Format a number in Indian real-estate style: ₹1.85 Cr / ₹85 L / ₹42,000. */
export function formatINR(value: number, opts: { compact?: boolean } = {}): string {
  if (!Number.isFinite(value)) return "—";
  const compact = opts.compact ?? true;
  if (!compact || value < 1_00_000) {
    return `₹${new Intl.NumberFormat("en-IN").format(Math.round(value))}`;
  }
  if (value >= 1_00_00_000) {
    return `₹${trim(value / 1_00_00_000)} Cr`;
  }
  return `₹${trim(value / 1_00_000)} L`;
}

function trim(n: number): string {
  return n
    .toFixed(2)
    .replace(/\.?0+$/, "");
}

/** Price per sqft label. */
export function formatPricePerSqft(pricePerSqft: number): string {
  return `₹${new Intl.NumberFormat("en-IN").format(Math.round(pricePerSqft))} / sq.ft`;
}

/** Area with unit. */
export function formatArea(value: number, unit: "sqft" | "sqm" | "acre" = "sqft"): string {
  const map: Record<typeof unit, string> = { sqft: "sq.ft", sqm: "sq.m", acre: "acre" };
  return `${new Intl.NumberFormat("en-IN").format(Math.round(value))} ${map[unit]}`;
}

/** Truncate string to n characters, preserving word boundaries. */
export function truncate(text: string, n = 140): string {
  if (text.length <= n) return text;
  return `${text.slice(0, text.lastIndexOf(" ", n))}…`;
}

/** Reading time in minutes from an HTML/plaintext string. */
export function readingTime(input: string, wpm = 220): string {
  const words = input.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / wpm));
  return `${minutes} min read`;
}

/** Slugify a display string. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
