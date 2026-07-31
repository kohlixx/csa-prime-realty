import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ArrowRight, ShieldCheck, Sparkles, MapPin, Star, TrendingUp, Play, Building2, CheckCircle } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-black">
      {/* ============ NAVBAR ============ */}
      <Navbar items={NAV_ITEMS} phone={SITE.phone} />

      <main className="flex-1">

        {/* ============ FULL SEO OPTIMIZED HERO SECTION ============ */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-zinc-950">

          {/* Background YouTube Video */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.777778vh] min-w-full min-h-full h-[56.25vw] pointer-events-none">
              <iframe
                src="https://www.youtube-nocookie.com/embed/Tu588F-77rs?autoplay=1&mute=1&loop=1&playlist=Tu588F-77rs&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1"
                title="CSA Prime Realty Background Video"
                className="absolute inset-0 w-full h-full object-cover border-0 pointer-events-none scale-125"
                tabIndex={-1}
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
            {/* Perfect dark overlay so text is 100% readable */}
            <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
          </div>

          <Container className="relative z-20 my-auto">
            <div className="max-w-4xl mx-auto text-center">

              <FadeIn>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent backdrop-blur-md mb-8 shadow-xl">
                  <ShieldCheck className="size-4" /> Trusted RERA Channel Partner • Noida & NCR
                </div>
              </FadeIn>

              {/* SEO Optimized Main Heading */}
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
                <p className="text-base sm:text-xl text-zinc-200 leading-relaxed font-light max-w-2xl mx-auto mb-10 drop-shadow-md">
                  Experience a private, invitation-grade approach to acquiring ultra-luxury residences, sky villas, and high-yield commercial assets across Noida, Greater Noida, and NCR.
                </p>
              </SlideUp>

              {/* Action Buttons */}
              <SlideUp delay={0.3}>
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                  <Link
                    to="/buy"
                    className="inline-flex items-center justify-center gap-3 bg-accent text-black font-bold text-sm px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl"
                  >
                    Explore Portfolio <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/properties/dream-valley-phase-2"
                    className="inline-flex items-center justify-center gap-3 bg-emerald-600/90 border border-emerald-400/40 text-white font-medium text-sm px-8 py-4 rounded-full backdrop-blur-md hover:bg-emerald-500 transition-all duration-300 shadow-2xl"
                  >
                    <Play className="size-3.5 fill-white" /> View Flagship Project
                  </Link>
                </div>
              </SlideUp>

              {/* Trust Metrics Bar */}
              <SlideUp delay={0.4}>
                <div className="grid grid-cols-3 gap-6 pt-6 pb-6 max-w-2xl mx-auto bg-black/50 backdrop-blur-xl px-6 rounded-3xl border border-white/20 shadow-2xl">
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

        {/* ============ INTERACTIVE QUICK SEARCH BAR STRIP ============ */}
        <section className="py-10 bg-zinc-950 border-y border-white/5 mb-12">
          <Container>
            <div className="max-w-4xl mx-auto bg-[#0a0a0a] rounded-3xl p-6 border border-white/10 shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">

              {/* Location Select Dropdown */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-1">Select Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent cursor-pointer"
                >
                  <option value="Noida">Noida</option>
                  <option value="Greater Noida">Greater Noida</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Noida Extension">Noida Extension</option>
                </select>
              </div>

              {/* Property Type Select Dropdown */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-1">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent cursor-pointer"
                >
                  <option value="apartment">Sky Villas & Apartments</option>
                  <option value="floor">Independent Floors</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="commercial">Commercial Assets</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end justify-center sm:justify-end pt-2 sm:pt-0">
                <Link
                  to="/buy"
                  search={{ location: location, type: propertyType }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-xl hover:bg-white transition-all text-sm shadow-lg cursor-pointer"
                >
                  <Search className="size-4" /> Search Properties
                </Link>
              </div>

            </div>
          </Container>
        </section>

        {/* ============ FEATURED DREAM VALLEY PHASE 2 BANNER CARD ============ */}
        <section className="py-12 bg-zinc-950/40">
          <Container>
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-[2.5rem] border border-accent/30 p-8 md:p-12 shadow-2xl relative overflow-hidden group">

              {/* Background glow effect */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/20 transition-all duration-700"></div>

              <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">

                {/* Left Image Thumbnail */}
                <div className="relative h-72 md:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000"
                    alt="Dream Valley Phase 2"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs uppercase tracking-widest bg-accent text-black font-bold px-3 py-1 rounded-full">
                      Supreme Court Monitored
                    </span>
                    <span className="text-xs font-medium text-zinc-300">50 Acres Township</span>
                  </div>
                </div>

                {/* Right Details */}
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest mb-2">
                      <ShieldCheck className="size-4" /> Executed Through NBCC (India) Ltd
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold">Dream Valley Phase 2</h2>
                    <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                      Techzone IV, Greater Noida West. Ultra-modern residential township offering 1, 2 & 3 BHK luxury apartments with world-class amenities and green landscapes.
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle className="size-4 text-accent flex-shrink-0" />
                      <span>Size: 585 - 1,715 sq.ft.</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle className="size-4 text-accent flex-shrink-0" />
                      <span>Vaastu Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle className="size-4 text-accent flex-shrink-0" />
                      <span>Clubhouse & Pool</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle className="size-4 text-accent flex-shrink-0" />
                      <span>Near Yatharth Hospital</span>
                    </div>
                  </div>

                  {/* Action Button - Fully Linked */}
                  <div className="pt-2">
                    <Link
                      to="/dream-valley-phase-2"
                      className="inline-flex items-center justify-center gap-3 bg-accent text-black font-bold px-8 py-3.5 rounded-full hover:bg-white transition-all duration-300 text-sm shadow-xl cursor-pointer"
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
        <section className="py-10">
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
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground hover:text-accent transition-colors"
              >
                View All Properties <ArrowRight className="size-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ============ TOP MICRO-MARKETS ============ */}
        <section className="py-20 mt-16 bg-zinc-950/50 border-t border-white/5">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3 block">Prime Locations</span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Invest in NCR's Best Corridors</h2>
              <p className="text-zinc-400 font-light">High-growth micro-markets offering unmatched rental yields and capital appreciation.</p>
            </div>

            <Stagger className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {TOP_LOCATIONS.map((loc, idx) => (
                <div key={idx} className="group relative h-64 md:h-80 rounded-[2rem] overflow-hidden border border-white/10 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="size-3.5 text-accent" />
                      <span className="text-xs uppercase tracking-widest text-zinc-300">{loc.city}</span>
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