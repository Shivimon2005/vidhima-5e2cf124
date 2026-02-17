import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";

const posts = [
  { title: "How to Estimate House Construction Cost on Your Plot in Palampur", category: "Budgeting", excerpt: "A practical guide to understanding construction costs per square foot in Palampur, including material costs, labour rates, and what affects your final budget.", date: "Jan 2026" },
  { title: "Checklist Before You Start Construction: Approvals, Soil, Access & Utilities", category: "Planning", excerpt: "Don't break ground without checking these essentials first. From building permissions to soil testing — everything you need sorted before construction begins.", date: "Dec 2025" },
  { title: "Self-Use vs Rental Floors: What Makes More Sense on Your Land?", category: "Investment", excerpt: "Planning to build extra floors for rental income? Here's a cost-benefit analysis to help you decide what makes financial sense on your Palampur plot.", date: "Nov 2025" },
  { title: "Building on a Slope: Design Tips for Hill Region Homes", category: "Design", excerpt: "Sloped plots in Palampur require special design approaches. Learn about retaining walls, split-level designs, and drainage solutions for hill construction.", date: "Oct 2025" },
  { title: "Understanding Building Bye-Laws in Himachal Pradesh", category: "Legal", excerpt: "An overview of setback rules, FAR limits, height restrictions, and approval processes specific to Kangra district and Palampur.", date: "Sep 2025" },
  { title: "5 Costly Mistakes to Avoid When Building on a New Plot", category: "Tips", excerpt: "From skipping soil testing to not planning drainage — these common mistakes can cost lakhs. Here's how to avoid them.", date: "Aug 2025" },
];

const Blog = () => (
  <main className="pt-20">
    <section className="py-20 bg-forest-gradient text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-accent mb-3 block">Resources</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Construction Guides & Tips</h1>
          <p className="opacity-80 text-lg">Practical advice for anyone planning to build in Palampur and Kangra district. From budgeting and approvals to design tips for hill regions.</p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.title} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col">
              <div className="h-3 bg-forest-gradient" />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{post.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <BookOpen className="w-4 h-4" />
                  Read Guide
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16 bg-muted rounded-xl p-10">
          <h3 className="font-serif text-2xl mb-3">Need Personalized Advice?</h3>
          <p className="text-muted-foreground mb-6">Book a free 20-minute consultation to discuss your plot, budget, and construction plans.</p>
          <Link to="/contact">
            <Button size="lg">Book Free Consultation <ArrowRight className="w-4 h-4 ml-1" /></Button>
          </Link>
        </div>
      </div>
    </section>
  </main>
);

export default Blog;
