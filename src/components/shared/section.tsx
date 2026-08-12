import * as React from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "./container";

/**
 * Section — vertical rhythm wrapper. Provides consistent section padding,
 * optional muted / hero background, and a Container inside.
 */
type Tone = "default" | "muted" | "inverted" | "hero";
type Spacing = "sm" | "md" | "lg";

const toneClass: Record<Tone, string> = {
  default:  "bg-background text-foreground",
  muted:    "bg-surface-muted text-foreground",
  inverted: "bg-primary text-primary-foreground",
  hero:     "bg-hero text-foreground",
};

const spacingClass: Record<Spacing, string> = {
  sm: "section-y-sm",
  md: "section-y",
  lg: "section-y-lg",
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: Tone;
  spacing?: Spacing;
  container?: false | ContainerProps["variant"];
  as?: React.ElementType;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { as: Tag = "section", tone = "default", spacing = "md", container = "default", className, children, ...props },
    ref,
  ) => (
    <Tag
      ref={ref as never}
      className={cn(toneClass[tone], spacingClass[spacing], "relative", className)}
      {...props}
    >
      {container === false ? children : <Container variant={container}>{children}</Container>}
    </Tag>
  ),
);
Section.displayName = "Section";

/**
 * SectionHeader — eyebrow, title, and description with luxury type scale.
 */
export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  action?: React.ReactNode;
}

const titleSize: Record<NonNullable<SectionHeaderProps["size"]>, string> = {
  sm: "text-2xl sm:text-3xl",
  md: "text-3xl sm:text-4xl lg:text-5xl",
  lg: "text-4xl sm:text-5xl lg:text-6xl",
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  size = "md",
  action,
  className,
  ...props
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCenter ? "items-center text-center" : "items-start",
        action && !isCenter && "sm:flex-row sm:items-end sm:justify-between",
        "mb-10 sm:mb-14",
        className,
      )}
      {...props}
    >
      <div className={cn("max-w-3xl", isCenter && "mx-auto")}>
        {eyebrow ? (
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent/50" />
            {eyebrow}
          </div>
        ) : null}
        <h2
          className={cn(
            "font-semibold text-balance tracking-tight text-foreground",
            titleSize[size],
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base sm:text-lg text-text-secondary text-pretty leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
