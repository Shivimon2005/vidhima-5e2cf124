import { useState } from "react";
import { Plus, Trash2, Search, Filter, TrendingUp } from "lucide-react";
import { useApp, Transaction } from "../context/AppContext";
import { SPENDING_CATEGORIES, getCardRewardRate, calculateRewardValue, detectCategory } from "../data/cards";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";

export default function SpendingTracker() {
  const { userCards, transactions, addTransaction, removeTransaction, getCardDetails } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [filterCard, setFilterCard] = useState("all");

  const [form, setForm] = useState({
    merchant: "",
    amount: "",
    categoryId: "dining",
    cardId: userCards[0]?.id || "",
    date: new Date().toISOString().slice(0, 10),
  });

  function handleAutoDetect() {
    if (form.merchant) {
      const cat = detectCategory(form.merchant);
      setForm((f) => ({ ...f, categoryId: cat }));
    }
  }

  function bestCardForCategory(catId: string) {
    let best = { cardId: "", rate: -1 };
    for (const uc of userCards) {
      const card = getCardDetails(uc.cardId);
      if (!card) continue;
      const { rate } = getCardRewardRate(card, catId);
      if (rate > best.rate) best = { cardId: uc.id, rate };
    }
    return best.cardId;
  }

  function handleSubmit() {
    const amount = parseFloat(form.amount);
    if (!form.merchant || isNaN(amount) || !form.cardId) return;
    const uc = userCards.find((c) => c.id === form.cardId);
    if (!uc) return;
    const card = getCardDetails(uc.cardId);
    if (!card) return;
    const { rate, unit } = getCardRewardRate(card, form.categoryId);
    const rewardValue = calculateRewardValue(card, amount, form.categoryId);
    const tx: Transaction = {
      id: `t${Date.now()}`,
      date: form.date,
      merchant: form.merchant,
      amount,
      categoryId: form.categoryId,
      cardId: form.cardId,
      rewardValue,
      rewardRate: rate,
      rewardUnit: unit,
    };
    addTransaction(tx);
    setAddOpen(false);
    setForm({ merchant: "", amount: "", categoryId: "dining", cardId: userCards[0]?.id || "", date: new Date().toISOString().slice(0, 10) });
  }

  const filtered = transactions.filter((tx) => {
    const matchSearch = tx.merchant.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || tx.categoryId === filterCat;
    const matchCard = filterCard === "all" || tx.cardId === filterCard;
    return matchSearch && matchCat && matchCard;
  });

  const totalSpend = filtered.reduce((s, t) => s + t.amount, 0);
  const totalRewards = filtered.reduce((s, t) => s + t.rewardValue, 0);
  const effectiveRate = totalSpend > 0 ? (totalRewards / totalSpend) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Spending Tracker</h1>
          <p className="text-gray-500 text-sm mt-1">Log transactions and track your rewards earnings</p>
        </div>
        <Button onClick={() => setAddOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
          <Plus className="w-4 h-4" /> Log Purchase
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Spend</p>
          <p className="text-2xl font-bold text-gray-900">${totalSpend.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Rewards Earned</p>
          <p className="text-2xl font-bold text-emerald-600">${totalRewards.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Effective Rate</p>
          <p className="text-2xl font-bold text-blue-600">{effectiveRate.toFixed(2)}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search merchants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterCat} onValueChange={setFilterCat}>
          <SelectTrigger className="w-full sm:w-44">
            <Filter className="w-4 h-4 mr-1 text-gray-400" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {SPENDING_CATEGORIES.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.icon} {c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterCard} onValueChange={setFilterCard}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Card" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cards</SelectItem>
            {userCards.map((uc) => (
              <SelectItem key={uc.id} value={uc.id}>{uc.nickname}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p>No transactions found.</p>
            <button onClick={() => setAddOpen(true)} className="text-emerald-600 text-sm mt-1 hover:underline">Log your first purchase</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-2 px-5 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <span className="col-span-2">Merchant</span>
              <span>Category</span>
              <span className="text-right">Amount</span>
              <span className="text-right">Earned</span>
            </div>
            <div className="divide-y divide-gray-50">
              {filtered.map((tx) => {
                const uc = userCards.find((c) => c.id === tx.cardId);
                const catData = SPENDING_CATEGORIES.find((c) => c.id === tx.categoryId);
                const usedOptimalCard = bestCardForCategory(tx.categoryId) === tx.cardId;
                return (
                  <div key={tx.id} className="grid grid-cols-5 gap-2 items-center px-5 py-4 hover:bg-gray-50/50 group transition-colors">
                    <div className="col-span-2 min-w-0">
                      <p className="font-semibold text-gray-800 truncate text-sm">{tx.merchant}</p>
                      <p className="text-xs text-gray-400">{new Date(tx.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {uc?.nickname || "?"}</p>
                      {!usedOptimalCard && userCards.length > 1 && (
                        <p className="text-[10px] text-amber-500 mt-0.5">⚠ Sub-optimal card used</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">{catData?.icon} {catData?.name.split(" ")[0]}</span>
                    <span className="text-right text-sm font-medium text-gray-800">${tx.amount.toFixed(2)}</span>
                    <div className="text-right flex items-center justify-end gap-2">
                      <span className="text-sm font-semibold text-emerald-600">+${tx.rewardValue.toFixed(2)}</span>
                      <button
                        onClick={() => removeTransaction(tx.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Add Transaction Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Log a Purchase</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Merchant / Description</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  placeholder="e.g. Whole Foods, United Airlines..."
                  value={form.merchant}
                  onChange={(e) => setForm((f) => ({ ...f, merchant: e.target.value }))}
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={handleAutoDetect} className="shrink-0 text-xs px-3">
                  Auto-detect
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Amount ($)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  className="mt-1"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Category</Label>
              <Select value={form.categoryId} onValueChange={(v) => setForm((f) => ({ ...f, categoryId: v }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SPENDING_CATEGORIES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.icon} {c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Card Used</Label>
              <Select value={form.cardId} onValueChange={(v) => setForm((f) => ({ ...f, cardId: v }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select card..." />
                </SelectTrigger>
                <SelectContent>
                  {userCards.map((uc) => {
                    const card = getCardDetails(uc.cardId);
                    const { rate, unit } = card ? getCardRewardRate(card, form.categoryId) : { rate: 0, unit: "%" };
                    const isBest = bestCardForCategory(form.categoryId) === uc.id;
                    return (
                      <SelectItem key={uc.id} value={uc.id}>
                        {isBest ? "⭐ " : ""}{uc.nickname} ({rate}{unit === "%" ? "%" : "x"})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {form.cardId && form.cardId !== bestCardForCategory(form.categoryId) && userCards.length > 1 && (
                <p className="text-xs text-amber-600 mt-1">
                  ⚠ Not the optimal card for this category.{" "}
                  <button
                    className="underline"
                    onClick={() => setForm((f) => ({ ...f, cardId: bestCardForCategory(f.categoryId) }))}
                  >
                    Use best card instead
                  </button>
                </p>
              )}
            </div>

            {form.amount && form.cardId && (() => {
              const uc = userCards.find((c) => c.id === form.cardId);
              const card = uc ? getCardDetails(uc.cardId) : undefined;
              if (!card) return null;
              const reward = calculateRewardValue(card, parseFloat(form.amount) || 0, form.categoryId);
              return (
                <div className="bg-emerald-50 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-sm text-emerald-700 font-medium">Estimated reward</span>
                  <span className="text-lg font-bold text-emerald-600">+${reward.toFixed(2)}</span>
                </div>
              );
            })()}

            <div className="flex gap-3 pt-1">
              <Button variant="outline" onClick={() => setAddOpen(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleSubmit} className="flex-1 bg-emerald-600 hover:bg-emerald-700">Log Purchase</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
