import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer, Container } from "@/components/design-system";
import { NAV_ITEMS, SITE, FOOTER_COLUMNS } from "@/lib/site-data";
import { ShieldCheck, MapPin, Phone, CheckCircle } from "lucide-react";

// Yahan path "/properties/dream-valley-phase-2" kar diya gaya hai
export const Route = createFileRoute("/dream-valley-phase-2")({
  component: DreamValleyDetailPage,
  head: () => ({
    meta: [
      { title: "Dream Valley Phase 2 Greater Noida West | NBCC Luxury Apartments" },
      { name: "description", content: "Explore Dream Valley Phase 2 in Techzone IV, Greater Noida West. Supreme Court monitored RERA-approved 1, 2 & 3 BHK luxury apartments executed through NBCC (India) Ltd." },
    ],
  }),
});

function DreamValleyDetailPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-black">
      <Navbar items={NAV_ITEMS} phone={SITE.phone} />

      <main className="flex-1 pt-28 pb-20">
        
        {/* ============ HERO SECTION ============ */}
        <Container className="mb-12">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-border/80 shadow-luxury-xl bg-card p-8 md:p-16">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600" 
                alt="Dream Valley Phase 2 Greater Noida West Luxury Apartments" 
                className="w-full h-full object-cover filter brightness-[0.45]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-3xl text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent backdrop-blur-md mb-6 shadow-lg">
                <ShieldCheck className="size-4" /> Supreme Court Monitored Project • Executed Through NBCC (India) Ltd
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-serif font-bold mb-4 tracking-tight">
                Dream Valley Phase 2 – Luxury Apartments in Greater Noida West
              </h1>
              <p className="text-zinc-300 text-base sm:text-xl font-light mb-8 leading-relaxed">
                Plot No. GH-09, Sector - Techzone IV, Greater Noida West • 1, 2 & 3 BHK Luxury Residences (585 - 1,715 sq.ft.)
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="https://wa.me/919511811326?text=Hello%20CSA%20Prime%20Realty,%20I%20want%20complete%20brochure%20and%20price%20list%20for%20Dream%20Valley%20Phase%202."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-accent text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-all text-sm shadow-xl"
                >
                  <Phone className="size-4" /> Connect via WhatsApp for Best Deal
                </a>
              </div>
            </div>
          </div>
        </Container>

        {/* ============ DETAILS CONTENT ============ */}
        <Container className="mb-16">
          <div className="grid lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-12">
              
              <div className="bg-card border border-border p-8 md:p-10 rounded-3xl shadow-luxury-sm">
                <h2 className="text-2xl sm:text-3xl font-serif mb-6 text-foreground">About Dream Valley Phase 2 Township</h2>
                <p className="text-muted-foreground leading-relaxed font-light mb-6">
                  An ultra-modern residential township located in Techzone IV, Greater Noida West and spread across a vast expanse of 50 acres within a 64-acre master development, covered with lush landscaped greens and replete with world-class amenities and high-tech features. Featuring Vaastu compliant spacious residences and state-of-the-art sports facilities.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Project Area</span>
                    <p className="text-lg font-serif font-bold text-foreground">50 Acres</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Unit Types</span>
                    <p className="text-lg font-serif font-bold text-foreground">1, 2 & 3 BHK</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Size Range</span>
                    <p className="text-lg font-serif font-bold text-foreground">585 - 1,715 sq.ft.</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Helpline</span>
                    <p className="text-lg font-serif font-bold text-foreground">011-4084 8011</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-8 md:p-10 rounded-3xl shadow-luxury-sm">
                <h3 className="text-2xl font-serif mb-6 text-foreground">Apartment Configurations & Sizes</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { type: "1 BHK Apartment", size: "585 sq.ft. (Type-1 & Type-2)" },
                    { type: "2 BHK + 2 Toilet", size: "805 sq.ft." },
                    { type: "2 BHK + 2T + Study", size: "920 sq.ft." },
                    { type: "3 BHK + 2 Toilet", size: "1,045 sq.ft." },
                    { type: "2 BHK + 2 Toilet (Large)", size: "1,115 sq.ft." },
                    { type: "2 BHK + 2T + Study", size: "1,215 sq.ft." },
                    { type: "3 BHK + 2 Toilet", size: "1,360 sq.ft." },
                    { type: "3 BHK + 3 Toilet", size: "1,530 sq.ft." },
                    { type: "3 BHK + 3T + Servant", size: "1,715 sq.ft." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-surface-muted border border-border">
                      <span className="font-medium text-sm text-foreground">{item.type}</span>
                      <span className="text-xs font-bold text-accent">{item.size}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border p-8 md:p-10 rounded-3xl shadow-luxury-sm">
                <h3 className="text-2xl font-serif mb-6 text-foreground">World-Class Amenities & Features</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    "Clubhouse", "Gymnasium", "Swimming Pool", 
                    "Badminton Court", "Basketball Court", "Lawn Tennis Court", 
                    "Community Hall", "Garbage Disposal", "Amphitheatre",
                    "Healthcare & Nursing Home", "Meditation Centre", "Kids Zone",
                    "Leisure Area", "Milk & Egg Booth"
                  ].map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-surface-muted border border-border/50 text-sm text-muted-foreground">
                      <CheckCircle className="size-4 text-accent flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-card border border-border p-8 rounded-3xl shadow-luxury-lg space-y-6">
                
                <div className="text-center pb-6 border-b border-border">
                  <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-1">Direct Deal</span>
                  <h3 className="text-2xl font-serif text-foreground">Dream Valley Phase 2</h3>
                  <p className="text-xs text-muted-foreground mt-1">Supreme Court Monitored Project</p>
                </div>

                <div className="space-y-4 pt-2">
                  <a 
                    href="https://wa.me/919511811326?text=Hello%20CSA%20Prime%20Realty,%20I%20want%20to%20deal%20in%20Dream%20Valley%20Phase%202.%20Please%20share%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-4 px-6 rounded-2xl hover:bg-emerald-500 transition-all text-sm shadow-xl"
                  >
                    Chat on WhatsApp Now
                  </a>
                  <a 
                    href="tel:919511811326"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 px-6 rounded-2xl hover:bg-primary/90 transition-all text-sm shadow-xl"
                  >
                    <Phone className="size-4" /> Call: +91 95118 11326
                  </a>
                </div>

              </div>
            </div>

          </div>
        </Container>

      </main>

      <Footer columns={FOOTER_COLUMNS} phone={SITE.phone} email={SITE.email} address={SITE.address} socials={[]} />
    </div>
  );
}