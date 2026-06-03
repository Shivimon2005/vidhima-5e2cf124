import { Link } from "react-router-dom";
import { TrendingUp, CreditCard, Zap, ArrowRight, Star, DollarSign, Bot } from "lucide-react";
import { useApp } from "../context/AppContext";
import { CARD_CATALOG, SPENDING_CATEGORIES, getCardRewardRate } from "../data/cards";
import CreditCardDisplay from "../components/CreditCardDisplay";

export default function Dashboard() {
  const { userCards, transactions, totalRewardsEarned, monthlyRewards, getCardDetails } = useApp();

  const recentTx = transactions.slice(0, 5);
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlySpend = transactions
    .filter((t) => t.date.startsWith(thisMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  // Best card recommendations per category
  const topCategories = ["dining", "groceries", "gas", "travel"];
  const bestCardByCategory = topCategories.map((catId) => {
    const cat = SPENDING_CATEGORIES.find((c) => c.id === catId)!;
    let best = { cardName: "", rate: 0, unit: "" };
    for (const uc of userCards) {
      const card = getCardDetails(uc.cardId);
      if (!card) continue;
      const { rate, unit } = getCardRewardRate(card, catId);
      if (rate > best.rate) {
        best = { cardName: uc.nickname || card.name, rate, unit };
      }
    }
    return { ...cat, best };
  });

  return (
    <div className="space-y-6">
      {/* Hero stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 opacity-80" />
            <span className="text-sm font-medium opacity-80">Total Rewards</span>
          </div>
          <p className="text-3xl font-bold">${totalRewardsEarned.toFixed(2)}</p>
          <p className="text-xs opacity-70 mt-1">All time earnings</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium text-gray-600">This Month</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${monthlyRewards.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">Rewards earned</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Cards</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{userCards.length}</p>
          <p className="text-xs text-gray-400 mt-1">Active cards</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-600">Monthly Spend</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${monthlySpend.toFixed(0)}</p>
          <p className="text-xs text-gray-400 mt-1">Tracked this month</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Cards preview */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">My Cards</h2>
            <Link to="/my-cards" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {userCards.slice(0, 2).map((uc) => {
              const card = getCardDetails(uc.cardId);
              if (!card) return null;
              return (
                <div key={uc.id} className="relative">
                  <CreditCardDisplay card={card} lastFour={uc.lastFour} nickname={uc.nickname} />
                  <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-white text-xs font-semibold">${uc.totalEarned.toFixed(0)} earned</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Quick Picks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">AI Smart Picks</h2>
            <Link to="/ai-advisor" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
              Ask AI <Bot className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {bestCardByCategory.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500 truncate">{item.best.cardName || "No card"}</p>
                </div>
                {item.best.rate > 0 && (
                  <span className="shrink-0 bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded-lg">
                    {item.best.rate}{item.best.unit === "%" ? "%" : "x"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
          <Link to="/spending" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
            Add transaction <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {recentTx.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <CreditCard className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No transactions yet. <Link to="/spending" className="text-emerald-600">Add one!</Link></p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentTx.map((tx) => {
                const uc = userCards.find((c) => c.id === tx.cardId);
                const card = uc ? getCardDetails(uc.cardId) : undefined;
                const catIcon = SPENDING_CATEGORIES.find((c) => c.id === tx.categoryId)?.icon || "💳";
                return (
                  <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                    <span className="text-2xl">{catIcon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{tx.merchant}</p>
                      <p className="text-xs text-gray-400">{new Date(tx.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {uc?.nickname || card?.name || "Unknown card"}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-gray-800">${tx.amount.toFixed(2)}</p>
                      <p className="text-xs text-emerald-600 font-medium">+${tx.rewardValue.toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* AI CTA Banner */}
      <Link to="/ai-advisor" className="block bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5" />
              <span className="text-sm font-semibold opacity-90">AI Powered Recommendations</span>
            </div>
            <p className="text-lg font-bold">Which card should I use at Costco?</p>
            <p className="text-sm opacity-80 mt-1">Ask our AI advisor anything about maximizing your rewards →</p>
          </div>
          <Bot className="w-16 h-16 opacity-20 hidden sm:block" />
        </div>
      </Link>
    </div>
  );
}
