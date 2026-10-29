import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ShieldCheck,
  FileText,
  Calculator,
  Compass,
  Building2,
  Eye,
  Layers,
  Flame,
  Trees,
  Check,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Exact Quotation Data from Vidhima Design Studio Rate Card
const architectureServices = [
  {
    slNo: 1,
    category: "Architecture",
    service: "Concept Drawings",
    details:
      "Initial design blueprint that lays the foundation for the overall vision of the project. Includes: 1. Discussion with the client regarding project requirements; 2. 2 No. options of conceptual themes; 3. Focus on functionality, spatial analysis, style, color palette, theme, and material inspiration.",
    rate: 5,
  },
  {
    slNo: 2,
    category: "Architecture",
    service: "Floor Plan with basic furniture Layout",
    details:
      "Comprehensive package providing detailed Floor Plan drawings with basic furniture placement layouts for the project considering the concept selected by the client at the end of Concept Drawings.",
    rate: 6,
  },
  {
    slNo: 3,
    category: "Architecture",
    service: "Door / Window Schedule",
    details:
      "Detailed Door and Window schedules with exact heights from Finish Floor Level (FFL).",
    rate: 4,
  },
  {
    slNo: 4,
    category: "Architecture",
    service: "Elevations & Sections (2 Nos. each)",
    details:
      "Detailed, accurate and constructible Elevations & Sections of the project with precise level differences specified.",
    rate: 5,
  },
  {
    slNo: 5,
    category: "Architecture",
    service: "3 Side Views",
    details:
      "Basic 3D visualisation for the project, to experience the real architectural finishes, textures, and overall exterior look.",
    rate: 5,
  },
  {
    slNo: 6,
    category: "MEP",
    service: "Electrical Layout",
    details:
      "Detailed layout of electrical fixture placement, wiring junction routes, and switch board modules.",
    rate: 5,
  },
  {
    slNo: 7,
    category: "MEP",
    service: "Plumbing Layout",
    details:
      "Detailed layout of plumbing fixture placements and piping junction routes for supply and drainage.",
    rate: 5,
  },
];

const additionalServices = [
  {
    slNo: 8,
    category: "Structural",
    service: "Structure Design",
    details:
      "Detailed Good For Construction (GFC) drawings covering structural technicalities, foundation design, and seismic engineering for Himachal terrain.",
    rate: 6,
    icon: Building2,
  },
  {
    slNo: 9,
    category: "Statutory",
    service: "Fire NOC Drawings",
    details:
      "Detailed Good For Construction drawings covering fire safety measures adhering to National Building Code (NBC), Himachal Pradesh Town and Country Planning (HP TCP) Bye-Laws, and local authorities.",
    rate: 6,
    icon: Flame,
  },
  {
    slNo: 10,
    category: "Landscape",
    service: "Landscape Design",
    details:
      "Detailed Good For Construction drawings covering outdoor landscaping areas, detailing both Hardscape (paving, retaining, pathways) and Softscape (greenery, turf, plant species).",
    rate: 4,
    icon: Trees,
  },
  {
    slNo: 11,
    category: "Visualisation",
    service: "Detailed 3D Renders (4-Side Views)",
    details:
      "Upgrades the 3 included exterior views to comprehensive, high-definition photorealistic 4-side 3D renders capturing lighting, materials, and hill topography.",
    rate: 8,
    icon: Eye,
  },
];

const interiorServices = [
  {
    slNo: 1,
    category: "Conceptuals",
    service: "Concept Drawings",
    details:
      "Initial interior blueprint laying the foundation for the overall ambiance. Includes client consultation, 2 conceptual theme options focusing on spatial flow, mood boards, color palettes, and material inspiration.",
    rate: 5,
  },
  {
    slNo: 2,
    category: "Good for Construction",
    service: "Floor Plan with furniture Layout",
    details:
      "Comprehensive package providing detailed Floor Plan drawings with complete furniture placement and functional zoning considering the chosen concept.",
    rate: 10,
  },
  {
    slNo: 3,
    category: "Good for Construction",
    service: "Furniture Details with Elevations & Sections",
    details:
      "Precision detail drawings of customisable woodwork, modular furniture, wardrobes, storage shelves, TV units, with constructible Elevations & Sections of interior walls.",
    rate: 20,
  },
  {
    slNo: 4,
    category: "Good for Construction",
    service: "Wall Finishes & Treatments",
    details:
      "Detailed drawings and specifications of customisable wall panellings, texture paints, fluted panels, murals, wallpaper, and acoustic sound-proof coverings.",
    rate: 10,
  },
  {
    slNo: 5,
    category: "Visualisation",
    service: "HD 3D Interior Renders",
    details:
      "Detailed photorealistic 3D visualization of interior spaces that enables accurate decision-making, finish selection, and design approvals before on-site execution.",
    rate: 15,
  },
];

const studioOffice = {
  name: "Vidhima Design Studio",
  tagline: "DESIGN. DETAIL. DELIVER.",
  disciplines: "ARCHITECTURE | INTERIOR | PLANNING",
  licenseNo: "RP2956/2025",
  address: "Differ Patt, SSB Chowk, Palampur, Distt Kangra, Himachal Pradesh",
  phone: "+91 85805 04989",
  email: "vidhimaho@gmail.com",
};

interface RateItem {
  slNo: number;
  category: string;
  service: string;
  details: string;
  rate: number;
}

// Phone-width alternative to the wide rate table: same data, stacked as cards.
const MobileRateList = ({
  items,
  total,
  totalLabel,
}: {
  items: RateItem[];
  total?: number;
  totalLabel?: string;
}) => (
  <ul className="md:hidden divide-y divide-border">
    {items.map((item) => (
      <li key={item.slNo} className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-sm font-medium bg-muted text-foreground mb-1">
              {item.category}
            </span>
            <p className="font-semibold text-foreground">{item.service}</p>
          </div>
          <span className="font-mono font-bold text-primary whitespace-nowrap">₹{item.rate}/sq.ft</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{item.details}</p>
      </li>
    ))}
    {total !== undefined && (
      <li className="p-4 bg-muted/70 flex items-center justify-between font-bold">
        <span className="font-serif text-foreground">{totalLabel}</span>
        <span className="font-mono text-primary">₹{total}/sq.ft</span>
      </li>
    )}
  </ul>
);

const DesignStudio = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = "Vidhima Design Studio — Architecture & Interior Design in Palampur, Himachal Pradesh";
    return () => {
      document.title = previous;
    };
  }, []);

  // Interactive Cost Calculator state
  const [area, setArea] = useState<number>(1500);
  const [includeArchitecture, setIncludeArchitecture] = useState<boolean>(true);
  const [includeInterior, setIncludeInterior] = useState<boolean>(false);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);

  const toggleAddon = (slNo: number) => {
    setSelectedAddons((prev) =>
      prev.includes(slNo) ? prev.filter((id) => id !== slNo) : [...prev, slNo]
    );
  };

  const archRate = includeArchitecture ? 35 : 0;
  const interiorRate = includeInterior ? 60 : 0;
  const addonRate = selectedAddons.reduce((acc, id) => {
    const item = additionalServices.find((s) => s.slNo === id);
    return acc + (item ? item.rate : 0);
  }, 0);

  const totalRatePerSqFt = archRate + interiorRate + addonRate;
  const estimatedCost = (area || 0) * totalRatePerSqFt;

  const whatsappMessage = encodeURIComponent(
    `Hello Vidhima Design Studio! I am interested in your design services for a ${area} sq.ft project in Himachal Pradesh.\n\nEstimated Scope:\n${
      includeArchitecture ? "• Complete Architecture Design (₹35/sq.ft)\n" : ""
    }${includeInterior ? "• Complete Interior Design (₹60/sq.ft)\n" : ""}${
      selectedAddons.length > 0
        ? `• Add-ons: ${selectedAddons
            .map((id) => additionalServices.find((s) => s.slNo === id)?.service)
            .join(", ")}\n`
        : ""
    }Estimated Total: ₹${estimatedCost.toLocaleString("en-IN")} (@ ₹${totalRatePerSqFt}/sq.ft).\nPlease let me know the next steps for a consultation.`
  );

  return (
    <main className="pt-20">
      {/* Schema markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Vidhima Design Studio",
            alternateName: "Vidhima Architecture & Interior Design Studio",
            description:
              "Official architectural design, interior design, and planning quotation by Vidhima Design Studio in Palampur, Kangra, Himachal Pradesh. License No: RP2956/2025.",
            license: "RP2956/2025",
            telephone: "+91-8580504989",
            email: "vidhimaho@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Differ Patt, SSB Chowk",
              addressLocality: "Palampur",
              addressRegion: "Himachal Pradesh",
              postalCode: "176061",
              addressCountry: "IN",
            },
            priceRange: "₹4 - ₹60 / sq.ft",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Design Studio Rates",
              itemListElement: [
                {
                  "@type": "Offer",
                  name: "Complete Architecture Design Package",
                  price: "35",
                  priceCurrency: "INR",
                  unitText: "sq.ft",
                },
                {
                  "@type": "Offer",
                  name: "Complete Interior Design Package",
                  price: "60",
                  priceCurrency: "INR",
                  unitText: "sq.ft",
                },
              ],
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="py-10 md:py-20 bg-forest-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Breadcrumb
              items={[{ label: "Services", href: "/services" }, { label: "Design Studio" }]}
              className="mb-4"
              tone="dark"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-medium text-accent uppercase tracking-widest mb-5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Registered Studio · License No: {studioOffice.licenseNo}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-5 tracking-tight leading-tight">
              Vidhima Design Studio
            </h1>

            {/* Benefit-first sub-headline — no jargon */}
            <p className="opacity-90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              See exactly what your home will look like — and what it costs to design.
              Architecture drawings, interior design &amp; 3D renders.
              Transparent per-sq.ft. rates. Zero hidden fees.
            </p>

            {/* Single primary CTA + 2 secondary text links */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
              <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[hsl(142,72%,29%)] hover:bg-[hsl(142,72%,24%)] text-white shadow-lg text-base font-semibold px-8"
                 asChild><a
                href={`https://wa.me/918580504989?text=${encodeURIComponent(
                  "Hi Vidhima Design Studio, I would like to consult with an architect regarding design services for my project in Himachal Pradesh."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:w-auto w-full"
              >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp for a Free Consultation
                </a></Button>
              <Button size="lg" variant="hero-outline" className="w-full sm:w-auto border-white/70 text-white hover:bg-white/10" asChild><a href="#quotation-tables" className="sm:w-auto w-full">
                  View Rate Card <ArrowRight className="w-4 h-4 ml-1" />
                </a></Button>
              <Button size="lg" variant="hero-outline" className="w-full sm:w-auto border-white/70 text-white hover:bg-white/10" asChild><a href="#calculator" className="sm:w-auto w-full">
                  <Calculator className="w-4 h-4 mr-2" />
                  Cost Calculator
                </a></Button>
            </div>

            {/* Quick price anchors — replaces the heavy contact chip block */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-80 border-t border-white/15 pt-5">
              <span className="font-semibold text-accent">Architecture</span>
              <span>₹35 / sq.ft · 7 drawings included</span>
              <span className="font-semibold text-accent hidden sm:inline">·</span>
              <span className="font-semibold text-accent">Interior Design</span>
              <span>₹60 / sq.ft · Full site-ready (GFC) set</span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights: 3 Core Quotation Categories */}
      <section className="py-16 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-2">
              Official Quotation Summary
            </span>
            <h2 className="font-serif text-3xl md:text-4xl">Transparent Per-Sq.Ft. Rates</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              No hidden fees. Every service category is itemized with clear deliverables so you only pay for what your project needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Architecture Card */}
            <div className="rounded-2xl border-2 border-primary/20 bg-card p-6 md:p-8 shadow-card flex flex-col relative hover:shadow-card-hover transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  Full Architecture
                </span>
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-1">Architecture Design</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Concept, Floor Plans, Openings, Elevations, 3D Views & Electrical/Plumbing (MEP)
              </p>
              <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-bold font-serif text-primary">₹35</span>
                  <span className="text-muted-foreground text-sm font-medium">/ sq.ft.</span>
                </div>
                <span className="text-sm text-muted-foreground block mt-1">
                  All 7 fundamental architectural, electrical & plumbing (MEP) drawings included
                </span>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Concept drawings & spatial analysis (₹5/sq.ft)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Detailed floor plans & basic furniture layout (₹6/sq.ft)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Door & window schedule with FFL heights (₹4/sq.ft)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>2 Elevations & 2 Sections with levels (₹5/sq.ft)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>3-Side exterior visualization views (₹5/sq.ft)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>MEP: Electrical layout & wiring routes (₹5/sq.ft)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>MEP: Plumbing & piping fixture routes (₹5/sq.ft)</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline" asChild><a href="#quotation-tables" className="w-full">
                  See Architecture Breakdown
                </a></Button>
            </div>

            {/* Interior Card */}
            <div className="rounded-2xl border-2 border-primary bg-card p-6 md:p-8 shadow-card-hover ring-2 ring-primary/20 flex flex-col relative hover:shadow-xl transition-all">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full shadow-sm">
                Complete Interiors
              </span>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  Turnkey Interiors
                </span>
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-1">Interior Design</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Concepts, Furniture Details, Wall Treatments & HD 3D Renders
              </p>
              <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-bold font-serif text-primary">₹60</span>
                  <span className="text-muted-foreground text-sm font-medium">/ sq.ft.</span>
                </div>
                <span className="text-sm text-muted-foreground block mt-1">
                  Complete Good For Construction (GFC) interior set
                </span>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Interior concept drawings & mood boards (₹5/sq.ft)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Detailed floor plan with furniture layout (₹10/sq.ft)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Custom furniture details, elevations & sections (₹20/sq.ft)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Wall panelling, finishes & texture detailing (₹10/sq.ft)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Photorealistic HD 3D interior renders (₹15/sq.ft)</span>
                </li>
              </ul>
              <Button className="w-full" variant="default" asChild><a href="#quotation-tables" className="w-full">
                  See Interior Breakdown
                </a></Button>
            </div>

            {/* Additional Services Card */}
            <div className="rounded-2xl border-2 border-border bg-card p-6 md:p-8 shadow-card flex flex-col relative hover:shadow-card-hover transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-semibold uppercase tracking-wider">
                  Specialized Add-ons
                </span>
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-1">Additional Services</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Statutory, Structural & Landscape packages
              </p>
              <div className="mb-6 p-4 rounded-xl bg-muted/60 border border-border">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-serif text-foreground">A La Carte</span>
                </div>
                <span className="text-sm text-muted-foreground block mt-1">
                  Select individually based on your site & regulatory needs
                </span>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground mb-6 flex-1">
                <li className="flex items-start justify-between border-b border-border/50 pb-2">
                  <div>
                    <span className="font-medium text-foreground block">Structure Design (GFC)</span>
                    <span className="text-sm text-muted-foreground">Foundation & structural drawings</span>
                  </div>
                  <span className="font-semibold text-primary">₹6 / sq.ft</span>
                </li>
                <li className="flex items-start justify-between border-b border-border/50 pb-2">
                  <div>
                    <span className="font-medium text-foreground block">Fire NOC Drawings</span>
                    <span className="text-sm text-muted-foreground">NBC & HP TCP bye-law compliance</span>
                  </div>
                  <span className="font-semibold text-primary">₹6 / sq.ft</span>
                </li>
                <li className="flex items-start justify-between border-b border-border/50 pb-2">
                  <div>
                    <span className="font-medium text-foreground block">Landscape Design</span>
                    <span className="text-sm text-muted-foreground">Hardscape & softscape GFC</span>
                  </div>
                  <span className="font-semibold text-primary">₹4 / sq.ft</span>
                </li>
                <li className="flex items-start justify-between">
                  <div>
                    <span className="font-medium text-foreground block">Detailed 3D Renders (4 Views)</span>
                    <span className="text-sm text-muted-foreground">HD 4-side exterior visualization</span>
                  </div>
                  <span className="font-semibold text-primary">₹8 / sq.ft</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline" asChild><a href="#calculator" className="w-full">
                  Configure with Add-ons
                </a></Button>
            </div>
          </div>

          {/* Fix #8: CTA row after trust section — warm leads need a prompt here */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-[hsl(142,72%,29%)] hover:bg-[hsl(142,72%,24%)] text-white shadow-md font-semibold" asChild><a
              href={`https://wa.me/918580504989?text=${encodeURIComponent(
                "Hi Vidhima Design Studio, I would like to discuss a design project for my property in Himachal Pradesh."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp for a Free Consultation
              </a></Button>
          </div>
        </div>
      </section>

      {/* Itemized Quotation Tables */}
      <section className="py-20 scroll-mt-24" id="quotation-tables">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                Official Rate Card
              </span>
              <h2 className="font-serif text-3xl md:text-4xl">Complete Quotation Breakdown</h2>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl mb-8">
            Below is the comprehensive scope of work for each category as defined in our official Vidhima Design Studio quotation document.
          </p>

          <p className="text-sm text-muted-foreground max-w-3xl mb-8 rounded-lg bg-muted/50 border border-border px-4 py-3">
            <span className="font-semibold text-foreground">Terms explained: </span>
            <abbr title="Good For Construction">GFC</abbr> = site-ready drawings a contractor can build from ·{" "}
            <abbr title="Mechanical, Electrical and Plumbing">MEP</abbr> = electrical &amp; plumbing layouts ·{" "}
            <abbr title="Finished Floor Level">FFL</abbr> = finished floor level ·{" "}
            <abbr title="National Building Code">NBC</abbr> = National Building Code ·{" "}
            <abbr title="Himachal Pradesh Town and Country Planning">HP TCP</abbr> = state planning bye-laws ·{" "}
            <abbr title="No Objection Certificate">NOC</abbr> = official clearance.
          </p>

          <Tabs defaultValue="architecture" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 max-w-xl mb-8 h-auto p-1.5 bg-muted">
              <TabsTrigger value="architecture" className="py-2.5 text-sm font-medium">
                1. Architecture Design (₹35)
              </TabsTrigger>
              <TabsTrigger value="interior" className="py-2.5 text-sm font-medium">
                2. Interior Design (₹60)
              </TabsTrigger>
              <TabsTrigger value="additional" className="py-2.5 text-sm font-medium">
                3. Additional Services
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: ARCHITECTURE */}
            <TabsContent value="architecture">
              <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 bg-muted/40 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-xl text-foreground font-semibold">
                      Architecture Design Quotation
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Scope encompasses full architectural drafting, municipal approvals, and MEP coordination.
                    </p>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                    Total Rate: ₹35 / sq.ft.
                  </div>
                </div>

                <MobileRateList items={architectureServices} total={35} totalLabel="Total architecture design rate" />
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableCaption className="sr-only">Architecture design scope of work and per-sq.ft. rates</TableCaption>
                    <TableHeader className="bg-muted/60">
                      <TableRow>
                        <TableHead scope="col" className="w-16 font-semibold">Sl. No.</TableHead>
                        <TableHead scope="col" className="w-32 font-semibold">Category</TableHead>
                        <TableHead scope="col" className="w-64 font-semibold">Services</TableHead>
                        <TableHead scope="col" className="font-semibold">Scope of Work & Deliverables</TableHead>
                        <TableHead scope="col" className="w-28 text-right font-semibold">Sq.Ft. Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {architectureServices.map((item) => (
                        <TableRow key={item.slNo} className="hover:bg-muted/40">
                          <TableCell className="font-medium text-muted-foreground">{item.slNo}</TableCell>
                          <TableCell>
                            <span className="inline-block px-2 py-0.5 rounded text-sm font-medium bg-muted text-foreground">
                              {item.category}
                            </span>
                          </TableCell>
                          <TableCell className="font-semibold text-foreground">{item.service}</TableCell>
                          <TableCell className="text-muted-foreground text-sm leading-relaxed">
                            {item.details}
                          </TableCell>
                          <TableCell className="text-right font-mono font-bold text-primary">
                            ₹{item.rate}/-
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/70 font-bold border-t-2 border-primary/20">
                        <TableCell colSpan={4} className="text-right font-serif text-base text-foreground">
                          TOTAL ARCHITECTURE DESIGN RATE:
                        </TableCell>
                        <TableCell className="text-right font-mono text-lg text-primary">
                          ₹35/- <span className="text-xs font-normal text-muted-foreground">sq.ft</span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: ADDITIONAL SERVICES */}
            <TabsContent value="additional">
              <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 bg-muted/40 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-xl text-foreground font-semibold">
                      Additional Architectural Services
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Statutory clearances, Good-For-Construction structural sets, and landscaping.
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Available as individual add-ons
                  </div>
                </div>

                <MobileRateList items={additionalServices} />
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableCaption className="sr-only">Additional services scope and per-sq.ft. rates</TableCaption>
                    <TableHeader className="bg-muted/60">
                      <TableRow>
                        <TableHead scope="col" className="w-16 font-semibold">Sl. No.</TableHead>
                        <TableHead scope="col" className="w-32 font-semibold">Category</TableHead>
                        <TableHead scope="col" className="w-64 font-semibold">Services</TableHead>
                        <TableHead scope="col" className="font-semibold">Details & Statutory Compliance</TableHead>
                        <TableHead scope="col" className="w-28 text-right font-semibold">Sq.Ft. Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {additionalServices.map((item) => (
                        <TableRow key={item.slNo} className="hover:bg-muted/40">
                          <TableCell className="font-medium text-muted-foreground">{item.slNo}</TableCell>
                          <TableCell>
                            <span className="inline-block px-2 py-0.5 rounded text-sm font-medium bg-muted text-foreground">
                              {item.category}
                            </span>
                          </TableCell>
                          <TableCell className="font-semibold text-foreground">{item.service}</TableCell>
                          <TableCell className="text-muted-foreground text-sm leading-relaxed">
                            {item.details}
                          </TableCell>
                          <TableCell className="text-right font-mono font-bold text-primary">
                            ₹{item.rate}/-
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: INTERIOR DESIGN */}
            <TabsContent value="interior">
              <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 bg-muted/40 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-xl text-foreground font-semibold">
                      Interior Design Quotation
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Detailed interior execution scope including custom carpentry, elevations, and photorealistic 3D renders.
                    </p>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                    Total Rate: ₹60 / sq.ft.
                  </div>
                </div>

                <MobileRateList items={interiorServices} total={60} totalLabel="Total interior design rate" />
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableCaption className="sr-only">Interior design scope of work and per-sq.ft. rates</TableCaption>
                    <TableHeader className="bg-muted/60">
                      <TableRow>
                        <TableHead scope="col" className="w-16 font-semibold">Sl. No.</TableHead>
                        <TableHead scope="col" className="w-44 font-semibold">Category</TableHead>
                        <TableHead scope="col" className="w-64 font-semibold">Services</TableHead>
                        <TableHead scope="col" className="font-semibold">Scope of Work & Deliverables</TableHead>
                        <TableHead scope="col" className="w-28 text-right font-semibold">Sq.Ft. Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {interiorServices.map((item) => (
                        <TableRow key={item.slNo} className="hover:bg-muted/40">
                          <TableCell className="font-medium text-muted-foreground">{item.slNo}</TableCell>
                          <TableCell>
                            <span className="inline-block px-2 py-0.5 rounded text-sm font-medium bg-muted text-foreground">
                              {item.category}
                            </span>
                          </TableCell>
                          <TableCell className="font-semibold text-foreground">{item.service}</TableCell>
                          <TableCell className="text-muted-foreground text-sm leading-relaxed">
                            {item.details}
                          </TableCell>
                          <TableCell className="text-right font-mono font-bold text-primary">
                            ₹{item.rate}/-
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/70 font-bold border-t-2 border-primary/20">
                        <TableCell colSpan={4} className="text-right font-serif text-base text-foreground">
                          TOTAL INTERIOR DESIGN RATE:
                        </TableCell>
                        <TableCell className="text-right font-mono text-lg text-primary">
                          ₹60/- <span className="text-xs font-normal text-muted-foreground">sq.ft</span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Interactive Quotation Calculator */}
      <section className="py-20 bg-muted/40 border-y border-border scroll-mt-24" id="calculator">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-2">
                Instant Estimator
              </span>
              <h2 className="font-serif text-3xl md:text-4xl">Calculate Your Project Design Cost</h2>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                Enter your built-up area and select packages or add-ons to see real-time costs based on our official quotation rates.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-card p-6 md:p-10">
              {/* Area Input */}
              <div className="mb-8">
                <label htmlFor="area-input" className="block text-sm font-semibold text-foreground mb-2">
                  Total Built-Up Area (in Sq. Ft.):
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  <input
                    id="area-input"
                    type="number"
                    min={200}
                    max={50000}
                    step={50}
                    value={area}
                    onChange={(e) => setArea(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full max-w-xs px-4 py-2.5 rounded-lg border border-border bg-background text-lg font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 1500"
                    inputMode="numeric"
                    aria-describedby="area-help"
                    aria-invalid={area < 200 || area > 50000}
                  />
                  <div className="flex flex-wrap gap-2">
                    {[1000, 1500, 2000, 3000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setArea(preset)}
                        className={`text-sm px-4 py-2.5 min-h-11 rounded-md border transition-colors ${
                          area === preset
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted hover:bg-muted/80 text-foreground border-border"
                        }`}
                      >
                        {preset} sq.ft
                      </button>
                    ))}
                  </div>
                </div>
                <p
                  id="area-help"
                  className={`mt-2 text-sm ${area < 200 || area > 50000 ? "text-destructive font-medium" : "text-muted-foreground"}`}
                >
                  {area < 200 || area > 50000
                    ? "Enter an area between 200 and 50,000 sq.ft."
                    : "Built-up area across all floors, in square feet."}
                </p>
              </div>

              {/* Main Service Checkboxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    includeArchitecture
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border hover:bg-muted/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={includeArchitecture}
                    onChange={(e) => setIncludeArchitecture(e.target.checked)}
                    className="w-6 h-6 mt-0.5 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Architecture Package</span>
                      <span className="font-mono text-sm font-bold text-primary">₹35 / sq.ft</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Concept, floor plans, door/window schedules, elevations, sections, 3-side views & electrical/plumbing MEP.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    includeInterior
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border hover:bg-muted/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={includeInterior}
                    onChange={(e) => setIncludeInterior(e.target.checked)}
                    className="w-6 h-6 mt-0.5 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Interior Design Package</span>
                      <span className="font-mono text-sm font-bold text-primary">₹60 / sq.ft</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Concept drawings, GFC floor plans, custom woodwork details, wall panelling, and HD 3D renders.
                    </p>
                  </div>
                </label>
              </div>

              {/* Add-ons Selection */}
              <div className="mb-8">
                <span className="text-sm font-semibold text-foreground block mb-3">
                  Optional add-ons (priced on your total built-up area):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {additionalServices.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.slNo);
                    return (
                      <label
                        key={addon.slNo}
                        className={`flex items-start gap-3 p-3.5 rounded-lg border text-sm cursor-pointer transition-colors ${
                          isChecked
                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                            : "border-border hover:bg-muted/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon.slNo)}
                          className="w-6 h-6 mt-0.5 rounded accent-primary"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{addon.service}</span>
                            <span className="font-mono text-sm font-semibold text-primary">
                              +₹{addon.rate}/sq.ft
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground line-clamp-2 mt-0.5 block">
                            {addon.details}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Estimate Result Box */}
              <div className="p-6 rounded-xl bg-forest-gradient text-primary-foreground flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div aria-live="polite" aria-atomic="true">
                  <span className="text-xs uppercase tracking-wider text-accent font-semibold block mb-1">
                    Estimated Design Studio Quotation
                  </span>
                  {totalRatePerSqFt === 0 ? (
                    <p className="text-base md:text-lg opacity-80 max-w-sm">
                      ← Select Architecture or Interior Design above to calculate your design fee estimate.
                    </p>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-serif font-bold">
                          ₹{estimatedCost.toLocaleString("en-IN")}
                        </span>
                        <span className="text-sm opacity-80">
                          (@ ₹{totalRatePerSqFt} / sq.ft for {area.toLocaleString("en-IN")} sq.ft)
                        </span>
                      </div>
                      <div className="text-sm opacity-90 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        {includeArchitecture && <span>Architecture: ₹{(area * 35).toLocaleString("en-IN")}</span>}
                        {includeInterior && <span>Interior: ₹{(area * 60).toLocaleString("en-IN")}</span>}
                        {addonRate > 0 && <span>Add-ons: ₹{(area * addonRate).toLocaleString("en-IN")}</span>}
                      </div>
                      <p className="text-sm opacity-90 mt-2">
                        * Design &amp; drawings fee estimate only — not construction cost.
                      </p>
                    </>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  {totalRatePerSqFt > 0 && (
                    <Button size="lg" className="w-full bg-[hsl(142,72%,29%)] hover:bg-[hsl(142,72%,24%)] text-white shadow-md" asChild><a
                      href={`https://wa.me/918580504989?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send on WhatsApp
                      </a></Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vidhima Design Studio */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-2">
              The Vidhima Standard
            </span>
            <h2 className="font-serif text-3xl md:text-4xl">Why Our Design Process Protects Your Investment</h2>
            <p className="text-muted-foreground mt-2">
              Construction mistakes on site are 10x more expensive than resolving them on drawings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-border bg-card shadow-card flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl mb-2 text-foreground">Registered & Certified</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Operating under Official License No: <strong>{studioOffice.licenseNo}</strong>. All drawings comply with National Building Code (NBC) and Himachal Pradesh Town and Country Planning (HP TCP) Bye-Laws.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card shadow-card flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl mb-2 text-foreground">Good For Construction (GFC)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We deliver constructible, site-ready GFC drawings with accurate level differences, structural coordination, and clear door/window schedules to eliminate contractor guesswork.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card shadow-card flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl mb-2 text-foreground">Local Palampur Studio</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our design studio is located at Differ Patt, SSB Chowk, Palampur. We understand Kangra district’s slope topography, seismic zones, rainfall waterproofing, and local stone aesthetics.
              </p>
            </div>
          </div>

          {/* Fix #8: CTA row after trust section — warm leads need a prompt here */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-[hsl(142,72%,29%)] hover:bg-[hsl(142,72%,24%)] text-white shadow-md font-semibold" asChild><a
              href={`https://wa.me/918580504989?text=${encodeURIComponent(
                "Hi Vidhima Design Studio, I would like to discuss a design project for my property in Himachal Pradesh."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp for a Free Consultation
              </a></Button>
          </div>
        </div>
      </section>

      {/* Official Studio Footer & Contact Card */}
      <section className="py-16 bg-muted/60 border-t border-border">
        <div className="container">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-card max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-border">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-1">
                  Official Studio Details
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground font-bold">
                  {studioOffice.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  License No: <span className="font-mono font-semibold text-foreground">{studioOffice.licenseNo}</span> • {studioOffice.tagline}
                </p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-[hsl(142,72%,29%)] hover:bg-[hsl(142,72%,24%)] text-white" asChild><a
                  href={`https://wa.me/918580504989?text=${encodeURIComponent(
                    "Hi Vidhima Design Studio, I would like to visit your office or request a design quote."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                  </a></Button>
                <Button variant="outline" asChild><a href={`tel:${studioOffice.phone.replace(/\s/g, "")}`}>
                    <Phone className="w-4 h-4 mr-2" /> Call Studio
                  </a></Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Office Address</span>
                <p className="text-foreground leading-snug">{studioOffice.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioOffice.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  Get directions
                </a>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Direct Contact</span>
                <a href={`tel:${studioOffice.phone.replace(/\s/g, "")}`} className="text-primary hover:underline font-medium block">
                  {studioOffice.phone}
                </a>
                <span className="text-sm text-muted-foreground">Mon – Sat, 9:00 AM – 6:30 PM</span>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Official Email</span>
                <a href={`mailto:${studioOffice.email}`} className="text-primary hover:underline font-medium block">
                  {studioOffice.email}
                </a>
                <span className="text-sm text-muted-foreground">Send your plot sketches or inquiries</span>
              </div>
            </div>
          </div>

          {/* Fix #8: CTA row after trust section — warm leads need a prompt here */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-[hsl(142,72%,29%)] hover:bg-[hsl(142,72%,24%)] text-white shadow-md font-semibold" asChild><a
              href={`https://wa.me/918580504989?text=${encodeURIComponent(
                "Hi Vidhima Design Studio, I would like to discuss a design project for my property in Himachal Pradesh."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp for a Free Consultation
              </a></Button>
            <Button size="lg" variant="outline" asChild><Link to="/contact">
                Book a Free Studio Visit <ArrowRight className="w-4 h-4 ml-1" />
              </Link></Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DesignStudio;
