import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { projects, type ProjectStatus } from "@/data/projects";

const STATUS_TABS: { key: ProjectStatus | "all"; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "completed", label: "Completed" },
  { key: "ongoing", label: "Ongoing" },
  { key: "upcoming", label: "Upcoming" },
];

const statusConfig: Record<
  ProjectStatus,
  { label: string; color: string; bg: string; Icon: React.ElementType }
> = {
  completed: {
    label: "Completed",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    Icon: CheckCircle2,
  },
  ongoing: {
    label: "Ongoing",
    color: "text-blue-700",
    bg: "bg-blue-50",
    Icon: Clock,
  },
  upcoming: {
    label: "Upcoming",
    color: "text-amber-700",
    bg: "bg-amber-50",
    Icon: Sparkles,
  },
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState<ProjectStatus | "all">("all");

  const filtered =
    activeTab === "all" ? projects : projects.filter((p) => p.status === activeTab);

  const completedCount = projects.filter((p) => p.status === "completed").length;
  const ongoingCount = projects.filter((p) => p.status === "ongoing").length;
  const upcomingCount = projects.filter((p) => p.status === "upcoming").length;

  const countMap: Record<string, number> = {
    all: projects.length,
    completed: completedCount,
    ongoing: ongoingCount,
    upcoming: upcomingCount,
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-forest-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-accent mb-3 block">Portfolio</span>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Our Projects</h1>
            <p className="opacity-80 text-lg">
                            Real work, real results. {projects.length} active project{projects.length !== 1 ? 's' : ''} across Himachal Pradesh — residential, commercial, and mixed use.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-20 -mt-8 mx-auto max-w-4xl px-4">
        <div className="bg-card rounded-xl border border-border/80 shadow-lg p-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
            {[
              { value: completedCount, label: "Completed", color: "text-emerald-700" },
              { value: ongoingCount, label: "Ongoing", color: "text-blue-700" },
              { value: upcomingCount, label: "Upcoming", color: "text-amber-700" },
            ].map((s) => (
              <div key={s.label}>
                <span className={`block text-3xl font-bold font-serif ${s.color}`}>{s.value}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter tabs + grid */}
      <section className="py-20">
        <div className="container">
          <SectionHeading
            label="Our Work"
            title="Projects Across Himachal Pradesh"
            description="Browse by status — from recently completed builds to ongoing sites and upcoming launches."
          />

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mt-10 mb-10">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.key
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {countMap[tab.key]}
                </span>
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => {
              const cfg = statusConfig[project.status];
              const StatusIcon = cfg.Icon;
              return (
                <Link
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  className="group bg-card rounded-xl overflow-hidden border border-border/40 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={project.coverImage}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {cfg.label}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {project.subType}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-foreground mb-1 leading-snug">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {project.location}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                      {project.outcome}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                      {project.specs.budget && (
                        <span className="text-xs font-medium text-foreground">
                          {project.specs.budget}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-primary flex items-center gap-1 ml-auto group-hover:gap-2 transition-all">
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-gradient text-primary-foreground">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Have a Plot? Let's Build on It.</h2>
          <p className="opacity-80 mb-8">
            Free site visit + construction estimate within 48 hours. No obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Get Free Estimate
              </Button>
            </Link>
            <a href="https://wa.me/918628989364" target="_blank" rel="noopener noreferrer">
              <Button variant="hero-outline" size="lg">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
