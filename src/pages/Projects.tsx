import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, MapPin } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

type Filter = "All" | "Residential" | "Commercial" | "Completed" | "Ongoing";

const projects = [
  { img: project1, name: "Sharma Residence", type: "Residential", status: "Completed", location: "Near Bundla, Palampur", size: "G+1, 2800 sq ft", timeline: "10 months", desc: "Modern family home with mountain views. RCC frame structure with stone cladding. Full turnkey delivery including modular kitchen and landscaping.", testimonial: "Palampur Constructions made our dream home a reality. Transparent at every step. — Mr. Sharma" },
  { img: project2, name: "Kangra Market Complex", type: "Commercial", status: "Completed", location: "Palampur Main Road", size: "G+3, 8500 sq ft", timeline: "14 months", desc: "6 ground-floor shops and 4 office units. Designed for maximum rental yield with proper parking and access ramps." },
  { img: project3, name: "Hillside Villa", type: "Residential", status: "Ongoing", location: "Maranda, Palampur", size: "G+2, 3500 sq ft", timeline: "Est. 12 months", desc: "Challenging slope site solved with engineered retaining walls. Premium finishes with panoramic valley views from every floor." },
  { img: project4, name: "Thakur Family Home", type: "Residential", status: "Completed", location: "Baijnath Road", size: "G+1, 2200 sq ft", timeline: "9 months", desc: "Built for an NRI family. Managed entirely remotely via weekly WhatsApp video updates and photo reports.", testimonial: "Living abroad, I was nervous. But the team kept me involved at every stage. — Mr. Thakur (USA)" },
];

const filters: Filter[] = ["All", "Residential", "Commercial", "Completed", "Ongoing"];

const Projects = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.type === filter || p.status === filter);

  return (
    <main className="pt-20">
      <section className="py-20 bg-forest-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-accent mb-3 block">Portfolio</span>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Our Projects</h1>
            <p className="opacity-80 text-lg">Real work, real results. Browse our residential and commercial projects in and around Palampur.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((p, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden shadow-card group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.status === "Completed" ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground"}`}>{p.status}</span>
                    <span className="text-xs font-medium uppercase tracking-wide text-accent">{p.type}</span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-1">{p.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <MapPin className="w-3 h-3" />
                    {p.location} • {p.size} • {p.timeline}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                  {p.testimonial && (
                    <blockquote className="text-sm italic text-primary border-l-2 border-primary pl-3">
                      {p.testimonial}
                    </blockquote>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button size="lg">Discuss Your Project <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
