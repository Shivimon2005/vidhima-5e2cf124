import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Heart, HardHat, Leaf, Users } from "lucide-react";

const pillars = [
  {
    Icon: Users,
    title: "Community Development",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-100",
    points: [
      "Free structural assessments for economically weaker families in Kangra district",
      "Donated labour and materials for the Maranda village community hall repair (2023)",
      "Sponsor local government school infrastructure improvement projects",
      "Annual free construction guidance camps for self-builders in rural areas",
    ],
  },
  {
    Icon: HardHat,
    title: "Worker Welfare",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-100",
    points: [
      "100% EPF and ESI compliance for all permanent and contractual workers",
      "Helmets, safety harnesses, and PPE provided free on every site",
      "On-site first-aid kits and monthly safety briefings",
      "Fair wages — all workers paid above HP minimum wage schedule",
      "Interest-free salary advances for workers in genuine emergencies",
    ],
  },
  {
    Icon: Leaf,
    title: "Environmental Practices",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    points: [
      "Rainwater harvesting pits installed as standard in all projects above ₹20L",
      "Construction debris segregated and sent to registered recycling vendors",
      "No burning of construction waste — all disposed through licensed contractors",
      "Tree felling avoided wherever possible through design-level terrain adjustments",
      "Solar water heater pre-wiring built into all new residential projects by default",
    ],
  },
  {
    Icon: Heart,
    title: "Local Sourcing & Economy",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-100",
    points: [
      "90%+ of materials sourced from Himachal Pradesh or adjacent states",
      "Priority given to local suppliers, fabricators, and finishing contractors",
      "Train local youth in masonry, plumbing, and RCC work through on-site apprenticeships",
      "Prefer HP-registered sub-contractors for all civil packages",
    ],
  },
];

const CSR = () => (
  <main className="pt-20">
    <section className="py-20 bg-forest-gradient text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-accent mb-3 block">CSR</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Our Responsibility Beyond the Build</h1>
          <p className="opacity-80 text-lg">We operate in Himachal Pradesh's communities. What we build here shapes people's lives — that comes with an obligation to do it responsibly.</p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container max-w-4xl">
        <SectionHeading
          label="Our Commitment"
          title="Built Responsibly, For Himachal"
          description="Corporate responsibility at Vidhima isn't a checklist. It's a set of habits built into how we operate every day — on site, with our workers, with suppliers, and in the communities around us."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-14">
          {[
            { value: "100%", label: "EPF/ESI compliant workforce" },
            { value: "90%+", label: "Materials locally sourced" },
            { value: "500+", label: "Workers trained in safety" },
            { value: "12+", label: "Community projects supported" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-5 text-center border border-border/60 shadow-card">
              <span className="font-serif text-2xl font-bold text-primary block mb-1">{s.value}</span>
              <span className="text-xs text-muted-foreground leading-snug block">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted/30">
      <div className="container">
        <SectionHeading
          label="Four Pillars"
          title="How We Give Back"
          description="Four areas where Vidhima actively invests beyond profit."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {pillars.map(({ Icon, title, color, bg, border, points }) => (
            <div key={title} className={`bg-card rounded-2xl border ${border} shadow-card p-8`}>
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${color.replace("text-", "bg-")}`} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container max-w-3xl">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Our Safety Pledge</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Every Vidhima site operates with a zero-tolerance policy on safety violations. No worker on our sites is permitted to work at height without a harness, no excavation proceeds without shoring checks, and no electrical work is done without qualified supervision. We have maintained zero lost-time injuries across all projects since 2021.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Zero lost-time injuries since 2021
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-forest-gradient text-primary-foreground text-center">
      <div className="container max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">Partner With a Builder You Can Trust</h2>
        <p className="opacity-80 mb-8">Responsible construction, transparent pricing, and community accountability — that's Vidhima.</p>
        <Link to="/contact">
          <Button variant="hero" size="lg">Start Your Project <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </Link>
      </div>
    </section>
  </main>
);

export default CSR;
