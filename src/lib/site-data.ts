/**
 * Static demo content for CSA Prime Realty public site.
 * Swap for Supabase-backed queries when the CMS lands.
 */
import type { NavItem, FooterColumn, PropertyCardData, BuilderCardData, LocationCardData, TestimonialCardData, BlogCardData, StatsCardData, FeatureCardData } from "@/components/design-system";

export const SITE = {
  brand: "CSA Prime Realty",
  tagline: "Luxury Homes · Noida · Greater Noida · Yamuna Expressway",
  phone: "+91 8087806371", // Calling wala number
  whatsapp: "+91 9511811326", // WhatsApp wala number
  email: "hello@csaprimerealty.com",
  address: "A4 Tower - 1205A, Amrapali Dream Valley Phase 2, Tech Zone IV, Greater Noida West, U.P.",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "New Launches", href: "/new-launches" },
  { label: "Builders", href: "/builders" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Explore",
    links: [
      { label: "Buy Properties", href: "/buy" },
      { label: "Rent Properties", href: "/rent" },
      { label: "New Launches", href: "/new-launches" },
      { label: "Commercial", href: "/commercial" },
      { label: "Plots", href: "/plots" },
    ],
  },
  {
    heading: "Locations",
    links: [
      { label: "Noida", href: "/noida" },
      { label: "Greater Noida", href: "/greater-noida" },
      { label: "Yamuna Expressway", href: "/yamuna-expressway" },
      { label: "Noida Extension", href: "/noida-extension" },
      { label: "All Localities", href: "/localities" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "RERA Disclosures", href: "/rera" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export const HERO_STATS = [
  { label: "Curated Homes", value: 1240 },
  { label: "Happy Families", value: 3800 },
  { label: "Premium Builders", value: 42 },
  { label: "Cities Covered", value: 6 },
];

export const FEATURED_PROPERTIES: PropertyCardData[] = [
  {
    slug: "the-arbour-noida-150",
    title: "The Arbour by ATS",
    price: "₹3.85 Cr",
    pricePerSqft: "₹14,200/sq.ft",
    configuration: "4 BHK · Duplex",
    bedrooms: 4, bathrooms: 4,
    area: "2,710 sq.ft",
    location: "Sector 150, Noida",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    photoCount: 24,
    badges: [{ label: "New Launch", tone: "accent" }, { label: "RERA Approved", tone: "success" }],
    developer: "ATS Homekraft",
    possession: "Dec 2027",
  },
  {
    slug: "godrej-tropical-isle",
    title: "Godrej Tropical Isle",
    price: "₹2.45 Cr",
    pricePerSqft: "₹12,900/sq.ft",
    configuration: "3 BHK · Premium",
    bedrooms: 3, bathrooms: 3,
    area: "1,900 sq.ft",
    location: "Sector 146, Noida",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    photoCount: 18,
    badges: [{ label: "Hot", tone: "warning" }, { label: "Premium", tone: "premium" }],
    developer: "Godrej Properties",
    possession: "Jun 2026",
  },
  {
    slug: "m3m-cullinan-noida",
    title: "M3M The Cullinan",
    price: "₹5.20 Cr",
    pricePerSqft: "₹18,400/sq.ft",
    configuration: "4 BHK · Sky Villa",
    bedrooms: 4, bathrooms: 5,
    area: "2,830 sq.ft",
    location: "Sector 94, Noida",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    photoCount: 32,
    badges: [{ label: "Ultra-Luxury", tone: "premium" }],
    developer: "M3M India",
    possession: "Ready to Move",
  },
  {
    slug: "county-107-noida",
    title: "County 107",
    price: "₹1.85 Cr",
    pricePerSqft: "₹9,850/sq.ft",
    configuration: "3 BHK · Modern",
    bedrooms: 3, bathrooms: 3,
    area: "1,875 sq.ft",
    location: "Sector 107, Noida",
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
    photoCount: 21,
    badges: [{ label: "Best Value", tone: "success" }],
    developer: "County Group",
    possession: "Mar 2026",
  },
  {
    slug: "ace-parkway-greater-noida",
    title: "ACE Parkway",
    price: "₹1.42 Cr",
    pricePerSqft: "₹8,900/sq.ft",
    configuration: "3 BHK · Garden Facing",
    bedrooms: 3, bathrooms: 3,
    area: "1,595 sq.ft",
    location: "Sector 150, Noida",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    photoCount: 16,
    badges: [{ label: "Ready to Move", tone: "success" }],
    developer: "ACE Group",
    possession: "Ready",
  },
  {
    slug: "prateek-canary",
    title: "Prateek Canary",
    price: "₹2.10 Cr",
    pricePerSqft: "₹11,400/sq.ft",
    configuration: "3 BHK · Corner",
    bedrooms: 3, bathrooms: 3,
    area: "1,840 sq.ft",
    location: "Sector 150, Noida",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    photoCount: 19,
    badges: [{ label: "Trending", tone: "accent" }],
    developer: "Prateek Group",
    possession: "Aug 2026",
  },
];

export const TOP_LOCATIONS: LocationCardData[] = [
  { slug: "sector-150-noida", name: "Sector 150", city: "Noida", propertiesCount: 128, priceRange: "₹1.4 Cr+", image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80" },
  { slug: "sector-128-noida", name: "Sector 128", city: "Noida", propertiesCount: 96, priceRange: "₹2.1 Cr+", image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80" },
  { slug: "sector-94-noida", name: "Sector 94", city: "Noida", propertiesCount: 47, priceRange: "₹4.8 Cr+", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80" },
  { slug: "yamuna-expressway", name: "Yamuna Expressway", city: "Greater Noida", propertiesCount: 184, priceRange: "₹65 L+", image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=800&q=80" },
  { slug: "pari-chowk", name: "Pari Chowk", city: "Greater Noida", propertiesCount: 72, priceRange: "₹85 L+", image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80" },
  { slug: "noida-extension", name: "Noida Extension", city: "Greater Noida West", propertiesCount: 210, priceRange: "₹55 L+", image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80" },
];

export const TOP_BUILDERS: BuilderCardData[] = [
  { slug: "godrej-properties", name: "Godrej Properties", logo: "https://api.dicebear.com/7.x/initials/svg?seed=Godrej&backgroundColor=0F172A&textColor=ffffff", projectsCount: 12, cities: ["Noida", "Greater Noida"], tagline: "Homes crafted for the future." },
  { slug: "ats-homekraft", name: "ATS Homekraft", logo: "https://api.dicebear.com/7.x/initials/svg?seed=ATS&backgroundColor=2563EB&textColor=ffffff", projectsCount: 9, cities: ["Noida"], tagline: "Space. Air. Light." },
  { slug: "m3m-india", name: "M3M India", logo: "https://api.dicebear.com/7.x/initials/svg?seed=M3M&backgroundColor=B8860B&textColor=ffffff", projectsCount: 7, cities: ["Noida", "Gurgaon"], tagline: "Trilogy of Magnificence." },
  { slug: "ace-group", name: "ACE Group", logo: "https://api.dicebear.com/7.x/initials/svg?seed=ACE&backgroundColor=0F172A&textColor=ffffff", projectsCount: 14, cities: ["Noida", "Greater Noida"], tagline: "Creating landmarks." },
];

export const FEATURES: FeatureCardData[] = [
  { title: "RERA Verified", description: "Every listing is vetted for RERA compliance, title clarity and developer credentials." },
  { title: "Curated Inventory", description: "Only handpicked luxury and premium projects — never a wall of undifferentiated listings." },
  { title: "White-Glove Advisory", description: "Dedicated relationship managers guide you across shortlisting, site visits and closing." },
  { title: "Zero Brokerage on Select Homes", description: "Buy directly from developer inventory with transparent pricing and no hidden costs." },
];

export const TESTIMONIALS: TestimonialCardData[] = [
  { quote: "CSA made buying our first home in Noida effortless. Their advisory felt like a private banker for real estate.", name: "Anika & Raghav Mehta", role: "Homeowners · Sector 150", rating: 5, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Anika" },
  { quote: "The team walked us through 14 shortlisted units, financing options and legal diligence — end to end.", name: "Kunal Sharma", role: "Investor · Yamuna Expressway", rating: 5, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Kunal" },
  { quote: "Rare in Indian real estate: honesty, follow-through, and zero pressure. Highly recommend.", name: "Dr. Priya Nair", role: "Homeowner · Sector 128", rating: 5, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Priya" },
];

export const INSIGHTS: BlogCardData[] = [
  { slug: "noida-price-trends-2026", title: "Noida Luxury Market Report — Q3 2026", excerpt: "Sector 150 leads YoY appreciation at 22%. Full breakdown of micro-markets, absorption and pipeline supply.", cover: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80", category: "Market Report", readingTime: "8 min read", publishedAt: "2026-07-12", author: { name: "CSA Research", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CSA" } },
  { slug: "guide-to-rera-verification", title: "The Buyer's Guide to RERA Verification", excerpt: "A step-by-step walkthrough of what to verify before signing — from title deeds to encumbrance certificates.", cover: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1000&q=80", category: "Guide", readingTime: "12 min read", publishedAt: "2026-06-28", author: { name: "Legal Desk", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Legal" } },
  { slug: "yamuna-expressway-investment", title: "Why the Yamuna Expressway is 2026's Best Bet", excerpt: "With the Jewar Airport opening in phases, corridor land values are re-rating. Where to enter and at what ticket.", cover: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1000&q=80", category: "Investment", readingTime: "6 min read", publishedAt: "2026-06-14", author: { name: "Investment Desk", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Invest" } },
];
export const SITE = {
  name: "CSA Prime Realty",
  phone: "+91 98765 43210", // Apna phone number yahan daalein
  email: "advisory@csaprimerealty.com",
  address: "Noida & Yamuna Expressway, NCR, India",
  socials: {
    instagram: "https://instagram.com/csaprimerealty",
    facebook: "https://facebook.com/csaprimerealty",
    linkedin: "https://linkedin.com/company/csaprimerealty", // (Aapka 'inded' matlab LinkedIn ho sakta hai, URL yahan update kar dein)
  },
};