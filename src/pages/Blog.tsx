import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";

const Blog = () => (
  <main className="pt-20">
    <section className="py-20 bg-forest-gradient text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-accent mb-3 block">Resources</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Construction Guides & Tips</h1>
          <p className="opacity-80 text-lg">Practical advice for anyone planning to build in Himachal Pradesh. From budgeting and approvals to design tips for hill regions.</p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
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
                <h3 className="font-serif text-lg text-foreground mb-2 leading-snug">
                  <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground flex-1 mb-4">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  <BookOpen className="w-4 h-4" />
                  Read Guide
                  <ArrowRight className="w-3 h-3" />
                </Link>
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
