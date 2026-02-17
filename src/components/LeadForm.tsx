import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface LeadFormProps {
  compact?: boolean;
}

const LeadForm = ({ compact = false }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsappSame: true,
    ownsLand: "",
    plotLocation: "",
    projectType: "",
    budget: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    toast.success("Thank you! We'll call you within 24 hours with your rough estimate.");
    setFormData({ name: "", phone: "", whatsappSame: true, ownsLand: "", plotLocation: "", projectType: "", budget: "", description: "" });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Your Name *</Label>
          <Input id="name" placeholder="Full name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" placeholder="10-digit mobile" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className="mt-1" />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input type="checkbox" checked={formData.whatsappSame} onChange={(e) => handleChange("whatsappSame", e.target.checked)} className="rounded border-border" />
        WhatsApp same as phone number
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Do you own land?</Label>
          <select value={formData.ownsLand} onChange={(e) => handleChange("ownsLand", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">Select</option>
            <option value="yes">Yes, I own land</option>
            <option value="no">No, planning to buy</option>
          </select>
        </div>
        <div>
          <Label>Project Type</Label>
          <select value={formData.projectType} onChange={(e) => handleChange("projectType", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">Select</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {!compact && (
        <>
          <div>
            <Label htmlFor="plotLocation">Plot Location & Size</Label>
            <Input id="plotLocation" placeholder="e.g., Near Bundla Tea Estate, 200 sq yards" value={formData.plotLocation} onChange={(e) => handleChange("plotLocation", e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Approximate Budget Range</Label>
            <select value={formData.budget} onChange={(e) => handleChange("budget", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="">Select</option>
              <option value="15-25L">₹15 – 25 Lakhs</option>
              <option value="25-40L">₹25 – 40 Lakhs</option>
              <option value="40-60L">₹40 – 60 Lakhs</option>
              <option value="60L-1Cr">₹60 Lakhs – 1 Crore</option>
              <option value="1Cr+">₹1 Crore+</option>
            </select>
          </div>
          <div>
            <Label htmlFor="description">Tell us more (optional)</Label>
            <Textarea id="description" placeholder="Describe your requirements briefly…" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} className="mt-1" rows={3} />
          </div>
        </>
      )}

      <Button type="submit" size="lg" className="w-full">
        Get My Rough Estimate
      </Button>
    </form>
  );
};

export default LeadForm;
