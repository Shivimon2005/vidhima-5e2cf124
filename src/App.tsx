import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import AppNavbar from "./components/AppNavbar";
import Dashboard from "./pages/Dashboard";
import MyCards from "./pages/MyCards";
import AIAdvisor from "./pages/AIAdvisor";
import SpendingTracker from "./pages/SpendingTracker";
import RewardsTracker from "./pages/RewardsTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 flex">
            <AppNavbar />
            <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 pb-16 lg:pb-0">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/my-cards" element={<MyCards />} />
                  <Route path="/ai-advisor" element={<AIAdvisor />} />
                  <Route path="/spending" element={<SpendingTracker />} />
                  <Route path="/rewards" element={<RewardsTracker />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
          <Toaster />
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}
