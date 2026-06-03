import { useState } from "react";
import { Plus, Trash2, Star, CheckCircle } from "lucide-react";
import { useApp, UserCard } from "../context/AppContext";
import { CARD_CATALOG, CreditCard } from "../data/cards";
import CreditCardDisplay from "../components/CreditCardDisplay";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function MyCards() {
  const { userCards, addUserCard, removeUserCard, getCardDetails } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [nickname, setNickname] = useState("");
  const [lastFour, setLastFour] = useState("");
  const [search, setSearch] = useState("");

  const filtered = CARD_CATALOG.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.issuer.toLowerCase().includes(search.toLowerCase())
  );

  const alreadyAdded = new Set(userCards.map((uc) => uc.cardId));

  function handleAddCard() {
    if (!selectedCard) return;
    const uc: UserCard = {
      id: `uc${Date.now()}`,
      cardId: selectedCard.id,
      nickname: nickname || selectedCard.name,
      lastFour: lastFour || "0000",
      totalEarned: 0,
      currentBalance: 0,
    };
    addUserCard(uc);
    setAddOpen(false);
    setSelectedCard(null);
    setNickname("");
    setLastFour("");
    setSearch("");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Cards</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your credit cards and see reward rates</p>
        </div>
        <Button onClick={() => setAddOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
          <Plus className="w-4 h-4" /> Add Card
        </Button>
      </div>

      {userCards.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No cards yet</h3>
          <p className="text-gray-400 mb-4">Add your credit cards to get AI-powered recommendations</p>
          <Button onClick={() => setAddOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">Add Your First Card</Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {userCards.map((uc) => {
            const card = getCardDetails(uc.cardId);
            if (!card) return null;
            return (
              <div key={uc.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <CreditCardDisplay card={card} lastFour={uc.lastFour} nickname={uc.nickname} />
                </div>
                <div className="px-5 pb-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Total Earned</p>
                      <p className="text-xl font-bold text-emerald-600">${uc.totalEarned.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeUserCard(uc.id)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {card.categories.slice(0, 3).map((cat) => (
                      <div key={cat.name} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-xs text-gray-600 flex items-center gap-1.5">
                          <span>{cat.icon}</span> {cat.name}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">{cat.rate}{cat.unit === "%" ? "%" : "x"}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                      <span className="text-xs text-gray-600">Everything else</span>
                      <span className="text-xs font-bold text-gray-500">{card.baseRate}{card.baseUnit === "%" ? "%" : "x"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {card.bestFor.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Card Catalog */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Cards Catalog</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {CARD_CATALOG.map((card) => {
            const isAdded = alreadyAdded.has(card.id);
            return (
              <div key={card.id} className={`bg-white rounded-2xl shadow-sm border p-4 flex gap-3 items-start ${isAdded ? "border-emerald-100 bg-emerald-50/30" : "border-gray-100"}`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-gray-800">{card.issuer} {card.name}</p>
                      <p className="text-xs text-gray-400">{card.annualFee === 0 ? "No annual fee" : `$${card.annualFee}/yr`}</p>
                    </div>
                    {isAdded ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" /> Added
                      </span>
                    ) : (
                      <button
                        onClick={() => { setSelectedCard(card); setAddOpen(true); }}
                        className="shrink-0 text-xs bg-emerald-600 text-white px-2.5 py-1 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Add
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{card.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {card.bestFor.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Card Dialog */}
      <Dialog open={addOpen} onOpenChange={(o) => { setAddOpen(o); if (!o) { setSelectedCard(null); setSearch(""); } }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add a Credit Card</DialogTitle>
          </DialogHeader>

          {!selectedCard ? (
            <div className="space-y-4">
              <Input
                placeholder="Search cards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {filtered.map((card) => {
                  const isAdded = alreadyAdded.has(card.id);
                  return (
                    <button
                      key={card.id}
                      disabled={isAdded}
                      onClick={() => setSelectedCard(card)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        isAdded
                          ? "border-gray-100 opacity-50 cursor-not-allowed bg-gray-50"
                          : "border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800">{card.issuer} {card.name}</p>
                        <p className="text-xs text-gray-400">{card.annualFee === 0 ? "No annual fee" : `$${card.annualFee}/yr`} · {card.type}</p>
                      </div>
                      {isAdded && <span className="text-xs text-emerald-600 font-medium shrink-0">Added</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <CreditCardDisplay card={selectedCard} lastFour={lastFour || "0000"} nickname={nickname || selectedCard.name} />
              <div className="space-y-3">
                <div>
                  <Label>Card Nickname</Label>
                  <Input
                    placeholder={selectedCard.name}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Last 4 Digits</Label>
                  <Input
                    placeholder="1234"
                    maxLength={4}
                    value={lastFour}
                    onChange={(e) => setLastFour(e.target.value.replace(/\D/g, ""))}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold text-amber-800">Sign-up Bonus</span>
                </div>
                <p className="text-xs text-amber-700">{selectedCard.signupBonus}</p>
                <p className="text-xs font-bold text-amber-800 mt-1">Worth ~${selectedCard.signupBonusValue}</p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setSelectedCard(null)} className="flex-1">Back</Button>
                <Button onClick={handleAddCard} className="flex-1 bg-emerald-600 hover:bg-emerald-700">Add Card</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
