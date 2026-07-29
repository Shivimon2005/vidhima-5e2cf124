import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import LeadForm from "@/components/LeadForm";
import { CheckCircle2, ArrowRight, MapPin, Phone, Shield, Building2, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What is the construction cost per sq ft in Kangra district in 2026?",
    a: "Across Kangra district, residential construction rates range from ₹1,400–₹1,700/sq ft for basic RCC finish to ₹2,500+/sq ft for premium builds. Rates vary by sub-location: Kangra town, Nurpur, and Dehra Gopipur tend to have better road access and lower logistics costs compared to more remote hill locations.",
  },
  {
    q: "Do you build across all of Kangra district — not just Palampur?",
    a: "Yes. We serve the entire Kangra district including Kangra town, Nurpur, Nagrota Bagwan, Dehra Gopipur, Jawali, Fatehpur, and surrounding areas. Our own equipment fleet allows us to operate where external contractors cannot easily reach.",
  },
  {
    q: "What is the typical home construction timeline in Kangra?",
    a: "A G+1 or G+2 house in Kangra district typically takes 14–20 months from plot assessment to handover — including 2–4 months for TCP NOC approval, foundation and structure (4–6 months), and finishes (4–6 months). Monsoon months (July–October) are planned around accordingly.",
  },
  {
    q: "Are you empanelled for government construction tenders in Kangra?",
    a: "Yes. Vidhima Construction is HPPWD-empanelled Class-I contractor. We execute government contracts including roads, government buildings, drainage, and slope protection works across Kangra district alongside our private client work.",
  },
  {
    q: "Do you build commercial buildings like shops and offices in Kangra?",
    a: "Yes. We build commercial projects including row shops, office blocks, mixed-use buildings, and small commercial complexes across Kangra district. Commercial projects start from ₹50 lakh.",
  },
];

const LocationKangra = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "GeneralContractor"],
            "@id": "https://vidhimaconstruction.com/#organization",
            name: "Vidhima Construction Private Limited",
            description: "Turnkey home builder and construction company serving Kangra district, Himachal Pradesh.",
            telephone: "+916230823269",
            url: "https://vidhimaconstruction.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Near SSB Chowk",
              addressLocality: "Palampur",
              addressRegion: "Himachal Pradesh",
              postalCode: "176061",
              addressCountry: "IN",
            },
            areaServed: { "@type": "AdministrativeArea", name: "Kangra District, Himachal Pradesh" },
          }),
        }}
      />

      {/* Hero */}
      <section className="py-20 bg-forest-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.07),transparent_60%)] pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: "Construction in Kangra" }]} className="mb-4" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Kangra District, Himachal Pradesh</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
              Home Builder in Kangra
            </h1>
            <p className="opacity-90 text-base md:text-lg leading-relaxed max-w-2xl font-light mb-8">
              Vidhima Construction is your trusted home builder across Kangra district — Kangra town, Nurpur, Jawali, Dehra, Baijnath, and beyond. HPPWD Class-I registered. 100% price-lock guarantee.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" variant="accent" className="font-semibold">
                  Get Free Estimate <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <a href="tel:+916230823269">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
                  <Phone className="w-4 h-4 mr-2" />
                  Call +91 62308 23269
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 bg-muted/40 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { Icon: Shield, label: "HPPWD Class-I Registered", sub: "Government-grade credibility" },
              { Icon: CheckCircle2, label: "100% Fixed Price", sub: "No mid-project cost surprises" },
              { Icon: Clock, label: "Free Site Visit", sub: "Within 48 hours of enquiry" },
              { Icon: Building2, label: "Residential & Commercial", sub: "Homes, shops, offices, complexes" },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2 p-4 bg-card rounded-xl border border-border shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-semibold text-sm text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Coverage */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              We Build Across All of Kangra District
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Kangra district spans a vast and varied terrain — from the plains of Nurpur and Dehra Gopipur to the hills of Palampur and the high reaches of Baijnath. We operate across the entire district with our own equipment, so your location doesn't add uncertainty to your project.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
              {["Kangra Town", "Palampur", "Dharamshala", "Baijnath", "Nurpur", "Dehra Gopipur", "Jawali", "Nagrota Bagwan", "Fatehpur"].map((loc) => (
                <div key={loc} className="flex items-center gap-2 bg-card rounded-lg p-3 border border-border text-sm">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground font-medium">{loc}</span>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 mt-8">
              What We Build in Kangra
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Residential Homes (Turnkey)", desc: "G+1 to G+3 homes from empty plot to finished handover. Fixed-price contracts, architectural design, TCP NOC, and complete construction included." },
                { title: "Commercial Buildings", desc: "Row shops, office blocks, and mixed-use buildings across Kangra district. From ₹50 lakh to ₹5 crore+. Milestone-linked payments." },
                { title: "Government Contract Works", desc: "HPPWD-empanelled for roads, government buildings, drainage, and slope stabilisation across Kangra. Trusted by state and central departments." },
                { title: "Agricultural / Hill Farmhouse", desc: "Traditional HP-style farmhouses and modern hillside cottages on agricultural land (where construction is permitted). We advise on land use permissions." },
              ].map((item) => (
                <div key={item.title} className="bg-card rounded-xl p-6 border border-border shadow-sm">
                  <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Snapshot */}
      <section className="py-16 bg-muted/40 border-y border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">House Construction Cost in Kangra District — 2026</h2>
            <div className="overflow-x-auto rounded-xl border border-border mt-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-3 font-semibold text-foreground">Package</th>
                    <th className="text-left p-3 font-semibold text-foreground">Rate / sq ft</th>
                    <th className="text-left p-3 font-semibold text-foreground">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pkg: "Basic", rate: "₹1,400–₹1,700", inc: "Budget-conscious builds with strong structure and essential finishes" },
                    { pkg: "Standard", rate: "₹1,800–₹2,200", inc: "Comfortable family homes with quality tiles, fittings, and UPVC windows", popular: true },
                    { pkg: "Premium", rate: "₹2,500+", inc: "Fully custom builds with imported fittings, premium stone, and landscaping" },
                  ].map(({ pkg, rate, inc, popular }) => (
                    <tr key={pkg} className={`border-b border-border last:border-0 ${popular ? "bg-primary/5" : ""}`}>
                      <td className="p-3 font-semibold text-foreground">
                        {pkg}
                        {popular && <span className="ml-2 text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Most Popular</span>}
                      </td>
                      <td className="p-3 text-accent font-semibold">{rate}</td>
                      <td className="p-3 text-muted-foreground">{inc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to="/services" className="inline-block mt-6">
              <Button variant="outline">See Full Pricing & Packages <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
              Frequently Asked Questions — Home Builder in Kangra
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left gap-4" aria-expanded={openFaq === i}>
                    <span className="font-semibold text-sm text-foreground">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">Free Consultation</span>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">Build Your Home in Kangra</h2>
              <p className="opacity-90 text-sm md:text-base leading-relaxed mb-6 font-light">
                Tell us your location in Kangra district and we'll organise a free site visit and preliminary estimate within 48 hours.
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                {["Free site visit anywhere in Kangra district", "Fixed-price contract, no surprises", "TCP NOC handled for you", "HPPWD Class-I registered"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LocationKangra;
