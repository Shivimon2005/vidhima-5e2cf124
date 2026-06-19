import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { Home, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const residentialPackages = [
  {
        name: "Basic",
        price: "\u20b91,400 – 1,700 / sq ft",
        desc: "Strong structure with essential finishes — ideal for budget-conscious builds.",
        includes: ["RCC structure", "Basic flooring (tiles)", "Standard plumbing & electrical", "UPVC windows", "Putty + paint finish", "Basic kitchen platform"],
        excludes: ["Modular kitchen", "Luxury fittings", "Landscaping"],
  },
  {
        name: "Standard",
        price: "\u20b91,800 – 2,200 / sq ft",
        desc: "Better finishes, more design flexibility — perfect for a comfortable family home.",
        includes: ["RCC structure", "Vitrified tile flooring", "Premium plumbing & CP fittings", "Aluminium/UPVC windows", "Interior-grade paint", "Modular kitchen ready", "Waterproofing"],
        excludes: ["Land cost", "Interior decoration", "Boundary wall beyond 3 ft"],
        popular: true,
  },
  {
        name: "Premium",
        price: "\u20b92,500+ / sq ft",
        desc: "Fully bespoke design and finishes — your dream home, exactly the way you want.",
        includes: ["Architect-designed layout", "Premium stone/wood cladding", "Imported fittings", "Home automation ready", "Landscaping included", "Full interior design support", "Extended warranty"],
        excludes: ["Land cost"],
  },
  ];

const Services = () => (
    <main className="pt-20">
      {/* Service schema markup */}
        <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                          __html: JSON.stringify({
                                      "@context": "https://schema.org",
                                      "@type": "Service",
                                      "serviceType": "Construction",
                                      "provider": {
                                                    "@type": "LocalBusiness",
                                                    "name": "Vidhima Construction Private Limited",
                                                    "url": "https://vidhima-construction-website.netlify.app"
                                      },
                                      "areaServed": ["Palampur", "Kangra", "Dharamshala", "Himachal Pradesh"],
                                      "hasOfferCatalog": {
                                                    "@type": "OfferCatalog",
                                                    "name": "Residential Construction Packages",
                                                    "itemListElement": [
                                                      {
                                                                        "@type": "Offer",
                                                                        "name": "Basic Residential Construction",
                                                                        "description": "Strong structure with essential finishes. RCC frame, basic tiles, standard plumbing & electrical.",
                                                                        "priceSpecification": {
                                                                                            "@type": "UnitPriceSpecification",
                                                                                            "price": "1400",
                                                                                            "priceCurrency": "INR",
                                                                                            "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitText": "sq ft" }
                                                                          }
                                                      },
                                                      {
                                                                        "@type": "Offer",
                                                                        "name": "Standard Residential Construction",
                                                                        "description": "Better finishes, more design flexibility. Vitrified tiles, premium CP fittings, modular kitchen ready.",
                                                                        "priceSpecification": {
                                                                                            "@type": "UnitPriceSpecification",
                                                                                            "price": "1800",
                                                                                            "priceCurrency": "INR",
                                                                                            "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitText": "sq ft" }
                                                                          }
                                                      },
                                                      {
                                                                        "@type": "Offer",
                                                                        "name": "Premium Residential Construction",
                                                                        "description": "Fully bespoke design. Premium stone/wood cladding, imported fittings, home automation, landscaping.",
                                                                        "priceSpecification": {
                                                                                            "@type": "UnitPriceSpecification",
                                                                                            "price": "2500",
                                                                                            "priceCurrency": "INR",
                                                                                            "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitText": "sq ft" }
                                                                          }
                                                      }
                                                                  ]
                                      }
                          })
                }}
              />
    
      {/* Hero */}
        <section className="py-20 bg-forest-gradient text-primary-foreground">
              <div className="container">
                      <div className="max-w-2xl">
                                              <Breadcrumb items={[{ label: "Services" }]} className="mb-4" />
                        <span className="text-xs uppercase tracking-widest text-accent mb-3 block">Our Services</span>
                                <h1 className="font-serif text-4xl md:text-5xl mb-4">Construction Services in Himachal Pradesh</h1>
                                <p className="opacity-80 text-lg">From your empty plot to a finished building — we handle design, approvals, and construction. Residential homes and commercial spaces, built for Himachal's unique terrain.</p>
                      </div>
              </div>
        </section>
    
      {/* Residential */}
        <section className="py-20" id="residential">
              <div className="container">
                      <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Home className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                            <span className="text-xs uppercase tracking-widest text-accent">Service A</span>
                                            <h2 className="font-serif text-3xl">Residential Construction</h2>
                                </div>
                      </div>
                      <p className="text-muted-foreground max-w-3xl mb-12">
                                We build turnkey homes on your plot across Himachal Pradesh. "Turnkey" means you hand us your land and we handle everything — architectural drawings, structural design, government approvals, and the complete construction — until we hand you the keys. Choose from our packages below or go fully custom.
                      </p>
              
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {residentialPackages.map((pkg) => (
                  <div key={pkg.name} className={`rounded-xl border p-6 flex flex-col ${pkg.popular ? "border-primary shadow-card-hover ring-2 ring-primary/20 relative" : "border-border shadow-card"}`}>
                    {pkg.popular && <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>}
                                <h3 className="font-serif text-2xl text-foreground mb-1">{pkg.name}</h3>
                                <p className="text-accent font-semibold text-sm mb-3">{pkg.price}</p>
                                <p className="text-sm text-muted-foreground mb-6">{pkg.desc}</p>
                                <div className="mb-4">
                                                <span className="text-xs font-semibold uppercase text-foreground">Included:</span>
                                                <ul className="mt-2 space-y-1.5">
                                                  {pkg.includes.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                          {item}
                                        </li>
                                      ))}
                                                </ul>
                                </div>
                                <div className="mb-6">
                                                <span className="text-xs font-semibold uppercase text-foreground">Not included:</span>
                                                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                                  {pkg.excludes.map((item) => (
                                        <li key={item}>• {item}</li>
                                      ))}
                                                </ul>
                                </div>
                                <Link to="/contact" className="mt-auto">
                                                <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>Get Estimate <ArrowRight className="w-4 h-4 ml-1" /></Button>
                                </Link>
                  </div>
                ))}
                      </div>
              </div>
        </section>
    
      {/* Commercial */}
        <section className="py-20 bg-muted/50" id="commercial">
              <div className="container">
                      <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Building2 className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                            <span className="text-xs uppercase tracking-widest text-accent">Service B</span>
                                            <h2 className="font-serif text-3xl">Commercial Construction</h2>
                                </div>
                      </div>
                      <p className="text-muted-foreground max-w-3xl mb-8">
                                Building shops, offices, small commercial complexes, or mixed-use buildings on your land? We handle the structural engineering, regulatory approvals, and construction for commercial projects of all sizes across Himachal Pradesh.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {[
      { title: "Structural Safety", desc: "Engineered for hill-region seismic zones with proper soil testing and foundation design." },
      { title: "Parking & Access", desc: "Smart design for adequate parking, ramp access, and compliance with commercial regulations." },
      { title: "Phased Handover", desc: "Need ground floor ready first? We plan construction phases to suit your business timeline." },
                ].map((item) => (
                              <div key={item.title} className="bg-card rounded-xl p-6 shadow-card">
                                {/* Fixed: was h4 (skipping h3), now correctly h3 under h2 */}
                                            <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                            ))}
                      </div>
                      <Link to="/contact">
                                <Button size="lg">Discuss Your Commercial Plan <ArrowRight className="w-4 h-4 ml-1" /></Button>
                      </Link>
              </div>
        </section>
    </main>
  );

export default Services;
