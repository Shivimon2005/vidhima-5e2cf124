import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Pricing", to: "/pricing" },
  { label: "Why Us", to: "/why-choose-us" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-forest-gradient flex items-center justify-center">
            <span className="text-primary-foreground font-serif text-lg font-bold">V</span>
          </div>
          <div className="leading-tight">
            <span className="font-serif text-lg text-foreground block leading-none">Vidhima</span>
            <span className="text-xs text-muted-foreground tracking-wider uppercase">Construction Pvt Ltd</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === l.to
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+919876543210" className="flex items-center gap-1.5 text-sm font-medium text-primary">
            <Phone className="w-4 h-4" />
            +91 98765 43210
          </a>
          <Link to="/contact">
            <Button size="sm">Get Estimate</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 text-sm font-medium rounded-md ${
                  location.pathname === l.to
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-border mt-2">
              <a href="tel:+919876543210" className="flex items-center gap-1.5 text-sm font-medium text-primary px-3">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <Link to="/contact" onClick={() => setOpen(false)}>
                <Button className="w-full" size="sm">Get Estimate</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
