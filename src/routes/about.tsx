import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Building, Users, Target, Quote, Sparkles } from "lucide-react";
import {
  Navbar, Footer, Container, SectionHeader,
  FadeIn, SlideUp, Stagger
} from "@/components/design-system";
import { NAV_ITEMS, SITE, FOOTER_COLUMNS } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const CORE_VALUES = [
  {
    title: "Institutional Diligence",
    description: "Every asset is vetted with RERA-grade legal and financial scrutiny before it reaches you.",
    icon: <ShieldCheck className="size-6" />
  },
  {
    title: "Curated Excellence",
    description: "We reject 80% of projects to bring you only the finest, most premium 20% in the market.",
    icon: <Building className="size-6" />
  },
  {
    title: "Client-Centric Advisory",
    description: "We represent your interests, ensuring transparent pricing and zero hidden markups.",
    icon: <Users className="size-6" />
  },
  {
    title: "Long-term Vision",
    description: "We build generational wealth portfolios, not just one-off real estate transactions.",
    icon: <Target className="size-6" />
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-black">
      <Navbar items={NAV_ITEMS} phone={SITE.phone} />

      <main className="flex-1 pt-32 pb-10">

        {/* ============ ULTRA-PREMIUM HERO SECTION ============ */}
        <Container className="mb-32">
          <div className="max-w-5xl mx-auto text-center mt-12">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent backdrop-blur-md mb-10 shadow-[0_0_30px_-5px_rgba(197,160,89,0.2)]">
                <Sparkles className="size-3.5" /> Our Philosophy
              </span>
            </FadeIn>
            <SlideUp delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif text-white mb-8 tracking-tight leading-[1.05]">
                Architecting <br />
                <span className="bg-gradient-to-r from-[#F5D78D] via-[#C5A059] to-[#8A6A24] bg-clip-text text-transparent">
                  Generational Wealth.
                </span>
              </h1>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light max-w-3xl mx-auto">
                CSA Prime Realty is a private-office standard advisory firm.
                We move away from the traditional brokerage model to offer a curated,
                invitation-grade experience for the most discerning buyers in Noida,
                Greater Noida, and the Yamuna Expressway.
              </p>
            </SlideUp>
          </div>
        </Container>

        {/* ============ LEADERSHIP SECTION (AMIT SINGH & AJEET SINGH) ============ */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-white/[0.02] to-transparent border-y border-white/5">
          <Container>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

              {/* Dual Animated Cards Grid */}
              <FadeIn className="relative">
                <div className="grid sm:grid-cols-2 gap-6 items-stretch">

                  {/* Amit Singh Card */}
                  <div className="group bg-zinc-900/80 p-6 rounded-3xl border border-white/10 hover:border-accent/40 transition-all duration-500 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-accent/20 bg-zinc-900 mb-6 relative">
                        <img
                          src="/PHOTO-2026-07-30-13-37-44.jpg"
                          alt="Amit Singh"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <span className="absolute bottom-4 left-4 px-3 py-1 bg-accent/20 backdrop-blur-md border border-accent/35 text-accent text-[10px] uppercase tracking-widest font-semibold rounded-full">
                          Leadership
                        </span>
                      </div>
                      <h4 className="text-white font-serif text-2xl font-bold tracking-wide mb-1">Amit Singh</h4>
                      <p className="text-accent text-xs uppercase tracking-widest font-semibold">Founder & Managing Partner</p>
                    </div>
                  </div>

                  {/* Ajeet Singh Card */}
                  <div className="group bg-zinc-900/80 p-6 rounded-3xl border border-white/10 hover:border-accent/40 transition-all duration-500 shadow-xl flex flex-col justify-between sm:mt-12">
                    <div>
                      <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-accent/20 bg-zinc-900 mb-6 relative">
                        <img
                          src="/PHOTO-2.jpg"
                          alt="Ajeet Singh"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <span className="absolute bottom-4 left-4 px-3 py-1 bg-accent/20 backdrop-blur-md border border-accent/35 text-accent text-[10px] uppercase tracking-widest font-semibold rounded-full">
                          Operations
                        </span>
                      </div>
                      <h4 className="text-white font-serif text-2xl font-bold tracking-wide mb-1">Ajit Singh</h4>
                      <p className="text-accent text-xs uppercase tracking-widest font-semibold">Director of Strategy & Operations</p>
                    </div>
                  </div>

                </div>
              </FadeIn>

              {/* Founder Quote / Description */}
              <SlideUp delay={0.2}>
                <div className="max-w-2xl">
                  <Quote className="size-10 text-accent/40 mb-6" />
                  <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-serif text-white mb-8 leading-snug italic tracking-wide">
                    "Real estate in NCR has evolved. It’s no longer just about buying property; it’s about strategic wealth creation and absolute peace of mind."
                  </h2>
                  <p className="text-lg text-zinc-400 font-light leading-relaxed mb-6">
                    The NCR real estate market is incredibly dynamic, but it can also be overwhelming. We founded CSA Prime Realty with a singular mission: to cut through the market noise and offer a strictly advisory-led approach. No aggressive sales pitches, no hidden clauses—just data-backed insights and strict RERA compliance.
                  </p>
                  <p className="text-lg text-zinc-400 font-light leading-relaxed mb-10">
                    Whether you are looking for a luxury residence in Noida or a high-yield commercial asset on the Yamuna Expressway, our team personally vets every project before it reaches your desk. We don't just facilitate transactions; we fiercely protect your interests.
                  </p>

                  <div className="flex flex-col">
                    <p className="text-3xl font-serif text-white tracking-wide mb-1">Amit Singh & Ajeet Singh</p>
                    <p className="text-accent uppercase tracking-[0.2em] text-[10px] font-bold">Leadership Board, CSA Prime Realty</p>
                  </div>
                </div>
              </SlideUp>

            </div>
          </Container>
        </section>

        {/* ============ FOOLPROOF STATS SECTION ============ */}
        <section className="py-20 mb-10">
          <Container>
            <div className="bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl p-8 sm:p-12 lg:p-16">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 sm:gap-x-10">
                <div className="text-center">
                  <h3 className="text-4xl sm:text-5xl font-serif text-white mb-2 whitespace-nowrap">₹500<span className="text-[#C5A059] text-3xl sm:text-4xl">Cr+</span></h3>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-zinc-400 font-semibold mt-2">Assets Managed</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl sm:text-5xl font-serif text-white mb-2 whitespace-nowrap">1,200<span className="text-[#C5A059] text-3xl sm:text-4xl">+</span></h3>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-zinc-400 font-semibold mt-2">Families Advised</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl sm:text-5xl font-serif text-white mb-2 whitespace-nowrap">10<span className="text-[#C5A059] text-3xl sm:text-4xl">+</span></h3>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-zinc-400 font-semibold mt-2">Years of Trust</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl sm:text-5xl font-serif text-white mb-2 whitespace-nowrap">40<span className="text-[#C5A059] text-3xl sm:text-4xl">+</span></h3>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-zinc-400 font-semibold mt-2">Premium Projects</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ============ CORE VALUES ============ */}
        <section className="relative py-24 border-t border-white/5">
          <Container>
            <SectionHeader
              align="center"
              eyebrow="The CSA Standard"
              title="Uncompromising Values"
              description="What sets our advisory apart in a crowded and noisy real estate market."
            />

            <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-20">
              {CORE_VALUES.map((val, idx) => (
                <div key={idx} className="group p-10 bg-card rounded-[2rem] border border-white/5 hover:border-accent/30 hover:bg-white/[0.03] transition-all duration-500 shadow-lg hover:shadow-luxury-md">
                  <div className="text-accent mb-8 bg-accent/10 w-16 h-16 flex items-center justify-center rounded-2xl border border-accent/20 group-hover:scale-110 transition-transform duration-500">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-serif text-white mb-4">{val.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm font-light">
                    {val.description}
                  </p>
                </div>
              ))}
            </Stagger>
          </Container>
        </section>

      </main>

      <Footer columns={FOOTER_COLUMNS} phone={SITE.phone} email={SITE.email} address={SITE.address} socials={[]} />
    </div>
  );
}