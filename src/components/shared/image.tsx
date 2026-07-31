import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Image — luxury image primitive with:
 *  - Aspect ratio box (no CLS)
 *  - Blur/skeleton placeholder
 *  - Lazy loading + async decoding
 *  - Optional rounded/glass frame
 *  - onError fallback surface
 *
 * Wire src/srcSet from lib/image.ts (Supabase transforms) in feature code;
 * this component stays presentational.
 */

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspect?: "square" | "video" | "portrait" | "landscape" | "4/3" | "3/4" | "16/10";
  radius?: "none" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  wrapperClassName?: string;
  blurhash?: string;         // optional inline data URI or CSS gradient
  eager?: boolean;
}

const aspectClass = {
  square:    "aspect-square",
  video:     "aspect-video",
  portrait:  "aspect-[3/4]",
  landscape: "aspect-[16/9]",
  "4/3":     "aspect-[4/3]",
  "3/4":     "aspect-[3/4]",
  "16/10":   "aspect-[16/10]",
};

const radiusClass = {
  none: "rounded-none",
  md:   "rounded-xl",
  lg:   "rounded-2xl",
  xl:   "rounded-3xl",
  "2xl":"rounded-[2rem]",
  "3xl":"rounded-[2.5rem]",
  full: "rounded-full",
};

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ aspect = "landscape", radius = "lg", wrapperClassName, blurhash, className, eager, alt, onLoad, ...props }, ref) => {
    const [loaded, setLoaded] = React.useState(false);
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-surface-muted",
          aspectClass[aspect],
          radiusClass[radius],
          wrapperClassName,
        )}
        style={blurhash ? { backgroundImage: blurhash } : undefined}
      >
        {!loaded ? <div className="absolute inset-0 shimmer" /> : null}
        <img
          ref={ref}
          alt={alt ?? ""}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={(e) => { setLoaded(true); onLoad?.(e); }}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Image.displayName = "Image";
