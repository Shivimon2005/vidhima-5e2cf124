import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import LeadForm from "@/components/LeadForm";
import {
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  Shield,
  Mountain,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What is the construction cost per sq ft in Palampur in 2026?",
    a: "Construction rates in Palampur range from ₹1,400–₹1,700/sq ft for basic RCC finish, ₹1,800–₹2,200/sq ft for standard finish with vitrified tiles and UPVC windows, and ₹2,500+/sq ft for premium custom builds. Sloped plot sites in Palampur carry an additional 10–25% premium for retaining walls and stepped foundations.",
  },
  {
    q: "Do I need TCP NOC for construction in Palampur?",
    a: "Yes. Palampur falls within a Notified Planning Area under the HP TCP Act. Any construction above one storey or over 50 sq metres requires a TCP NOC from the Town & Country Planning Department in Dharamshala. Vidhima Construction manages this entire process for our clients.",
  },
  {
    q: "How long does house construction take in Palampur?",
    a: "A typical G+1 or G+2 house in Palampur takes 12–18 months from approved plan to handover. This includes 2–4 months for TCP NOC approval, then 10–14 months of active construction (accounting for Palampur's heavy monsoon season from July–October).",
  },
  {
    q: "Can you build on sloped plots in Palampur?",
    a: "Yes — in fact, most plots in Palampur are sloped. We specialise in stepped foundation design, retaining wall construction, and cut-and-fill earthwork for hill terrain. We also provide slope stability assessments before committing to a foundation design.",
  },
  {
    q: "Do you handle everything from design to handover?",
    a: "Yes. Our turnkey service covers architectural design, structural engineering, TCP NOC, site supervision, construction, and final handover — all under one fixed-price contract. You get one point of contact and zero surprises.",
  },
];

const LocationPalampur = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="pt-20">
      {/* LocalBusiness + ServiceArea Schema for Palampur */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "GeneralContractor"],
            "@id": "https://vidhimaconstruction.com/#organization",
            name: "Vidhima Construction Private Limited",
            description:
              "Turnkey construction company in Palampur, Himachal Pradesh — building homes and commercial spaces with a 100% price-lock guarantee.",
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
            areaServed: { "@type": "City", name: "Palampur" },
          }),
        }}
      />

      {/* Hero */}
      <section className="py-20 bg-forest-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.07),transparent_60%)] pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: "Construction in Palampur" }]} className="mb-4" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Palampur, Kangra District, HP</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
              Construction Company in Palampur
            </h1>
            <p className="opacity-90 text-base md:text-lg leading-relaxed max-w-2xl font-light mb-8">
              Vidhima Construction builds homes and commercial spaces across Palampur. HPPWD Class-I registered. 100% price-lock guarantee. Free site visit within 48 hours.
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
              { Icon: Shield, label: "HPPWD Class-I Registered", sub: "Highest contractor grade in HP" },
              { Icon: CheckCircle2, label: "100% Fixed Price", sub: "No mid-project cost surprises" },
              { Icon: Clock, label: "Free Site Visit", sub: "Within 48 hours of enquiry" },
              { Icon: Mountain, label: "Hill Terrain Experts", sub: "Sloped plots & Zone IV seismic" },
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

      {/* Why Palampur Needs Specialist Builders */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Why Construction in Palampur Needs a Specialist
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Palampur sits in the foothills of the Dhauladhar range. Seismic Zone IV classification, heavy monsoon runoff, and predominantly sloped terrain mean that standard plain-region construction methods are inadequate here.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { title: "Seismic Zone IV Engineering", desc: "All our buildings use ductile RCC detailing and column-beam connections certified for Zone IV seismic loads — mandatory for safety in Kangra district." },
                { title: "Sloped Plot Foundation Design", desc: "Stepped foundations, retaining walls, and cut-and-fill earthwork designed by structural engineers. We provide slope stability assessments before foundation work." },
                { title: "TCP NOC Management", desc: "Palampur falls in a TCP Notified Planning Area. We handle all drawings, submission, and follow-up — you don't need to visit the TCP office yourself." },
                { title: "Monsoon-Aware Scheduling", desc: "We plan construction phases around Palampur's July–October monsoon so structural concrete is never poured in conditions that compromise curing quality." },
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
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
              Construction Cost in Palampur — 2026 Rates
            </h2>
            <p className="text-muted-foreground text-sm mb-8">Realistic market rates for Palampur and surrounding Kangra district.</p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-3 font-semibold text-foreground">Package</th>
                    <th className="text-left p-3 font-semibold text-foreground">Rate / sq ft</th>
                    <th className="text-left p-3 font-semibold text-foreground">What's Included</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pkg: "Basic", rate: "₹1,400–₹1,700", inc: "RCC structure, basic tiles, standard plumbing & electrical" },
                    { pkg: "Standard", rate: "₹1,800–₹2,200", inc: "Vitrified tiles, UPVC windows, premium CP fittings, modular kitchen ready", popular: true },
                    { pkg: "Premium", rate: "₹2,500+", inc: "Architect design, stone/wood cladding, imported fittings, landscaping" },
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
            <p className="text-xs text-muted-foreground mt-4">* Sloped plots carry an additional 10–25% premium. Land cost and government fees are separate.</p>
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
              Frequently Asked Questions — Construction in Palampur
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left gap-4"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-sm text-foreground">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">{faq.a}</div>
                  )}
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
              <h2 className="font-serif text-3xl md:text-4xl mb-4">Start Your Palampur Project Today</h2>
              <p className="opacity-90 text-sm md:text-base leading-relaxed mb-6 font-light">
                Tell us about your plot or project and our team will get back to you within 48 hours with a preliminary estimate — free, no obligation.
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                {["Free site visit within 48 hours", "Transparent fixed-price quote", "TCP NOC handled for you", "HPPWD Class-I registered team"].map((item) => (
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

export default LocationPalampur;
