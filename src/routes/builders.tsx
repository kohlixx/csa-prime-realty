import { createFileRoute } from "@tanstack/react-router";
import { Handshake, Star, ArrowRight, ShieldCheck } from "lucide-react";
import { 
  Navbar, Footer, Container, SectionHeader, 
  FadeIn, SlideUp, Stagger 
} from "@/components/design-system";
import { NAV_ITEMS, SITE, FOOTER_COLUMNS, TOP_BUILDERS } from "@/lib/site-data";

export const Route = createFileRoute("/builders")({
  component: BuildersPage,
});

function BuildersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-black">
      {/* ============ NAVBAR ============ */}
      <Navbar items={NAV_ITEMS} phone={SITE.phone} />

      <main className="flex-1 pt-32 pb-10">
        
        {/* ============ HERO SECTION ============ */}
        <Container className="mb-24">
          <div className="max-w-4xl mx-auto text-center mt-10">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent backdrop-blur-md mb-8 shadow-[0_0_30px_-5px_rgba(197,160,89,0.2)]">
                <Handshake className="size-3.5" /> Our Network
              </span>
            </FadeIn>
            <SlideUp delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight leading-[1.1]">
                Developer <br />
                <span className="bg-gradient-to-r from-[#F5D78D] via-[#C5A059] to-[#8A6A24] bg-clip-text text-transparent">
                  Partnerships.
                </span>
              </h1>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light max-w-3xl mx-auto">
                We strictly curate our developer network. CSA Prime Realty partners only with Grade-A builders who have a flawless track record of delivery, quality, and RERA compliance.
              </p>
            </SlideUp>
          </div>
        </Container>

        {/* ============ BUILDERS GRID ============ */}
        <section className="py-10">
          <Container>
            <SectionHeader 
              align="left"
              eyebrow="The Elite Circle"
              title="Authorised Partners"
            />
            
            <Stagger className="grid gap-8 sm:grid-cols-2 mt-12">
              {TOP_BUILDERS.map((builder, idx) => (
                <div key={idx} className="group relative bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-accent/30 transition-all duration-500 shadow-lg p-10">
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 transition-colors duration-500"></div>

                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    
                    {/* Builder Logo Box */}
                    <div className="w-24 h-24 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-500 shadow-inner">
                      <img 
                        src={builder.logo} 
                        alt={builder.name} 
                        className="w-full h-full object-contain filter drop-shadow-md"
                      />
                    </div>
                    
                    {/* Builder Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-serif text-white">{builder.name}</h3>
                        <ShieldCheck className="size-5 text-accent" />
                      </div>
                      <p className="text-zinc-400 italic font-light mb-6">"{builder.tagline}"</p>
                      
                      <div className="flex flex-wrap gap-4 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Projects</span>
                          <span className="text-lg text-white font-medium">{builder.projectsCount}+</span>
                        </div>
                        <div className="w-px h-10 bg-white/10 mx-2"></div>
                        <div className="flex flex-col">
                          <span className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Regions</span>
                          <span className="text-sm text-white font-medium mt-1">{builder.cities.join(", ")}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* ============ WHY BUY THROUGH US (Instead of Direct) ============ */}
        <section className="py-24 mt-16 relative border-t border-white/5 bg-zinc-950/50">
          <Container>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Star className="size-10 text-accent/50 mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                Why book through CSA Prime instead of going direct?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-card rounded-3xl border border-white/5 text-center">
                <h3 className="text-xl font-serif text-white mb-3">Zero Brokerage</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  You pay exactly what you would at the developer's office. Our advisory comes at no extra cost to you on primary market bookings.
                </p>
              </div>
              
              <div className="p-8 bg-card rounded-3xl border border-accent/20 shadow-[0_0_30px_-10px_rgba(197,160,89,0.15)] text-center relative -translate-y-4">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  The CSA Advantage
                </div>
                <h3 className="text-xl font-serif text-white mb-3 mt-2">Unbiased Representation</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  A developer's sales team only sells their project. We analyze 50+ projects to recommend the one that actually fits your portfolio.
                </p>
              </div>

              <div className="p-8 bg-card rounded-3xl border border-white/5 text-center">
                <h3 className="text-xl font-serif text-white mb-3">Priority Allocation</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  As top-tier channel partners, we secure the best inventory (corner units, park facing) before it hits the general retail market.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ============ CTA SECTION ============ */}
        <section className="py-20">
          <Container>
             <div className="relative rounded-[3rem] bg-[#0a0a0a] border border-accent/20 overflow-hidden text-center p-12 md:p-20">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent"></div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
                  Looking for a specific developer?
                </h2>
                <p className="text-lg text-zinc-400 font-light mb-10">
                  Share your preferred builder or location, and we will arrange a VIP site visit with the best pre-negotiated pricing.
                </p>
                <button 
                  onClick={() => {
                    const whatsappMessage = `Hello CSA Prime Realty, I want to inquire about new projects from top developers. Please arrange a VIP site visit.`;
                    const whatsappUrl = `https://wa.me/919511811326?text=${whatsappMessage}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="inline-flex items-center justify-center gap-3 bg-accent text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
                >
                  Schedule Site Visit <ArrowRight className="size-4" />
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