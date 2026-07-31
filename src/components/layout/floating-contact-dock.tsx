import * as React from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * FloatingContactDock — bottom-right floating actions.
 * Renders Call + WhatsApp + BackToTop with pulse rings, glassmorphic.
 * Phone/WhatsApp come from CMS/settings — pass via props.
 */

export interface FloatingContactDockProps {
  phone?: string;
  whatsapp?: string;
  whatsappMessage?: string;
  className?: string;
}

export function FloatingContactDock({
  phone,
  whatsapp,
  whatsappMessage = "Hi, I'm interested in a property listed on CSA Prime Realty.",
  className,
}: FloatingContactDockProps) {
  const [showTop, setShowTop] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cleanWa = whatsapp?.replace(/\D/g, "");

  return (
    <div
      className={cn(
        "fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6",
        className,
      )}
      role="complementary"
      aria-label="Quick contact"
    >
      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid size-11 place-items-center rounded-full glass-strong text-foreground shadow-luxury-md transition-transform hover:-translate-y-0.5"
        >
          <ArrowUp className="size-4" />
        </button>
      ) : null}

      {whatsapp ? (
        <a
          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-luxury-elevated animate-pulse-whatsapp transition-transform hover:scale-105"
        >
          <MessageCircle className="size-6" />
          <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-luxury-md transition-opacity duration-200 group-hover:opacity-100">
            Chat on WhatsApp
          </span>
        </a>
      ) : null}

      {phone ? (
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          aria-label="Call us"
          className="group relative grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-luxury-elevated animate-pulse-ring transition-transform hover:scale-105"
        >
          <Phone className="size-5" />
          <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-luxury-md transition-opacity duration-200 group-hover:opacity-100">
            {phone}
          </span>
        </a>
      ) : null}
    </div>
  );
}
