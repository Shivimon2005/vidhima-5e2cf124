import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Route-level code splitting — each page chunk loads only when first visited.
const Index             = lazy(() => import("./pages/Index"));
const Services          = lazy(() => import("./pages/Services"));
const Projects          = lazy(() => import("./pages/Projects"));
const WhyChooseUs       = lazy(() => import("./pages/WhyChooseUs"));
const Blog              = lazy(() => import("./pages/Blog"));
const BlogPost          = lazy(() => import("./pages/BlogPost"));
const About             = lazy(() => import("./pages/About"));
const Contact           = lazy(() => import("./pages/Contact"));
const GovernmentTenders = lazy(() => import("./pages/GovernmentTenders"));
const SubContracting    = lazy(() => import("./pages/SubContracting"));
const ProjectDetail     = lazy(() => import("./pages/ProjectDetail"));
const Leadership        = lazy(() => import("./pages/Leadership"));
const Careers           = lazy(() => import("./pages/Careers"));
const CSR               = lazy(() => import("./pages/CSR"));
const FAQ               = lazy(() => import("./pages/FAQ"));
const NotFound          = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Hash-aware scroll: scroll to anchor when hash present, else scroll to top.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // Element may not be mounted yet (lazy chunk); retry after paint.
        const raf = requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        });
        return () => cancelAnimationFrame(raf);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground text-sm">
    Loading…
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/csr" element={<CSR />} />
            <Route path="/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/government-tenders" element={<GovernmentTenders />} />
            <Route path="/sub-contracting" element={<SubContracting />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
