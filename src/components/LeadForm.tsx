/**
 * LeadForm — single-step verified lead capture with:
 *  - UUID submissionId (generated once per mount — prevents duplicate rows)
 *  - Cloudflare Turnstile (bot protection, no user friction in most cases)
 *  - Honeypot field (hidden "company_website")
 *  - Minimum fill-time check enforced server-side (< 3 s = bot)
 *  - In-flight guard (button disabled while request is in progress)
 *  - Consent checkbox (required)
 *  - Page URL + Source URL captured and sent
 *  - On success: navigate to /thank-you?phone=XXXXXXXXXX
 *  - On failure: re-enables button + shows specific error
 *
 * Environment variable (VITE_ prefix exposes it to the client bundle):
 *   VITE_TURNSTILE_SITE_KEY — Cloudflare Turnstile site key
 *   Local dev test key (always passes): 1x00000000000000000000AA
 */
import { useState, useEffect, useRef, useId } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface LeadFormProps {
  compact?: boolean;
  wing?: "realty" | "gov" | "sub" | "general";
}

const TURNSTILE_SITE_KEY: string =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ||
  "1x00000000000000000000AA"; // always-passes test key for local dev

/** Crypto UUID (falls back to Math.random on very old browsers) */
function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/** Strip non-digits, remove 91/0 prefix, keep last 10 */
function normalisePhoneClient(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^91/, "").replace(/^0/, "");
  return digits.slice(-10);
}

// ── Cloudflare Turnstile ─────────────────────────────────────────────────────
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "invisible";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

function useTurnstile(containerId: string) {
  const [token, setToken] = useState<string | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!document.getElementById("turnstile-script")) {
      const script = document.createElement("script");
      script.id = "turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      const container = document.getElementById(containerId);
      if (container && window.turnstile && widgetIdRef.current === null) {
        clearInterval(timer);
        widgetIdRef.current = window.turnstile.render(container, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "light",
          size: "normal",
          callback: (t) => setToken(t),
          "expired-callback": () => setToken(null),
          "error-callback": () => setToken(null),
        });
      }
      if (attempts > 40) clearInterval(timer);
    }, 100);

    return () => clearInterval(timer);
  }, [containerId]);

  const reset = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      setToken(null);
    }
  };

  return { token, reset };
}

const LeadForm = ({ compact = false, wing = "realty" }: LeadFormProps) => {
  const navigate = useNavigate();
  const uid = useId();
  const turnstileContainerId = `ts-${uid.replace(/:/g, "")}`;

  // Generated once per form mount — uniquely identifies this fill
  const [submissionId] = useState(() => generateUUID());
  const [formLoadedAt] = useState(() => Date.now());

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsappSame: true,
    ownsLand: "",
    plotLocation: "",
    projectType: "",
    budget: "",
    description: "",
    consentGiven: false,
    // Honeypot — must stay empty; hidden from real users
    company_website: "",
  });

  const { token: turnstileToken, reset: resetTurnstile } = useTurnstile(turnstileContainerId);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    const normalised = normalisePhoneClient(formData.phone);
    if (!/^[6-9]\d{9}$/.test(normalised)) {
      toast.error("Please enter a valid 10-digit Indian mobile number (starting 6–9).");
      return;
    }
    if (!formData.consentGiven) {
      toast.error("Please give your consent before submitting.");
      return;
    }
    const tokenToSend = turnstileToken || (import.meta.env.DEV ? "dev-turnstile-token" : "");
    if (!tokenToSend) {
      toast.error("Please complete the security check.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        submissionId,
        name: formData.name.trim(),
        phone: normalised,
        whatsappSame: formData.whatsappSame,
        ownsLand: formData.ownsLand,
        plotLocation: formData.plotLocation,
        projectType: formData.projectType,
        budget: formData.budget,
        description: formData.description,
        wing,
        pageUrl: window.location.href,
        sourceUrl: document.referrer || "",
        consentGiven: formData.consentGiven,
        formLoadedAt,
        turnstileToken: tokenToSend,
        honeypot: formData.company_website,
      };

      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const isJson = res.headers.get("content-type")?.includes("application/json");
      const data = isJson ? ((await res.json()) as { success?: boolean; error?: string }) : null;

      if (!res.ok || !data?.success) {
        toast.error(data?.error ?? "Something went wrong. Please try again or call us directly.");
        resetTurnstile();
        return;
      }

      // ✅ Navigate away — form is gone, cannot be re-submitted
      navigate(`/thank-you?phone=${encodeURIComponent(normalised)}`);
    } catch {
      toast.error("Network error. Please check your connection or WhatsApp us at +91 80913 66650.");
      resetTurnstile();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — invisible to humans, bots fill it in */}
      <div
        style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <label htmlFor="company_website">Company website (leave blank)</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.company_website}
          onChange={(e) => handleChange("company_website", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="lead-name">Your Name *</Label>
          <Input
            id="lead-name"
            placeholder="Full name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="mt-1"
            required
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="lead-phone">Phone Number *</Label>
          <Input
            id="lead-phone"
            placeholder="10-digit mobile"
            inputMode="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="mt-1"
            required
            autoComplete="tel"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={formData.whatsappSame}
          onChange={(e) => handleChange("whatsappSame", e.target.checked)}
          className="rounded border-border"
        />
        WhatsApp same as phone number
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Do you own land?</Label>
          <select
            value={formData.ownsLand}
            onChange={(e) => handleChange("ownsLand", e.target.value)}
            className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Select</option>
            <option value="yes">Yes, I own land</option>
            <option value="no">No, planning to buy</option>
          </select>
        </div>
        <div>
          <Label>Project Type</Label>
          <select
            value={formData.projectType}
            onChange={(e) => handleChange("projectType", e.target.value)}
            className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
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
            <Label htmlFor="lead-location">Plot Location &amp; Size</Label>
            <Input
              id="lead-location"
              placeholder="e.g., Near Bundla Tea Estate, 200 sq yards"
              value={formData.plotLocation}
              onChange={(e) => handleChange("plotLocation", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Approximate Budget Range</Label>
            <select
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Select</option>
              <option value="15-25L">₹15 – 25 Lakhs</option>
              <option value="25-40L">₹25 – 40 Lakhs</option>
              <option value="40-60L">₹40 – 60 Lakhs</option>
              <option value="60L-1Cr">₹60 Lakhs – 1 Crore</option>
              <option value="1Cr+">₹1 Crore+</option>
            </select>
          </div>
          <div>
            <Label htmlFor="lead-description">Tell us more (optional)</Label>
            <Textarea
              id="lead-description"
              placeholder="Describe your requirements briefly…"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        </>
      )}

      {/* Consent — required */}
      <label className="flex items-start gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={formData.consentGiven}
          onChange={(e) => handleChange("consentGiven", e.target.checked)}
          className="rounded border-border mt-0.5 shrink-0"
          required
        />
        <span className="text-muted-foreground">
          I consent to Vidhima Construction contacting me about my enquiry via phone,
          WhatsApp, or email. My data will be used only for this purpose.
        </span>
      </label>

      {/* Cloudflare Turnstile */}
      <div>
        <div id={turnstileContainerId} />
        <p className="text-xs text-muted-foreground mt-1">
          Complete the security check above, then submit.
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={submitting || !formData.consentGiven}
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            Get My Rough Estimate
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
};

export default LeadForm;
