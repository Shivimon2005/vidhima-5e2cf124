import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => (
  <main className="pt-20">
    <section className="py-20 bg-forest-gradient text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-accent mb-3 block">Contact</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Get Your Free Construction Estimate</h1>
          <p className="opacity-80 text-lg">Fill in your details below and we'll call you within 24 hours with a rough cost estimate — no obligation, no pressure.</p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3 bg-card rounded-xl p-6 md:p-10 shadow-card">
            <h2 className="font-serif text-2xl mb-6">Tell Us About Your Project</h2>
            <LeadForm />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-serif text-xl mb-4">Get in Touch Directly</h3>
              <div className="space-y-4">
                <a href="tel:+918628989364" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Call us</span>
                    <p className="font-medium">+91 86289 89364</p>
                  </div>
                </a>
                <a href="https://wa.me/918628989364" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(142,70%,40%)]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[hsl(142,70%,40%)]" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">WhatsApp</span>
                    <p className="font-medium">+91 86289 89364</p>
                  </div>
                </a>
                <a href="mailto:vidhimaho@gmail.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Email</span>
                    <p className="font-medium">vidhimaho@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl mb-4">Office Location</h3>
              <div className="flex items-start gap-3 text-muted-foreground text-sm mb-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Near SSB Chowk, Palampur,<br />Kangra, Himachal Pradesh 176061</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
                  <p>Sunday: By appointment</p>
                  <p className="mt-1 text-xs">We typically respond within 4 hours during business hours.</p>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-6">
              <h4 className="font-serif text-lg mb-2">Service Area</h4>
              <p className="text-sm text-muted-foreground">We serve Palampur, Kangra district, and clients across Himachal Pradesh. Site visits are arranged throughout the state, and are free within 20 km of our office.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Contact;
