import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    ArrowLeft,
    MapPin,
    CheckCircle2,
    Clock,
    Sparkles,
    Layers,
    Ruler,
    CalendarCheck,
    Banknote,
    ChevronLeft,
    ChevronRight,
    X,
    CircleDot,
    Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, type ProjectStatus } from "@/data/projects";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const BASE_URL = "https://vidhima-construction-website.netlify.app";

const statusConfig: Record<
    ProjectStatus,
{ label: string; color: string; bg: string; Icon: React.ElementType }
  > = {
    completed: { label: "Completed", color: "text-emerald-700", bg: "bg-emerald-50", Icon: CheckCircle2 },
    ongoing: { label: "Ongoing", color: "text-blue-700", bg: "bg-blue-50", Icon: Clock },
    upcoming: { label: "Upcoming", color: "text-amber-700", bg: "bg-amber-50", Icon: Sparkles },
};

const ProjectDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const project = slug ? getProjectBySlug(slug) : undefined;

    if (!project) return <Navigate to="/projects" replace />;

    const cfg = statusConfig[project.status];
    const StatusIcon = cfg.Icon;

    const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

    // Inject ItemPage + ConstructionProject JSON-LD schema
    useEffect(() => {
          if (!project || !slug) return;

                  // Build image array for schema
                  const schemaImages = project.images.slice(0, 5).map((img, i) => ({
                          "@type": "ImageObject",
                          "url": img.startsWith("http") ? img : `${BASE_URL}${img}`,
                          "name": `${project.name} — Photo ${i + 1}`,
                  }));

                  const schema = {
                          "@context": "https://schema.org",
                          "@type": "ItemPage",
                          "name": project.name,
                          "description": project.description,
                          "url": `${BASE_URL}/projects/${slug}`,
                          "image": schemaImages,
                          "mainEntity": {
                                    "@type": "LocalBusiness",
                                    "name": "Vidhima Construction Pvt Ltd",
                                    "url": BASE_URL,
                                    "description": project.outcome,
                                    "address": {
                                                "@type": "PostalAddress",
                                                "addressLocality": project.location,
                                                "addressRegion": "Himachal Pradesh",
                                                "addressCountry": "IN",
                                    },
                                    "additionalProperty": [
                                                project.specs.area && {
                                                              "@type": "PropertyValue",
                                                              "name": "Plot Area",
                                                              "value": project.specs.area,
                                                },
                                                project.specs.floors && {
                                                              "@type": "PropertyValue",
                                                              "name": "Floors",
                                                              "value": project.specs.floors,
                                                },
                                                project.specs.duration && {
                                                              "@type": "PropertyValue",
                                                              "name": "Construction Duration",
                                                              "value": project.specs.duration,
                                                },
                                                project.specs.budget && {
                                                              "@type": "PropertyValue",
                                                              "name": "Project Value",
                                                              "value": project.specs.budget,
                                                },
                                                project.specs.completedYear && {
                                                              "@type": "PropertyValue",
                                                              "name": "Completed Year",
                                                              "value": project.specs.completedYear,
                                                },
                                              ].filter(Boolean),
                          },
                          "breadcrumb": {
                                    "@type": "BreadcrumbList",
                                    "itemListElement": [
                                      {
                                                    "@type": "ListItem",
                                                    "position": 1,
                                                    "name": "Home",
                                                    "item": BASE_URL,
                                      },
                                      {
                                                    "@type": "ListItem",
                                                    "position": 2,
                                                    "name": "Projects",
                                                    "item": `${BASE_URL}/projects`,
                                      },
                                      {
                                                    "@type": "ListItem",
                                                    "position": 3,
                                                    "name": project.name,
                                                    "item": `${BASE_URL}/projects/${slug}`,
                                      },
                                              ],
                          },
                  };

                  // Remove any previously injected project schema
                  document.querySelectorAll('script[data-project-schema]').forEach((el) => el.remove());

                  const script = document.createElement("script");
          script.type = "application/ld+json";
          script.setAttribute("data-project-schema", "true");
          script.textContent = JSON.stringify(schema);
          document.head.appendChild(script);

                  // Update document title and meta
                  document.title = `${project.name} | Vidhima Construction`;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute("content", project.description.slice(0, 155));

                  return () => {
                          document.querySelectorAll('script[data-project-schema]').forEach((el) => el.remove());
                  };
    }, [slug, project]);

    // Keyboard navigation for Lightbox
    useEffect(() => {
          if (activePhotoIndex === null) return;
          const handleKeyDown = (e: KeyboardEvent) => {
                  if (e.key === "ArrowRight") {
                            setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % project.images.length : null));
                  } else if (e.key === "ArrowLeft") {
                            setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + project.images.length) % project.images.length : null));
                  } else if (e.key === "Escape") {
                            setActivePhotoIndex(null);
                  }
          };
          window.addEventListener("keydown", handleKeyDown);
          return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activePhotoIndex, project.images.length]);

    const specItems = [
          project.specs.area && { icon: Ruler, label: "Plot Area", value: project.specs.area },
          project.specs.floors && { icon: Layers, label: "Floors", value: project.specs.floors },
          project.specs.duration && { icon: Clock, label: "Duration", value: project.specs.duration },
          project.specs.budget && { icon: Banknote, label: "Project Value", value: project.specs.budget },
          project.specs.completedYear && {
                  icon: CalendarCheck,
                  label: "Completed",
                  value: project.specs.completedYear,
          },
        ].filter(Boolean) as { icon: React.ElementType; label: string; value: string }[];

    return (
          <main className="pt-20">
            {/* Back nav */}
                <div className="container py-6">
                        <Link
                                    to="/projects"
                                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                  <ArrowLeft className="w-4 h-4" />
                                  Back to Projects
                        </Link>
                </div>
          
            {/* Hero image */}
                <section className="container pb-8">
                        <div className="rounded-2xl overflow-hidden aspect-[16/7]">
                                  <img
                                                src={project.coverImage}
                                                alt={project.name}
                                                loading="eager"
                                                decoding="async"
                                                className="w-full h-full object-cover"
                                              />
                        </div>
                </section>
          
            {/* Content */}
                <section className="container pb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                          {/* Main */}
                                  <div className="lg:col-span-2 space-y-10">
                                    {/* Title block */}
                                              <div>
                                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                                            <span
                                                                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}
                                                                                              >
                                                                                              <StatusIcon className="w-3.5 h-3.5" />
                                                                              {cfg.label}
                                                                            </span>
                                                                            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                                                                              {project.subType}
                                                                            </span>
                                                            </div>
                                                            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
                                                              {project.name}
                                                            </h1>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                            <MapPin className="w-4 h-4 shrink-0" />
                                                              {project.location}
                                                            </div>
                                              </div>
                                  
                                    {/* Result callout */}
                                              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                                                            <p className="text-sm font-medium text-primary leading-relaxed">
                                                              {project.outcome}
                                                            </p>
                                              </div>
                                  
                                    {/* Description */}
                                              <div>
                                                            <h2 className="font-serif text-xl text-foreground mb-3">About This Project</h2>
                                                            <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
                                              </div>
                                  
                                    {/* Highlights */}
                                              <div>
                                                            <h2 className="font-serif text-xl text-foreground mb-4">Project Highlights</h2>
                                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                              {project.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border/60">
                                                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                                  </div>
                                                  <span className="text-sm text-foreground">{h}</span>
                              </li>
                            ))}
                                                            </ul>
                                              </div>
                                  
                                    {/* Milestone timeline */}
                                    {project.milestones && project.milestones.length > 0 && (
                          <div>
                                          <h2 className="font-serif text-xl text-foreground mb-6">Construction Progress</h2>
                                          <div className="relative">
                                            {/* Vertical line */}
                                                            <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-border" />
                                                            <ol className="space-y-4">
                                                              {project.milestones.map((m, i) => {
                                                  const isDone = m.status === "done";
                                                  const isActive = m.status === "active";
                                                  return (
                                                                            <li key={i} className="flex items-start gap-4 relative">
                                                                                                      <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center z-10 mt-0.5
                                                                                                        border-2 transition-colors
                                                                                                        ${isDone ? 'bg-emerald-50 border-emerald-500' : isActive ? 'bg-blue-50 border-blue-500' : 'bg-muted border-border'}"
                                                                                                                                    style={{
                                                                                                                                                                    backgroundColor: isDone ? '#f0fdf4' : isActive ? '#eff6ff' : undefined,
                                                                                                                                                                    borderColor: isDone ? '#10b981' : isActive ? '#3b82f6' : undefined,
                                                                                                                                      }}
                                                                                                                                  >
                                                                                                        {isDone
                                                                                                                                        ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                                                                                                        : isActive
                                                                                                                                        ? <CircleDot className="w-4 h-4 text-blue-600" />
                                                                                                                                        : <Circle className="w-4 h-4 text-muted-foreground/40" />
                                                                                                          }
                                                                                                        </div>
                                                                                                      <div className="flex-1 pt-1.5">
                                                                                                                                  <span className={`text-sm font-medium ${isDone ? 'text-foreground' : isActive ? 'text-blue-700' : 'text-muted-foreground'}`}>
                                                                                                                                    {m.label}
                                                                                                                                    </span>
                                                                                                        {m.note && (
                                                                                                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                                                                                              {m.note}
                                                                                                              </span>
                                                                                                                                  )}
                                                                                                        </div>
                                                                              </li>
                                                                          );
                          })}
                                                            </ol>
                                          </div>
                          </div>
                                              )}
                                  
                                    {/* Photo gallery */}
                                    {project.images.length > 1 && (
                          <div className="space-y-4">
                                          <div className="flex items-center justify-between">
                                                            <h2 className="font-serif text-xl text-foreground">Photo Gallery</h2>
                                                            <button
                                                                                  onClick={() => setActivePhotoIndex(0)}
                                                                                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                                                                                >
                                                                                View All {project.images.length} Photos
                                                            </button>
                                          </div>
                          
                            {project.images.length >= 5 ? (
                                              /* Premium layout for 5+ images */
                                              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                                {/* Left Main (Large) Image */}
                                                                  <div
                                                                                          onClick={() => setActivePhotoIndex(0)}
                                                                                          className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto md:h-full min-h-[240px] rounded-xl overflow-hidden cursor-pointer group shadow-card"
                                                                                        >
                                                                                        <img
                                                                                                                  src={project.images[0]}
                                                                                                                  alt={`${project.name} — Photo 1`}
                                                                                                                  loading="lazy"
                                                                                                                  decoding="async"
                                                                                                                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                                                                                                />
                                                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                                                  </div>
                                              
                                                {/* Smaller Images Grid (right side on desktop, bottom on mobile) */}
                                                                  <div className="grid grid-cols-2 md:grid-cols-2 md:col-span-2 gap-3">
                                                                    {project.images.slice(1, 5).map((img, i) => {
                                                                        const absoluteIndex = i + 1;
                                                                        const isLastVisible = absoluteIndex === 4;
                                                                        const hasMore = project.images.length > 5;
                                                
                                                                        return (
                                                                                                    <div
                                                                                                                                  key={absoluteIndex}
                                                                                                                                  onClick={() => setActivePhotoIndex(absoluteIndex)}
                                                                                                                                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-card"
                                                                                                                                >
                                                                                                                                <img
                                                                                                                                                                src={img}
                                                                                                                                                                alt={`${project.name} — Photo ${absoluteIndex + 1}`}
                                                                                                                                                                loading="lazy"
                                                                                                                                                                decoding="async"
                                                                                                                                                                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                                                                                                                                              />
                                                                                                      {isLastVisible && hasMore ? (
                                                                                                                                                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white transition-all group-hover:bg-black/70">
                                                                                                                                                                                                <span className="text-lg md:text-xl font-bold font-serif">+{project.images.length - 4}</span>
                                                                                                                                                                                                <span className="text-[9px] md:text-[10px] tracking-wider uppercase font-semibold">More Photos</span>
                                                                                                                                                                  </div>
                                                                                                                                                              ) : (
                                                                                                                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                                                                                                                                              )}
                                                                                                      </div>
                                                                                                  );
                                              })}
                                                                  </div>
                                              </div>
                                            ) : (
                                              /* Standard grid layout for 2 to 4 images */
                                              <div className={`grid gap-3 ${
                                                                    project.images.length === 2
                                                                      ? "grid-cols-2"
                                                                      : project.images.length === 3
                                                                      ? "grid-cols-3"
                                                                      : "grid-cols-2 md:grid-cols-4"
                                              }`}>
                                                {project.images.map((img, i) => (
                                                                      <div
                                                                                                key={i}
                                                                                                onClick={() => setActivePhotoIndex(i)}
                                                                                                className="relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer group shadow-card"
                                                                                              >
                                                                                              <img
                                                                                                                          src={img}
                                                                                                                          alt={`${project.name} — Photo ${i + 1}`}
                                                                                                                          loading="lazy"
                                                                                                                          decoding="async"
                                                                                                                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                                                                                                        />
                                                                                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                                                      </div>
                                                                    ))}
                                              </div>
                                          )}
                          </div>
                                              )}
                                  
                                    {/* Lightbox Dialog */}
                                              <Dialog open={activePhotoIndex !== null} onOpenChange={(open) => !open && setActivePhotoIndex(null)}>
                                                            <DialogContent className="max-w-4xl bg-black/95 border-none p-0 text-white gap-0 flex flex-col justify-between overflow-hidden h-[85vh] sm:h-[80vh] md:h-[85vh] [&>button]:hidden">
                                                              {/* Header/Counter */}
                                                                            <div className="flex justify-between items-center px-6 py-4 bg-black/40 z-10 w-full shrink-0">
                                                                                              <span className="text-sm font-medium text-gray-300">
                                                                                                {activePhotoIndex !== null ? activePhotoIndex + 1 : 0} / {project.images.length}
                                                                                                </span>
                                                                                              <span className="text-sm font-medium text-gray-200 hidden sm:inline-block max-w-md truncate">
                                                                                                {project.name}
                                                                                                </span>
                                                                                              <button
                                                                                                                    onClick={() => setActivePhotoIndex(null)}
                                                                                                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                                                                                                                  >
                                                                                                                  <X className="w-5 h-5 text-gray-300 hover:text-white" />
                                                                                                </button>
                                                                            </div>
                                                            
                                                              {/* Main image slide area */}
                                                                            <div className="relative flex-1 flex items-center justify-center w-full px-4 min-h-0 select-none">
                                                                              {/* Prev button */}
                                                                                              <button
                                                                                                                    onClick={(e) => {
                                                                                                                                            e.stopPropagation();
                                                                                                                                            setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + project.images.length) % project.images.length : null));
                                                                                                                      }}
                                                                                                                    className="absolute left-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white border border-white/10 transition-all hover:scale-105"
                                                                                                                  >
                                                                                                                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                                                                                                </button>
                                                                            
                                                                              {/* Image */}
                                                                              {activePhotoIndex !== null && (
                                <img
                                                        src={project.images[activePhotoIndex]}
                                                        alt={`${project.name} — view ${activePhotoIndex + 1}`}
                                                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-300"
                                                      />
                              )}
                                                                            
                                                                              {/* Next button */}
                                                                                              <button
                                                                                                                    onClick={(e) => {
                                                                                                                                            e.stopPropagation();
                                                                                                                                            setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % project.images.length : null));
                                                                                                                      }}
                                                                                                                    className="absolute right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white border border-white/10 transition-all hover:scale-105"
                                                                                                                  >
                                                                                                                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                                                                                                </button>
                                                                            </div>
                                                            
                                                              {/* Thumbnail list */}
                                                                            <div className="w-full bg-black/60 py-4 px-6 shrink-0 z-10 overflow-x-auto border-t border-white/5">
                                                                                              <div className="flex gap-2 justify-center max-w-full">
                                                                                                {project.images.map((img, i) => (
                                  <button
                                                            key={i}
                                                            onClick={() => setActivePhotoIndex(i)}
                                                            className={`relative w-14 h-10 md:w-16 md:h-12 rounded overflow-hidden shrink-0 border-2 transition-all ${
                                                                                        activePhotoIndex === i ? "border-primary opacity-100 scale-105 shadow-md" : "border-transparent opacity-40 hover:opacity-75"
                                                            }`}
                                                          >
                                                          <img src={img} alt="" className="w-full h-full object-cover" />
                                  </button>
                                ))}
                                                                                                </div>
                                                                            </div>
                                                            </DialogContent>
                                              </Dialog>
                                  </div>
                        
                          {/* Sidebar */}
                                  <div className="space-y-6">
                                    {/* Specs card */}
                                              <div className="bg-card rounded-xl border border-border shadow-card p-6">
                                                            <h3 className="font-serif text-lg text-foreground mb-4">Project Specs</h3>
                                                            <dl className="space-y-4">
                                                              {specItems.map(({ icon: Icon, label, value }) => (
                              <div key={label} className="flex items-start gap-3">
                                                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                                        <Icon className="w-4 h-4 text-primary" />
                                                  </div>
                                                  <div>
                                                                        <dt className="text-xs text-muted-foreground">{label}</dt>
                                                                        <dd className="text-sm font-semibold text-foreground">{value}</dd>
                                                  </div>
                              </div>
                            ))}
                                                            </dl>
                                              </div>
                                  
                                    {/* CTA card */}
                                              <div className="bg-forest-gradient rounded-xl p-6 text-primary-foreground">
                                                            <h3 className="font-serif text-lg mb-2">Like What You See?</h3>
                                                            <p className="text-sm opacity-80 mb-5 leading-relaxed">
                                                                            We can build something similar on your plot. Get a free estimate — no obligation.
                                                            </p>
                                                            <div className="flex flex-col gap-3">
                                                                            <Link to="/contact">
                                                                                              <Button variant="hero" size="sm" className="w-full">
                                                                                                                  Get Free Estimate
                                                                                                </Button>
                                                                            </Link>
                                                                            <a
                                                                                                href="https://wa.me/918628989364"
                                                                                                target="_blank"
                                                                                                rel="noopener noreferrer"
                                                                                              >
                                                                                              <Button variant="hero-outline" size="sm" className="w-full">
                                                                                                                  WhatsApp Us
                                                                                                </Button>
                                                                            </a>
                                                            </div>
                                              </div>
                                  </div>
                        </div>
                </section>
          </main>
        );
};

export default ProjectDetail;
