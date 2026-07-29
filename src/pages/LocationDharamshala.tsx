import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import LeadForm from "@/components/LeadForm";
import { CheckCircle2, ArrowRight, MapPin, Phone, Shield, Mountain, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What is the construction cost per sq ft in Dharamshala in 2026?",
    a: "Construction rates in Dharamshala run slightly higher than Palampur due to access constraints — typically ₹1,600–₹2,000/sq ft for standard finish and ₹2,500–₹3,000+/sq ft for premium builds. McLeod Ganj and upper Dharamshala areas carry a further 10–20% premium for difficult site access.",
  },
  {
    q: "Is TCP NOC required for construction in Dharamshala?",
    a: "Yes. Dharamshala is a Municipal Corporation area and falls under the HP TCP Act. Both residential and commercial construction require TCP sanction before foundation work begins. We handle the complete approval process from the Dharamshala TCP office.",
  },
  {
    q: "Can you build a hotel or guesthouse in Dharamshala?",
    a: "Yes. We build hotels, guesthouses, and hospitality projects in Dharamshala and McLeod Ganj. These require TCP sanction, fire NOC, and HP Tourism Department registration. We coordinate all these approvals as part of our turnkey service.",
  },
  {
    q: "How do you manage steep slope construction near McLeod Ganj?",
    a: "Steep slopes in upper Dharamshala require engineered retaining walls, gabion walls, or soil nailing — depending on slope angle and soil type. Our structural engineer designs the retention system after a site-specific geotechnical assessment.",
  },
  {
    q: "Do you build NRI client projects in Dharamshala with remote supervision?",
    a: "Yes. We have experience working with NRI clients who are based abroad. We provide regular progress reports, photographs, and video updates. All payments are milestone-linked and verifiable remotely.",
  },
];

const LocationDharamshala = () => {
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
            description: "Turnkey construction company serving Dharamshala and McLeod Ganj, Himachal Pradesh.",
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
            areaServed: { "@type": "City", name: "Dharamshala" },
          }),
        }}
      />

      {/* Hero */}
      <section className="py-20 bg-forest-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.07),transparent_60%)] pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: "Construction in Dharamshala" }]} className="mb-4" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Dharamshala & McLeod Ganj, HP</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
              Construction Company in Dharamshala
            </h1>
            <p className="opacity-90 text-base md:text-lg leading-relaxed max-w-2xl font-light mb-8">
              Vidhima Construction builds homes, hotels, and commercial buildings in Dharamshala and McLeod Ganj. Class-I registered. Fixed-price contracts. Free site visit within 48 hours.
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
              { Icon: Mountain, label: "Steep Slope Experts", sub: "McLeod Ganj terrain specialists" },
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

      {/* Why Dharamshala Needs a Specialist */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Building in Dharamshala — What Makes It Different
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Dharamshala is Himachal's second capital city and one of its most active real estate markets — especially for hospitality and NRI investment. But its steep terrain, restricted access roads in McLeod Ganj, and complex regulatory environment (Dharamshala Municipal Corporation + TCP + Fire Department + Tourism Dept.) mean that construction here demands experienced, locally embedded contractors.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { title: "Hospitality & Hotel Construction", desc: "We have experience building hotels, guesthouses, and homestays in Dharamshala. We manage TCP, fire NOC, and HP Tourism registration as part of our service." },
                { title: "Steep Slope Retention Systems", desc: "Upper Dharamshala and McLeod Ganj require engineered gabion walls, soil nailing, or cast-in-place retaining walls. We design and build all retention systems in-house." },
                { title: "Material Logistics to Difficult Sites", desc: "Our own JCB and tipper fleet allows us to reach sites with narrow or steep access roads where rented equipment providers will not operate." },
                { title: "NRI Client Projects", desc: "We work with NRI clients based in the US, UK, Canada, and Middle East. Regular photo/video progress reports, milestone-linked payments, full legal transparency." },
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
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">Construction Cost in Dharamshala — 2026 Rates</h2>
            <p className="text-muted-foreground text-sm mb-8">Market rates for Dharamshala — typically 10–15% higher than Palampur due to access constraints.</p>
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
                    { pkg: "Standard Residential", rate: "₹1,800–₹2,400", inc: "RCC structure, vitrified tiles, UPVC windows, standard electrical & plumbing" },
                    { pkg: "Premium Residential", rate: "₹2,500–₹3,200", inc: "Architect design, imported fittings, premium stone cladding, landscaping", popular: true },
                    { pkg: "Commercial / Hotel", rate: "₹2,800–₹3,800+", inc: "Fire-rated materials, lift provision, HVAC ready, hospitality finishes" },
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
            <p className="text-xs text-muted-foreground mt-4">* McLeod Ganj sites carry an additional 10–20% access premium. Land cost and government fees are separate.</p>
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
              Frequently Asked Questions — Construction in Dharamshala
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
              <h2 className="font-serif text-3xl md:text-4xl mb-4">Start Your Dharamshala Project Today</h2>
              <p className="opacity-90 text-sm md:text-base leading-relaxed mb-6 font-light">
                Get a free preliminary estimate within 48 hours. No obligation.
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                {["Free site visit within 48 hours", "Fixed-price contract, no surprises", "TCP & fire NOC managed for you", "NRI clients welcome — remote oversight"].map((item) => (
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

export default LocationDharamshala;
