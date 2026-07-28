import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  User,
  Sparkles,
  MessageCircle,
  Tag,
  CheckCircle2,
} from "lucide-react";

const CATEGORIES = ["All", "Guide", "Engineering", "Case Study", "Quality Standards"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured) || blogPosts[0];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="pt-20 bg-background min-h-screen">
      {/* Blog Header & Hero Banner */}
      <section className="relative py-16 md:py-20 bg-forest-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vidhima Construction Knowledge Hub</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
              Himachal Hill Construction Guides & Insights
            </h1>
            <p className="opacity-90 text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Expert advice on rates per sq ft, TCP NOC clearances, seismic Zone IV structural engineering, and plot planning in Kangra, Palampur & Dharamshala.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Lead Post (Above Grid) */}
      {featuredPost && (
        <section className="py-12 bg-muted/30 border-b border-border">
          <div className="container">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-primary" /> Featured Lead Guide
              </span>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {featuredPost.category}
                </span>
              </div>
              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {featuredPost.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      {featuredPost.author.name}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-snug">
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div>
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Button className="w-full sm:w-auto" size="lg">
                      Read Complete Guide
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Filter, Search & Post Grid */}
      <section className="py-16">
        <div className="container">
          {/* Controls: Search Bar & Category Pills */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pb-6 border-b border-border">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search guides or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Result Count Notice */}
          <div className="mb-8 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
              {selectedCategory !== "All" && ` in "${selectedCategory}"`}
            </span>
          </div>

          {/* Grid of Blog Cards */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-card rounded-xl overflow-hidden border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                >
                  {/* Thumbnail Image */}
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      {post.category}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-primary" />
                          {post.author.name}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline group-hover:translate-x-0.5 transition-transform"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xl p-12 text-center border border-border max-w-md mx-auto my-8">
              <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-serif text-xl mb-2">No Guides Found</h3>
              <p className="text-xs text-muted-foreground mb-6">
                No articles matched your search or category filter. Try clearing your filter to view all guides.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* High Conversion Banner at Bottom */}
          <div className="mt-20 bg-forest-gradient text-primary-foreground rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">
                  Free Site Evaluation
                </span>
                <h3 className="font-serif text-2xl md:text-3xl mb-3">
                  Have a Plot in Himachal Pradesh? Get Expert Advice
                </h3>
                <p className="text-sm md:text-base opacity-90 mb-6 leading-relaxed max-w-xl font-light">
                  Book a free 20-minute consultation with our senior civil engineers. We will analyze your plot slope, TCP zoning rules, and estimate construction costs.
                </p>
                <div className="flex flex-wrap gap-4 text-xs opacity-90">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> Free 48-Hr Site Visit
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> 100% Fixed Price Guarantee
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> Class-I Registered Contractor
                  </span>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link to="/contact" className="w-full">
                  <Button size="lg" variant="accent" className="w-full font-semibold">
                    Get Construction Estimate <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/916230823269?text=Hi%2C%20I%20have%20read%20your%20construction%20guides%20and%20want%20to%20discuss%20my%20plot."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    size="lg"
                    className="w-full bg-[hsl(142,70%,35%)] hover:bg-[hsl(142,70%,30%)] text-white font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
