import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/SectionHeading";
import { tenders, credentials } from "@/data/tenders";
import { toast } from "sonner";
import {
  Landmark,
  Building2,
  Mountain,
  Droplets,
  TreePine,
  FileCheck,
  Shield,
  CheckCircle2,
  Phone,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";

type TenderFilter = "All" | "Roads" | "Building" | "Drainage" | "Slope Protection" | "Infrastructure";
const tenderFilters: TenderFilter[] = ["All", "Roads", "Building", "Drainage", "Slope Protection", "Infrastructure"];

const sectors = [
  { Icon: Mountain, title: "Roads & Highways", desc: "Road widening, retaining walls, culverts, PMGSY rural roads, and surface improvement." },
  { Icon: Building2, title: "Government Buildings", desc: "Schools, hospitals, PHCs — earthquake-resistant RCC structures to IS standards." },
  { Icon: Droplets, title: "Drainage & Water Supply", desc: "Storm drainage, sewerage, IPH works, and water supply civil components." },
  { Icon: Shield, title: "Slope Protection", desc: "Retaining walls, breast walls, gabion structures, and NH slip-site stabilization." },
  { Icon: TreePine, title: "Rural Infrastructure", desc: "PMGSY roads, community buildings, anganwadis, and MGNREGA civil works." },
];

const processSteps = [
  {
    step: "01",
    title: "Tender Identification",
    desc: "We track HP e-Procurement and CPP Portals daily and identify tenders matching our contractor class and financial capacity.",
  },
  {
    step: "02",
    title: "Bid Preparation",
    desc: "EMD, ITR proofs, turnover certificates, and technical schedules prepared and submitted well before deadline.",
  },
  {
    step: "03",
    title: "Site Execution",
    desc: "Works mobilized on agreed date. Daily registers, quality test records, and photo progress reports maintained.",
  },
  {
    step: "04",
    title: "Billing & Handover",
    desc: "Stage-wise RA bills submitted promptly. Work completion certified and defect liability period maintained.",
  },
];

const typeColorMap: Record<string, string> = {
  Roads: "bg-blue-100 text-blue-800",
  Building: "bg-green-100 text-green-800",
  Drainage: "bg-cyan-100 text-cyan-800",
  "Slope Protection": "bg-orange-100 text-orange-700",
  Infrastructure: "bg-purple-100 text-purple-800",
};

const CRM_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxKCv3-E1n2Ow8hMB2r0wLeZkbZX9F6LsKfFyoTezCMEjLhQ0G9ieysW_SmDprnPArO/exec";

const GovernmentTenders = () => {
  const [filter, setFilter] = useState<TenderFilter>("All");
  const filtered = filter === "All" ? tenders : tenders.filter((t) => t.type === filter);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "",
    tenderRef: "",
    estimatedValue: "",
    closingDate: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch(CRM_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...formData,
          wing: "government-tenders",
          source: "vidhimaconstruction.com",
          page: typeof window !== "undefined" ? window.location.pathname : "",
          submittedAt: new Date().toISOString(),
        }),
      });
      toast.success("Inquiry received. We will contact you within 24 hours.");
      setFormData({ name: "", phone: "", department: "", tenderRef: "", estimatedValue: "", closingDate: "", description: "" });
    } catch {
      toast.error("Something went wrong. Please WhatsApp or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-wing-gov-gradient text-white">
        <div className="container">
          <div className="max-w-3xl">
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest mb-4 opacity-80">
              <Landmark className="w-3.5 h-3.5" /> Business Wing · Government Tenders
            </span>
            <h1 className="font-serif text-4xl md:text-5xl mb-5 leading-tight">
              Trusted Contractor for Government Infrastructure in Himachal Pradesh
            </h1>
            <p className="text-lg opacity-80 max-w-2xl mb-8">
              Class-I registered contractor executing roads, government buildings, drainage, and slope protection works across Kangra district and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#inquiry">
                <Button variant="hero" size="lg">Submit Tender Inquiry</Button>
              </a>
              <a href="tel:+918628989364">
                <Button variant="hero-outline" size="lg">
                  <Phone className="w-4 h-4 mr-2" /> Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <section className="py-10 bg-blue-950 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {credentials.map((c, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1">
                <BadgeCheck className="w-5 h-5 text-yellow-400 mb-1" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">{c.label}</span>
                <span className="text-sm font-bold text-white">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20">
        <div className="container">
          <SectionHeading
            label="Sectors"
            title="Government Sectors We Work In"
            description="Across Kangra district and Himachal Pradesh, we execute civil works for multiple government departments."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
            {sectors.map((s, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-6 text-center border border-border/60 hover:border-blue-200 hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <s.Icon className="w-6 h-6 text-blue-700" />
                </div>
                <h4 className="font-serif text-base text-foreground mb-2">{s.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tender portfolio */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <SectionHeading
            label="Portfolio"
            title="Government Tender Portfolio"
            description="Completed and ongoing government contracts across Himachal Pradesh."
          />
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mt-8 mb-10">
            {tenderFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-blue-800 text-white"
                    : "bg-card border border-border text-muted-foreground hover:border-blue-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((t, i) => (
              <div key={i} className="bg-card rounded-xl border border-border/60 p-6 hover:border-blue-200 hover:shadow-card transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-serif text-base text-foreground leading-snug">{t.name}</h3>
                  <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${typeColorMap[t.type] ?? "bg-gray-100 text-gray-700"}`}>
                    {t.type}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                  <span>{t.department}</span>
                  <span>• {t.location}</span>
                  <span>• {t.year}</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  {t.contractValue && (
                    <span className="text-sm font-semibold text-foreground">{t.contractValue}</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                    {t.status}
                  </span>
                </div>
                <ul className="space-y-1">
                  {t.scope.map((s, si) => (
                    <li key={si} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <ChevronRight className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container">
          <SectionHeading
            label="How We Work"
            title="Our Government Contracting Process"
            description="From tender identification to final billing — disciplined, document-ready execution."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {processSteps.map((p, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-6 border border-border/60 relative hover:shadow-card hover:border-blue-200 transition-all duration-300"
              >
                <span className="absolute -top-6 left-6 font-serif text-5xl text-blue-100 font-bold">{p.step}</span>
                <FileCheck className="w-5 h-5 text-blue-700 mb-3 mt-4" />
                <h4 className="font-serif text-lg text-foreground mb-2">{p.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-16 bg-blue-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              label="Compliance"
              title="Document-Ready. Fully Compliant."
              description="All statutory documents maintained — no delays at bid submission time."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              {[
                "Valid contractor registration certificate (Class-I)",
                "GST returns filed — 3 years ITR on file",
                "Balance sheets certified by CA",
                "EMD & Security Deposit capability",
                "EPF/ESI compliant workforce",
                "IS code quality standards maintained on site",
                "Joint venture capability for larger contracts",
                "Experience certificates for all work categories",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="py-20" id="inquiry">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                label="Contact"
                title="Government Tender Inquiry"
                description="Have a specific tender in mind? Share the details and our team will respond within 24 hours."
                center={false}
              />
              <div className="mt-6 space-y-3">
                {[
                  "We handle all paperwork — EMD, ITR, experience certificates",
                  "Transparent BOQ-based pricing for every tender",
                  "Dedicated site engineer from day one",
                  "Weekly photo + MIS progress reports to department",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <a href="tel:+918628989364" className="flex items-center gap-2 text-sm font-medium text-blue-800 hover:text-blue-900">
                  <Phone className="w-4 h-4" />
                  +91 86289 89364
                </a>
                <a
                  href="https://wa.me/918628989364?text=Hi%2C%20I%20have%20a%20government%20tender%20inquiry%20for%20Vidhima%20Construction."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-green-700 hover:text-green-800"
                >
                  WhatsApp our tender team →
                </a>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-card">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gov-name">Your Name *</Label>
                    <Input id="gov-name" placeholder="Full name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="gov-phone">Phone / Mobile *</Label>
                    <Input id="gov-phone" placeholder="10-digit mobile" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="gov-dept">Department / Organisation</Label>
                  <Input id="gov-dept" placeholder="e.g., Education Dept., NHAI, HP Govt." value={formData.department} onChange={(e) => handleChange("department", e.target.value)} className="mt-1" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gov-ref">Tender Reference No.</Label>
                    <Input id="gov-ref" placeholder="e.g., HP/2024/KG/142" value={formData.tenderRef} onChange={(e) => handleChange("tenderRef", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="gov-value">Estimated Value</Label>
                    <Input id="gov-value" placeholder="e.g., ₹80 Lakh" value={formData.estimatedValue} onChange={(e) => handleChange("estimatedValue", e.target.value)} className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="gov-closing">Tender Closing Date</Label>
                  <Input id="gov-closing" type="date" value={formData.closingDate} onChange={(e) => handleChange("closingDate", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="gov-desc">Scope / Additional Details</Label>
                  <Textarea id="gov-desc" placeholder="Brief description of the work scope…" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} className="mt-1" rows={3} />
                </div>
                <Button type="submit" size="lg" className="w-full bg-blue-800 hover:bg-blue-900 text-white" disabled={submitting}>
                  {submitting ? "Sending…" : "Submit Tender Inquiry"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-wing-gov-gradient text-white">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl mb-4">Need a Reliable Government Contractor in HP?</h2>
          <p className="opacity-80 mb-8">Class-I registered. Document-ready. Proven on-site delivery across Kangra district.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#inquiry">
              <Button variant="hero" size="lg">Submit Inquiry</Button>
            </a>
            <a href="tel:+918628989364">
              <Button variant="hero-outline" size="lg">
                <Phone className="w-4 h-4 mr-2" /> Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GovernmentTenders;
