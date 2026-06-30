import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

type FaqItem = {
    q: string;
    a: React.ReactNode;
};

type FaqCategory = {
    category: string;
    items: FaqItem[];
};

const faqs: FaqCategory[] = [
  {
        category: "Getting Started",
        items: [
          {
                    q: "Do you offer a free estimate for house construction in Palampur or Kangra?",
                    a: <>Yes. We offer a free rough estimate and site visit within 48 hours — no obligation. <Link to="/contact" className="text-primary underline">Contact us</Link> via phone, WhatsApp, or the form on our website and our team will arrange a visit at your convenience.</>,
          },
          {
                    q: "What areas do you serve in Himachal Pradesh?",
                    a: "We serve Palampur, Kangra, Dharamshala, Baijnath, Nurpur, Hamirpur, and clients across Himachal Pradesh. Free site visits within 20 km of our Palampur office; outstation visits available by appointment.",
          },
          {
                    q: "Are you a registered contractor?",
                    a: <>Yes. Vidhima Construction Private Limited is a Class-I registered construction contractor empanelled with HP Government departments. See our <Link to="/about" className="text-primary underline">About page</Link> for full credentials. We hold valid GST registration, PAN, and maintain EPF/ESI compliance for our workforce.</>,
          },
          {
                    q: "Do I need to own land before contacting you?",
                    a: "No. We work with clients at all stages — whether you own a plot, are planning to buy one, or still exploring. We advise on plot suitability, slope conditions, and soil bearing capacity before you commit.",
          },
              ],
  },
  {
        category: "Cost & Pricing",
        items: [
          {
                    q: "What is the cost of house construction per sq ft in Himachal Pradesh?",
                    a: <>Construction rates in HP vary based on design, materials, floor count, and terrain. A standard RCC residential build in Palampur or Kangra typically ranges from \u20b91,800 to \u20b92,800 per sq ft for the structure, excluding interior finishing. See our <Link to="/services" className="text-primary underline">Services & Pricing page</Link> for detailed package breakdowns, or <Link to="/contact" className="text-primary underline">contact us</Link> for an accurate figure specific to your plot.</>,
          },
          {
                    q: "Do you offer fixed-price contracts?",
                    a: <>Yes. We work on transparent, fixed-price contracts with itemised BOQ (Bill of Quantities). No hidden charges — if there are cost overruns due to our estimation, we absorb them. See <Link to="/why-choose-us" className="text-primary underline">Why Choose Us</Link> for more on our pricing philosophy.</>,
          },
          {
                    q: "What is your payment schedule?",
                    a: "Payment is structured in stage-wise milestones linked to construction progress — foundation, plinth, structural frame, masonry, finishing, and handover. No large advance required upfront. Exact terms are agreed in writing before the project starts.",
          },
              ],
  },
  {
        category: "Construction & Quality",
        items: [
          {
                    q: "How long does it take to build a house in Palampur or Kangra?",
                    a: <>A standard G+1 or G+2 residential build typically takes 8–12 months from foundation to handover, depending on size, design complexity, and weather. Read our <Link to="/blog/building-on-sloped-plot-himachal-pradesh" className="text-primary underline">hill terrain construction guide</Link> for details on how monsoon patterns affect scheduling.</>,
          },
          {
                    q: "Are your buildings earthquake-resistant?",
                    a: "Yes. All structures are designed to IS 1893 seismic zone standards applicable to Kangra district (Zone IV). We use ductile detailing, seismic bands, proper column-beam connections, and M25 grade concrete with TMT Fe 500D steel as standard.",
          },
          {
                    q: "Can you build on a hilly or sloped plot?",
                    a: <>Yes — hill terrain is our specialty. We handle cut-and-fill earthwork, stepped foundations, retaining walls, and slope stabilisation. Read our detailed guide on <Link to="/blog/building-on-sloped-plot-himachal-pradesh" className="text-primary underline">building on a sloped plot in Himachal Pradesh</Link> for what the process involves.</>,
          },
          {
                    q: "Do you handle building plan approvals and permits?",
                    a: "We guide clients through the approval process and liaise with local Town & Country Planning (TCP) or Panchayat authorities. Architectural drawings for approval can be prepared by our empanelled architects as part of the project package.",
          },
          {
                    q: "What quality checks do you carry out during construction?",
                    a: "We maintain concrete cube crush test records, steel test certificates, and daily site registers. Photo progress reports are shared at every stage. All material procurement is from approved suppliers with valid test documentation.",
          },
              ],
  },
  {
        category: "Government Tenders & Sub-Contracting",
        items: [
          {
                    q: "Do you bid on HP government tenders?",
                    a: <>Yes. We actively track and bid on tenders from HP PWD, HPPWD, IPH, Education Department, Health Department, PMGSY, and NHAI/DFCCIL. See our <Link to="/government-tenders" className="text-primary underline">Government Tenders page</Link> for our portfolio and Class-I registration details.</>,
          },
          {
                    q: "Can you work as a sub-contractor for a main contractor?",
                    a: <>Yes. We take on civil work packages — RCC structural work, masonry, excavation, slope protection, drainage, and formwork — for main contractors on larger projects. Visit our <Link to="/sub-contracting" className="text-primary underline">Sub-Contracting page</Link> to see our equipment fleet, capabilities, and completed packages.</>,
          },
              ],
  },
  ];

const FAQ = () => {
    const [open, setOpen] = useState<string | null>(null);
  
    const toggle = (key: string) => setOpen(open === key ? null : key);
  
    return (
          <main className="pt-20">
                <script
                          type="application/ld+json"
                          dangerouslySetInnerHTML={{
                                      __html: JSON.stringify({
                                                    "@context": "https://schema.org",
                                                    "@type": "FAQPage",
                                                    mainEntity: faqs.flatMap((cat) =>
                                                                    cat.items.map((item) => ({
                                                                                      "@type": "Question",
                                                                                      name: item.q,
                                                                                      acceptedAnswer: {
                                                                                                          "@type": "Answer",
                                                                                                          text: typeof item.a === "string" ? item.a : item.q,
                                                                                        },
                                                                    }))
                                                                  ),
                                      }),
                          }}
                        />
          
                <section className="py-20 bg-forest-gradient text-primary-foreground">
                        <div className="container">
                                  <div className="max-w-2xl">
                                              <span className="text-xs uppercase tracking-widest text-accent mb-3 block">FAQ</span>
                                              <h1 className="font-serif text-4xl md:text-5xl mb-4">Frequently Asked Questions</h1>
                                              <p className="opacity-80 text-lg">Everything you need to know about building with Vidhima Construction in Palampur, Kangra, and across Himachal Pradesh.</p>
                                  </div>
                        </div>
                </section>
          
                <section className="py-20">
                        <div className="container max-w-3xl">
                          {faqs.map((cat) => (
                        <div key={cat.category} className="mb-12">
                                      <h2 className="font-serif text-xl text-foreground mb-6 pb-2 border-b border-border">{cat.category}</h2>
                                      <div className="space-y-3">
                                        {cat.items.map((item, i) => {
                                            const key = `${cat.category}-${i}`;
                                            const isOpen = open === key;
                                            return (
                                                                  <div key={key} className="bg-card border border-border/60 rounded-xl overflow-hidden">
                                                                                        <button
                                                                                                                  onClick={() => toggle(key)}
                                                                                                                  className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-muted/40 transition-colors"
                                                                                                                  aria-expanded={isOpen}
                                                                                                                >
                                                                                                                <span className="font-medium text-foreground text-sm leading-snug">{item.q}</span>
                                                                                          {isOpen
                                                                                                                      ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                                                                                                      : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                                                                            }
                                                                                          </button>
                                                                    {isOpen && (
                                                                                            <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                                                                                              {item.a}
                                                                                              </div>
                                                                                        )}
                                                                  </div>
                                                                );
                        })}
                                      </div>
                        </div>
                      ))}
                        </div>
                </section>
          
                <section className="py-16 bg-muted/40">
                        <div className="container max-w-2xl text-center">
                                  <SectionHeading
                                                label="Still Have Questions?"
                                                title="Talk to Us Directly"
                                                description="Call or WhatsApp — we respond within a few hours during business hours."
                                              />
                                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                                              <a href="tel:+916230823269">
                                                            <Button size="lg">
                                                                            <Phone className="w-4 h-4 mr-2" /> +91 62308 23269
                                                            </Button>
                                              </a>
                                              <Link to="/contact">
                                                            <Button variant="outline" size="lg">Get Free Estimate</Button>
                                              </Link>
                                  </div>
                        </div>
                </section>
          </main>
        );
};

export default FAQ;
