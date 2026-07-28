import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogPosts, type BlogPostData } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import LeadForm from "@/components/LeadForm";
import Breadcrumb from "@/components/Breadcrumb";
import {
  ArrowLeft,
  Calendar,
  User,
  BookOpen,
  Phone,
  MessageSquare,
  DraftingCompass,
  Clock,
  Share2,
  Check,
  ArrowRight,
  List,
  CheckCircle2,
} from "lucide-react";

import apartmentPalampur from "@/assets/apartment_palampur.png";
import commercialKangra from "@/assets/commercial_kangra.png";
import hostelDharamshala from "@/assets/hostel_dharamshala.png";
import villaPalampur from "@/assets/villa_palampur.png";
import mixedUseHp from "@/assets/mixed_use_hp.png";
import constructionQuality from "@/assets/construction_quality.png";
import floorPlan3bhk from "@/assets/floor_plan_3bhk.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

interface MediaMeta {
  heroAlt: string;
  bodyAlt: string;
  galleryCaption: string;
}

const MEDIA_MAP: Record<string, MediaMeta> = {
  "3-bhk-luxury-apartments-construction-palampur": {
    heroAlt: "Modern 3 BHK apartments building elevation rendering in Palampur Himachal Pradesh",
    bodyAlt: "Interior floor plan layout of 3 BHK luxury apartment in Palampur",
    galleryCaption: "3 BHK Luxury Residential Building in Palampur — Gallery",
  },
  "premium-commercial-shop-project-kangra": {
    heroAlt: "Modern commercial shop project exterior glass facade rendering in Kangra Himachal Pradesh",
    bodyAlt: "Ground floor commercial shops layout plan in Kangra",
    galleryCaption: "Commercial Shop Project in Kangra — Gallery",
  },
  "student-hostel-construction-dharamshala": {
    heroAlt: "Modern student hostel building exterior rendering in Dharamshala Himachal Pradesh",
    bodyAlt: "Double occupancy hostel room furniture layout diagram",
    galleryCaption: "Dharamshala Student Hostel Project — Gallery",
  },
  "modern-villa-construction-palampur": {
    heroAlt: "Modern luxury villa building front elevation in Palampur Himachal Pradesh",
    bodyAlt: "Split-level villa foundation and structural layout drawing",
    galleryCaption: "Luxury Villa in Palampur — Gallery",
  },
  "mixed-use-building-construction-palampur": {
    heroAlt: "Mixed use building project render showing retail shops and office spaces in Palampur Himachal Pradesh",
    bodyAlt: "Floor layout plan for mixed use commercial and residential building in Kangra",
    galleryCaption: "Mixed Use Commercial Building in Palampur — Gallery",
  },
  "construction-quality-standards-residential-apartments-hp": {
    heroAlt: "Residential apartments building construction progress photo in Palampur Himachal Pradesh",
    bodyAlt: "Seismic column and reinforcement detailed structural drawing",
    galleryCaption: "Residential Building Quality Standards — Gallery",
  },
};

const HERO_IMAGE_MAP: Record<string, string> = {
  "house-construction-cost-kangra-palampur-2025": constructionQuality,
  "building-on-sloped-plot-himachal-pradesh": villaPalampur,
  "3-bhk-luxury-apartments-construction-palampur": apartmentPalampur,
  "premium-commercial-shop-project-kangra": commercialKangra,
  "student-hostel-construction-dharamshala": hostelDharamshala,
  "modern-villa-construction-palampur": villaPalampur,
  "mixed-use-building-construction-palampur": mixedUseHp,
  "construction-quality-standards-residential-apartments-hp": constructionQuality,
};

const BODY_IMAGE_MAP: Record<string, string> = {
  "3-bhk-luxury-apartments-construction-palampur": floorPlan3bhk,
};

const WALKTHROUGH_IMAGE_MAP: Record<string, string> = {
  "house-construction-cost-kangra-palampur-2025": project1,
  "building-on-sloped-plot-himachal-pradesh": project4,
  "3-bhk-luxury-apartments-construction-palampur": project1,
  "premium-commercial-shop-project-kangra": project2,
  "student-hostel-construction-dharamshala": project3,
  "modern-villa-construction-palampur": project4,
  "mixed-use-building-construction-palampur": project2,
  "construction-quality-standards-residential-apartments-hp": project1,
};

const HeroImageBlock = ({ src, alt }: { src: string; alt: string }) => (
  <div className="my-8 overflow-hidden rounded-xl border border-border bg-muted shadow-md">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full aspect-[16/9] object-cover transition-transform duration-500 hover:scale-[1.02]"
    />
  </div>
);

const BodyImageBlock = ({ src, alt }: { src: string; alt: string }) => (
  <div className="my-8 overflow-hidden rounded-xl border border-border bg-muted shadow-md flex flex-col items-center">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full max-h-[600px] object-contain bg-white transition-transform duration-500 hover:scale-[1.01]"
    />
    <div className="w-full bg-card border-t border-border p-3 text-center">
      <p className="text-xs font-semibold text-foreground">Floor Plan / Detailed Layout Design Drawing</p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{alt}</p>
    </div>
  </div>
);

const BodyImagePlaceholder = ({ alt }: { alt: string }) => (
  <div className="my-8 overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
    <div className="aspect-[16/9] w-full bg-gradient-to-br from-accent/5 to-primary/5 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
        <DraftingCompass className="w-5 h-5" />
      </div>
      <span className="text-xs font-semibold text-foreground">Floor Plan / Detailed Layout Design Drawing</span>
      <span className="text-[10px] text-muted-foreground mt-1 max-w-sm">{alt}</span>
    </div>
  </div>
);

const GalleryImageBlock = ({ src, caption }: { src: string; caption: string }) => (
  <div className="my-8 overflow-hidden rounded-xl border border-border shadow-md relative">
    <img
      src={src}
      alt={caption}
      loading="lazy"
      decoding="async"
      className="w-full aspect-[16/9] object-cover transition-transform duration-500 hover:scale-[1.02]"
    />
    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
      <p className="text-sm md:text-base font-serif text-white">{caption}</p>
    </div>
  </div>
);

const PROSE_CLASSES =
  "prose prose-slate max-w-none " +
  "prose-headings:font-serif prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4 " +
  "prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 " +
  "prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:text-muted-foreground prose-ul:space-y-2 " +
  "prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:text-muted-foreground prose-ol:space-y-2 " +
  "prose-li:text-sm md:prose-li:text-base " +
  "prose-strong:text-foreground prose-strong:font-semibold " +
  "prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-primary/80 " +
  "prose-table:w-full prose-table:border-collapse prose-table:my-6 " +
  "prose-th:border-b prose-th:border-border prose-th:p-3 prose-th:font-semibold prose-th:bg-muted/50 prose-th:text-foreground " +
  "prose-td:border-b prose-td:border-border prose-td:p-3 prose-td:text-muted-foreground";

const PLACEHOLDER_HERO = "<!-- HERO_IMAGE_PLACEHOLDER -->";
const PLACEHOLDER_BODY = "<!-- BODY_IMAGE_1_PLACEHOLDER -->";
const PLACEHOLDER_WALKTHROUGH = "<!-- WALKTHROUGH_VIDEO_PLACEHOLDER -->";
const SPLITTER = new RegExp(
  `(${PLACEHOLDER_HERO}|${PLACEHOLDER_BODY}|${PLACEHOLDER_WALKTHROUGH})`,
  "g"
);

const extractTableOfContents = (content: string) => {
  const regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  const items: { text: string; id: string }[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const rawText = match[1].replace(/<[^>]*>/g, "").trim();
    const id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    items.push({ text: rawText, id });
  }
  return items;
};

const BlogContent = ({ content, slug }: { content: string; slug: string }) => {
  const meta: MediaMeta = MEDIA_MAP[slug] ?? {
    heroAlt: "Vidhima Construction Project Image",
    bodyAlt: "Vidhima Construction Structural Drawing",
    galleryCaption: "Vidhima Construction — Project Gallery",
  };

  const heroSrc = HERO_IMAGE_MAP[slug];
  const bodySrc = BODY_IMAGE_MAP[slug];
  const gallerySrc = WALKTHROUGH_IMAGE_MAP[slug] ?? project1;

  const segments = content.split(SPLITTER);

  return (
    <>
      {segments.map((seg, i) => {
        if (seg === PLACEHOLDER_HERO) {
          return heroSrc ? <HeroImageBlock key={i} src={heroSrc} alt={meta.heroAlt} /> : null;
        }
        if (seg === PLACEHOLDER_BODY) {
          return bodySrc
            ? <BodyImageBlock key={i} src={bodySrc} alt={meta.bodyAlt} />
            : <BodyImagePlaceholder key={i} alt={meta.bodyAlt} />;
        }
        if (seg === PLACEHOLDER_WALKTHROUGH) {
          return <GalleryImageBlock key={i} src={gallerySrc} caption={meta.galleryCaption} />;
        }
        if (!seg.trim()) return null;
        return (
          <div
            key={i}
            className={PROSE_CLASSES}
            dangerouslySetInnerHTML={{ __html: seg }}
          />
        );
      })}
    </>
  );
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (post) {
      document.title = `${post.seoTitle} — Vidhima Construction`;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) metaDescription.setAttribute("content", post.seoDescription);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", post.seoTitle);
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute("content", post.seoDescription);

      const wordCount = post.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
      const dateMap: Record<string, string> = {
        "Jun 2026": "2026-06-01",
        "May 2026": "2026-05-01",
        "Jan 2026": "2026-01-01",
        "Dec 2025": "2025-12-01",
        "Nov 2025": "2025-11-01",
        "Oct 2025": "2025-10-01",
        "Aug 2025": "2025-08-01",
      };
      const datePublished = dateMap[post.date] ?? "2025-08-01";
      const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.seoTitle,
        "description": post.seoDescription,
        "keywords": `construction in Himachal Pradesh, ${post.title}, Palampur, Kangra, Vidhima Construction`,
        "datePublished": datePublished,
        "dateModified": datePublished,
        "wordCount": wordCount,
        "inLanguage": "en-IN",
        "author": { "@type": "Person", "name": post.author.name },
        "publisher": {
          "@type": "Organization",
          "name": "Vidhima Construction Private Limited",
          "logo": { "@type": "ImageObject", "url": "https://vidhima-construction-website.netlify.app/logo-512.png" }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://vidhima-construction-website.netlify.app/blog/${post.slug}`
        }
      };
      let schemaTag = document.querySelector('script[data-blog-schema]') as HTMLScriptElement | null;
      if (!schemaTag) {
        schemaTag = document.createElement('script');
        schemaTag.type = 'application/ld+json';
        schemaTag.setAttribute('data-blog-schema', 'true');
        document.head.appendChild(schemaTag);
      }
      schemaTag.textContent = JSON.stringify(schema);
    }
  }, [post]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!post) {
    return (
      <main className="pt-32 pb-20">
        <div className="container text-center max-w-md mx-auto">
          <h1 className="font-serif text-3xl mb-4 text-foreground">Guide Not Found</h1>
          <p className="text-muted-foreground mb-8">The construction guide you are looking for does not exist or has been relocated.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Guides
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const toc = extractTableOfContents(post.content);
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="pt-20 bg-background min-h-screen">
      <section className="py-16 bg-forest-gradient text-primary-foreground relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <Breadcrumb
              items={[
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
              className="mb-6 text-primary-foreground/70"
            />
            <div className="flex items-center gap-4 text-xs opacity-90 mb-4 flex-wrap">
              <span className="font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                By {post.author.name} ({post.author.role})
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 text-primary-foreground">
              {post.title}
            </h1>
            <p className="text-base md:text-lg opacity-85 leading-relaxed font-light mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Link Copied!" : "Share Article"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <article className="lg:col-span-8">
              {toc.length > 0 && (
                <div className="mb-10 p-6 rounded-2xl bg-card border border-border/80 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <List className="w-4 h-4 text-primary" />
                    <h3 className="font-serif text-lg text-foreground font-semibold">Table of Contents</h3>
                  </div>
                  <ul className="space-y-2 text-xs md:text-sm">
                    {toc.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <span className="text-primary/60 font-semibold">{idx + 1}.</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <BlogContent content={post.content} slug={slug ?? ""} />

              <div className="my-12 p-6 md:p-8 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-forest-gradient flex items-center justify-center text-primary-foreground font-serif text-xl font-bold shrink-0">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-serif text-lg text-foreground font-semibold">{post.author.name}</h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                      {post.author.role}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Civil engineering contributor at Vidhima Construction Private Limited. Managing structural engineering, slope protection, and turnkey construction projects across Palampur, Kangra & Dharamshala.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-8 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">Planning a construction project in Himachal Pradesh?</h3>
                  <p className="text-xs md:text-sm text-muted-foreground max-w-md">Our local civil engineers can help you estimate costs, check TCP regulations, and assess soil stability for your plot.</p>
                </div>
                <div className="flex gap-3 shrink-0 flex-wrap justify-center">
                  <a href="tel:+916230823269">
                    <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4" /> Call Us
                    </Button>
                  </a>
                  <a href="https://wa.me/916230823269?text=Hi%2C%20I%20have%20a%20question%20about%20my%20construction%20project." target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-[hsl(142,70%,35%)] hover:bg-[hsl(142,70%,30%)] text-white flex items-center gap-1.5 font-semibold">
                      <MessageSquare className="w-4 h-4" /> WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </article>

            <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-8">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-xl">Get Free Estimate</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  Fill in your plot specs. We will assess your requirements, soil factors, and TCP rules for your plot in Kangra district.
                </p>
                <LeadForm />
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h4 className="font-serif text-lg mb-3">Why Vidhima Construction?</h4>
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Class-I registered contractor in Himachal Pradesh.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>100% price-lock contract with itemized BOQ bill.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Seismic Zone IV ductile detailing &amp; HP TCP compliance.</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-20 pt-16 border-t border-border">
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                Related Construction Guides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((rPost) => (
                  <article
                    key={rPost.slug}
                    className="group bg-card rounded-xl overflow-hidden border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={rPost.coverImage}
                        alt={rPost.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        {rPost.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Calendar className="w-3 h-3 text-primary" />
                          <span>{rPost.date}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3 text-primary" />
                          <span>{rPost.readTime}</span>
                        </div>
                        <h4 className="font-serif text-base text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                          <Link to={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                        </h4>
                      </div>
                      <Link
                        to={`/blog/${rPost.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline mt-4"
                      >
                        <span>Read Guide</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
