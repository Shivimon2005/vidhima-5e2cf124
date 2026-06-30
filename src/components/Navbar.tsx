import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, Landmark, Home, HardHat, Users, Heart, Briefcase, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const wingItems = [
  {
    label: "Government Tenders",
    to: "/government-tenders",
    Icon: Landmark,
    desc: "Govt infrastructure & civil works",
    textColor: "text-blue-800",
    hoverBg: "hover:bg-blue-50",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
  },
  {
    label: "Real Estate Construction",
    to: "/services",
    Icon: Home,
    desc: "Turnkey homes & commercial construction",
    textColor: "text-primary",
    hoverBg: "hover:bg-primary/5",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
  },
  {
    label: "Sub-Contracting",
    to: "/sub-contracting",
    Icon: HardHat,
    desc: "Civil works for contractors & developers",
    textColor: "text-amber-700",
    hoverBg: "hover:bg-amber-50",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
  },
];

const companyItems = [
  { label: "About Us", to: "/about", Icon: Info, desc: "Our story, mission, and values" },
  { label: "Leadership", to: "/leadership", Icon: Users, desc: "Meet the team behind your project" },
  { label: "CSR", to: "/csr", Icon: Heart, desc: "Community, safety & environment" },
  { label: "Careers", to: "/careers", Icon: Briefcase, desc: "Open roles at Vidhima" },
];

const mainNavLinks = [
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wingsOpen, setWingsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileWingsOpen, setMobileWingsOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const companyCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const isWingActive = wingItems.some((w) => location.pathname.startsWith(w.to));
  const isCompanyActive = companyItems.some((c) => location.pathname.startsWith(c.to));

  const handleCompanyEnter = () => {
    if (companyCloseTimeout.current) clearTimeout(companyCloseTimeout.current);
    setCompanyOpen(true);
  };
  const handleCompanyLeave = () => {
    companyCloseTimeout.current = setTimeout(() => setCompanyOpen(false), 150);
  };

  const handleWingsEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setWingsOpen(true);
  };

  const handleWingsLeave = () => {
    closeTimeout.current = setTimeout(() => setWingsOpen(false), 150);
  };

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
          <Link
            to="/"
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              location.pathname === "/"
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={handleWingsEnter}
            onMouseLeave={handleWingsLeave}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isWingActive
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Services
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${wingsOpen ? "rotate-180" : ""}`} />
            </button>

            {wingsOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-background border border-border rounded-xl shadow-card-hover py-2 z-50">
                <div className="px-4 py-2 border-b border-border/60 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Our Services
                  </span>
                </div>
                {wingItems.map((wing) => {
                  const active = location.pathname.startsWith(wing.to);
                  return (
                    <Link
                      key={wing.to}
                      to={wing.to}
                      onClick={() => setWingsOpen(false)}
                      className={`flex items-start gap-3 px-4 py-3 ${wing.hoverBg} transition-colors`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${wing.badgeBg}`}>
                        <wing.Icon className={`w-4 h-4 ${wing.badgeText}`} />
                      </div>
                      <div>
                        <span className={`text-sm font-semibold block leading-tight ${active ? wing.textColor : "text-foreground"}`}>
                          {wing.label}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5 block">{wing.desc}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Company dropdown */}
          <div
            className="relative"
            onMouseEnter={handleCompanyEnter}
            onMouseLeave={handleCompanyLeave}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isCompanyActive
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Company
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${companyOpen ? "rotate-180" : ""}`} />
            </button>
            {companyOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-xl shadow-card-hover py-2 z-50">
                <div className="px-4 py-2 border-b border-border/60 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Company</span>
                </div>
                {companyItems.map((item) => {
                  const active = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setCompanyOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-muted/60 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <item.Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div>
                        <span className={`text-sm font-semibold block leading-tight ${active ? "text-primary" : "text-foreground"}`}>
                          {item.label}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5 block">{item.desc}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {mainNavLinks.map((l) => (
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
          <a href="tel:+916230823269" className="flex items-center gap-1.5 text-sm font-medium text-primary">
            <Phone className="w-4 h-4" />
            +91 62308 23269
          </a>
          <Link to="/contact">
            <Button size="sm">Get Estimate</Button>
          </Link>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <div className="container py-4 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2.5 text-sm font-medium rounded-md ${
                location.pathname === "/" ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>

            <button
              onClick={() => setMobileWingsOpen(!mobileWingsOpen)}
              className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md text-left w-full ${
                isWingActive ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileWingsOpen ? "rotate-180" : ""}`} />
            </button>

            {mobileWingsOpen && (
              <div className="ml-3 flex flex-col gap-0.5 border-l-2 border-border pl-3 mb-1">
                {wingItems.map((wing) => {
                  const active = location.pathname.startsWith(wing.to);
                  return (
                    <Link
                      key={wing.to}
                      to={wing.to}
                      onClick={() => { setMobileOpen(false); setMobileWingsOpen(false); }}
                      className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-md transition-colors ${
                        active ? `${wing.textColor} font-semibold` : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <wing.Icon className="w-4 h-4 shrink-0" />
                      {wing.label}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Company mobile accordion */}
            <button
              onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
              className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md text-left w-full ${
                isCompanyActive ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Company
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileCompanyOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileCompanyOpen && (
              <div className="ml-3 flex flex-col gap-0.5 border-l-2 border-border pl-3 mb-1">
                {companyItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => { setMobileOpen(false); setMobileCompanyOpen(false); }}
                    className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-md transition-colors ${
                      location.pathname === item.to ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.Icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {mainNavLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
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
              <a href="tel:+916230823269" className="flex items-center gap-1.5 text-sm font-medium text-primary px-3">
                <Phone className="w-4 h-4" />
                +91 62308 23269
              </a>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
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
