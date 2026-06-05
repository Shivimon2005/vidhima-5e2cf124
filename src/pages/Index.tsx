import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { 
  Shield, 
  Clock, 
  Eye, 
  Mountain, 
  Wrench, 
  Users, 
  Home, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Award,
  ChevronRight,
  TrendingUp,
  FileCheck
} from "lucide-react";
import heroImg from "@/assets/hero-construction.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const stats = [
  { icon: Award, value: "15+", label: "Turnkey Hill Projects Completed" },
  { icon: Shield, value: "100%", label: "Price-Lock Guarantee" },
  { icon: Eye, value: "0", label: "Hidden Charges — Full Transparency" },
  { icon: FileCheck, value: "100%", label: "Government NOC & Approval Support" }
];

const whoWeServe = [
  { icon: Home, label: "Local families building their first home" },
  { icon: Building2, label: "Investors building rental units" },
  { icon: Building2, label: "Commercial property owners" },
  { icon: Users, label: "NRIs planning properties in Himachal Pradesh" },
];

const featuredProjects = [
  { img: project1, name: "Sharma Residence", type: "G+1 Residential", location: "Near Bundla, Palampur", outcome: "Completed in 10 months — modern family home with mountain views" },
  { img: project2, name: "Kangra Market Complex", type: "Commercial G+3", location: "Palampur Main Road", outcome: "6 shops + 4 office units — fully leased within 2 months" },
  { img: project3, name: "Hillside Villa (Ongoing)", type: "G+2 Residential", location: "Maranda, Palampur", outcome: "Slope-adjusted design with retaining walls and full RCC structure" },
  { img: project4, name: "Thakur Family Home", type: "G+1 Residential", location: "Baijnath Road", outcome: "NRI client — managed entirely remotely with weekly video updates" },
];

const features = [
  { icon: Shield, title: "Uncompromising Quality", desc: "Rigorous quality controls, soil analysis, and certified materials tailored to slope demands." },
  { icon: Eye, title: "Full Price Transparency", desc: "Itemized, fixed-price contracts. Stage-wise payment plan linked only to verified milestones." },
  { icon: Clock, title: "On-Time Completion", desc: "Committed project schedules with built-in buffers for hill weather patterns." },
  { icon: Mountain, title: "Slope Construction Masters", desc: "Deep expertise in Himachal's complex slopes, retaining walls, and local municipal bye-laws." },
  { icon: Wrench, title: "A-to-Z Turnkey Service", desc: "We manage everything: architectural layouts, NOC approvals, civil work, finishing, and key handover." },
];

const processSteps = [
  {
    step: "01",
    title: "Site Survey & Free Estimate",
    desc: "We visit your plot, check soil conditions/contours, and provide a comprehensive preliminary quote within 48 hours."
  },
  {
    step: "02",
    title: "3D Planning & NOC Approvals",
    desc: "Our architects map custom 3D layouts while our compliance team processes municipal building map NOCs."
  },
  {
    step: "03",
    title: "Engineered Construction",
    desc: "Our structural engineers oversee the RCC excavation, slope reinforcement, slab laying, and masonry."
  },
  {
    step: "04",
    title: "Finishing & Handover",
    desc: "We install premium fittings, conduct deep quality audits, and handover your ready-to-move key on schedule."
  }
];

const testimonials = [
  {
    quote: "Vidhima built our commercial building on a complex slope. Their material transparency and engineering capability were top-notch. Absolutely no hidden costs.",
    author: "Rajesh Kumar",
    role: "Property Owner, Kangra",
    rating: 5
  },
  {
    quote: "Building a house in Palampur while residing in the UK was stress-free. They sent weekly video progress reports and handled all structural approvals seamlessly.",
    author: "Meenakshi Sharma",
    role: "NRI Client, Palampur",
    rating: 5
  },
  {
    quote: "Their turnkey contract was a lifesaver. They managed the soil testing, retaining walls, plumbing, and modular kitchen installation with extreme professionalism.",
    author: "Vikram Katoch",
    role: "Homeowner, Dharamshala",
    rating: 5
  }
];

const Index = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="House construction in Himachal Pradesh with Himalayan mountains" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>
        <div className="container relative z-10 py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/25 text-accent font-serif text-sm mb-6 border border-accent/20 animate-fade-in">
              <TrendingUp className="w-4 h-4" /> Leading Turnkey Builders in Himachal Pradesh
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 leading-tight animate-fade-in-up">
              We Build Your Dream Space in the Hills, Handled Turnkey & Built to Last
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              Leave the coordination, structural calculations, and regulatory clearances to us. Turnkey home and commercial construction with a 100% price-lock guarantee.
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

      {/* Credibility Stats Strip */}
      <section className="relative z-20 -mt-8 mx-auto max-w-6xl px-4">
        <div className="bg-card rounded-xl border border-border/80 shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="block text-2xl md:text-3xl font-bold text-foreground font-serif leading-none mb-1">{s.value}</span>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider leading-tight block">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-20 bg-sand-gradient">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <SectionHeading
                label="Estimation"
                title="Get Your Free Construction Estimate"
                description="Input your plot specs and project scope. We will generate a structured cost breakdown and call you back in 24 hours to discuss specifications."
                center={false}
              />
              <div className="space-y-4 pt-4">
                {[
                  "Accurate rough estimate based on current market material specifications",
                  "Actionable advice on terrain excavation, slope safety, and layouts",
                  "Legally binding fixed price-lock contract once details are finalized",
                  "Absolutely zero upfront payments or commitment required"
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-card">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Overview */}
      <section className="py-20">
        <div className="container">
          <SectionHeading 
            label="What We Do" 
            title="Engineered Construction Services" 
            description="We combine structural analysis, architectural design, and local expertise to handle your project completely."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Premium Turnkey Residences",
                desc: "Timeless hillside villas and multi-family homes designed for earthquake safety and thermal insulation.",
                features: ["3D Elevations & Interior Layouts", "Seismic-Optimized RCC Foundations", "Premium Plumbing & Electrical Fixtures"]
              },
              {
                title: "Commercial Complexes",
                desc: "High-utility retail outlets, guest houses, and hotels designed to maximize return on investment.",
                features: ["Bye-Law Compliant Commercial Mapping", "PEB & Steel Structure Integrations", "Optimized Parking & Access Layouts"]
              },
              {
                title: "Slope & Hill Engineering",
                desc: "Specialized hill excavation, slope stabilizing structural designs, and heavy-duty concrete retaining walls.",
                features: ["Advanced Slope Analysis", "Tailored Soil Testing & Contours", "Heavy-Duty Structural Masonry"]
              }
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border/60 hover:border-primary/30 rounded-xl p-6 md:p-8 flex flex-col justify-between hover:shadow-card-hover transition-all duration-300">
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-border/40">
                  {s.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Build (Process Section) */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <SectionHeading 
            label="Our Process" 
            title="How We Build Your Space" 
            description="We break down the complex construction process into four clear, stress-free stages."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 relative">
            {processSteps.map((p, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border/60 relative hover:shadow-card transition-shadow duration-300">
                <span className="absolute -top-6 left-6 font-serif text-5xl text-accent/20 font-bold">{p.step}</span>
                <h4 className="font-serif text-lg text-foreground mb-2 mt-4">{p.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20">
        <div className="container">
          <SectionHeading label="Who We Serve" title="Built for People Like You" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {whoWeServe.map((w, i) => (
              <div key={i} className="bg-card rounded-xl p-6 text-center border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300">
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
      <section className="py-20 bg-muted/40">
        <div className="container">
          <SectionHeading label="Our Work" title="Featured Projects" description="See how we've helped plot owners across Himachal Pradesh turn their land into beautiful, functional buildings." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {featuredProjects.map((p, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden border border-border/40 shadow-card hover:shadow-card-hover transition-all duration-300 group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">{p.type}</span>
                    <span className="text-xs text-muted-foreground">• {p.location}</span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.outcome}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/projects">
              <Button variant="outline" size="lg">
                View All Projects <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-sand-gradient">
        <div className="container">
          <SectionHeading 
            label="Testimonials" 
            title="Real Stories, Real Trust" 
            description="Hear from home and commercial property owners who trusted Vidhima to build on their plots."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(t.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">"{t.quote}"</p>
                </div>
                <div>
                  <h4 className="font-serif text-base text-foreground leading-tight">{t.author}</h4>
                  <span className="text-xs text-muted-foreground">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container">
          <SectionHeading label="Why Us" title="Why Himachal Pradesh Trusts Us" description="We're not just builders — we're your neighbours, invested in doing it right." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
            {features.map((f, i) => (
              <div key={i} className="bg-card rounded-xl p-6 text-center border border-border/60 hover:shadow-card transition-shadow duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-serif text-lg text-foreground mb-2">{f.title}</h4>
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
          <p className="opacity-80 mb-8 font-medium">Get a free, no-obligation construction estimate. We'll assess your plot and share a detailed cost breakdown within 48 hours.</p>
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
