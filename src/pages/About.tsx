import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import AnimatedStat from "@/components/AnimatedStat";
import ClientLogos from "@/components/ClientLogos";
import { Users, Award, TrendingUp, Handshake, ArrowRight, Target, Eye } from "lucide-react";

const clients = [
  "Patel Infra Pvt Ltd",
  "Sadbhav Engineering Ltd.",
  "Tata Projects Ltd.",
  "HBHL Chandigarh",
  "IRB Infra",
  "Singla Construction Ltd.",
  "GR Intra Project Ltd.",
  "Vishwa Samudra Engineering Pvt. Ltd.",
];

const About = () => (
  <main className="pt-20">
    <section className="py-20 bg-forest-gradient text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-accent mb-3 block">About Us</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Class-I Registered Construction Company in Palampur, Kangra, Himachal Pradesh</h1>
          <p className="opacity-80 text-lg">Vidhima Construction Private Limited — a company built on quality, professionalism, and proven expertise in construction and infrastructure across India.</p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading label="Our Story" title="From Vidhi Constructions to Vidhima Construction Private Limited" center={false} />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Founded on 22nd October 2019 as Vidhi Constructions, the company was built on a unique business model with proven expertise in innovative thinking, project management, and cost management. Delivering high-quality work within time and budget has always been our primary focus.</p>
              <p>In May 2025, Vidhi Constructions formally transitioned and incorporated as <strong className="text-foreground">Vidhima Construction Private Limited</strong> — marking a significant milestone in our growth and commitment to scaling our operations with even greater capacity and capability.</p>
              <p>We pride ourselves on the knowledge, skills, and expertise of our employees who work together as a team to deliver successful projects. Valuing the importance of relationships, we take a collaborative approach that is flexible and can quickly respond to the needs of our clients.</p>
              <p>We have developed an appropriate blend of entrepreneurial thinking and hands-on professionals, constantly innovating and executing cost-effective solutions to client requirements — all while maintaining a strong commitment to the safety of our people.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Award, value: "15+", label: "Years Team Experience" },
              { icon: TrendingUp, value: "₹8.5Cr+", label: "Turnover (FY 2022-23)" },
              { icon: Users, value: "8+", label: "Certified Clients" },
              { icon: Handshake, value: "100%", label: "On-Time Delivery" },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-xl p-6 text-center shadow-card">
                <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <AnimatedStat
                  value={s.value}
                  label={s.label}
                  valueClassName="block font-serif text-3xl text-foreground"
                  labelClassName="text-xs text-muted-foreground mt-1 block"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-card rounded-xl p-8 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-7 h-7 text-primary" />
              <h3 className="font-serif text-2xl text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              With our good reputation and track record of providing quality work, timely completion, and professionalism, we humbly claim to be the contractor of your choice.
            </p>
          </div>
          <div className="bg-card rounded-xl p-8 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-7 h-7 text-primary" />
              <h3 className="font-serif text-2xl text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To provide the highest level of service in the construction industry while offering superior craftsmanship to every project we handle.
            </p>
          </div>
        </div>
      </div>
    </section>

    <ClientLogos className="border-y border-border/40" />

    <section className="py-20">
      <div className="container">
        <SectionHeading label="Our Certified Clients" title="Trusted by India's Leading Infrastructure Companies" description="We have had the privilege of working with some of the most reputed names in India's construction and infrastructure industry." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {clients.map((client) => (
            <div key={client} className="bg-card rounded-xl p-5 text-center shadow-card border border-border/40">
              <p className="font-medium text-sm text-foreground">{client}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-forest-gradient text-primary-foreground text-center">
      <div className="container max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">Let's Build Together</h2>
        <p className="opacity-80 mb-8">Whether you're a leading infrastructure company or an independent project owner — we'd love to discuss your next project.</p>
        <Link to="/contact">
          <Button variant="hero" size="lg">Get In Touch <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </Link>
      </div>
    </section>
  </main>
);

export default About;
