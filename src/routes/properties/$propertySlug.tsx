import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  Navbar, Footer, Container, FadeIn, SlideUp 
} from "@/components/design-system";
import { NAV_ITEMS, SITE, FOOTER_COLUMNS, FEATURED_PROPERTIES } from "@/lib/site-data";
import { ArrowLeft, MapPin, CheckCircle, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/properties/$propertySlug")({
  component: PropertyDetailsPage,
});

function PropertyDetailsPage() {
  const { propertySlug } = Route.useParams();
  
  // URL mein jo naam hai, usko apne data mein dhoondhna
  const property = FEATURED_PROPERTIES.find(p => p.slug === propertySlug);

  // Agar property nahi mili (jaise koi galat URL daal de)
  if (!property) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-white">
        <Navbar items={NAV_ITEMS} phone={SITE.phone} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold mb-4 text-primary">Property Not Found</h1>
            <p className="text-muted-foreground mb-8">The luxury asset you are looking for does not exist or has been sold.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-accent transition-colors shadow-lg">
              <ArrowLeft className="size-4" /> Back to Portfolio
            </Link>
          </div>
        </main>
        <Footer columns={FOOTER_COLUMNS} phone={SITE.phone} email={SITE.email} address={SITE.address} socials={[]} />
      </div>
    );
  }

  // Agar property mil gayi toh uska page dikhana
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-white">
      <Navbar items={NAV_ITEMS} phone={SITE.phone} />

      <main className="flex-1 pt-32 pb-20">
        <Container>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="size-4" /> Back to Portfolio
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side: Property Image */}
            <FadeIn>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-luxury-xl sticky top-32">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </FadeIn>

            {/* Right Side: Property Details */}
            <SlideUp>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-semibold uppercase tracking-widest text-accent mb-6 shadow-sm">
                <ShieldCheck className="size-4" /> Premium Listing
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary font-bold mb-4 leading-tight">
                {property.title}
              </h1>
              
              <div className="flex items-center gap-2 text-secondary font-medium mb-8">
                <MapPin className="size-5 text-accent" />
                <span className="text-lg">{property.location}</span>
              </div>
              
              <div className="text-4xl font-serif text-primary mb-10 border-b border-border pb-8">
                {property.price}
              </div>

              <div className="space-y-6 mb-10">
                <h3 className="text-2xl font-serif font-bold text-primary">About this Property</h3>
                <p className="text-secondary leading-relaxed">
                  A rare opportunity to acquire a prestigious asset in one of NCR's most sought-after corridors. 
                  This meticulously designed property offers unparalleled luxury, premium amenities, and a lifestyle 
                  of absolute comfort. Perfectly suited for discerning buyers seeking exclusivity and high long-term capital appreciation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-y-5 gap-x-8 mb-12">
                <div className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle className="size-5 text-accent" />
                  <span>Prime Location</span>
                </div>
                <div className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle className="size-5 text-accent" />
                  <span>High ROI Potential</span>
                </div>
                <div className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle className="size-5 text-accent" />
                  <span>RERA Approved</span>
                </div>
                <div className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle className="size-5 text-accent" />
                  <span>Luxury Amenities</span>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => window.open("https://wa.me/919876543210?text=I am interested in knowing more about " + property.title, "_blank")}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-accent transition-all shadow-lg text-lg flex items-center justify-center gap-3"
              >
                Schedule a Private Viewing
              </button>
            </SlideUp>
          </div>
        </Container>
      </main>

      <Footer columns={FOOTER_COLUMNS} phone={SITE.phone} email={SITE.email} address={SITE.address} socials={[]} />
    </div>
  );
}