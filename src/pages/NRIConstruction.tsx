import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import LeadForm from "@/components/LeadForm";
import { CheckCircle2, ArrowRight, Globe, Phone, Shield, FileCheck, Clock, ChevronDown, ChevronUp, Camera, MessageCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How do I start a construction project in Himachal Pradesh from abroad?",
    a: "The first step is a video consultation with our team to discuss your plot, budget, and timeline. We'll arrange a physical site visit with one of our engineers and send you a detailed preliminary assessment. From there, we prepare architectural drawings, handle all approvals, and manage construction end-to-end. You don't need to travel to India until handover — though you are always welcome to visit at any stage.",
  },
  {
    q: "How do I transfer money for construction from outside India?",
    a: "NRI clients typically use FCNR accounts, NRE accounts, or FEMA-compliant wire transfers for construction payments. We accept milestone-linked payments against physical progress verification. Our accounts are GSTIN registered and all transactions are properly invoiced. We can also advise your CA on the appropriate transfer mechanism.",
  },
  {
    q: "Can I buy land in Himachal Pradesh as an NRI?",
    a: "Under FEMA, NRIs (Indian citizens living abroad) can purchase residential and commercial land in HP. However, agricultural and plantation land requires special RBI permission. OCI card holders have similar rights to NRIs for property purchase. We strongly advise engaging a local HP property lawyer before any land purchase.",
  },
  {
    q: "How do you ensure quality control when I'm not on site?",
    a: "We provide weekly progress reports with timestamped photographs and short videos at key milestones (foundation, plinth, slab pours, etc.). You can also request a live video walkthrough at any time. We use a milestone-payment system — you only pay when physical work is verified complete, giving you full financial control from abroad.",
  },
  {
    q: "What legal approvals do you handle for NRI clients?",
    a: "We handle TCP NOC, structural engineer certification, municipal approval (if applicable), and final occupancy certificate. We can also connect you with a local HP lawyer for land title verification, power of attorney drafting, and property registration assistance.",
  },
  {
    q: "What is the minimum project size you work with for NRI clients?",
    a: "Our minimum project size for NRI clients is typically ₹30 lakh (approx. USD 35,000 at current rates). This covers a compact G+0 or G+1 home. Larger villas, farmhouses, and guesthouses are our most common NRI projects.",
  },
];

const NRIConstruction = () => {
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
            description: "NRI-friendly construction company in Himachal Pradesh. Turnkey home and villa construction for NRI clients in Palampur, Kangra, and Dharamshala with full remote management.",
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
            areaServed: { "@type": "State", name: "Himachal Pradesh" },
          }),
        }}
      />

      {/* Hero */}
      <section className="py-20 bg-forest-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.07),transparent_60%)] pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: "NRI Construction — Himachal Pradesh" }]} className="mb-4" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span>NRI & International Clients</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
              NRI Home Construction in Himachal Pradesh
            </h1>
            <p className="opacity-90 text-base md:text-lg leading-relaxed max-w-2xl font-light mb-8">
              Build your dream home in Palampur, Kangra, or Dharamshala from abroad. Vidhima Construction offers full remote management, transparent milestone payments, and regular visual progress reports — so you're in control from anywhere in the world.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" variant="accent" className="font-semibold">
                  Start Your NRI Project <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <a href="https://wa.me/916230823269?text=Hi%2C%20I%20am%20an%20NRI%20and%20interested%20in%20construction%20in%20Himachal%20Pradesh." target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[hsl(142,70%,35%)] hover:bg-[hsl(142,70%,30%)] text-white font-semibold">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NRI-specific trust signals */}
      <section className="py-12 bg-muted/40 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { Icon: Camera, label: "Weekly Photo Updates", sub: "Timestamped, GPS-tagged progress" },
              { Icon: Shield, label: "Milestone Payments", sub: "Pay only for verified progress" },
              { Icon: FileCheck, label: "All Approvals Managed", sub: "TCP, structural, municipal NOC" },
              { Icon: Clock, label: "Video Consultation", sub: "Within 48 hours of enquiry" },
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

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              How NRI Construction Works with Vidhima
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              We've built a process specifically for clients who can't be on-site every day. Every stage is transparent, documented, and milestone-verified.
            </p>
            <div className="space-y-6">
              {[
                { step: "01", title: "Video Consultation", desc: "We discuss your plot, budget, timeline, and design preferences over a video call. Our engineer reviews any satellite imagery or photos you have of the plot." },
                { step: "02", title: "Site Visit & Assessment", desc: "Our team visits your plot in person, takes detailed measurements, and assesses slope, soil, access, and TCP zone status. We send you a full written site report." },
                { step: "03", title: "Design & Approvals", desc: "Our architect prepares your building plan. We submit for TCP NOC and manage all follow-up. You review and approve all drawings remotely before submission." },
                { step: "04", title: "Fixed-Price Contract", desc: "You receive a detailed Bill of Quantities and a fixed-price contract with milestone payment schedule. No surprises, no extras unless you change the scope." },
                { step: "05", title: "Construction with Visual Updates", desc: "Our site engineer provides weekly updates with photographs and videos. Key milestone completions are verified before payment is requested." },
                { step: "06", title: "Handover", desc: "We hand over your completed property with all certificates — including TCP occupancy certificate and structural engineer's completion certificate." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">{step}</div>
                  <div>
                    <h3 className="font-serif text-lg text-foreground mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular NRI Project Types */}
      <section className="py-16 bg-muted/40 border-y border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
              Popular NRI Project Types in Himachal Pradesh
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Retirement Homes", desc: "G+1 or G+2 family homes in Palampur or Kangra for NRI parents or for eventual return. Typical budget: ₹50 lakh – ₹1.5 crore.", rate: "₹1,400–₹2,500/sq ft" },
                { title: "Hill Villas & Farmhouses", desc: "Premium custom villas on larger hill plots in Palampur or Dharamshala. Often includes landscaping, boundary walls, and a caretaker unit.", rate: "₹2,500–₹4,000/sq ft" },
                { title: "Rental Guesthouses", desc: "4–8 room guesthouses in Dharamshala or McLeod Ganj for rental income from tourist/student market. Managed by a local property manager post-handover.", rate: "₹2,800–₹3,800/sq ft" },
                { title: "Ancestral Home Renovation", desc: "Renovation, earthquake-retrofit, and extension of inherited HP homes. We provide structural assessment, TCP NOC if required, and turnkey renovation.", rate: "Quote on assessment" },
              ].map((item) => (
                <div key={item.title} className="bg-card rounded-xl p-6 border border-border shadow-sm">
                  <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">{item.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
              Frequently Asked Questions — NRI Construction in HP
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
              <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">NRI Free Consultation</span>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">Start Your Himachal Pradesh Project from Abroad</h2>
              <p className="opacity-90 text-sm md:text-base leading-relaxed mb-6 font-light">
                Fill in your details and we'll schedule a free video consultation within 48 hours to discuss your project, plot, and budget.
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                {[
                  "Free video consultation within 48 hours",
                  "Physical site visit by our engineer",
                  "All approvals — TCP NOC to occupancy cert",
                  "Weekly visual progress reports",
                  "Milestone-linked payments — pay for verified progress",
                ].map((item) => (
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

export default NRIConstruction;
