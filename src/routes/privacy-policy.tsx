import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer, Container } from "@/components/design-system";
import { NAV_ITEMS, SITE, FOOTER_COLUMNS } from "@/lib/site-data";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy | CSA Prime Realty Noida" },
      { name: "description", content: "Read the privacy policy of CSA Prime Realty. Learn how we collect, use, and protect your personal and property inquiry data." },
    ],
  }),
});

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-black">
      <Navbar items={NAV_ITEMS} phone={SITE.phone} />

      <main className="flex-1 pt-32 pb-20">
        <Container className="max-w-4xl">
          
          <div className="bg-card border border-border p-8 md:p-12 rounded-[2.5rem] shadow-luxury-sm space-y-8">
            
            <div className="border-b border-border pb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                <ShieldCheck className="size-4" /> Data Protection & Security
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-foreground">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground mt-2">Last updated: July 2026</p>
            </div>

            <div className="space-y-6 text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
              
              <section className="space-y-3">
                <h2 className="text-xl font-serif font-semibold text-foreground">1. Introduction</h2>
                <p>
                  Welcome to <strong>CSA Prime Realty</strong> ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-serif font-semibold text-foreground">2. Information We Collect</h2>
                <p>
                  When you interact with our platform (such as inquiring about Dream Valley Phase 2 or scheduling a VIP consultation), we may collect the following types of information:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Identity & Contact Data:</strong> Name, phone number, email address, and communication preferences.</li>
                  <li><strong>Property Preferences:</strong> Budget, preferred location (Noida, Greater Noida, etc.), and configuration choice (1/2/3 BHK).</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, and device information gathered through standard analytics.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-serif font-semibold text-foreground">3. How We Use Your Information</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we use your data in the following circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To provide you with requested property details, brochures, and pricing for projects like Dream Valley Phase 2.</li>
                  <li>To schedule site visits and consultations with our real estate experts.</li>
                  <li>To improve our website performance and customer support experience.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-serif font-semibold text-foreground">4. Data Security</h2>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We restrict access to your personal data to agents and personnel who have a business need to know.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-serif font-semibold text-foreground">5. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <p className="font-semibold text-foreground">
                  Email: {SITE.email}<br />
                  Phone: {SITE.phone}<br />
                  Address: {SITE.address}
                </p>
              </section>

            </div>

          </div>

        </Container>
      </main>

      <Footer columns={FOOTER_COLUMNS} phone={SITE.phone} email={SITE.email} address={SITE.address} socials={[]} />
    </div>
  );
}