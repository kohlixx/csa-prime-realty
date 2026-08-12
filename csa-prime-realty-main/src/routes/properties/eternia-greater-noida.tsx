import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer, Container, FadeIn, SlideUp } from "@/components/design-system";
import { NAV_ITEMS, SITE, FOOTER_COLUMNS } from "@/lib/site-data";
import { ShieldCheck, MapPin, Phone, CheckCircle, Gift, Sparkles, Building2 } from "lucide-react";

export const Route = createFileRoute("/properties/eternia-greater-noida")({
    component: EterniaDetailPage,
    head: () => ({
        meta: [
            { title: "Eternia Greater Noida West | 3 & 4 BHK Luxury Residences" },
            { name: "description", content: "Explore Eternia in Techzone IV, Greater Noida West. 3 & 4 BHK spacious residences with G+30 towers, 25000 sq ft clubhouse, and exclusive Housefull Offer." },
        ],
    }),
});

function EterniaDetailPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-white">
            <Navbar items={NAV_ITEMS} phone={SITE.phone} />

            <main className="flex-1 pt-28 pb-20">

                {/* ============ HERO SECTION ============ */}
                <Container className="mb-12">
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-border shadow-luxury-xl bg-card p-8 md:p-16">
                        <div className="absolute inset-0 z-0">
                            {/* Luxury Building Background */}
                            <img
                                src="/eternia.jpg"
                                alt="Eternia Luxury Residences"
                                className="w-full h-full object-cover filter brightness-[0.6]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                        </div>

                        <div className="relative z-10 max-w-3xl text-white">
                            <FadeIn>
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-md shadow-lg">
                                        <ShieldCheck className="size-4" /> NBCC Monitored Project[cite: 1, 2]
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400 backdrop-blur-md shadow-lg">
                                        <Gift className="size-4" /> Housefull Offer Active[cite: 2]
                                    </span>
                                </div>
                            </FadeIn>

                            <SlideUp delay={0.1}>
                                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold mb-4 tracking-tight">
                                    Eternia
                                </h1>
                                <p className="text-2xl font-serif text-accent mb-4">Where Space Breathes & Legacies Bloom[cite: 1]</p>
                                <p className="text-zinc-300 text-base sm:text-lg font-light mb-8 leading-relaxed max-w-2xl">
                                    Tech Zone IV, Greater Noida West[cite: 1, 2] • 3 & 4 BHK Spacious Residences[cite: 1, 2] • 6 Acres | 6 Towers | G+30 Floors[cite: 1]
                                </p>
                            </SlideUp>

                            <SlideUp delay={0.2}>
                                <a
                                    href="https://wa.me/919511811326?text=Hello%20CSA%20Prime%20Realty,%20I%20want%20details%20about%20the%20Eternia%20Housefull%20Offer."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-accent text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-all text-sm shadow-xl"
                                >
                                    <Phone className="size-4" /> Claim Housefull Offer via WhatsApp
                                </a>
                            </SlideUp>
                        </div>
                    </div>
                </Container>

                {/* ============ DETAILS CONTENT ============ */}
                <Container className="mb-16">
                    <div className="grid lg:grid-cols-3 gap-12 items-start">

                        <div className="lg:col-span-2 space-y-10">

                            {/* SPECIAL OFFER BOX */}
                            <div className="bg-gradient-to-br from-yellow-500/10 via-background to-accent/5 border-2 border-yellow-500/30 p-8 md:p-10 rounded-3xl shadow-luxury-md relative overflow-hidden">
                                <div className="absolute -right-10 -top-10 text-yellow-500/10">
                                    <Gift className="size-48" />
                                </div>
                                <h2 className="text-3xl font-serif mb-2 text-primary flex items-center gap-3">
                                    <Sparkles className="size-6 text-yellow-600" /> Limited Time "Housefull Offer"
                                </h2>
                                <p className="text-muted-foreground mb-6 font-medium">Book now at a special price of ₹9,400/sq.ft.* and get your home fully loaded![cite: 2]</p>

                                <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                                    {[
                                        "Air Conditioners - All Rooms",
                                        "Modular Kitchen with Chimney & HOB",
                                        "LED TV - 55 Inches",
                                        "One Air Purifier",
                                        "Geysers & Exhaust Fans in All En-Suites",
                                        "Microwave Oven",
                                        "Ceiling Fans in all Rooms",
                                        "RO Water Purifier",
                                        "Wardrobes in all Bedrooms",
                                        "Video Door Phone & Mesh Doors"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-sm text-foreground font-medium">
                                            <CheckCircle className="size-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                            <span>{item}[cite: 2]</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ABOUT PROJECT */}
                            <div className="bg-card border border-border p-8 md:p-10 rounded-3xl shadow-luxury-sm">
                                <h2 className="text-2xl sm:text-3xl font-serif mb-6 text-primary">Inspired by the Anthurium</h2>
                                <p className="text-secondary leading-relaxed font-light mb-8">
                                    Eternia stands proudly in one of Greater Noida West's most coveted locations. This spacious enclave offers uninterrupted views, a 100m fully developed green belt, and a thoughtfully planned environment. With efficient layouts, a double-height entrance lobby, and 4 lifts per tower, Eternia redefines modern luxury.[cite: 1]
                                </p>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border">
                                    <div>
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Towers</span>
                                        <p className="text-lg font-serif font-bold text-primary">6 Towers (G+30)[cite: 1]</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Clubhouse</span>
                                        <p className="text-lg font-serif font-bold text-primary">25,000 sq.ft.[cite: 1]</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Layout</span>
                                        <p className="text-lg font-serif font-bold text-primary">Symmetrical[cite: 1]</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Connectivity</span>
                                        <p className="text-lg font-serif font-bold text-primary">130m Wide Road[cite: 1]</p>
                                    </div>
                                </div>
                            </div>

                            {/* FLOOR PLANS */}
                            <div className="bg-card border border-border p-8 md:p-10 rounded-3xl shadow-luxury-sm">
                                <h3 className="text-2xl font-serif mb-6 text-primary">Spacious Layouts & Pricing</h3>
                                <div className="space-y-4">
                                    {[
                                        { type: "3 BHK", size: "1,932 sq.ft.", price: "₹1.81 Cr Onwards" },
                                        { type: "3 BHK + Study", size: "2,239 sq.ft.", price: "₹2.26 Cr Onwards" },
                                        { type: "4 BHK + Study", size: "2,625 sq.ft.", price: "₹2.46 Cr Onwards" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-surface-muted border border-border hover:border-accent/50 transition-colors">
                                            <div>
                                                <p className="font-bold text-lg text-primary">{item.type}[cite: 2]</p>
                                                <p className="text-sm text-muted-foreground">Super Area: {item.size}[cite: 2]</p>
                                            </div>
                                            <div className="mt-2 sm:mt-0 text-left sm:text-right">
                                                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Starting Price</p>
                                                <p className="text-xl font-serif font-bold text-accent">{item.price}[cite: 2]</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AMENITIES */}
                            <div className="bg-card border border-border p-8 md:p-10 rounded-3xl shadow-luxury-sm">
                                <h3 className="text-2xl font-serif mb-6 text-primary">Curated 25,000 Sq.Ft. Clubhouse[cite: 1]</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[
                                        "Swimming Pool & Kids Pool", "Gymnasium & Yoga", "Indoor Games Room",
                                        "Billiard Room", "Toddlers' Play Room", "Multipurpose Hall",
                                        "Multipurpose Court", "Chip & Putting Greens", "Senior Citizen Garden",
                                        "Stepped Sitting Plaza", "EV Car Charging Station", "Water Feature & Deck"
                                    ].map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-surface-muted border border-border/50 text-sm text-secondary">
                                            <CheckCircle className="size-4 text-accent flex-shrink-0" />
                                            <span>{amenity}[cite: 1]</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* SIDEBAR */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32 bg-card border border-border p-8 rounded-3xl shadow-luxury-lg space-y-6">

                                <div className="text-center pb-6 border-b border-border">
                                    <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-2">Developed By</span>
                                    <h3 className="text-xl font-serif text-primary">Great Value Realty</h3>
                                    <p className="text-sm font-medium text-muted-foreground mt-1">&</p>
                                    <h3 className="text-xl font-serif text-primary mt-1">Sanskar Realty</h3>
                                    <p className="text-xs text-muted-foreground mt-2 px-4 bg-muted py-2 rounded-lg">A venture of Yatharth Group[cite: 1, 2]</p>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <a
                                        href="https://wa.me/919511811326?text=Hello%20CSA%20Prime%20Realty,%20I%20want%20to%20visit%20the%20Eternia%20site%20in%20Greater%20Noida%20West."
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