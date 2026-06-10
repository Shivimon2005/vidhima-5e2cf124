import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Quote } from "lucide-react";

const leaders = [
  {
    name: "Umesh Sharma",
    role: "Managing Director",
    initials: "US",
    experience: "15+ years",
    bio: "A Bachelor of Engineering in Civil Engineering, Umesh co-founded Vidhima with a single goal: honest, quality construction that families can trust. Over 15 years he has built the company from the ground up — setting structural benchmarks, cultivating supplier relationships, and personally overseeing projects across the region. His hands-on style and commitment to transparency define Vidhima's reputation.",
    quote: "When a family entrusts us with their home, they are trusting us with their future. We never take that lightly.",
    areas: ["Strategic direction", "Structural oversight", "Stakeholder relations", "Quality assurance"],
  },
  {
    name: "Ritesh Sharma",
    role: "Managing Director",
    initials: "RS",
    experience: "10+ years",
    bio: "Ritesh holds an MBA in Finance — an unlikely fit for construction that turned out to be a decisive advantage. Over 10 years he immersed himself in civil construction alongside engineers and site supervisors, gaining field expertise to match his financial discipline. Today he co-leads Vidhima with a rare combination: the sharpness of a finance professional and the ground-up knowledge of a builder.",
    quote: "A construction company's real product is trust. Everything we build is an opportunity to earn more of it.",
    areas: ["Operations management", "Financial planning", "Contractor oversight", "Cost control"],
  },
  {
    name: "Pardeep Singh",
    role: "Project Coordinator",
    initials: "PS",
    experience: "5+ years",
    bio: "Pardeep keeps Vidhima's active sites running — coordinating teams, tracking milestones, and resolving on-site challenges before they cause delays. Clients consistently note his clear communication and steady responsiveness throughout the build.",
    quote: "Good coordination is invisible — when done right, all the client sees is their home taking shape on schedule.",
    areas: ["Site coordination", "Milestone tracking", "Team alignment", "Client updates"],
  },
  {
    name: "Ajay",
    role: "Chief Financial Officer",
    initials: "AJ",
    experience: "7+ years",
    bio: "Ajay brings 7 years of construction finance experience to Vidhima's operations — managing budgets, cash flow, and vendor payments with precision. His cost discipline is what makes Vidhima's fixed-price model work: accurate estimates, no surprises.",
    quote: "Financial clarity is not just good accounting — it is the foundation of every client relationship we build.",
    areas: ["Financial planning", "Budget management", "Vendor payments", "Cost reporting"],
  },
  {
    name: "Shivam Sharma",
    role: "Business Developer",
    initials: "SS",
    experience: "5+ years",
    bio: "A B.Tech in Computer Science, Shivam spent five years in business development within the family's hospitality business — building strong instincts for client relations and sales. He joined Vidhima Construction as Business Developer just over a year ago and has since driven client outreach and lead generation across all three business wings.",
    quote: "Every client I speak with is a chance to show them what Vidhima stands for. That is the opportunity I never want to waste.",
    areas: ["Business development", "Client outreach", "Lead generation", "Market research"],
  },
];

const Leadership = () => (
  <main className="pt-20">
    <section className="py-20 bg-forest-gradient text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-accent mb-3 block">Leadership</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">The Team Behind Every Build</h1>
          <p className="opacity-80 text-lg">Experienced engineers, architects, and managers who treat your project as if it were their own property.</p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <SectionHeading
          label="Our People"
          title="Experience You Can Measure"
          description="Five professionals with a combined 38+ years of experience in construction, finance, and business development."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14">
          {leaders.map((l) => (
            <div key={l.name} className="bg-card rounded-2xl border border-border/60 shadow-card p-8 flex flex-col gap-6">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-serif text-2xl text-primary">{l.initials}</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground">{l.name}</h3>
                  <p className="text-sm text-accent font-semibold mt-0.5">{l.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{l.experience} experience</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{l.bio}</p>

              <div className="bg-primary/5 border-l-2 border-primary/30 rounded-r-lg pl-4 py-3 pr-4">
                <Quote className="w-4 h-4 text-primary/40 mb-1" />
                <p className="text-sm italic text-foreground/80 leading-relaxed">{l.quote}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Focus Areas</p>
                <div className="flex flex-wrap gap-2">
                  {l.areas.map((a) => (
                    <span key={a} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border/60">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted/40">
      <div className="container max-w-4xl">
        <SectionHeading
          label="Our Philosophy"
          title="How We Think About Construction"
          description="The principles that govern every decision our leadership team makes on your project."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          {[
            { num: "01", title: "Client First, Always", desc: "Every cost, timeline, and design decision is weighed against one question: is this genuinely in the client's best interest?" },
            { num: "02", title: "No Hidden Costs, Ever", desc: "Our fixed-price contracts are binding. We absorb cost overruns — not our clients. Itemised breakdowns are shared at every stage." },
            { num: "03", title: "Engineer the Worst Case", desc: "Hill terrain is unforgiving. We design for maximum seismic load, peak monsoon water pressure, and the worst possible soil." },
            { num: "04", title: "Local Knowledge is Strategic", desc: "Deep roots in Kangra since 2019 mean we know which suppliers to trust, which inspectors to work with, and which regulations will affect your project." },
          ].map((p) => (
            <div key={p.num} className="bg-card rounded-xl p-6 border border-border/60 relative shadow-card">
              <span className="absolute top-4 right-5 font-serif text-4xl text-accent/15 font-bold">{p.num}</span>
              <h4 className="font-serif text-lg text-foreground mb-2">{p.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-forest-gradient text-primary-foreground text-center">
      <div className="container max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">Meet the Team at Your Site</h2>
        <p className="opacity-80 mb-8">Book a free site visit and talk directly with our engineers about your plot.</p>
        <Link to="/contact">
          <Button variant="hero" size="lg">Schedule Site Visit <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </Link>
      </div>
    </section>
  </main>
);

export default Leadership;
