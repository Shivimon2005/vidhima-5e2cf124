import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/SectionHeading";
import { capabilities, subProjects, equipmentList } from "@/data/subcontracting";
import { toast } from "sonner";
import {
  HardHat,
  Wrench,
  CheckCircle2,
  Phone,
  ChevronRight,
  Truck,
  Users,
  ClipboardList,
  MapPin,
} from "lucide-react";

const whyUs = [
  { Icon: Users, title: "Experienced Crew", desc: "Skilled workers — masons, RCC workers, excavation operators — all EPF/ESI compliant." },
  { Icon: Truck, title: "Own Equipment", desc: "JCB, transit mixers, tipper trucks, concrete pump — no equipment delays on your site." },
  { Icon: ClipboardList, title: "MIS & Progress Reports", desc: "Daily photo updates and weekly MIS sent to the main contractor. Full accountability." },
  { Icon: CheckCircle2, title: "IS Code Standards", desc: "All work executed to IS 456 / IS 2212 / relevant codes with on-site quality checks." },
];

const CRM_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxKCv3-E1n2Ow8hMB2r0wLeZkbZX9F6LsKfFyoTezCMEjLhQ0G9ieysW_SmDprnPArO/exec";

const SubContracting = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    tradeNeeded: "",
    projectLocation: "",
    projectVolume: "",
    startDate: "",
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
          wing: "sub-contracting",
          source: "vidhimaconstruction.com",
          page: typeof window !== "undefined" ? window.location.pathname : "",
          submittedAt: new Date().toISOString(),
        }),
      });
      toast.success("Inquiry received. Our team will contact you within 24 hours.");
      setFormData({ name: "", phone: "", companyName: "", tradeNeeded: "", projectLocation: "", projectVolume: "", startDate: "", description: "" });
    } catch {
      toast.error("Something went wrong. Please WhatsApp or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-wing-sub-gradient text-white">
        <div className="container">
          <div className="max-w-3xl">
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest mb-4 opacity-80">
              <HardHat className="w-3.5 h-3.5" /> Business Wing · Sub-Contracting
            </span>
            <h1 className="font-serif text-4xl md:text-5xl mb-5 leading-tight">
              Dependable Civil Sub-Contractor for Contractors & Developers in Himachal Pradesh
            </h1>
            <p className="text-lg opacity-80 max-w-2xl mb-8">
              Own equipment. Experienced crew. EPF/ESI compliant. We take civil trade packages off your plate — RCC, masonry, excavation, slope works — and deliver on time to your spec.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#sub-inquiry">
                <Button variant="hero" size="lg">Discuss a Package</Button>
              </a>
              <a href="tel:+916230823269">
                <Button variant="hero-outline" size="lg">
                  <Phone className="w-4 h-4 mr-2" /> Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-10 bg-slate-900 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "10+", label: "Main Contractors Served" },
              { value: "7", label: "Trade Packages Available" },
              { value: "50+", label: "Skilled Workers" },
              { value: "₹8 Cr+", label: "Sub-Contract Value Delivered" },
            ].map((s, i) => (
              <div key={i}>
                <span className="block text-3xl font-bold font-serif text-amber-400 mb-1">{s.value}</span>
                <span className="text-xs uppercase tracking-wider text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="container">
          <SectionHeading
            label="Capabilities"
            title="Civil Trade Packages We Offer"
            description="We take complete ownership of each trade package — from mobilization to handover to the main contractor."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="bg-card rounded-xl border border-border/60 p-6 hover:border-amber-200 hover:shadow-card transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-foreground mb-1">{cap.trade}</h3>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      {cap.capacity}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{cap.description}</p>
                <div className="pt-4 border-t border-border/40">
                  <span className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Equipment available</span>
                  <ul className="space-y-1">
                    {cap.equipment.map((eq, ei) => (
                      <li key={ei} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        {eq}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Vidhima */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <SectionHeading
            label="Why Vidhima"
            title="What Main Contractors Get"
            description="We work as a reliable extension of your team — not just a labour contractor."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {whyUs.map((w, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-6 text-center border border-border/60 hover:border-amber-200 hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
                  <w.Icon className="w-6 h-6 text-amber-700" />
                </div>
                <h4 className="font-serif text-lg text-foreground mb-2">{w.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment fleet */}
      <section className="py-20">
        <div className="container">
          <SectionHeading
            label="Fleet"
            title="Our Equipment Fleet"
            description="Own equipment means no delays waiting for third-party machinery — what's on our books is on your site."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
            {equipmentList.map((eq, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-5 border border-border/60 text-center hover:border-amber-200 hover:shadow-card transition-all duration-300"
              >
                <span className="block text-2xl font-bold font-serif text-amber-700 mb-1">{eq.count}</span>
                <span className="text-xs text-muted-foreground font-medium">{eq.item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track record */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <SectionHeading
            label="Track Record"
            title="Sub-Contract Projects Delivered"
            description="Delivered on time, to spec, for main contractors across Kangra district."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {subProjects.map((sp, i) => (
              <div key={i} className="bg-card rounded-xl border border-border/60 p-6 hover:border-amber-200 hover:shadow-card transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif text-base text-foreground leading-snug">{sp.projectName}</h3>
                  <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                    {sp.year}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                  <span>{sp.clientContractor}</span>
                  <span>• {sp.location}</span>
                  <span>• {sp.volume}</span>
                </div>
                <span className="inline-block text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full mb-3 border border-border/60">
                  {sp.trade}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  {sp.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="py-20" id="sub-inquiry">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                label="Contact"
                title="Sub-Contract Inquiry"
                description="Tell us the trade package, volume, and location. We'll respond with availability and rates within 24 hours."
                center={false}
              />
              <div className="mt-6 space-y-3">
                {[
                  "We take full ownership of the trade — no micro-managing needed",
                  "All workers EPF/ESI registered — no compliance risk for you",
                  "Own machinery on site from day one",
                  "Daily photo MIS to your project manager",
                  "Flexible mobilization timelines to match your schedule",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <a href="tel:+916230823269" className="flex items-center gap-2 text-sm font-medium text-amber-800 hover:text-amber-900">
                  <Phone className="w-4 h-4" />
                  +91 62308 23269
                </a>
                <a
                  href="https://wa.me/916230823269?text=Hi%2C%20I%20need%20a%20civil%20sub-contractor%20for%20my%20project%20in%20HP."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-green-700 hover:text-green-800"
                >
                  WhatsApp for quick availability check →
                </a>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-card">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sub-name">Your Name *</Label>
                    <Input id="sub-name" placeholder="Full name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="sub-phone">Phone / Mobile *</Label>
                    <Input id="sub-phone" placeholder="10-digit mobile" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sub-company">Company / Contractor Name</Label>
                  <Input id="sub-company" placeholder="e.g., Sharma Infrastructure Pvt Ltd" value={formData.companyName} onChange={(e) => handleChange("companyName", e.target.value)} className="mt-1" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Trade Package Needed</Label>
                    <select
                      value={formData.tradeNeeded}
                      onChange={(e) => handleChange("tradeNeeded", e.target.value)}
                      className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="">Select trade</option>
                      <option value="rcc-structural">RCC Structural Work</option>
                      <option value="masonry">Masonry & Blockwork</option>
                      <option value="excavation">Excavation & Earthwork</option>
                      <option value="slope-protection">Slope Protection & Retaining Walls</option>
                      <option value="plastering">Plastering & Waterproofing</option>
                      <option value="formwork">Formwork & Shuttering</option>
                      <option value="drainage">Drainage & Underground Works</option>
                      <option value="multiple">Multiple Trades</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="sub-volume">Approximate Volume</Label>
                    <Input id="sub-volume" placeholder="e.g., 5,000 sq ft or 200 cum" value={formData.projectVolume} onChange={(e) => handleChange("projectVolume", e.target.value)} className="mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sub-location">Project Location</Label>
                    <Input id="sub-location" placeholder="e.g., Palampur, Kangra" value={formData.projectLocation} onChange={(e) => handleChange("projectLocation", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="sub-start">Expected Start Date</Label>
                    <Input id="sub-start" type="date" value={formData.startDate} onChange={(e) => handleChange("startDate", e.target.value)} className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sub-desc">Additional Details</Label>
                  <Textarea id="sub-desc" placeholder="Specific requirements, drawings available, site access details…" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} className="mt-1" rows={3} />
                </div>
                <Button type="submit" size="lg" className="w-full bg-amber-700 hover:bg-amber-800 text-white" disabled={submitting}>
                  {submitting ? "Sending…" : "Discuss This Package"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-wing-sub-gradient text-white">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl mb-4">Need a Civil Sub-Contractor in Himachal Pradesh?</h2>
          <p className="opacity-80 mb-8">Own equipment. Experienced crew. Trade packages executed on time to your specification.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#sub-inquiry">
              <Button variant="hero" size="lg">Discuss a Package</Button>
            </a>
            <a href="tel:+916230823269">
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

export default SubContracting;
