import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Shield, Clock, Eye, Mountain, Wrench, Users, Home, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-construction.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const valuePoints = [
  { icon: Wrench, text: "End-to-end: design, approvals, construction" },
  { icon: Eye, text: "Transparent stage-wise payments & timelines" },
  { icon: Mountain, text: "Expert in hill construction & local bye-laws" },
  { icon: Clock, text: "Regular progress updates with photos & videos" },
];

const whoWeServe = [
  { icon: Home, label: "Local families building their first home" },
  { icon: Building2, label: "Investors building rental units" },
  { icon: Building2, label: "Commercial property owners" },
  { icon: Users, label: "NRIs planning properties in Palampur" },
];

const featuredProjects = [
  { img: project1, name: "Sharma Residence", type: "G+1 Residential", location: "Near Bundla, Palampur", outcome: "Completed in 10 months — modern family home with mountain views" },
  { img: project2, name: "Kangra Market Complex", type: "Commercial G+3", location: "Palampur Main Road", outcome: "6 shops + 4 office units — fully leased within 2 months" },
  { img: project3, name: "Hillside Villa (Ongoing)", type: "G+2 Residential", location: "Maranda, Palampur", outcome: "Slope-adjusted design with retaining walls and full RCC structure" },
  { img: project4, name: "Thakur Family Home", type: "G+1 Residential", location: "Baijnath Road", outcome: "NRI client — managed entirely remotely with weekly video updates" },
];

const features = [
  { icon: Shield, title: "Quality", desc: "Premium materials and rigorous quality checks at every stage" },
  { icon: Eye, title: "Transparency", desc: "Clear contracts, itemized costs, zero hidden charges" },
  { icon: Clock, title: "Timely Delivery", desc: "Milestone-based schedules we actually stick to" },
  { icon: Mountain, title: "Local Experts", desc: "Deep understanding of Palampur terrain, weather, and regulations" },
  { icon: Wrench, title: "Turnkey", desc: "From plot survey to key handover — we handle everything" },
];

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="House construction in Palampur with Himalayan mountains" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>
        <div className="container relative z-10 py-32">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 leading-tight animate-fade-in-up">
              Turnkey House & Commercial Construction on Your Plot in Palampur
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              End-to-end construction — from design and approvals to finishing and handover. Built for Palampur's terrain, weather, and local regulations. Transparent pricing, stage-wise payments, and regular updates you can trust.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/contact">
                <Button variant="hero" size="lg">Get Free Construction Estimate</Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-outline" size="lg">Schedule Site Visit</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Points */}
      <section className="py-6 bg-forest-gradient">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {valuePoints.map((v, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <v.icon className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/90">{v.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="py-20 bg-sand-gradient">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                label="Get Started"
                title="Get Your Free Construction Estimate"
                description="Share your plot details and requirements. We'll call you within 24 hours with a rough cost estimate and next steps — no obligation."
                center={false}
              />
              <div className="space-y-3 mt-8">
                {["Accurate rough estimate based on current market rates", "Advice on design, approvals, and timeline", "No hidden costs — transparent from day one"].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-card">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20">
        <div className="container">
          <SectionHeading label="Who We Serve" title="Built for People Like You" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoWeServe.map((w, i) => (
              <div key={i} className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <w.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{w.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <SectionHeading label="Our Work" title="Featured Projects" description="See how we've helped plot owners across Palampur turn their land into beautiful, functional buildings." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((p, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-accent">{p.type}</span>
                    <span className="text-xs text-muted-foreground">• {p.location}</span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.outcome}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/projects">
              <Button variant="outline" size="lg">
                View All Projects <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container">
          <SectionHeading label="Why Us" title="Why Palampur Trusts Us" description="We're not just builders — we're your neighbours, invested in doing it right." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-serif text-lg text-foreground mb-1">{f.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-forest-gradient text-primary-foreground">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready to Build on Your Plot?</h2>
          <p className="opacity-80 mb-8">Get a free, no-obligation construction estimate. We'll assess your plot and share a detailed cost breakdown within 48 hours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="hero" size="lg">Get Free Estimate</Button>
            </Link>
            <a href="https://wa.me/918628989364" target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg">WhatsApp Us</Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
