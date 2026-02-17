import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { CheckCircle2, ArrowRight } from "lucide-react";

const residentialTiers = [
  { name: "Basic", price: "₹1,400 – 1,700 / sq ft", ideal: "Budget-conscious first homes", specs: ["RCC structure", "Basic tile flooring", "Standard plumbing & electrical", "UPVC windows", "Putty + paint"] },
  { name: "Standard", price: "₹1,800 – 2,200 / sq ft", ideal: "Comfortable family homes", specs: ["RCC structure", "Vitrified tiles", "Premium CP fittings", "Waterproofing", "Modular kitchen ready", "Interior-grade paint"], popular: true },
  { name: "Premium", price: "₹2,500+ / sq ft", ideal: "Luxury and bespoke homes", specs: ["Architect-designed", "Stone/wood cladding", "Imported fittings", "Home automation", "Landscaping", "Full interior design"] },
];

const commercialTiers = [
  { name: "Basic", price: "₹1,200 – 1,500 / sq ft", ideal: "Simple shops and offices", specs: ["RCC frame", "Basic flooring", "Standard electrical", "Basic facade"] },
  { name: "Standard", price: "₹1,600 – 2,000 / sq ft", ideal: "Retail and professional offices", specs: ["Engineered design", "Quality flooring", "Fire safety compliance", "Parking design", "Modern facade"], popular: true },
  { name: "Premium", price: "₹2,200+ / sq ft", ideal: "High-end commercial complexes", specs: ["Architect-designed", "Premium facade", "Elevator ready", "Full MEP design", "Landscaping"] },
];

const TierCard = ({ tier }: { tier: typeof residentialTiers[0] }) => (
  <div className={`rounded-xl border p-6 flex flex-col ${tier.popular ? "border-primary shadow-card-hover ring-2 ring-primary/20 relative" : "border-border shadow-card"}`}>
    {tier.popular && <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>}
    <h3 className="font-serif text-2xl mb-1">{tier.name}</h3>
    <p className="text-accent font-semibold text-sm mb-2">{tier.price}</p>
    <p className="text-xs text-muted-foreground mb-4">Ideal for: {tier.ideal}</p>
    <ul className="space-y-2 mb-6 flex-1">
      {tier.specs.map((s) => (
        <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          {s}
        </li>
      ))}
    </ul>
    <Link to="/contact">
      <Button className="w-full" variant={tier.popular ? "default" : "outline"}>Get Estimate</Button>
    </Link>
  </div>
);

const Pricing = () => (
  <main className="pt-20">
    <section className="py-20 bg-forest-gradient text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-accent mb-3 block">Pricing</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Transparent Pricing for Your Construction</h1>
          <p className="opacity-80 text-lg">Costs vary by design, soil, finishes, and location — but here are typical ranges to help you plan. All prices are indicative and exclude land cost.</p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <SectionHeading label="Residential" title="Home Construction Packages" description="Choose the package that fits your needs — or go fully custom." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {residentialTiers.map((t) => <TierCard key={t.name} tier={t} />)}
        </div>

        <SectionHeading label="Commercial" title="Commercial Construction Packages" description="For shops, offices, and mixed-use buildings on your plot." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {commercialTiers.map((t) => <TierCard key={t.name} tier={t} />)}
        </div>
      </div>
    </section>

    <section className="py-16 bg-muted/50">
      <div className="container text-center max-w-2xl">
        <h2 className="font-serif text-2xl mb-4">Not Sure Which Package Fits You?</h2>
        <p className="text-muted-foreground mb-6">Share your plot details and requirements — we'll create a tailored plan with an accurate cost estimate.</p>
        <Link to="/contact">
          <Button size="lg">Get a Tailored Plan <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </Link>
      </div>
    </section>
  </main>
);

export default Pricing;
