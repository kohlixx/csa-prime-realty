import { createFileRoute } from "@tanstack/react-router";
import { LineChart, ArrowRight, TrendingUp, BookOpen } from "lucide-react";
import { 
  Navbar, Footer, Container, SectionHeader, 
  FadeIn, SlideUp, Stagger 
} from "@/components/design-system";
import { NAV_ITEMS, SITE, FOOTER_COLUMNS, INSIGHTS } from "@/lib/site-data";
import { toast } from "sonner"; // Agar sonner use ho raha hai, nahi toh is line ko chhod dena.

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
});

function InsightsPage() {
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
                <LineChart className="size-3.5" /> Market Intelligence
              </span>
            </FadeIn>
            <SlideUp delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight leading-[1.1]">
                Data-Driven <br />
                <span className="bg-gradient-to-r from-[#F5D78D] via-[#C5A059] to-[#8A6A24] bg-clip-text text-transparent">
                  Real Estate Decisions.
                </span>
              </h1>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto">
                Access exclusive market reports, price trends, and investment guides for Noida, Greater Noida, and the Yamuna Expressway corridor.
              </p>
            </SlideUp>
          </div>
        </Container>

        {/* ============ FEATURED INSIGHT (TOP REPORT) ============ */}
        {INSIGHTS.length > 0 && (
          <section className="mb-24">
            <Container>
              <FadeIn>
                <div className="group relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 shadow-luxury-lg cursor-pointer">
                  <div className="grid md:grid-cols-2 items-center">
                    {/* Image Side */}
                    <div className="relative h-64 md:h-[32rem] overflow-hidden">
                      <img 
                        src={INSIGHTS[0].cover} 
                        alt={INSIGHTS[0].title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[20%]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 md:from-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Content Side */}
                    <div className="p-10 md:p-16 flex flex-col justify-center relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">{INSIGHTS[0].category}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                        <span className="text-zinc-500 text-xs tracking-wider">{INSIGHTS[0].readingTime}</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight group-hover:text-accent transition-colors duration-300">
                        {INSIGHTS[0].title}
                      </h2>
                      <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10">
                        {INSIGHTS[0].excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <img src={INSIGHTS[0].author.avatar} alt="Author" className="w-10 h-10 rounded-full border border-white/20" />
                          <div>
                            <p className="text-sm text-white font-medium">{INSIGHTS[0].author.name}</p>
                            <p className="text-xs text-zinc-500">{new Date(INSIGHTS[0].publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                        </div>
                        <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                          <ArrowRight className="size-5 text-white group-hover:text-accent" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </Container>
          </section>
        )}

        {/* ============ OTHER REPORTS GRID ============ */}
        <section className="py-10">
          <Container>
            <SectionHeader 
              align="left"
              eyebrow="Latest Analysis"
              title="Market Updates"
            />
            
            <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
              {INSIGHTS.slice(1).map((insight, idx) => (
                <div key={idx} className="group flex flex-col bg-card rounded-[2rem] border border-white/5 overflow-hidden hover:border-accent/30 transition-all duration-500 shadow-lg cursor-pointer">
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={insight.cover} 
                      alt={insight.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-accent">
                      {insight.category}
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-serif text-white mb-4 leading-snug group-hover:text-accent transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed mb-8 flex-1">
                      {insight.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                      <p className="text-xs text-zinc-500 flex items-center gap-2">
                        <BookOpen className="size-3.5" /> {insight.readingTime}
                      </p>
                      <ArrowRight className="size-4 text-zinc-600 group-hover:text-accent transition-colors transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* ============ VIP NEWSLETTER CTA (Connected to WhatsApp) ============ */}
        <section className="py-20 mt-10">
          <Container>
            <div className="relative rounded-[3rem] bg-[#0a0a0a] border border-accent/20 shadow-[0_0_50px_-12px_rgba(197,160,89,0.15)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent"></div>
              
              <div className="relative p-10 md:p-16 lg:p-20 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 mb-8">
                    <TrendingUp className="size-7 text-accent" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                    Get Insider Market Updates.
                  </h2>
                  <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8">
                    Join our exclusive broadcast list. Receive monthly pre-launch alerts, pricing forecasts, and RERA updates directly on your WhatsApp. No spam, only high-value insights.
                  </p>
                  
                  <button 
                    onClick={() => {
                      const whatsappMessage = `Hello CSA Prime Realty, I would like to subscribe to your VIP Market Reports and Pre-launch alerts.`;
                      const whatsappUrl = `https://wa.me/919511811326?text=${whatsappMessage}`;
                      window.open(whatsappUrl, "_blank");
                    }}
                    className="inline-flex items-center justify-center gap-3 bg-accent text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
                  >
                    Subscribe via WhatsApp <ArrowRight className="size-4" />
                  </button>
                </div>
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