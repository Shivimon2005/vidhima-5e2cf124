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
    bio: "Umesh co-founded Vidhima Construction with a clear mission: to deliver honest, quality construction that families in the region can trust and afford. Over 15 years, he has built the company from the ground up — establishing supplier relationships, setting quality benchmarks, and personally overseeing landmark projects across the area. His hands-on leadership style and commitment to transparency have earned Vidhima its reputation for integrity and reliability.",
    quote: "When a family entrusts us with their home, they are trusting us with their future. We never take that lightly.",
    areas: ["Strategic direction", "Stakeholder relations", "Business development", "Quality assurance"],
  },
  {
    name: "Ritesh Sharma",
    role: "Managing Director",
    initials: "RS",
    experience: "15+ years",
    bio: "Ritesh co-leads Vidhima Construction with a focus on operational excellence and client satisfaction. With 15 years in the construction industry, he has cultivated deep expertise in project oversight, contractor management, and regulatory compliance. He drives the company's commitment to delivering projects on time and within budget — ensuring every client experiences the full value of Vidhima's promise.",
    quote: "A construction company's real product is trust. Everything we build is an opportunity to earn more of it.",
    areas: ["Operations management", "Contractor oversight", "Regulatory compliance", "Cost control"],
  },
  {
    name: "Pardeep Singh",
    role: "Project Manager",
    initials: "PS",
    experience: "5+ years",
    bio: "Pardeep manages the day-to-day execution of Vidhima's active projects — coordinating teams, tracking milestones, and resolving on-site challenges before they become delays. His methodical approach to scheduling and site coordination ensures that work progresses smoothly from foundation to finish. Clients working with Pardeep consistently note his responsiveness and clear communication throughout the build cycle.",
    quote: "Good project management is invisible — when done right, all the client sees is their home taking shape on schedule.",
    areas: ["Site coordination", "Milestone tracking", "Team management", "Client updates"],
  },
  {
    name: "Ajay",
    role: "Chief Financial Officer",
    initials: "AJ",
    experience: "7+ years",
    bio: "Ajay brings financial discipline and strategic clarity to Vidhima's operations. With 7 years of experience across construction and real estate finance, he manages budgeting, cash flow, vendor payments, and financial reporting with meticulous precision. His transparent cost management practices underpin Vidhima's fixed-price project model — ensuring clients get accurate estimates and zero surprise billing.",
    quote: "Financial clarity is not just good accounting — it is the foundation of every client relationship we build.",
    areas: ["Financial planning", "Budget management", "Vendor payments", "Cost reporting"],
  },
  {
    name: "Shivam Sharma",
    role: "Junior Business Developer",
    initials: "SS",
    experience: "1 year",
    bio: "Shivam is the newest member of Vidhima's leadership team, driving client outreach and business growth initiatives. He brings fresh energy and a digital-first approach to connecting Vidhima with prospective clients — from initial inquiries through site visits and proposal follow-ups. His enthusiasm for real estate and genuine interest in client needs make him a natural fit for building Vidhima's next chapter.",
    quote: "Every client I speak with is a chance to show them what Vidhima stands for. That is the opportunity I never want to waste.",
    areas: ["Client outreach", "Lead generation", "Site visit coordination", "Market research"],
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
          description="Five professionals with a combined 44+ years of experience in construction and real estate."
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
