import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Search, ChevronDown, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export interface NavMegaColumn {
  heading: string;
  links: { label: string; href: string; description?: string; icon?: React.ReactNode }[];
}

export interface NavItem {
  label: string;
  href?: string;
  mega?: NavMegaColumn[];
  featured?: { title: string; description: string; href: string; image?: string };
}

export interface NavbarProps {
  brand?: React.ReactNode;
  items: NavItem[];
  cta?: React.ReactNode;
  phone?: string;
  className?: string;
}

export function Navbar({ brand, items, cta, phone, className }: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [openMega, setOpenMega] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "glass-nav shadow-luxury-xs" : "bg-transparent",
        className,
      )}
    >
      <Container variant="wide">
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
          {/* Brand */}
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5" aria-label="CSA Prime Realty">
              {brand ?? <BrandMark />}
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMega(null)}>
            {items.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setOpenMega(item.mega ? item.label : null)}>
                {item.mega ? (
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/85 transition-colors hover:text-foreground",
                      openMega === item.label && "text-foreground",
                    )}
                    aria-expanded={openMega === item.label}
                  >
                    {item.label}
                    <ChevronDown className={cn("size-3.5 transition-transform", openMega === item.label && "rotate-180")} />
                  </button>
                ) : (
                  <Link
                    to={item.href ?? "/"}
                    className="rounded-full px-4 py-2 text-sm font-medium text-foreground/85 transition-colors hover:text-foreground"
                    activeProps={{ className: "text-foreground" }}
                  >
                    {item.label}
                  </Link>
                )}

                {item.mega && openMega === item.label ? (
                  <div className="absolute left-1/2 top-full z-20 pt-3" style={{ transform: "translateX(-50%)" }}>
                    <MegaPanel columns={item.mega} featured={item.featured} />
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {phone ? (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground xl:inline-flex"
              >
                <Phone className="size-4 text-accent" /> {phone}
              </a>
            ) : null}
            <Button variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="Search">
              <Search />
            </Button>
            <div className="hidden lg:block">{cta ?? <Button variant="default">Enquire</Button>}</div>

            {/* Mobile trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  {mobileOpen ? <X /> : <Menu />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm p-0">
                <MobileMenu items={items} phone={phone} onNavigate={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}

// --------------------------------------------------------
// YAHAN AAPKA NAYA LOGO LAGAYA GAYA HAI (Image Tag)
// --------------------------------------------------------
function BrandMark() {
  return (
    <div className="flex items-center py-1">
      <img 
        src="/logo.png" 
        alt="CSA Prime Realty" 
        className="h-16 md:h-24 w-auto max-w-none object-contain scale-125 origin-left transition-transform duration-300 hover:scale-135" 
      />
    </div>
  );
}

function MegaPanel({ columns, featured }: { columns: NavMegaColumn[]; featured?: NavItem["featured"] }) {
  return (
    <div className="w-[min(90vw,64rem)] rounded-3xl border border-border bg-popover p-6 shadow-luxury-elevated">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1fr_1.1fr]">
        {columns.map((col) => (
          <div key={col.heading} className="min-w-0">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">{col.heading}</p>
            <ul className="space-y-1">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="group flex items-start gap-3 rounded-xl p-2.5 -mx-2 transition-colors hover:bg-surface-muted"
                  >
                    {l.icon ? (
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent [&_svg]:size-4">
                        {l.icon}
                      </span>
                    ) : null}
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">{l.label}</span>
                      {l.description ? (
                        <span className="mt-0.5 block text-xs text-text-secondary">{l.description}</span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {featured ? (
          <Link
            to={featured.href}
            className="relative overflow-hidden rounded-2xl bg-luxury p-6 text-white shadow-luxury-md"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">Featured</p>
            <p className="mt-3 text-lg font-semibold tracking-tight text-balance">{featured.title}</p>
            <p className="mt-2 text-sm text-white/70">{featured.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
              Explore <span aria-hidden>→</span>
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function MobileMenu({
  items,
  phone,
  onNavigate,
}: {
  items: NavItem[];
  phone?: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <BrandMark />
      </div>
      <nav className="flex-1 overflow-y-auto px-5 py-6">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.label}>
              {item.mega ? (
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-foreground hover:bg-surface-muted">
                    {item.label}
                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="mt-1 space-y-0.5 pl-2">
                    {item.mega.flatMap((c) => c.links).map((l) => (
                      <li key={l.label}>
                        <Link
                          to={l.href}
                          onClick={onNavigate}
                          className="block rounded-lg px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-muted hover:text-foreground"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link
                  to={item.href ?? "/"}
                  onClick={onNavigate}
                  className="block rounded-xl px-4 py-3 text-[15px] font-medium text-foreground hover:bg-surface-muted"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="space-y-3 border-t border-border p-5">
        {phone ? (
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-3 rounded-xl bg-surface-muted p-3.5 text-sm font-medium text-foreground"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Phone className="size-4" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">Call us</span>
              <span>{phone}</span>
            </span>
          </a>
        ) : null}
        <Button className="w-full" size="lg">
          <MapPin className="mr-1" /> Schedule a site visit
        </Button>
      </div>
    </div>
  );
}