import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, CreditCard, Zap } from "lucide-react";
import { useApp } from "../context/AppContext";
import { CARD_CATALOG, SPENDING_CATEGORIES, getCardRewardRate, calculateRewardValue, detectCategory } from "../data/cards";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  cards?: CardRec[];
  timestamp: Date;
}

interface CardRec {
  cardName: string;
  issuer: string;
  gradient: string;
  rate: number;
  unit: string;
  rewardValue: number;
  isTop: boolean;
}

const QUICK_PROMPTS = [
  "Which card should I use at Whole Foods?",
  "Best card for a $500 flight booking?",
  "I'm eating out tonight — what card?",
  "Where am I leaving money on the table?",
  "Best card for Amazon purchases?",
  "How do I maximize my Amex Gold?",
  "Analyze my wallet and give tips",
];

function generateAIResponse(message: string, userCards: ReturnType<typeof useApp>["userCards"], getCardDetails: ReturnType<typeof useApp>["getCardDetails"]): { text: string; cards?: CardRec[] } {
  const lower = message.toLowerCase();

  if (userCards.length === 0) {
    return { text: "You haven't added any cards yet! Head to **My Cards** to add your credit cards, and I'll give you personalized recommendations based on your actual wallet." };
  }

  // Detect if asking for best card for a purchase
  const purchaseKeywords = ["which card", "what card", "best card", "use for", "use at", "use on", "should i use", "recommend", "eating out", "flight", "groceries", "gas", "amazon", "costco", "hotel", "shopping"];
  const analyzeKeywords = ["analyze", "wallet", "optimize", "maximize", "tips", "leaving money", "improve", "better"];
  const howToKeywords = ["how do i", "how to", "how can", "strategy", "maximize my"];

  const detectedCat = detectCategory(message);
  const isPurchaseQuery = purchaseKeywords.some((kw) => lower.includes(kw));
  const isAnalyzeQuery = analyzeKeywords.some((kw) => lower.includes(kw));
  const isHowTo = howToKeywords.some((kw) => lower.includes(kw));

  if (isAnalyzeQuery || (isHowTo && !isPurchaseQuery)) {
    // Wallet analysis
    const walletData = userCards.map((uc) => {
      const card = getCardDetails(uc.cardId);
      if (!card) return null;
      const catRates = SPENDING_CATEGORIES.filter((c) => c.id !== "other").map((cat) => {
        const { rate, unit } = getCardRewardRate(card, cat.id);
        return { catName: cat.name, icon: cat.icon, rate, unit };
      }).sort((a, b) => b.rate - a.rate);
      return { card, uc, catRates };
    }).filter(Boolean);

    const gaps: string[] = [];
    const tips: string[] = [];

    // Check for grocery gap
    const maxGrocery = Math.max(...userCards.map((uc) => {
      const c = getCardDetails(uc.cardId);
      return c ? getCardRewardRate(c, "groceries").rate : 0;
    }));
    if (maxGrocery < 3) gaps.push("Groceries (you're only earning " + maxGrocery + "x — Amex Gold earns 4x)");

    // Check for dining
    const maxDining = Math.max(...userCards.map((uc) => {
      const c = getCardDetails(uc.cardId);
      return c ? getCardRewardRate(c, "dining").rate : 0;
    }));
    if (maxDining < 3) gaps.push("Dining (max " + maxDining + "x — Chase Sapphire Reserve earns 10x)");

    const bestCards = walletData.map((d) => {
      const topCat = d!.catRates[0];
      return `**${d!.uc.nickname}**: Best for ${topCat.icon} ${topCat.catName} at ${topCat.rate}${topCat.unit === "%" ? "%" : "x"}`;
    });

    let text = "## Wallet Analysis 🔍\n\n**Your card strengths:**\n";
    text += bestCards.join("\n") + "\n\n";
    if (gaps.length > 0) {
      text += "**Reward gaps to consider:**\n";
      text += gaps.map((g) => `• ${g}`).join("\n") + "\n\n";
    }
    text += "**Pro tips:**\n";
    text += "• Always use category-specific cards instead of flat-rate ones for higher spend categories\n";
    text += "• Stack rewards by using shopping portals (Chase, Amex) for extra multipliers\n";
    text += "• Meet signup bonus requirements before switching back to your everyday card";

    return { text };
  }

  if (isPurchaseQuery || detectedCat !== "other") {
    const catId = detectedCat !== "other" ? detectedCat : "shopping";
    const cat = SPENDING_CATEGORIES.find((c) => c.id === catId)!;

    // Extract amount if mentioned
    const amountMatch = message.match(/\$?(\d+(?:\.\d{2})?)/);
    const amount = amountMatch ? parseFloat(amountMatch[1]) : 100;

    const recs: CardRec[] = userCards
      .map((uc) => {
        const card = getCardDetails(uc.cardId);
        if (!card) return null;
        const { rate, unit } = getCardRewardRate(card, catId);
        const rewardValue = calculateRewardValue(card, amount, catId);
        return { cardName: uc.nickname || card.name, issuer: card.issuer, gradient: card.gradient, rate, unit, rewardValue, isTop: false };
      })
      .filter(Boolean)
      .sort((a, b) => b!.rewardValue - a!.rewardValue) as CardRec[];

    if (recs.length > 0) recs[0].isTop = true;
    const top = recs[0];
    const topCard = CARD_CATALOG.find((c) => userCards.some((uc) => uc.cardId === c.id && (userCards.find((u) => u.id === uc.id)?.nickname === top.cardName || c.name === top.cardName)));

    let text = `For **${cat.icon} ${cat.name}**, use your **${top.cardName}**!\n\n`;
    text += `On a $${amount.toFixed(2)} purchase you'd earn **$${top.rewardValue.toFixed(2)}** back — that's ${top.rate}${top.unit === "%" ? "%" : "x " + top.unit}.\n\n`;

    if (recs.length > 1) {
      const second = recs[1];
      const diff = top.rewardValue - second.rewardValue;
      text += `That's $${diff.toFixed(2)} more than using your ${second.cardName} (${second.rate}${second.unit === "%" ? "%" : "x"}).\n\n`;
    }

    // Extra tips
    if (catId === "groceries") text += "💡 *Tip: Amex Gold earns 4x at US supermarkets — consider adding it if you spend heavily on groceries!*";
    else if (catId === "dining") text += "💡 *Tip: Some cards like Chase Sapphire Reserve offer 10x at select dining through Chase dining portal!*";
    else if (catId === "travel") text += "💡 *Tip: Book through your card's travel portal (Chase/Amex) for additional bonus multipliers!*";
    else if (catId === "gas") text += "💡 *Tip: Amex Blue Cash Preferred earns 3% on US gas stations!*";

    return { text, cards: recs };
  }

  // General rewards/strategy questions
  if (lower.includes("annual fee") || lower.includes("worth it")) {
    return { text: "**Annual fee math:** A card with a $95 fee is worth it if you earn more than $95 in rewards. For example:\n\n• Chase Sapphire Preferred ($95/yr): If you spend $5K on dining/travel, you earn ~$188 in value — netting $93 profit\n• Amex Gold ($250/yr): $120 annual dining credit + $120 Uber Cash essentially brings the effective fee to $10\n\nAlways check for statement credits that offset the fee!" };
  }

  if (lower.includes("point") || lower.includes("transfer") || lower.includes("mile")) {
    return { text: "**Point Transfer Strategy 🎯**\n\nTransfer points to airline/hotel partners for maximum value:\n\n• Chase Ultimate Rewards → Hyatt (1.5¢+/pt), United, Southwest\n• Amex Membership Rewards → Delta, Hilton, Air France\n• Capital One Miles → Air Canada, Turkish Airlines\n\nThe sweet spot: transferring to Hyatt for luxury hotel stays can yield **3-5¢ per point** — far better than 1¢ cashback!" };
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return { text: `Hi! I'm your SaveSage AI advisor 👋\n\nI can help you:\n• **Find the best card** for any purchase category\n• **Analyze your wallet** for reward gaps\n• **Maximize signup bonuses** and ongoing rewards\n• **Explain transfer strategies** for points/miles\n\nTry asking: *"Which card should I use at Whole Foods?"* or *"Analyze my wallet"*` };
  }

  return { text: `Good question! Based on your ${userCards.length} card wallet, here's my general advice:\n\n• Always match spending to your card's **bonus categories**\n• Use a flat-rate 2% card (like Citi Double Cash) for everything that doesn't earn a bonus\n• Stack with shopping portals — Chase Shopping, Amex Offers, and Rakuten can add 2-10% on top\n• Pay your balance in full every month — interest cancels out all rewards\n\nAsk me about a specific purchase or spending category for more targeted advice!` };
}

export default function AIAdvisor() {
  const { userCards, getCardDetails } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hey! I'm your **SaveSage AI** 🤖✨\n\nI analyze your credit card portfolio and tell you exactly which card to use for every purchase to maximize your rewards. You have **${userCards.length} card${userCards.length !== 1 ? "s" : ""}** in your wallet.\n\nAsk me anything — or try one of the suggestions below!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: `u${Date.now()}`, role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const { text: responseText, cards } = generateAIResponse(text, userCards, getCardDetails);
      const aiMsg: Message = { id: `a${Date.now()}`, role: "assistant", content: responseText, cards, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 600);
  }

  function renderMarkdown(text: string) {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/^## (.+)$/gm, '<p class="font-bold text-base mt-2">$1</p>')
      .replace(/^• (.+)$/gm, '<li class="ml-3 list-disc">$1</li>')
      .replace(/\n/g, "<br>");
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-2rem)] -mt-6 -mx-6 lg:-mt-8 lg:-mx-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-gray-900">SaveSage AI Advisor</h1>
          <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Powered by AI · {userCards.length} cards in your wallet
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50 px-4 lg:px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-gradient-to-br from-emerald-500 to-teal-600" : "bg-blue-600"}`}>
              {msg.role === "assistant" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
            </div>
            <div className={`max-w-[80%] space-y-3 ${msg.role === "user" ? "items-end" : ""}`}>
              <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "assistant" ? "bg-white shadow-sm border border-gray-100 text-gray-700" : "bg-blue-600 text-white"}`}>
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
              </div>

              {msg.cards && msg.cards.length > 0 && (
                <div className="space-y-2">
                  {msg.cards.slice(0, 3).map((rec, i) => (
                    <div key={i} className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${rec.isTop ? "bg-emerald-50 border-emerald-200" : "bg-white border-gray-100"}`}>
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${rec.gradient} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${rec.isTop ? "text-emerald-800" : "text-gray-700"}`}>{rec.cardName}</p>
                        <p className="text-xs text-gray-500">{rec.rate}{rec.unit === "%" ? "%" : "x " + rec.unit} rewards</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-sm font-bold ${rec.isTop ? "text-emerald-600" : "text-gray-500"}`}>+${rec.rewardValue.toFixed(2)}</p>
                        {rec.isTop && <p className="text-[10px] text-emerald-500 font-medium">Best choice</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white shadow-sm border border-gray-100 rounded-2xl px-4 py-3">
              <div className="flex gap-1 items-center h-4">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick prompts */}
      <div className="bg-white border-t border-gray-100 px-4 lg:px-6 pt-3 pb-1 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              className="shrink-0 text-xs bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 text-gray-600 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white px-4 lg:px-6 py-4 shrink-0">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            placeholder="Ask about any purchase or card strategy..."
            className="flex-1 rounded-xl border-gray-200"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
