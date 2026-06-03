import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-forest-dark text-primary-foreground">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-md bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-serif text-lg font-bold">V</span>
            </div>
            <div className="leading-tight">
              <span className="font-serif text-lg block leading-none">Vidhima</span>
              <span className="text-xs opacity-70 tracking-wider uppercase">Construction Pvt Ltd</span>
            </div>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Turnkey house and commercial construction on your plot in Palampur and across Kangra district, Himachal Pradesh. A unit of Vidhima Construction Private Limited.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-serif text-lg mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Services", to: "/services" },
              { label: "Projects", to: "/projects" },
              { label: "Pricing", to: "/pricing" },
              { label: "About Us", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-serif text-lg mb-4">Services</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <span>Residential Construction</span>
            <span>Commercial Construction</span>
            <span>Architectural Design</span>
            <span>Hill Construction</span>
            <span>Renovation & Remodeling</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-lg mb-4">Contact Us</h4>
          <div className="flex flex-col gap-3 text-sm">
            <a href="tel:+919876543210" className="flex items-center gap-2 opacity-70 hover:opacity-100">
              <Phone className="w-4 h-4 shrink-0" />
              +91 98765 43210
            </a>
            <a href="mailto:vidhimaho@gmail.com" className="flex items-center gap-2 opacity-70 hover:opacity-100">
              <Mail className="w-4 h-4 shrink-0" />
              vidhimaho@gmail.com
            </a>
            <div className="flex items-start gap-2 opacity-70">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Near Bus Stand, Palampur,<br />Kangra, Himachal Pradesh 176061</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-sm opacity-50">
        © {new Date().getFullYear()} Vidhima Construction Private Limited. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
