import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE } from "@/lib/site-data";

/**
 * Footer — premium footer with newsletter, columns, legal strip.
 * Column data comes from settings/CMS; never hardcoded.
 */

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}

export interface FooterProps {
  columns: FooterColumn[];
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  socials?: { platform: "facebook" | "instagram" | "linkedin" | "youtube" | "twitter"; href: string }[];
  className?: string;
}

const socialIcon = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
};

export function Footer({ columns, phone, email, address, socials, className }: FooterProps) {
  return (
    <footer className={cn("relative overflow-hidden bg-primary text-primary-foreground", className)}>
      <Container variant="wide" className="section-y">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand + newsletter */}
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-white backdrop-blur">
                <span className="text-[10px] font-semibold tracking-tight uppercase">Crown</span>
              </span>
              <div className="leading-tight">
                <div className="text-base font-semibold tracking-tight">{SITE.brand}</div>
                <div className="text-[11px] font-medium uppercase tracking-widest text-white/60">Noida · Greater Noida</div>
              </div>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-white/70 text-pretty">
              {SITE.description}
            </p>

            <form
              className="mt-8 flex w-full max-w-md items-center gap-2 rounded-full bg-white/10 p-1.5 backdrop-blur"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Subscribe to updates"
            >
              <Input
                type="email"
                placeholder="Your email for launch alerts"
                className="h-10 flex-1 rounded-full border-transparent bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0"
              />
              <Button variant="accent" size="sm" className="rounded-full">Subscribe</Button>
            </form>

            <div className="mt-8 space-y-3 text-sm text-white/70">
              {phone ? (
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="flex items-center gap-2.5 hover:text-white">
                  <Phone className="size-4" /> {phone}
                </a>
              ) : null}
              {email ? (
                <a href={`mailto:${email}`} className="flex items-center gap-2.5 hover:text-white">
                  <Mail className="size-4" /> {email}
                </a>
              ) : null}
              {address ? (
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0" /> <span>{address}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50">{col.heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.external ? (
                        <a
                          href={l.href}
                          className="text-sm text-white/80 transition-colors hover:text-white"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link to={l.href} className="text-sm text-white/80 transition-colors hover:text-white">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {SITE.brand}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials?.map((s) => {
              const Icon = socialIcon[s.platform];
              return (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.platform}
                  className="grid size-9 place-items-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}