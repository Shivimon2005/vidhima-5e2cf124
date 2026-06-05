import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { Users, Award, Mountain, Handshake, ArrowRight } from "lucide-react";

const team = [
  { name: "Shivam Sharma", role: "Founder & Managing Director", desc: "20+ years in civil construction across Himachal Pradesh. Born and raised in Palampur." },
  { name: "Anita Sharma", role: "Project Manager", desc: "Oversees all residential and commercial projects. Known for on-time delivery and clear communication." },
  { name: "Vikram Singh", role: "Site Engineer", desc: "Structural engineering specialist with expertise in hill terrain construction and seismic-safe designs." },
  { name: "Priya Thakur", role: "Architect Collaborator", desc: "Designs homes and commercial spaces that blend modern aesthetics with mountain-region practicality." },
];

const About = () => (
  <main className="pt-20">
    <section className="py-20 bg-forest-gradient text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-accent mb-3 block">About Us</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Building Himachal's Future, One Plot at a Time</h1>
          <p className="opacity-80 text-lg">We're a construction company rooted in Himachal Pradesh, with deep experience in building homes and commercial spaces on the region's unique terrain.</p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading label="Our Story" title="Local Roots, Solid Foundations" center={false} />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Vidhima Construction Private Limited started over two decades ago with a simple mission: help local families and landowners build quality structures on their own plots — without the stress, hidden costs, or uncertainty that typically comes with construction.</p>
              <p>We understand the unique challenges of building in hill regions — from unpredictable soil conditions and steep slopes to heavy monsoons and seismic considerations. We've built our processes around these realities.</p>
              <p>Today, we serve local families, NRIs, investors, and commercial property owners across Himachal Pradesh. Our commitment to transparency, quality, and timely delivery hasn't changed.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Award, value: "20+", label: "Years Experience" },
              { icon: Mountain, value: "150+", label: "Projects Completed" },
              { icon: Users, value: "50+", label: "Happy Families" },
              { icon: Handshake, value: "100%", label: "Transparency" },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-xl p-6 text-center shadow-card">
                <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <span className="font-serif text-3xl text-foreground">{s.value}</span>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted/50">
      <div className="container">
        <SectionHeading label="Our Team" title="The People Behind Your Project" description="A dedicated team of engineers, managers, and architects who treat your project like their own." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t) => (
            <div key={t.name} className="bg-card rounded-xl p-6 shadow-card text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-2xl text-primary">{t.name.charAt(0)}</span>
              </div>
              <h4 className="font-serif text-lg text-foreground">{t.name}</h4>
              <p className="text-xs text-accent font-medium mb-2">{t.role}</p>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-forest-gradient text-primary-foreground text-center">
      <div className="container max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">Let's Build Together</h2>
        <p className="opacity-80 mb-8">Whether you're a local family, an NRI, or a commercial investor — we'd love to discuss your project.</p>
        <Link to="/contact">
          <Button variant="hero" size="lg">Get Free Estimate <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </Link>
      </div>
    </section>
  </main>
);

export default About;
