import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Landmark, Home, HardHat } from "lucide-react";

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>svg>
  );

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>svg>
  );

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>svg>
  );

const YouTubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>svg>
  );

const Footer = () => (
    <footer className="bg-forest-dark text-primary-foreground">
        <div className="container py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                {/* Brand */}
                      <div className="lg:col-span-2">
                                <div className="flex items-center gap-2 mb-4">
                                            <div className="w-9 h-9 rounded-md bg-accent flex items-center justify-center">
                                                          <span className="text-accent-foreground font-serif text-lg font-bold">V</span>span>
                                            </div>div>
                                            <div className="leading-tight">
                                                          <span className="font-serif text-lg block leading-none">Vidhima</span>span>
                                                          <span className="text-xs opacity-70 tracking-wider uppercase">Construction Pvt Ltd</span>span>
                                            </div>div>
                                </div>div>
                                <p className="text-sm opacity-70 leading-relaxed mb-4">
                                            Class-I registered construction company operating across three business verticals — Government Tenders, Real Estate Construction, and Sub-Contracting — serving Kangra district and Himachal Pradesh.
                                </p>p>
                                <div className="flex flex-col gap-2 text-sm">
                                            <a href="tel:+918628989364" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                                                          <Phone className="w-4 h-4 shrink-0" />
                                                          +91 86289 89364
                                            </a>a>
                                            <a href="mailto:vidhimaho@gmail.com" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                                                          <Mail className="w-4 h-4 shrink-0" />
                                                          vidhimaho@gmail.com
                                            </a>a>
                                            <div className="flex items-start gap-2 opacity-70">
                                                          <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                                                          <span>Near SSB Chowk, Palampur,<br />Kangra, Himachal Pradesh 176061</span>span>
                                            </div>div>
                                </div>div>
                      
                        {/* Social links — with visible text labels for SEO anchor value */}
                                <div className="flex items-center gap-3 mt-5">
                                  {[
      { href: "https://www.facebook.com/vidhimaconstruction", Icon: FacebookIcon, label: "Facebook" },
      { href: "https://www.instagram.com/vidhimaconstruction", Icon: InstagramIcon, label: "Instagram" },
      { href: "https://www.linkedin.com/company/vidhima-construction", Icon: LinkedInIcon, label: "LinkedIn" },
      { href: "https://www.youtube.com/@vidhimaconstruction", Icon: YouTubeIcon, label: "YouTube" },
                  ].map(({ href, Icon, label }) => (
                                  <a
                                                    key={label}
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`Vidhima Construction on ${label}`}
                                                    title={`Vidhima Construction on ${label}`}
                                                    className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-primary-foreground/20 transition-all"
                                                  >
                                                  <Icon />
                                                  <span className="sr-only">Vidhima Construction on {label}</span>span>
                                  </a>a>
                                ))}
                                </div>div>
                      </div>div>
              
                {/* Company links */}
                      <div>
                                <h4 className="font-serif text-base mb-4 text-primary-foreground/90">Company</h4>h4>
                                <div className="flex flex-col gap-2">
                                  {[
      { label: "About Us", to: "/about" },
      { label: "Leadership", to: "/leadership" },
      { label: "CSR", to: "/csr" },
      { label: "Careers", to: "/careers" },
      { label: "Blog", to: "/blog" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
                  ].map((l) => (
                                  <Link key={l.label} to={l.to} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                                    {l.label}
                                  </Link>Link>
                                ))}
                                </div>div>
                      </div>div>
              
                {/* Government Tenders wing — deduplicated with descriptive anchors */}
                      <div>
                                <div className="flex items-center gap-2 mb-4">
                                            <Landmark className="w-4 h-4 text-blue-300" />
                                            <h4 className="font-serif text-base text-blue-100">Government Tenders</h4>h4>
                                </div>div>
                                <div className="flex flex-col gap-2">
                                            <Link to="/government-tenders" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                                                          Government Tender Overview
                                            </Link>Link>
                                            <Link to="/government-tenders#inquiry" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                                                          Submit Tender Inquiry
                                            </Link>Link>
                                </div>div>
                      </div>div>
              
                {/* Real Estate wing */}
                      <div>
                                <div className="flex items-center gap-2 mb-4">
                                            <Home className="w-4 h-4 text-green-300" />
                                            <h4 className="font-serif text-base text-green-100">Real Estate</h4>h4>
                                </div>div>
                                <div className="flex flex-col gap-2">
                                  {[
      { label: "Construction Services", to: "/services" },
      { label: "Our Projects", to: "/projects" },
      { label: "Why Choose Us", to: "/why-choose-us" },
      { label: "Get Free Estimate", to: "/contact" },
                  ].map((l) => (
                                  <Link key={l.label} to={l.to} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                                    {l.label}
                                  </Link>Link>
                                ))}
                                </div>div>
                      </div>div>
              
                {/* Sub-Contracting wing — deduplicated with descriptive anchors */}
                      <div>
                                <div className="flex items-center gap-2 mb-4">
                                            <HardHat className="w-4 h-4 text-amber-300" />
                                            <h4 className="font-serif text-base text-amber-100">Sub-Contracting</h4>h4>
                                </div>div>
                                <div className="flex flex-col gap-2">
                                            <Link to="/sub-contracting" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                                                          Civil Sub-Contracting Services
                                            </Link>Link>
                                            <Link to="/sub-contracting#sub-inquiry" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                                                          Discuss a Sub-Contract Package
                                            </Link>Link>
                                </div>div>
                      </div>div>
              </div>div>
        
              <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-50">
                      <span>© 2026 Vidhima Construction Private Limited. All rights reserved.</span>span>
                      <div className="flex items-center gap-4">
                                <Link to="/about" className="hover:opacity-80 transition-opacity">About</Link>Link>
                                <Link to="/blog" className="hover:opacity-80 transition-opacity">Blog</Link>Link>
                                <Link to="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>Link>
                      </div>div>
              </div>div>
        </div>div>
    </footer>footer>
  );

export default Footer;</svg>
