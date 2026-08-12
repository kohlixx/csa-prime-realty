import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, ArrowRight, ShieldCheck, MapPin, Play, CheckCircle, Gift, Sparkles, Building2 } from "lucide-react";
import {
  Navbar, Footer, Container, SectionHeader,
  FadeIn, SlideUp, Stagger, PropertyCard
} from "@/components/design-system";
import { NAV_ITEMS, SITE, FOOTER_COLUMNS, FEATURED_PROPERTIES, TOP_LOCATIONS } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [location, setLocation] = useState("Noida");
  const [propertyType, setPropertyType] = useState("apartment");

  // ==========================================
  // DYNAMIC FAVICON & TITLE SETUP
  // ==========================================
  useEffect(() => {
    document.title = "Crown Estate Realty | Luxury Homes & Commercial Assets in NCR";
    
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/favicon.jpg';
    link.type = 'image/jpeg';
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-white">
      {/* ============ NAVBAR ============ */}
      <Navbar items={NAV_ITEMS} phone={SITE.phone} />

      <main className="flex-1">

        {/* ============ FULL SEO OPTIMIZED HERO SECTION (CINEMATIC) ============ */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-black">

          {/* Background YouTube Video - 100% ORIGINAL COLORS */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.777778vh] min-w-full min-h-full h-[56.25vw] pointer-events-none">
              <iframe
                src="https://www.youtube-nocookie.com/embed/Tu588F-77rs?autoplay=1&mute=1&loop=1&playlist=Tu588F-77rs&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1"
                title="Crown Estate Realty Background Video"
                className="absolute inset-0 w-full h-full object-cover border-0 pointer-events-none scale-125"
                tabIndex={-1}
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
            {/* Soft dark transparent overlay so text is readable, but video colors POP */}
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
          </div>

          <Container className="relative z-20 my-auto">
            <div className="max-w-4xl mx-auto text-center">

              <FadeIn>
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/50 bg-black/60 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400 backdrop-blur-md mb-8 shadow-xl">
                  <Gift className="size-4" /> Special Housefull Offer Active Now
                </div>
              </FadeIn>

              {/* SEO Optimized Main Heading (White Text for Contrast) */}
              <SlideUp delay={0.1}>
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif text-white mb-6 tracking-tight leading-[1.1] drop-shadow-lg">
                  Extraordinary homes & properties in Noida, <br />
                  <span className="bg-gradient-to-r from-[#F5D78D] via-[#C5A059] to-[#E6CA85] bg-clip-text text-transparent">
                    quietly matched to you.
                  </span>
                </h1>
              </SlideUp>

              {/* SEO Rich Subtitle */}
              <SlideUp delay={0.2}>
                <p className="text-base sm:text-xl text-zinc-100 leading-relaxed font-light max-w-2xl mx-auto mb-10 drop-shadow-md">
                  Experience a private, invitation-grade approach to acquiring ultra-luxury residences, sky villas, and high-yield commercial assets across Noida, Greater Noida, and NCR.
                </p>
              </SlideUp>

              {/* Action Buttons */}
              <SlideUp delay={0.3}>
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                  <Link
                    to="/buy"
                    className="inline-flex items-center justify-center gap-3 bg-accent text-black font-bold text-sm px-8 py-4 rounded-full hover:bg-white transition-all duration-300 shadow-xl"
                  >
                    Explore Portfolio <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/properties/eternia-greater-noida"
                    className="inline-flex items-center justify-center gap-3 bg-black/60 border border-yellow-500/40 text-yellow-400 font-bold text-sm px-8 py-4 rounded-full backdrop-blur-md hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-lg"
                  >
                    <Gift className="size-4" /> Claim Eternia Housefull Offer
                  </Link>
                </div>
              </SlideUp>

              {/* Trust Metrics Bar - Dark Glass Effect */}
              <SlideUp delay={0.4}>
                <div className="grid grid-cols-3 gap-6 pt-6 pb-6 max-w-2xl mx-auto bg-black/40 backdrop-blur-xl px-6 rounded-3xl border border-white/10 shadow-2xl">
                  <div>
                    <p className="text-2xl sm:text-3xl font-serif text-white font-bold">₹1,500 Cr+</p>
                    <p className="text-[11px] text-zinc-300 uppercase tracking-widest mt-1">Properties Sold</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-serif text-white font-bold">500+</p>
                    <p className="text-[11px] text-zinc-300 uppercase tracking-widest mt-1">Happy Families</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-serif text-white font-bold">100%</p>
                    <p className="text-[11px] text-zinc-300 uppercase tracking-widest mt-1">Verified RERA</p>
                  </div>
                </div>
              </SlideUp>

            </div>
          </Container>
        </section>

        {/* ============ INTERACTIVE QUICK SEARCH BAR STRIP (WHITE & CREAM) ============ */}
        <section className="py-10 bg-background border-y border-border mb-12">
          <Container>
            <div className="max-w-4xl mx-auto bg-card rounded-3xl p-6 border border-border shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-6 items-center relative z-20 -mt-20">

              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Select Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-muted/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent cursor-pointer"
                >
                  <option value="Noida">Noida</option>
                  <option value="Greater Noida">Greater Noida</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Noida Extension">Noida Extension</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="bg-muted/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent cursor-pointer"
                >
                  <option value="apartment">Sky Villas & Apartments</option>
                  <option value="floor">Independent Floors</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="commercial">Commercial Assets</option>
                </select>
              </div>

              <div className="flex items-end justify-center sm:justify-end pt-2 sm:pt-0">
                <Link
                  to="/buy"
                  search={{ location: location, type: propertyType }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-xl hover:bg-primary transition-all text-sm shadow-md cursor-pointer"
                >
                  <Search className="size-4" /> Search Properties
                </Link>
              </div>

            </div>
          </Container>
        </section>

        {/* ============ NEW ETERNIA HOUSEFULL OFFER BANNER ============ */}
        <section className="py-12 bg-background">
          <Container>
            <div className="max-w-5xl mx-auto bg-card rounded-[2.5rem] border-2 border-yellow-500/40 p-8 md:p-12 shadow-luxury-xl relative overflow-hidden group">
              {/* Glow Effect */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-yellow-500/20 transition-all duration-700"></div>

              <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                {/* Image Thumbnail */}
                <div className="relative h-72 md:h-80 rounded-3xl overflow-hidden border border-border shadow-md">
                  <img
                    src="/eternia.jpg"
                    alt="Eternia Greater Noida West"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs uppercase tracking-widest bg-yellow-500 text-black font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Gift className="size-3" /> Housefull Offer
                    </span>
                    <span className="text-xs font-medium text-white shadow-sm">G+30 Towers</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest mb-2">
                      <ShieldCheck className="size-4" /> NBCC Monitored Project
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif text-primary font-bold flex items-center gap-3">
                      Eternia <Sparkles className="size-6 text-yellow-500" />
                    </h2>
                    <p className="text-secondary text-sm mt-2 leading-relaxed">
                      Techzone IV, Greater Noida West. 3 & 4 BHK spacious residences featuring a magnificent 25,000 sq.ft. clubhouse.
                    </p>
                  </div>

                  {/* Offer Highlights Grid */}
                  <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-2xl">
                    <p className="text-sm font-bold text-yellow-700 mb-3">Fully Loaded Homes @ ₹9,400/sq.ft.*</p>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                      <div className="flex items-start gap-2 text-xs text-foreground font-medium">
                        <CheckCircle className="size-4 text-yellow-600 flex-shrink-0" /> ACs in All Rooms
                      </div>
                      <div className="flex items-start gap-2 text-xs text-foreground font-medium">
                        <CheckCircle className="size-4 text-yellow-600 flex-shrink-0" /> Modular Kitchen
                      </div>
                      <div className="flex items-start gap-2 text-xs text-foreground font-medium">
                        <CheckCircle className="size-4 text-yellow-600 flex-shrink-0" /> 55" LED TV
                      </div>
                      <div className="flex items-start gap-2 text-xs text-foreground font-medium">
                        <CheckCircle className="size-4 text-yellow-600 flex-shrink-0" /> Wardrobes
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <Link
                      to="/properties/eternia-greater-noida"
                      className="inline-flex items-center justify-center gap-3 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 text-sm shadow-md cursor-pointer w-full sm:w-auto"
                    >
                      View Complete Offer Details <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ============ FEATURED DREAM VALLEY PHASE 2 BANNER CARD ============ */}
        <section className="py-8 bg-background">
          <Container>
            <div className="max-w-5xl mx-auto bg-card rounded-[2.5rem] border border-border p-8 md:p-12 shadow-luxury-xl relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/10 transition-all duration-700"></div>

              <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                <div className="relative h-72 md:h-80 rounded-3xl overflow-hidden border border-border shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000"
                    alt="Dream Valley Phase 2"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs uppercase tracking-widest bg-accent text-white font-bold px-3 py-1 rounded-full">
                      Supreme Court Monitored
                    </span>
                    <span className="text-xs font-medium text-white shadow-sm">50 Acres Township</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest mb-2">
                      <ShieldCheck className="size-4" /> Executed Through NBCC (India) Ltd
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif text-primary font-bold">Dream Valley Phase 2</h2>
                    <p className="text-secondary text-sm mt-2 leading-relaxed">
                      Techzone IV, Greater Noida West. Ultra-modern residential township offering 1, 2 & 3 BHK luxury apartments with world-class amenities and green landscapes.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                      <CheckCircle className="size-4 text-accent flex-shrink-0" />
                      <span>Size: 585 - 1,715 sq.ft.</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                      <CheckCircle className="size-4 text-accent flex-shrink-0" />
                      <span>Vaastu Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                      <CheckCircle className="size-4 text-accent flex-shrink-0" />
                      <span>Clubhouse & Pool</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                      <CheckCircle className="size-4 text-accent flex-shrink-0" />
                      <span>Near Yatharth Hospital</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      to="/properties/dream-valley-phase-2"
                      className="inline-flex items-center justify-center gap-3 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-accent transition-all duration-300 text-sm shadow-md cursor-pointer"
                    >
                      View Complete Project Details <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ============ FEATURED PROPERTIES ============ */}
        <section className="py-16">
          <Container>
            <SectionHeader
              align="left"
              eyebrow="Exclusive Portfolio"
              title="Handpicked Residences"
              description="Explore verified luxury properties currently available for acquisition."
            />

            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {FEATURED_PROPERTIES.slice(0, 3).map((property) => (
                <PropertyCard key={property.slug} data={property} />
              ))}
            </Stagger>

            <div className="text-center mt-12">
              <Link
                to="/buy"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary hover:text-accent transition-colors"
              >
                View All Properties <ArrowRight className="size-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ============ TOP MICRO-MARKETS ============ */}
        <section className="py-20 bg-muted/30 border-t border-border">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3 block">Prime Locations</span>
              <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">Invest in NCR's Best Corridors</h2>
              <p className="text-secondary font-light">High-growth micro-markets offering unmatched rental yields and capital appreciation.</p>
            </div>

            <Stagger className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {TOP_LOCATIONS.map((loc, idx) => (
                <div key={idx} className="group relative h-64 md:h-80 rounded-[2rem] overflow-hidden border border-border cursor-pointer shadow-md hover:shadow-xl transition-all duration-500">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="size-3.5 text-accent" />
                      <span className="text-xs uppercase tracking-widest text-white/80">{loc.city}</span>
                    </div>
                    <h3 className="text-2xl font-serif mb-1 group-hover:text-accent transition-colors">{loc.name}</h3>
                    <p className="text-accent text-xs font-bold tracking-wider">{loc.priceRange}</p>
                  </div>
                </div>
              ))}
            </Stagger>
          </Container>
        </section>

      </main>

      {/* ============ FOOTER ============ */}
      <Footer columns={FOOTER_COLUMNS} phone={SITE.phone} email={SITE.email} address={SITE.address} socials={[]} />
    </div>
  );
}