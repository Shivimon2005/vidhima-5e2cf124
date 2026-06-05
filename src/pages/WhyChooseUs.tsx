import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { Shield, Eye, Clock, Mountain, Wrench, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  { icon: Mountain, title: "Local Expertise", desc: "We know Himachal's terrain, soil conditions, bye-laws, and weather patterns inside out." },
  { icon: Eye, title: "Full Transparency", desc: "Itemized cost breakdowns, stage-wise payments, and no hidden charges — ever." },
  { icon: Shield, title: "Quality Assurance", desc: "Regular quality audits, branded materials, and engineered structural designs." },
  { icon: Clock, title: "On-Time Delivery", desc: "Milestone schedules with built-in buffers for hill-region variables." },
  { icon: Wrench, title: "Turnkey Service", desc: "Design, approvals, and construction — you focus on your vision, we handle execution." },
];

const processSteps = [
  { step: "01", title: "Initial Discussion", desc: "Call or WhatsApp us. We'll understand your requirements, timeline, and budget." },
  { step: "02", title: "Site Visit", desc: "We visit your plot, assess terrain, soil, and access — free within 20 km of our office." },
  { step: "03", title: "Rough Estimate", desc: "Receive a detailed cost range based on your requirements and plot conditions." },
  { step: "04", title: "Design & Approvals", desc: "Architectural drawings, structural design, and all government approvals handled." },
  { step: "05", title: "Contract & Payments", desc: "Clear contract with milestone-based payments. No large upfront sum required." },
  { step: "06", title: "Construction", desc: "Work begins with regular photo/video updates via WhatsApp. Site visits welcome anytime." },
  { step: "07", title: "Handover", desc: "Final inspection, finishing touches, and key handover. Post-construction support included." },
];

const WhyChooseUs = () => (
  <main className="pt-20">
    <section className="py-20 bg-forest-gradient text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-accent mb-3 block">Why Choose Us</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Why Himachal Pradesh Trusts Us to Build</h1>
          <p className="opacity-80 text-lg">We're builders who understand Himachal's land, climate, and regulations. Here's how we make construction stress-free.</p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <SectionHeading label="Our Strengths" title="What Sets Us Apart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((f) => (
            <div key={f.title} className="text-center bg-card rounded-xl p-6 shadow-card">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-serif text-lg mb-2">{f.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted/50">
      <div className="container">
        <SectionHeading label="Our Process" title="From Your Plot to Your Keys" description="A clear, step-by-step approach so you always know what's happening and what's coming next." />
        <div className="max-w-3xl mx-auto">
          {processSteps.map((s, i) => (
            <div key={s.step} className="flex gap-6 mb-8 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-lg shrink-0">
                  {s.step}
                </div>
                {i < processSteps.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
              </div>
              <div className="pb-8">
                <h4 className="font-serif text-lg text-foreground mb-1">{s.title}</h4>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-forest-gradient text-primary-foreground text-center">
      <div className="container max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready to Start?</h2>
        <p className="opacity-80 mb-8">Get a free consultation and rough estimate for your plot. No obligation — just honest advice.</p>
        <Link to="/contact">
          <Button variant="hero" size="lg">Get Free Estimate <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </Link>
      </div>
    </section>
  </main>
);

export default WhyChooseUs;
