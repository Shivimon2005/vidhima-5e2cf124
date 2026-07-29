import type { Config, Context } from "@netlify/edge-functions";

const BASE_URL = "https://vidhimaconstruction.com";
const ORG_ID  = `${BASE_URL}/#organization`;
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

interface PageMeta {
  title: string;
  description: string;
}

// ── Blog post extra data for Article schema ────────────────────────────────────
interface BlogData {
  headline: string;
  description: string;
  datePublished: string;
  category: string;
}

const BLOG_DATA: Record<string, BlogData> = {
  "house-construction-cost-kangra-palampur-2025": {
    headline: "House Construction Cost in Kangra & Palampur 2026 — Rate Guide",
    description: "Updated 2026 construction rates per sq ft in Kangra, Palampur, and Dharamshala — materials, labour, and hill terrain cost factors.",
    datePublished: "2026-06-01",
    category: "Guide",
  },
  "tcp-noc-approval-palampur-kangra": {
    headline: "TCP NOC Approval in Palampur & Kangra — Complete Guide 2026",
    description: "How to get TCP NOC for construction in Palampur, Kangra & Dharamshala. Documents required, timeline, fees, and expert tips to avoid rejection.",
    datePublished: "2026-07-01",
    category: "Guide",
  },
  "commercial-building-contractor-himachal-pradesh": {
    headline: "Commercial Building Contractor in Himachal Pradesh — How to Choose",
    description: "How to evaluate commercial contractors in HP. Commercial construction costs per sq ft in Kangra & Dharamshala, and key mistakes to avoid.",
    datePublished: "2026-07-01",
    category: "Guide",
  },
  "building-on-sloped-plot-himachal-pradesh": {
    headline: "Building on a Sloped Plot in Himachal Pradesh: What Every Homeowner Must Know",
    description: "Site assessment, retaining wall design, and stepped foundation process for sloped plots in Palampur, Kangra, and Dharamshala.",
    datePublished: "2026-05-01",
    category: "Guide",
  },
  "3-bhk-luxury-apartments-construction-palampur": {
    headline: "3 BHK Luxury Apartments in Palampur: Construction Quality & Features",
    description: "Construction quality, structural design, and premium amenities of luxury 3 BHK apartments in Palampur, Himachal Pradesh.",
    datePublished: "2026-01-01",
    category: "Residential",
  },
  "premium-commercial-shop-project-kangra": {
    headline: "Premium Commercial Shop Projects in Kangra: Design & Rental Benefits",
    description: "Design standards, rental yield analysis, and construction features of premium commercial shop projects in Kangra.",
    datePublished: "2025-12-01",
    category: "Commercial",
  },
  "student-hostel-construction-dharamshala": {
    headline: "Student Hostel Construction in Dharamshala: Layout & Safety Standards",
    description: "Student hostel construction standards, room layouts, and safety requirements in Dharamshala and Palampur.",
    datePublished: "2025-11-01",
    category: "Commercial",
  },
  "modern-villa-construction-palampur": {
    headline: "Modern Villa Construction in Palampur: Earthquake-Resistant Design & Hill Elevations",
    description: "Modern villa construction in Palampur with premium hill elevations and earthquake-resistant structure design.",
    datePublished: "2025-10-01",
    category: "Residential",
  },
  "mixed-use-building-construction-palampur": {
    headline: "Mixed-Use Commercial Building Construction in Palampur-Kangra Corridor",
    description: "Mixed-use building construction in Palampur — retail shops, office spaces, and residential floors.",
    datePublished: "2025-10-01",
    category: "Commercial",
  },
  "construction-quality-standards-residential-apartments-hp": {
    headline: "Construction Quality Standards for Residential Apartments in Himachal Pradesh",
    description: "Concrete grades, waterproofing methods, and structural safeguards for residential apartments in Himachal Pradesh.",
    datePublished: "2025-08-01",
    category: "Residential",
  },
};

// ── BreadcrumbList data per route ──────────────────────────────────────────────
interface Crumb { name: string; url: string }

const BREADCRUMBS: Record<string, Crumb[]> = {
  "/about":              [{ name: "Home", url: BASE_URL }, { name: "About", url: `${BASE_URL}/about` }],
  "/services":           [{ name: "Home", url: BASE_URL }, { name: "Services", url: `${BASE_URL}/services` }],
  "/contact":            [{ name: "Home", url: BASE_URL }, { name: "Contact", url: `${BASE_URL}/contact` }],
  "/why-choose-us":      [{ name: "Home", url: BASE_URL }, { name: "Why Choose Us", url: `${BASE_URL}/why-choose-us` }],
  "/faq":                [{ name: "Home", url: BASE_URL }, { name: "FAQ", url: `${BASE_URL}/faq` }],
  "/government-tenders": [{ name: "Home", url: BASE_URL }, { name: "Government Tenders", url: `${BASE_URL}/government-tenders` }],
  "/sub-contracting":    [{ name: "Home", url: BASE_URL }, { name: "Sub-contracting", url: `${BASE_URL}/sub-contracting` }],
  "/projects":           [{ name: "Home", url: BASE_URL }, { name: "Projects", url: `${BASE_URL}/projects` }],
  "/projects/neelam-residence-yol": [
    { name: "Home", url: BASE_URL },
    { name: "Projects", url: `${BASE_URL}/projects` },
    { name: "Neelam Residence, Tang Narwana", url: `${BASE_URL}/projects/neelam-residence-yol` },
  ],
  "/leadership": [{ name: "Home", url: BASE_URL }, { name: "Leadership", url: `${BASE_URL}/leadership` }],
  "/careers":    [{ name: "Home", url: BASE_URL }, { name: "Careers", url: `${BASE_URL}/careers` }],
  "/csr":        [{ name: "Home", url: BASE_URL }, { name: "CSR", url: `${BASE_URL}/csr` }],
  "/blog":       [{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }],
  "/construction-palampur":           [{ name: "Home", url: BASE_URL }, { name: "Construction in Palampur", url: `${BASE_URL}/construction-palampur` }],
  "/construction-dharamshala":        [{ name: "Home", url: BASE_URL }, { name: "Construction in Dharamshala", url: `${BASE_URL}/construction-dharamshala` }],
  "/construction-kangra":             [{ name: "Home", url: BASE_URL }, { name: "Construction in Kangra", url: `${BASE_URL}/construction-kangra` }],
  "/nri-construction-himachal-pradesh": [{ name: "Home", url: BASE_URL }, { name: "NRI Construction Himachal Pradesh", url: `${BASE_URL}/nri-construction-himachal-pradesh` }],
};

// ── Schema builders ────────────────────────────────────────────────────────────

function buildBlogPostingSchema(slug: string, url: string): string | null {
  const d = BLOG_DATA[slug];
  if (!d) return null;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": d.headline,
    "description": d.description,
    "datePublished": d.datePublished,
    "author": { "@type": "Person", "name": "Shivam Sharma" },
    "publisher": { "@id": ORG_ID },
    "mainEntityOfPage": url,
    "url": url,
    "image": OG_IMAGE,
    "articleSection": d.category,
    "inLanguage": "en-IN",
  });
}

function buildBreadcrumbSchema(crumbs: Crumb[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": c.url,
    })),
  });
}

function buildExtraSchemas(pathname: string, canonicalUrl: string): string {
  const blocks: string[] = [];

  // Article schema for blog posts
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.slice("/blog/".length).replace(/\/$/, "");
    const articleJson = buildBlogPostingSchema(slug, canonicalUrl);
    if (articleJson) {
      blocks.push(`<script type="application/ld+json">${articleJson}</script>`);
    }
    // Breadcrumb for blog post
    const blogData = BLOG_DATA[slug];
    if (blogData) {
      const crumbs: Crumb[] = [
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: blogData.headline, url: canonicalUrl },
      ];
      blocks.push(`<script type="application/ld+json">${buildBreadcrumbSchema(crumbs)}</script>`);
    }
    return blocks.join("\n    ");
  }

  // Breadcrumb for static inner pages
  const crumbs = BREADCRUMBS[pathname];
  if (crumbs && crumbs.length > 1) {
    blocks.push(`<script type="application/ld+json">${buildBreadcrumbSchema(crumbs)}</script>`);
  }

  return blocks.join("\n    ");
}

// ── Per-page meta registry ─────────────────────────────────────────────────────

const STATIC_META: Record<string, PageMeta> = {
  "/": {
    title: "Turnkey Builder in Palampur & Kangra | Vidhima Construction",
    description: "Build your home or commercial space in Himachal Pradesh. HPPWD Class-I registered. 100% price-lock guarantee. Free site visit in 48 hours. Serving Palampur, Kangra, Dharamshala.",
  },
  "/about": {
    title: "About Vidhima Construction — Class-I Contractor in Palampur, Kangra, HP",
    description: "Learn about Vidhima Construction Pvt Ltd — Class-I registered civil contractor in Palampur, Kangra. Building earthquake-safe homes and commercial structures in Himachal Pradesh since 2019.",
  },
  "/services": {
    title: "House Construction Cost Palampur | ₹1,400–2,500/sq ft | Vidhima",
    description: "Turnkey residential & commercial construction in Kangra. Fixed-price contracts, ₹1,400–2,500/sq ft. HPPWD Class-I registered. Design, NOC, build — all in one place.",
  },
  "/contact": {
    title: "Contact Vidhima Construction — Free Site Visit in Kangra & Palampur",
    description: "Book a free site visit and estimate with Vidhima Construction in Palampur, Kangra, HP. Call or WhatsApp +91 62308 23269. Serving Kangra, Dharamshala, Baijnath.",
  },
  "/why-choose-us": {
    title: "Why Choose Vidhima Construction — Trusted Contractor in Himachal Pradesh",
    description: "Transparent pricing, seismic-safe RCC builds, and Class-I registration. Discover why homeowners in Palampur, Kangra, and Dharamshala trust Vidhima Construction.",
  },
  "/faq": {
    title: "Construction FAQs — House Building in Kangra & Palampur | Vidhima",
    description: "Answers to common questions about house construction in Kangra and Palampur. Costs per sq ft, TCP approvals, construction timeline, and hill terrain advice in HP.",
  },
  "/government-tenders": {
    title: "Government Construction Tenders — HPPWD Contractor | Vidhima Construction",
    description: "Vidhima Construction is HPPWD-empanelled Class-I contractor for government tenders in Himachal Pradesh — roads, buildings, drainage, and slope protection works.",
  },
  "/sub-contracting": {
    title: "Civil Sub-contracting Services in Himachal Pradesh | Vidhima Construction",
    description: "Reliable civil sub-contracting in Kangra and Himachal Pradesh. Structural RCC work, masonry, and finishing for developers and main contractors.",
  },
  "/projects": {
    title: "Construction Projects in Kangra & Palampur | Vidhima Construction Portfolio",
    description: "View residential and commercial construction projects completed and ongoing by Vidhima Construction in Kangra, Palampur, and Himachal Pradesh.",
  },
  "/projects/neelam-residence-yol": {
    title: "Neelam Residence, Tang Narwana — G+2 House Construction | Vidhima",
    description: "G+2 residential project in Tang, Narwana — 3000 sq ft RCC frame construction, seismic Zone IV compliant. Structural frame complete, finishing in progress. By Vidhima Construction.",
  },
  "/leadership": {
    title: "Leadership Team — Vidhima Construction Pvt Ltd, Palampur",
    description: "Meet the team behind Vidhima Construction — Class-I registered civil contractors in Palampur, Kangra, Himachal Pradesh.",
  },
  "/careers": {
    title: "Construction Jobs in Palampur & Kangra — Vidhima Construction Careers",
    description: "Civil engineering and construction career opportunities with Vidhima Construction in Palampur, Kangra, and Himachal Pradesh.",
  },
  "/csr": {
    title: "Corporate Social Responsibility — Vidhima Construction, HP",
    description: "Vidhima Construction's commitment to community development, local employment, and sustainable construction practices in Himachal Pradesh.",
  },
  "/blog": {
    title: "Hill Construction Guides — Palampur, Kangra, Dharamshala | Vidhima",
    description: "Expert guides on construction costs, TCP NOC, slope engineering, and contractor selection in Himachal Pradesh. Written by HPPWD Class-I registered builders.",
  },
  "/construction-palampur": {
    title: "Construction Company in Palampur | Turnkey Home Builder | Vidhima",
    description: "Looking for a construction company in Palampur? Vidhima Construction builds homes and commercial spaces in Palampur. Class-I registered, fixed price, free site visit.",
  },
  "/construction-dharamshala": {
    title: "Construction Company in Dharamshala | Home Builder HP | Vidhima",
    description: "Trusted construction company in Dharamshala. Vidhima Construction builds seismic-safe homes and commercial buildings in Dharamshala & McLeod Ganj. Free estimate.",
  },
  "/construction-kangra": {
    title: "Home Builder Kangra | Construction Company Kangra District | Vidhima",
    description: "Looking for a home builder in Kangra? Vidhima Construction delivers turnkey residential & commercial construction across Kangra district. HPPWD Class-I registered.",
  },
  "/nri-construction-himachal-pradesh": {
    title: "NRI Home Construction Himachal Pradesh | Vidhima Construction",
    description: "Build your dream home in Himachal Pradesh from abroad. NRI-friendly turnkey construction in Palampur, Kangra & Dharamshala. Remote management, transparent pricing, legal support.",
  },
};

const BLOG_META: Record<string, PageMeta> = {
  "house-construction-cost-kangra-palampur-2025": {
    title: "House Construction Cost in Kangra & Palampur 2026 — Rate Guide | Vidhima",
    description: "What does house construction cost in Kangra, Palampur, or Dharamshala in 2026? Updated rates per sq ft, material costs, labour charges, and hill terrain premiums explained.",
  },
  "tcp-noc-approval-palampur-kangra": {
    title: "TCP NOC Approval in Palampur & Kangra — Complete Guide 2026 | Vidhima",
    description: "How to get TCP NOC for construction in Palampur, Kangra & Dharamshala. Documents, timeline, fees, and expert tips to avoid rejection from HP Town & Country Planning.",
  },
  "commercial-building-contractor-himachal-pradesh": {
    title: "Commercial Building Contractor in Himachal Pradesh — How to Choose | Vidhima",
    description: "Looking for a commercial building contractor in HP? Evaluate contractors, understand commercial construction costs in Kangra & Dharamshala, and avoid costly mistakes.",
  },
  "building-on-sloped-plot-himachal-pradesh": {
    title: "Building on a Sloped Plot in Himachal Pradesh — Hill Construction Guide",
    description: "Everything you need to know about building on sloped land in Palampur, Kangra, or Dharamshala. Retaining walls, stepped foundations, soil tests, and slope safety.",
  },
  "3-bhk-luxury-apartments-construction-palampur": {
    title: "3 BHK Apartments in Palampur: Construction Quality & Design | Vidhima",
    description: "Looking for 3 BHK apartments in Palampur? Luxury apartments with earthquake-resistant structure, premium parking, and modern flat designs by Vidhima Construction.",
  },
  "premium-commercial-shop-project-kangra": {
    title: "Commercial Shop Project in Kangra: Retail & Office Spaces | Vidhima",
    description: "Explore premium commercial shop projects in Kangra. High rental yield office spaces, modern retail designs, and secure parking in Himachal Pradesh.",
  },
  "student-hostel-construction-dharamshala": {
    title: "Student Hostel Construction in Dharamshala: PG Layouts | Vidhima",
    description: "Student hostel construction in Dharamshala. Safe PG accommodation layouts, double occupancy designs, and structural safety standards in Himachal Pradesh.",
  },
  "modern-villa-construction-palampur": {
    title: "Luxury Villas in Palampur: Custom Modern Construction | Vidhima",
    description: "Interested in luxury villas in Palampur? Custom villa construction with earthquake-resistant design and premium mountain elevations in Himachal Pradesh.",
  },
  "mixed-use-building-construction-palampur": {
    title: "Mixed Use Building Construction in Palampur & Kangra | Vidhima",
    description: "Explore mixed use building construction in Palampur — office spaces, retail shops, and residential floors in one high-yield Himachal Pradesh property.",
  },
  "construction-quality-standards-residential-apartments-hp": {
    title: "Residential Apartments in Palampur HP: Quality & Safety Standards | Vidhima",
    description: "Construction quality standards for residential apartments in Palampur, Himachal Pradesh. Concrete grades, waterproofing methods, and seismic safety explained.",
  },
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getMeta(pathname: string): PageMeta & { canonical: string } {
  if (STATIC_META[pathname]) {
    return { ...STATIC_META[pathname], canonical: `${BASE_URL}${pathname}` };
  }
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.slice("/blog/".length).replace(/\/$/, "");
    if (BLOG_META[slug]) {
      return { ...BLOG_META[slug], canonical: `${BASE_URL}${pathname}` };
    }
  }
  if (pathname.startsWith("/projects/")) {
    const slug = pathname.slice("/projects/".length).replace(/\/$/, "");
    const key = `/projects/${slug}`;
    if (STATIC_META[key]) {
      return { ...STATIC_META[key], canonical: `${BASE_URL}${pathname}` };
    }
  }
  return { ...STATIC_META["/"], canonical: `${BASE_URL}${pathname}` };
}

export default async function handler(request: Request, context: Context) {
  const response = await context.next();

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  const url = new URL(request.url);
  const meta = getMeta(url.pathname);

  let html = await response.text();

  const title = esc(meta.title);
  const desc = esc(meta.description);
  const canonical = esc(meta.canonical);

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${desc}"`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${title}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${desc}"`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${title}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${desc}"`
  );

  const extraSchemas = buildExtraSchemas(url.pathname, meta.canonical);
  const inject = [
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:url" content="${canonical}">`,
    extraSchemas,
  ].filter(Boolean).join("\n    ");
  html = html.replace("</head>", `    ${inject}\n  </head>`);

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
}

export const config: Config = {
  path: "/*",
  excludedPath: [
    "/assets/*",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
    "/*.js",
    "/*.css",
    "/*.png",
    "/*.jpg",
    "/*.jpeg",
    "/*.svg",
    "/*.webp",
  ],
};
