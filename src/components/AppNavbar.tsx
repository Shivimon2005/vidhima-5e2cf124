import { Link, useLocation } from "react-router-dom";
import { CreditCard, LayoutDashboard, Bot, TrendingUp, PlusCircle, Wallet } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/my-cards", label: "My Cards", icon: CreditCard },
  { to: "/ai-advisor", label: "AI Advisor", icon: Bot },
  { to: "/spending", label: "Spending", icon: PlusCircle },
  { to: "/rewards", label: "Rewards", icon: TrendingUp },
];

export default function AppNavbar() {
  const { pathname } = useLocation();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 shadow-sm fixed left-0 top-0 z-40">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">SaveSage</span>
              <span className="block text-xs text-emerald-600 font-medium -mt-1">AI Rewards</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === to
                  ? "bg-emerald-50 text-emerald-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("w-5 h-5", pathname === to ? "text-emerald-600" : "text-gray-400")} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 m-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl text-white">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-1">AI Tip</p>
          <p className="text-sm leading-relaxed">Use your Amex Gold at restaurants — you're earning 4x points vs 1x elsewhere!</p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">SaveSage</span>
          </Link>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg">
        <div className="grid grid-cols-5 h-16">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all",
                pathname === to ? "text-emerald-600" : "text-gray-400"
              )}
            >
              <Icon className={cn("w-5 h-5", pathname === to && "text-emerald-600")} />
              <span className="text-[10px]">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
