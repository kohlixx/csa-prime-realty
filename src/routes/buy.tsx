import { createFileRoute } from "@tanstack/react-router";
import { Search, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { 
  Navbar, Footer, Container, SectionHeader, 
  FadeIn, SlideUp, Stagger, PropertyCard 
} from "@/components/design-system";
import { NAV_ITEMS, SITE, FOOTER_COLUMNS, FEATURED_PROPERTIES, TOP_LOCATIONS } from "@/lib/site-data";

export const Route = createFileRoute("/buy")({
  component: BuyPage,
});

function BuyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-black">
      {/* ============ NAVBAR ============ */}
      <Navbar items={NAV_ITEMS} phone={SITE.phone} />

      <main className="flex-1 pt-32 pb-10">
        
        {/* ============ HERO SECTION ============ */}
        <Container className="mb-20">
          <div className="max-w-4xl mx-auto text-center mt-10">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent backdrop-blur-md mb-8 shadow-[0_0_30px_-5px_rgba(197,160,89,0.2)]">
                <Search className="size-3.5" /> Primary Market
              </span>
            </FadeIn>
            <SlideUp delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight leading-[1.1]">
                Acquire Your <br />
                <span className="bg-gradient-to-r from-[#F5D78D] via-[#C5A059] to-[#8A6A24] bg-clip-text text-transparent">
                  Masterpiece.
                </span>
              </h1>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto mb-10">
                Explore our handpicked collection of ultra-luxury residences, sky villas, and premium apartments across NCR's most coveted addresses.
              </p>
            </SlideUp>
          </div>
        </Container>

        {/* ============ MICRO-MARKETS (LOCATIONS) ============ */}
        <section className="py-12 border-t border-white/5 bg-zinc-950/50">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">Top Micro-Markets</h2>
                <p className="text-zinc-400 font-light">Explore properties by prime locations.</p>
              </div>
            </div>
            
            <Stagger className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {TOP_LOCATIONS.map((loc, idx) => (
                <div key={idx} className="group relative h-48 md:h-64 rounded-[2rem] overflow-hidden border border-white/10 cursor-pointer shadow-lg hover:shadow-luxury-md hover:border-accent/30 transition-all duration-500">
                  <img 
                    src={loc.image} 
                    alt={loc.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="size-4 text-accent" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300">{loc.city}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-1 group-hover:text-accent transition-colors">{loc.name}</h3>
                    <p className="text-accent text-xs tracking-widest uppercase font-bold">{loc.priceRange}</p>
                  </div>
                </div>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* ============ PROPERTY PORTFOLIO GRID ============ */}
        <section className="py-20">
          <Container>
            <SectionHeader 
              align="left"
              eyebrow="Curated Inventory"
              title="Exclusive Portfolio"
              description="RERA-verified luxury projects with transparent pricing and zero brokerage."
            />
            
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {FEATURED_PROPERTIES.map((property) => (
                <PropertyCard key={property.slug} data={property} />
              ))}
            </Stagger>
          </Container>
        </section>

        {/* ============ OFFLINE INVENTORY CTA (WhatsApp) ============ */}
        <section className="py-16 mb-10">
          <Container>
             <div className="relative rounded-[3rem] bg-[#0a0a0a] border border-accent/20 overflow-hidden text-center p-10 md:p-16 shadow-[0_0_40px_-10px_rgba(197,160,89,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent"></div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <Sparkles className="size-10 text-accent/60 mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                  Looking for something specific?
                </h2>
                <p className="text-lg text-zinc-400 font-light mb-10">
                  Not all our premium listings are public. Share your exact requirements (budget, location, configuration) and get a tailored shortlist directly on WhatsApp.
                </p>
                <button 
                  onClick={() => {
                    const whatsappMessage = `Hello CSA Prime Realty, I am looking to buy a property. Please share a tailored shortlist based on my requirements.`;
                    const whatsappUrl = `https://wa.me/919511811326?text=${whatsappMessage}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="inline-flex items-center justify-center gap-3 bg-accent text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
                >
                  Request Shortlist <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </Container>
        </section>

      </main>

      {/* ============ FOOTER ============ */}
      <Footer columns={FOOTER_COLUMNS} phone={SITE.phone} email={SITE.email} address={SITE.address} socials={[]} />
    </div>
  );
}