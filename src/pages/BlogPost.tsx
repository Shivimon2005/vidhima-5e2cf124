import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import LeadForm from "@/components/LeadForm";
import { ArrowLeft, Calendar, User, BookOpen, Phone, MessageSquare, DraftingCompass } from "lucide-react";

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

// ── Per-slug media metadata ───────────────────────────────────────────────────

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
  "3-bhk-luxury-apartments-construction-palampur": project1,
  "premium-commercial-shop-project-kangra": project2,
  "student-hostel-construction-dharamshala": project3,
  "modern-villa-construction-palampur": project4,
  "mixed-use-building-construction-palampur": project2,
  "construction-quality-standards-residential-apartments-hp": project1,
};

// ── Image block components (pure React JSX — no dangerouslySetInnerHTML) ─────

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

// ── Content renderer: splits prose on placeholder tokens, injects React nodes ─

const PROSE_CLASSES =
  "prose prose-slate max-w-none " +
  "prose-headings:font-serif prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4 " +
  "prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 " +
  "prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:text-muted-foreground prose-ul:space-y-2 " +
  "prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:text-muted-foreground prose-ol:space-y-2 " +
  "prose-li:text-sm md:prose-li:text-base " +
  "prose-strong:text-foreground prose-strong:font-semibold " +
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
        // Prose chunk: developer-authored static HTML with no dynamic interpolation.
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

// ── Page component ────────────────────────────────────────────────────────────

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.seoTitle} — Vidhima Construction`;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) metaDescription.setAttribute("content", post.seoDescription);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", post.seoTitle);

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute("content", post.seoDescription);
    }
  }, [post]);

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

  return (
    <main className="pt-20">
      {/* Article Header */}
      <section className="py-16 bg-forest-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs text-accent hover:underline mb-6 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Guides & Tips
            </Link>
            <div className="flex items-center gap-4 text-xs opacity-80 mb-4 flex-wrap">
              <span className="font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/20 text-accent">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                By Shivam Sharma
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 text-primary-foreground">
              {post.title}
            </h1>
            <p className="text-lg opacity-85 leading-relaxed font-light">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Article Content & Lead Form */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <BlogContent content={post.content} slug={slug ?? ""} />
              
              {/* Internal CTAs */}
              <div className="mt-12 p-8 rounded-xl border border-primary/20 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">Planning a construction project in Himachal Pradesh?</h3>
                  <p className="text-sm text-muted-foreground max-w-md">Our local experts can help you estimate costs, check TCP regulations, and prepare structural stability details for your plot.</p>
                </div>
                <div className="flex gap-3 shrink-0 flex-wrap justify-center">
                  <a href="tel:+918628989364">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Phone className="w-4 h-4" /> Call Us
                    </Button>
                  </a>
                  <a href="https://wa.me/918628989364" target="_blank" rel="noopener noreferrer">
                    <Button variant="whatsapp" size="sm" className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" /> WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar with Lead Capture Form */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-8">
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-xl">Get Free Estimate</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                  Fill in your project details. We will assess your requirements and soil details for your plot in Himachal Pradesh.
                </p>
                <LeadForm />
              </div>

              <div className="bg-muted rounded-xl p-6 border border-border">
                <h4 className="font-serif text-lg mb-2">Why Vidhima?</h4>
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>State-registered civil construction company in Himachal Pradesh.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>100% transparency with itemized bills and contracts.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Strict adherence to HP TCP rules and seismic standards.</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
