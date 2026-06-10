import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";
import { CheckCircle2, BriefcaseBusiness } from "lucide-react";

const perks = [
  "Competitive salary — reviewed annually",
  "Performance bonus tied to project milestones",
  "Fuel allowance for site travel",
  "EPF & ESI from day one",
  "Paid leave: 12 casual + 12 earned days",
  "Direct mentorship from senior engineers",
];


const Careers = () => {
  const [form, setForm] = useState({ name: "", phone: "", role: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.role.trim()) {
      toast.error("Please fill in name, phone, and the role you're applying for.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Application received! We'll be in touch within 5 business days.");
    setForm({ name: "", phone: "", role: "", message: "" });
    setSubmitting(false);
  };

  return (
    <main className="pt-20">
      <section className="py-20 bg-forest-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-accent mb-3 block">Careers</span>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Build Your Career in the Hills</h1>
            <p className="opacity-80 text-lg">We're a growing construction company in Himachal Pradesh. We hire people who take pride in their craft and hold themselves accountable.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading label="Why Vidhima" title="Why Engineers Choose Us" center={false} />
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-6">
                <p>We're not a large contractor where you'll be one of hundreds. At Vidhima, every engineer and manager directly shapes how projects are executed. Your decisions matter, and they're visible.</p>
                <p>We operate in challenging terrain — slopes, rock cuts, seismically active zones. That means you'll solve real engineering problems, not just execute repetitive procedures.</p>
                <p>We grow from within. Our Head of Project Management joined as a site coordinator. If you perform, we invest in you.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                {perks.map((p) => (
                  <div key={p} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { value: "6+", label: "Years in business", color: "text-primary" },
                { value: "25+", label: "Projects delivered", color: "text-primary" },
                { value: "35+", label: "Team members", color: "text-primary" },
                { value: "4.9★", label: "Avg. client rating", color: "text-accent" },
              ].map((s) => (
                <div key={s.label} className="bg-card rounded-xl p-6 text-center border border-border/60 shadow-card">
                  <span className={`font-serif text-3xl font-bold block mb-1 ${s.color}`}>{s.value}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container">
          <SectionHeading
            label="Open Positions"
            title="Current Openings"
          />
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-xl border border-border/60 shadow-card p-12 flex flex-col items-center gap-4">
              <BriefcaseBusiness className="w-12 h-12 text-muted-foreground/50" />
              <h3 className="font-serif text-xl text-foreground">No Open Positions Right Now</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                We don't have any active openings at the moment, but we're always interested in hearing from talented engineers and construction professionals. Send us your profile — we'll reach out when a relevant role opens up.
              </p>
              <a href="#apply" className="mt-2">
                <Button>Submit Your Profile</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="py-20">
        <div className="container max-w-2xl">
          <SectionHeading
            label="Apply"
            title="Send Us Your Application"
            description="Fill in the form and mention the role you're interested in. We review every application personally."
          />
          <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border shadow-card p-8 mt-10 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="c-name">Full Name *</Label>
                <Input id="c-name" placeholder="Your name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="c-phone">Phone Number *</Label>
                <Input id="c-phone" placeholder="10-digit mobile" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="c-role">Role Applying For *</Label>
              <Input id="c-role" placeholder="e.g. Site Engineer" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="c-msg">Brief Introduction (optional)</Label>
              <Textarea id="c-msg" placeholder="Tell us about your experience and why you want to join Vidhima…" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="mt-1" rows={4} />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Sending…" : "Submit Application"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Careers;
