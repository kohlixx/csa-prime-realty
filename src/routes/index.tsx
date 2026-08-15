import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Search,
  ArrowRight,
  ShieldCheck,
  MapPin,
  CheckCircle,
  Gift,
  Sparkles,
} from "lucide-react";
import {
  Navbar,
  Footer,
  Container,
  SectionHeader,
  FadeIn,
  SlideUp,
  Stagger,
  PropertyCard,
} from "@/components/design-system";
import {
  NAV_ITEMS,
  SITE,
  FOOTER_COLUMNS,
  FEATURED_PROPERTIES,
  TOP_LOCATIONS,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: HomePage,
});

// ==========================================
// ADVANCED HERO SLIDER IMAGES
// ==========================================
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
  "/luxury-hero-bg.jpg" // Aapki local image fallback ke liye
];

function HomePage() {
  const [location, setLocation] = useState("Noida");
  const [propertyType, setPropertyType] = useState("apartment");
  const [currentSlide, setCurrentSlide] = useState(0);

  // ==========================================
  // DYNAMIC FAVICON, TITLE & SLIDER SETUP
  // ==========================================
  useEffect(() => {
    document.title =
      "Crown Estate Realty | Luxury Homes & Commercial Assets in NCR";

    let link: HTMLLinkElement | null = document.querySelector(
      "link[rel~='icon']"
    );
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = "/favicon.jpg";
    link.type = "image/jpeg";
  }, []);

  // Auto Slider Effect (Changes every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-white overflow-x-hidden">
      
      {/* ============ GLOBAL ADVANCED ANIMATION STYLES ============ */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Cinematic Zoom for Active Slider Image */
          @keyframes heroZoom {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(-1%, -1%); }
          }
          /* Slider Progress Bar */
          @keyframes slideProgress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          @keyframes floatOrb {
            0% { transform: translate(0px, 0px) scale(1); opacity: 0.3; }
            33% { transform: translate(40px, -60px) scale(1.2); opacity: 0.5; }
            66% { transform: translate(-30px, 30px) scale(0.8); opacity: 0.2; }
            100% { transform: translate(0px, 0px) scale(1); opacity: 0.3; }
          }
          @keyframes floatSubtle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes imageReveal {
            0% { transform: scale(1.2); filter: blur(10px); opacity: 0; }
            100% { transform: scale(1); filter: blur(0px); opacity: 1; }
          }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(234, 179, 8, 0.4); }
            50% { box-shadow: 0 0 30px rgba(234, 179, 8, 0.8); }
          }
          
          .animate-float { animation: floatSubtle 4s ease-in-out infinite; }
          .animate-image-reveal { animation: imageReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-pulse-glow { animation: pulseGlow 3s infinite; }
        `
      }} />

      {/* ============ NAVBAR ============ */}
      <Navbar items={NAV_ITEMS} phone={SITE.phone} />

      <main className="flex-1">
        {/* ============ HERO SECTION ============ */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-32 pb-28 bg-black">
          
          {/* ============ ADVANCED AUTO-SLIDER BACKGROUND ============ */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none select-none">
            
            {/* Sliding Images */}
            {HERO_IMAGES.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${
                  idx === currentSlide ? "opacity-60 z-10" : "opacity-0 z-0"
                }`}
                style={{
                  backgroundImage: `url('${img}')`,
                  animation: idx === currentSlide ? "heroZoom 7s linear forwards" : "none"
                }}
              />
            ))}

            {/* Glowing Aurora Orbs (Kept for Luxury Vibe) */}
            <div
              className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[100px] md:blur-[140px] z-20"
              style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.5) 0%, rgba(0,0,0,0) 70%)', animation: 'floatOrb 15s infinite ease-in-out' }}
            />
            <div
              className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[120px] md:blur-[160px] z-20"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, rgba(0,0,0,0) 70%)', animation: 'floatOrb 18s infinite ease-in-out reverse', animationDelay: '-5s' }}
            />

            {/* Cinematic Gradients & Noise */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/90 z-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] z-20" />
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay z-20"
              style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
            ></div>
          </div>

          <Container className="relative z-30 my-auto">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <div className="animate-float inline-flex items-center gap-2 rounded-full border border-yellow-500/50 bg-black/60 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                  <Gift className="size-4 animate-pulse text-yellow-300" /> Special Housefull Offer Active Now
                </div>
              </FadeIn>

              <SlideUp delay={0.1}>
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif text-white mb-6 tracking-tight leading-[1.1] drop-shadow-lg">
                  Extraordinary homes & properties in Noida, <br />
                  <span className="bg-gradient-to-r from-[#F5D78D] via-[#C5A059] to-[#E6CA85] bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-500">
                    quietly matched to you.
                  </span>
                </h1>
              </SlideUp>

              <SlideUp delay={0.2}>
                <p className="text-base sm:text-xl text-zinc-100 leading-relaxed font-light max-w-2xl mx-auto mb-10 drop-shadow-md">
                  Experience a private, invitation-grade approach to acquiring
                  ultra-luxury residences, sky villas, and high-yield commercial
                  assets across Noida, Greater Noida, and NCR.
                </p>
              </SlideUp>

              <SlideUp delay={0.3}>
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                  <Link
                    to="/buy"
                    className="group inline-flex items-center justify-center gap-3 bg-accent text-black font-bold text-sm px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    Explore Portfolio <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/properties/eternia-greater-noida"
                    className="group animate-pulse-glow inline-flex items-center justify-center gap-3 bg-black/60 border border-yellow-500/40 text-yellow-400 font-bold text-sm px-8 py-4 rounded-full backdrop-blur-md hover:bg-yellow-500 hover:text-black hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <Gift className="size-4 group-hover:rotate-12 transition-transform" /> Claim Eternia Housefull Offer
                  </Link>
                </div>
              </SlideUp>

              {/* Trust Metrics Bar */}
              <SlideUp delay={0.4}>
                <div className="grid grid-cols-3 gap-6 pt-6 pb-6 max-w-2xl mx-auto bg-black/40 backdrop-blur-xl px-6 rounded-3xl border border-white/10 shadow-2xl hover:bg-black/50 transition-colors duration-500">
                  <div className="transform hover:-translate-y-2 transition-transform duration-300">
                    <p className="text-2xl sm:text-3xl font-serif text-white font-bold">₹1,500 Cr+</p>
                    <p className="text-[11px] text-zinc-300 uppercase tracking-widest mt-1">Properties Sold</p>
                  </div>
                  <div className="transform hover:-translate-y-2 transition-transform duration-300">
                    <p className="text-2xl sm:text-3xl font-serif text-white font-bold">500+</p>
                    <p className="text-[11px] text-zinc-300 uppercase tracking-widest mt-1">Happy Families</p>
                  </div>
                  <div className="transform hover:-translate-y-2 transition-transform duration-300">
                    <p className="text-2xl sm:text-3xl font-serif text-white font-bold">100%</p>
                    <p className="text-[11px] text-zinc-300 uppercase tracking-widest mt-1">Verified RERA</p>
                  </div>
                </div>
              </SlideUp>
            </div>
          </Container>

          {/* ============ SLIDER PROGRESS INDICATORS ============ */}
          <div className="absolute bottom-16 sm:bottom-10 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-4">
            {HERO_IMAGES.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className="h-1.5 rounded-full bg-white/20 overflow-hidden w-12 sm:w-16 cursor-pointer hover:bg-white/40 transition-colors"
              >
                <div
                  className={`h-full bg-yellow-400`}
                  style={{
                    width: idx === currentSlide ? "100%" : "0%",
                    animation: idx === currentSlide ? "slideProgress 6s linear forwards" : "none",
                  }}
                />
              </div>
            ))}
          </div>

        </section>

        {/* ============ INTERACTIVE QUICK SEARCH BAR ============ */}
        <section className="relative z-40 -mt-12 mb-12">
          <Container>
            <SlideUp delay={0.5}>
              <div className="max-w-4xl mx-auto bg-card rounded-3xl p-6 border border-border shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 items-center transform hover:scale-[1.01] transition-transform duration-500">
                <div className="flex flex-col group">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1 group-hover:text-accent transition-colors">
                    Select Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-muted/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent cursor-pointer hover:bg-muted/80 transition-colors"
                  >
                    <option value="Noida">Noida</option>
                    <option value="Greater Noida">Greater Noida</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                    <option value="Noida Extension">Noida Extension</option>
                  </select>
                </div>

                <div className="flex flex-col group">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1 group-hover:text-accent transition-colors">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="bg-muted/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent cursor-pointer hover:bg-muted/80 transition-colors"
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
                    className="group w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-xl hover:bg-primary transition-all duration-300 text-sm shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-1"
                  >
                    <Search className="size-4 group-hover:scale-110 transition-transform" /> Search Properties
                  </Link>
                </div>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* ============ ETERNIA HOUSEFULL OFFER BANNER ============ */}
        <section className="py-12 bg-background overflow-hidden">
          <Container>
            <SlideUp delay={0.2}>
              <div className="max-w-5xl mx-auto bg-card rounded-[2.5rem] border-2 border-yellow-500/40 p-8 md:p-12 shadow-luxury-xl relative overflow-hidden group hover:shadow-yellow-500/20 transition-all duration-500">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-yellow-500/30 group-hover:scale-150 transition-all duration-1000"></div>

                <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                  {/* Image Thumbnail with Custom Reveal */}
                  <div className="relative h-72 md:h-80 rounded-3xl overflow-hidden border border-border shadow-md">
                    <img
                      src="/eternia.jpg"
                      alt="Eternia Greater Noida West"
                      className="w-full h-full object-cover animate-image-reveal group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white animate-float">
                      <span className="text-xs uppercase tracking-widest bg-yellow-500 text-black font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                        <Gift className="size-3" /> Housefull Offer
                      </span>
                      <span className="text-xs font-medium text-white shadow-sm backdrop-blur-sm bg-black/30 px-3 py-1 rounded-full">
                        G+30 Towers
                      </span>
                    </div>
                  </div>

                  {/* Details with staggered sliding */}
                  <div className="space-y-6">
                    <SlideUp delay={0.3}>
                      <div className="inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest mb-2">
                        <ShieldCheck className="size-4 animate-pulse" /> NBCC Monitored Project
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-serif text-primary font-bold flex items-center gap-3">
                        Eternia <Sparkles className="size-6 text-yellow-500 animate-spin-slow" />
                      </h2>
                      <p className="text-secondary text-sm mt-2 leading-relaxed">
                        Techzone IV, Greater Noida West. 3 & 4 BHK spacious residences featuring a magnificent 25,000 sq.ft. clubhouse.
                      </p>
                    </SlideUp>

                    <SlideUp delay={0.4}>
                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-2xl hover:bg-yellow-500/10 transition-colors duration-300">
                        <p className="text-sm font-bold text-yellow-700 mb-3">Fully Loaded Homes @ ₹9,400/sq.ft.*</p>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                          {['ACs in All Rooms', 'Modular Kitchen', '55" LED TV', 'Wardrobes'].map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-foreground font-medium group/item">
                              <CheckCircle className="size-4 text-yellow-600 flex-shrink-0 group-hover/item:scale-125 transition-transform" /> {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </SlideUp>

                    <SlideUp delay={0.5}>
                      <div className="pt-2">
                        <Link
                          to="/properties/eternia-greater-noida"
                          className="group inline-flex items-center justify-center gap-3 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:-translate-y-1 transition-all duration-300 text-sm w-full sm:w-auto"
                        >
                          View Complete Offer Details <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </SlideUp>
                  </div>
                </div>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* ============ DREAM VALLEY PHASE 2 BANNER CARD ============ */}
        <section className="py-8 bg-background overflow-hidden">
          <Container>
            <SlideUp delay={0.2}>
              <div className="max-w-5xl mx-auto bg-card rounded-[2.5rem] border border-border p-8 md:p-12 shadow-luxury-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/15 group-hover:scale-150 transition-all duration-1000"></div>

                <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                  <div className="relative h-72 md:h-80 rounded-3xl overflow-hidden border border-border shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000"
                      alt="Dream Valley Phase 2"
                      className="w-full h-full object-cover animate-image-reveal group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white animate-float">
                      <span className="text-xs uppercase tracking-widest bg-accent text-white font-bold px-3 py-1 rounded-full shadow-lg">
                        Supreme Court Monitored
                      </span>
                      <span className="text-xs font-medium text-white shadow-sm backdrop-blur-sm bg-black/30 px-3 py-1 rounded-full">
                        50 Acres Township
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <SlideUp delay={0.3}>
                      <div className="inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest mb-2">
                        <ShieldCheck className="size-4 animate-pulse" /> Executed Through NBCC (India) Ltd
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-serif text-primary font-bold group-hover:text-accent transition-colors duration-300">
                        Dream Valley Phase 2
                      </h2>
                      <p className="text-secondary text-sm mt-2 leading-relaxed">
                        Techzone IV, Greater Noida West. Ultra-modern residential township offering 1, 2 & 3 BHK luxury apartments with world-class amenities and green landscapes.
                      </p>
                    </SlideUp>

                    <SlideUp delay={0.4}>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        {[
                          'Size: 585 - 1,715 sq.ft.',
                          'Vaastu Compliant',
                          'Clubhouse & Pool',
                          'Near Yatharth Hospital'
                        ].map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-foreground font-medium group/feat">
                            <CheckCircle className="size-4 text-accent flex-shrink-0 group-hover/feat:scale-125 transition-transform" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </SlideUp>

                    <SlideUp delay={0.5}>
                      <div className="pt-4">
                        <Link
                          to="/properties/dream-valley-phase-2"
                          className="group inline-flex items-center justify-center gap-3 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-accent hover:shadow-[0_0_20px_rgba(180,140,80,0.4)] hover:-translate-y-1 transition-all duration-300 text-sm cursor-pointer"
                        >
                          View Complete Project Details <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </SlideUp>
                  </div>
                </div>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* ============ FEATURED PROPERTIES ============ */}
        <section className="py-16 overflow-hidden">
          <Container>
            <SlideUp delay={0.1}>
              <SectionHeader
                align="left"
                eyebrow="Exclusive Portfolio"
                title="Handpicked Residences"
                description="Explore verified luxury properties currently available for acquisition."
              />
            </SlideUp>

            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {FEATURED_PROPERTIES.slice(0, 3).map((property, idx) => (
                <div key={property.slug} className="transform hover:-translate-y-2 transition-transform duration-500">
                  <PropertyCard data={property} />
                </div>
              ))}
            </Stagger>

            <SlideUp delay={0.5}>
              <div className="text-center mt-12">
                <Link
                  to="/buy"
                  className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary hover:text-accent transition-colors"
                >
                  View All Properties <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* ============ TOP MICRO-MARKETS ============ */}
        <section className="py-20 bg-muted/30 border-t border-border overflow-hidden">
          <Container>
            <SlideUp delay={0.2}>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3 block animate-pulse">
                  Prime Locations
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">
                  Invest in NCR's Best Corridors
                </h2>
                <p className="text-secondary font-light">
                  High-growth micro-markets offering unmatched rental yields and capital appreciation.
                </p>
              </div>
            </SlideUp>

            <Stagger className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {TOP_LOCATIONS.map((loc, idx) => (
                <SlideUp delay={idx * 0.15} key={idx}>
                  <div
                    className="group relative h-64 md:h-80 rounded-[2rem] overflow-hidden border border-border cursor-pointer shadow-md hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2"
                  >
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-1 opacity-80 group-hover:opacity-100">
                        <MapPin className="size-3.5 text-accent animate-bounce" />
                        <span className="text-xs uppercase tracking-widest text-white">
                          {loc.city}
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif mb-1 group-hover:text-accent transition-colors duration-300">
                        {loc.name}
                      </h3>
                      <p className="text-accent text-xs font-bold tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {loc.priceRange}
                      </p>
                    </div>
                  </div>
                </SlideUp>
              ))}
            </Stagger>
          </Container>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <Footer
        columns={FOOTER_COLUMNS}
        phone={SITE.phone}
        email={SITE.email}
        address={SITE.address}
        socials={[]}
      />
    </div>
  );
}