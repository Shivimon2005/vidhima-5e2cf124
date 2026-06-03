import { useMemo } from "react";
import { TrendingUp, Award, Calendar, PieChart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend } from "recharts";
import { useApp } from "../context/AppContext";
import { SPENDING_CATEGORIES } from "../data/cards";

const CHART_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

export default function RewardsTracker() {
  const { userCards, transactions, totalRewardsEarned, getCardDetails } = useApp();

  const byCard = useMemo(() => {
    const map: Record<string, { name: string; rewards: number; spend: number; gradient: string }> = {};
    for (const tx of transactions) {
      const uc = userCards.find((c) => c.id === tx.cardId);
      if (!uc) continue;
      const card = getCardDetails(uc.cardId);
      if (!uc.id) continue;
      if (!map[uc.id]) {
        map[uc.id] = { name: uc.nickname, rewards: 0, spend: 0, gradient: card?.gradient || "" };
      }
      map[uc.id].rewards += tx.rewardValue;
      map[uc.id].spend += tx.amount;
    }
    return Object.values(map).sort((a, b) => b.rewards - a.rewards);
  }, [transactions, userCards, getCardDetails]);

  const byCategory = useMemo(() => {
    const map: Record<string, { name: string; icon: string; rewards: number; spend: number }> = {};
    for (const tx of transactions) {
      const cat = SPENDING_CATEGORIES.find((c) => c.id === tx.categoryId);
      if (!cat) continue;
      if (!map[cat.id]) map[cat.id] = { name: cat.name, icon: cat.icon, rewards: 0, spend: 0 };
      map[cat.id].rewards += tx.rewardValue;
      map[cat.id].spend += tx.amount;
    }
    return Object.values(map).sort((a, b) => b.rewards - a.rewards);
  }, [transactions]);

  const byMonth = useMemo(() => {
    const map: Record<string, number> = {};
    for (const tx of transactions) {
      const month = tx.date.slice(0, 7);
      map[month] = (map[month] || 0) + tx.rewardValue;
    }
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, rewards]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
        rewards: parseFloat(rewards.toFixed(2)),
      }));
  }, [transactions]);

  const bestCardPerformance = byCard[0];
  const topCategory = byCategory[0];
  const avgEffectiveRate = transactions.length > 0
    ? (totalRewardsEarned / transactions.reduce((s, t) => s + t.amount, 0)) * 100
    : 0;

  // Projection: annualize based on last 30 days
  const last30 = transactions.filter((t) => {
    const d = new Date(t.date + "T12:00:00");
    return (Date.now() - d.getTime()) < 30 * 24 * 60 * 60 * 1000;
  });
  const last30Rewards = last30.reduce((s, t) => s + t.rewardValue, 0);
  const annualProjection = last30Rewards * 12;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rewards Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Track your earnings and optimize your strategy</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 opacity-80" />
            <span className="text-sm opacity-80">Total Earned</span>
          </div>
          <p className="text-3xl font-bold">${totalRewardsEarned.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-500">Annual Projection</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${annualProjection.toFixed(0)}</p>
          <p className="text-xs text-gray-400 mt-0.5">Based on last 30 days</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-5 h-5 text-amber-500" />
            <span className="text-sm text-gray-500">Effective Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{avgEffectiveRate.toFixed(2)}%</p>
          <p className="text-xs text-gray-400 mt-0.5">Avg across all spend</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-500">Transactions</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">Total tracked</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Rewards Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">Monthly Rewards</h2>
          {byMonth.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={byMonth} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v: number) => [`$${v.toFixed(2)}`, "Rewards"]} />
                <Bar dataKey="rewards" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Rewards by Category Pie */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">Rewards by Category</h2>
          {byCategory.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={byCategory.slice(0, 6)}
                  dataKey="rewards"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ icon, name, percent }) => `${icon} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {byCategory.slice(0, 6).map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`$${v.toFixed(2)}`, "Rewards"]} />
              </RePieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* By Card breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Rewards by Card</h2>
        {byCard.length === 0 ? (
          <p className="text-gray-400 text-sm">No data yet. Start logging transactions!</p>
        ) : (
          <div className="space-y-3">
            {byCard.map((item, i) => {
              const pct = totalRewardsEarned > 0 ? (item.rewards / totalRewardsEarned) * 100 : 0;
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded bg-gradient-to-br ${item.gradient}`} />
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-emerald-600">${item.rewards.toFixed(2)}</span>
                      <span className="text-xs text-gray-400 ml-2">/ ${item.spend.toFixed(0)} spend</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">{pct.toFixed(1)}% of total rewards · {item.spend > 0 ? ((item.rewards / item.spend) * 100).toFixed(2) : "0"}% effective rate</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Category breakdown table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Category Breakdown</h2>
        </div>
        {byCategory.length === 0 ? (
          <p className="p-6 text-gray-400 text-sm">No data yet.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            <div className="grid grid-cols-4 gap-2 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <span className="col-span-2">Category</span>
              <span className="text-right">Spend</span>
              <span className="text-right">Earned</span>
            </div>
            {byCategory.map((cat, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 items-center px-6 py-3 hover:bg-gray-50/50">
                <span className="col-span-2 text-sm font-medium text-gray-700">{cat.icon} {cat.name}</span>
                <span className="text-right text-sm text-gray-500">${cat.spend.toFixed(2)}</span>
                <span className="text-right text-sm font-semibold text-emerald-600">+${cat.rewards.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Insights */}
      {bestCardPerformance && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">Top Performing Card</p>
            <p className="text-xl font-bold text-gray-900">{bestCardPerformance.name}</p>
            <p className="text-sm text-gray-600 mt-1">${bestCardPerformance.rewards.toFixed(2)} earned · {bestCardPerformance.spend > 0 ? ((bestCardPerformance.rewards / bestCardPerformance.spend) * 100).toFixed(2) : "0"}% rate</p>
          </div>
          {topCategory && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Top Spending Category</p>
              <p className="text-xl font-bold text-gray-900">{topCategory.icon} {topCategory.name}</p>
              <p className="text-sm text-gray-600 mt-1">${topCategory.spend.toFixed(2)} spent · +${topCategory.rewards.toFixed(2)} earned</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
