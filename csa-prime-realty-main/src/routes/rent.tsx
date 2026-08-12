import { createFileRoute } from "@tanstack/react-router";
import { Key, Briefcase, UserCheck, Clock, Sparkles } from "lucide-react";
import { 
  Navbar, Footer, Container, SectionHeader, 
  FadeIn, SlideUp, Stagger, PropertyCard 
} from "@/components/design-system";
import { NAV_ITEMS, SITE, FOOTER_COLUMNS } from "@/lib/site-data";

export const Route = createFileRoute("/rent")({
  component: RentPage,
});

// 🏡 SPECIAL LUXURY RENTAL DATA (Price in Lakhs/Month)
const RENTAL_PROPERTIES = [
  {
    slug: "jaypee-villa-rent",
    title: "Jaypee Greens Golf Villa",
    price: "₹3.50 Lac/mo",
    pricePerSqft: "Fully Furnished",
    configuration: "5 BHK · Golf Facing",
    bedrooms: 5, bathrooms: 6,
    area: "5,500 sq.ft",
    location: "Jaypee Greens, Greater Noida",
    image: "https://images.unsplash.com/photo-1613490908592-fd5e16f024cd?auto=format&fit=crop&w=1200&q=80",
    photoCount: 15,
    badges: [{ label: "Expat Friendly", tone: "premium" as const }, { label: "Available", tone: "success" as const }],
    developer: "Jaypee Group",
    possession: "Ready to Move",
  },
  {
    slug: "ats-knightsbridge-rent",
    title: "ATS Knightsbridge",
    price: "₹2.75 Lac/mo",
    pricePerSqft: "Semi-Furnished",
    configuration: "4 BHK · Super Luxury",
    bedrooms: 4, bathrooms: 5,
    area: "6,000 sq.ft",
    location: "Sector 124, Noida",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    photoCount: 22,
    badges: [{ label: "Corporate Lease", tone: "accent" as const }],
    developer: "ATS Group",
    possession: "Available Next Month",
  },
  {
    slug: "dlf-privana-rent",
    title: "County 107 (Lease)",
    price: "₹1.20 Lac/mo",
    pricePerSqft: "Fully Furnished",
    configuration: "3 BHK · Premium",
    bedrooms: 3, bathrooms: 3,
    area: "2,000 sq.ft",
    location: "Sector 107, Noida",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    photoCount: 18,
    badges: [{ label: "Hot Deal", tone: "warning" as const }],
    developer: "County Group",
    possession: "Ready to Move",
  }
];

// 🤝 WHY RENT WITH CSA PRIME
const LEASING_SERVICES = [
  { 
    title: "Corporate Relocation", 
    description: "Seamless transitions for C-suite executives and expats with fully furnished, move-in ready residences.", 
    icon: <Briefcase className="size-6" /> 
  },
  { 
    title: "Vetted Clientele", 
    description: "For owners, we ensure rigorous background checks and high-profile corporate tenant matching.", 
    icon: <UserCheck className="size-6" /> 
  },
  { 
    title: "Zero-Hassle Paperwork", 
    description: "End-to-end legal documentation, police verification, and society NOCs handled by our expert team.", 
    icon: <Key className="size-6" /> 
  },
  { 
    title: "24/7 Concierge Support", 
    description: "Dedicated relationship managers to assist with move-in logistics and ongoing maintenance coordination.", 
    icon: <Clock className="size-6" /> 
  },
];

function RentPage() {
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
                <Sparkles className="size-3.5" /> Premium Leasing
              </span>
            </FadeIn>
            <SlideUp delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight leading-[1.1]">
                Curated Luxury <br />
                <span className="bg-gradient-to-r from-[#F5D78D] via-[#C5A059] to-[#8A6A24] bg-clip-text text-transparent">
                  Rentals.
                </span>
              </h1>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto">
                Discover NCR's most exclusive rental properties. From golf-facing villas to ultra-modern penthouses, designed for those who refuse to compromise on their lifestyle.
              </p>
            </SlideUp>
          </div>
        </Container>

        {/* ============ RENTAL PROPERTIES GRID ============ */}
        <section className="py-16">
          <Container>
            <SectionHeader 
              align="left"
              eyebrow="Available Now"
              title="Exclusive Portfolio"
            />
            
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
              {RENTAL_PROPERTIES.map((property) => (
                <PropertyCard key={property.slug} data={property} />
              ))}
            </Stagger>
          </Container>
        </section>

        {/* ============ LEASING EXPERTISE (SERVICES) ============ */}
        <section className="relative py-24 mt-12 bg-zinc-950/80 border-y border-white/5">
          <div className="absolute inset-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
          <Container>
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                Not just finding a house. <br />
                <span className="text-zinc-500">Elevating your living experience.</span>
              </h2>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Our leasing division specializes in matching high-net-worth individuals and corporate expats with the finest addresses in Noida and Greater Noida.
              </p>
            </div>
            
            <Stagger className="grid gap-8 sm:grid-cols-2 mt-10">
              {LEASING_SERVICES.map((service, idx) => (
                <div key={idx} className="flex gap-6 p-8 bg-[#0a0a0a] rounded-3xl border border-white/5 hover:border-accent/30 hover:bg-white/[0.02] transition-all duration-500 shadow-lg">
                  <div className="text-accent shrink-0 bg-accent/10 w-14 h-14 flex items-center justify-center rounded-full border border-accent/20">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white mb-3">{service.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm font-light">
                      {service.description}
                    </p>
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