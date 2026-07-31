import { createFileRoute } from "@tanstack/react-router";
import { Rocket, TrendingUp, LayoutDashboard, Coins, ArrowRight, Sparkles } from "lucide-react";
import { 
  Navbar, Footer, Container, SectionHeader, 
  FadeIn, SlideUp, Stagger, PropertyCard 
} from "@/components/design-system";
import { NAV_ITEMS, SITE, FOOTER_COLUMNS, FEATURED_PROPERTIES } from "@/lib/site-data";

export const Route = createFileRoute("/new-launches")({
  component: NewLaunchesPage,
});

const ADVANTAGES = [
  {
    title: "Lowest Entry Price",
    description: "Capitalize on inaugural pricing. Property values in NCR historically appreciate by 15-25% between soft-launch and final possession.",
    icon: <TrendingUp className="size-6" />
  },
  {
    title: "First Choice of Inventory",
    description: "Don't settle for leftovers. Secure the most coveted units—corner apartments, golf-facing views, and optimal Vastu layouts.",
    icon: <LayoutDashboard className="size-6" />
  },
  {
    title: "Flexible Payment Plans",
    description: "Take advantage of exclusive Construction Linked Plans (CLP) or PLP schemes to manage your cash flow without heavy upfront capital.",
    icon: <Coins className="size-6" />
  }
];

function NewLaunchesPage() {
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
                <Rocket className="size-3.5" /> Early Mover Advantage
              </span>
            </FadeIn>
            <SlideUp delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight leading-[1.1]">
                Be The <br />
                <span className="bg-gradient-to-r from-[#F5D78D] via-[#C5A059] to-[#8A6A24] bg-clip-text text-transparent">
                  First to Invest.
                </span>
              </h1>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto">
                Unlock VIP access to NCR's most anticipated luxury projects before they open to the retail market. Secure your unit at the lowest absolute entry price.
              </p>
            </SlideUp>
          </div>
        </Container>

        {/* ============ WHY INVEST IN NEW LAUNCHES ============ */}
        <section className="py-16 border-t border-white/5 bg-zinc-950/50">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">The Pre-Launch Premium</h2>
              <p className="text-zinc-400 font-light text-lg">Why astute investors always enter at the very beginning.</p>
            </div>
            
            <Stagger className="grid gap-8 sm:grid-cols-3">
              {ADVANTAGES.map((adv, idx) => (
                <div key={idx} className="group p-8 bg-[#0a0a0a] rounded-3xl border border-white/5 hover:border-accent/30 hover:bg-white/[0.02] transition-all duration-500 shadow-lg">
                  <div className="text-accent mb-6 bg-accent/10 w-14 h-14 flex items-center justify-center rounded-2xl border border-accent/20 group-hover:scale-110 transition-transform duration-500">
                    {adv.icon}
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">{adv.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm font-light">
                    {adv.description}
                  </p>
                </div>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* ============ NEW LAUNCHES GRID ============ */}
        <section className="py-20">
          <Container>
            <SectionHeader 
              align="left"
              eyebrow="Currently Accepting EOI"
              title="Hot New Projects"
              description="Projects currently in their soft-launch or pre-launch phase with exclusive inaugural discounts."
            />
            
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {/* Taking only a few properties for the "New Launch" feel */}
              {FEATURED_PROPERTIES.slice(0, 3).map((property) => (
                <PropertyCard key={property.slug} data={property} />
              ))}
            </Stagger>
          </Container>
        </section>

        {/* ============ VIP ALLOCATION CTA ============ */}
        <section className="py-16 mb-10">
          <Container>
             <div className="relative rounded-[3rem] bg-[#0a0a0a] border border-accent/20 overflow-hidden text-center p-10 md:p-16 shadow-[0_0_40px_-10px_rgba(197,160,89,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent"></div>
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <Sparkles className="size-10 text-accent/60 mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                  Secure Your VIP Allocation.
                </h2>
                <p className="text-lg text-zinc-400 font-light mb-10">
                  New launch inventories sell out in days, sometimes hours. Submit an Expression of Interest (EOI) today to lock your price and secure priority unit selection.
                </p>
                <button 
                  onClick={() => {
                    const whatsappMessage = `Hello CSA Prime Realty, I want to submit an Expression of Interest (EOI) for your upcoming New Launches to secure the early-bird pricing.`;
                    const whatsappUrl = `https://wa.me/919511811326?text=${whatsappMessage}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="inline-flex items-center justify-center gap-3 bg-accent text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
                >
                  Submit EOI via WhatsApp <ArrowRight className="size-4" />
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