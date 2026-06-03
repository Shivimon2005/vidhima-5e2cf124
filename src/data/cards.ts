export type RewardType = "cashback" | "points" | "miles";

export interface RewardCategory {
  name: string;
  rate: number;
  unit: string;
  icon: string;
}

export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  network: string;
  type: RewardType;
  color: string;
  gradient: string;
  annualFee: number;
  signupBonus: string;
  signupBonusValue: number;
  categories: RewardCategory[];
  baseRate: number;
  baseUnit: string;
  pointValue: number;
  description: string;
  bestFor: string[];
  foreignTransactionFee: boolean;
}

export const CARD_CATALOG: CreditCard[] = [
  {
    id: "chase-sapphire-preferred",
    name: "Sapphire Preferred",
    issuer: "Chase",
    network: "Visa",
    type: "points",
    color: "#0f4c8a",
    gradient: "from-blue-900 to-blue-700",
    annualFee: 95,
    signupBonus: "60,000 points after $4,000 spend in 3 months",
    signupBonusValue: 750,
    categories: [
      { name: "Dining", rate: 3, unit: "pts", icon: "🍽️" },
      { name: "Online Groceries", rate: 3, unit: "pts", icon: "🛒" },
      { name: "Streaming", rate: 3, unit: "pts", icon: "📺" },
      { name: "Travel", rate: 2, unit: "pts", icon: "✈️" },
    ],
    baseRate: 1,
    baseUnit: "pts",
    pointValue: 0.0125,
    description: "Premium travel rewards card with flexible point redemption",
    bestFor: ["Travel", "Dining", "Streaming"],
    foreignTransactionFee: false,
  },
  {
    id: "chase-freedom-unlimited",
    name: "Freedom Unlimited",
    issuer: "Chase",
    network: "Visa",
    type: "cashback",
    color: "#1a1a2e",
    gradient: "from-gray-900 to-gray-700",
    annualFee: 0,
    signupBonus: "$200 after $500 spend in 3 months",
    signupBonusValue: 200,
    categories: [
      { name: "Dining", rate: 3, unit: "%", icon: "🍽️" },
      { name: "Drugstores", rate: 3, unit: "%", icon: "💊" },
      { name: "Travel (Chase)", rate: 5, unit: "%", icon: "✈️" },
    ],
    baseRate: 1.5,
    baseUnit: "%",
    pointValue: 0.01,
    description: "Flat-rate cashback with no annual fee",
    bestFor: ["Everyday Spending", "Dining", "Drugstores"],
    foreignTransactionFee: true,
  },
  {
    id: "chase-freedom-flex",
    name: "Freedom Flex",
    issuer: "Chase",
    network: "Visa",
    type: "cashback",
    color: "#003087",
    gradient: "from-blue-800 to-indigo-600",
    annualFee: 0,
    signupBonus: "$200 after $500 spend in 3 months",
    signupBonusValue: 200,
    categories: [
      { name: "Rotating (Q)", rate: 5, unit: "%", icon: "🔄" },
      { name: "Dining", rate: 3, unit: "%", icon: "🍽️" },
      { name: "Drugstores", rate: 3, unit: "%", icon: "💊" },
      { name: "Travel (Chase)", rate: 5, unit: "%", icon: "✈️" },
    ],
    baseRate: 1,
    baseUnit: "%",
    pointValue: 0.01,
    description: "Rotating 5% categories plus strong everyday rewards",
    bestFor: ["Rotating Categories", "Dining"],
    foreignTransactionFee: true,
  },
  {
    id: "amex-gold",
    name: "Gold Card",
    issuer: "American Express",
    network: "Amex",
    type: "points",
    color: "#b8860b",
    gradient: "from-yellow-700 to-amber-500",
    annualFee: 250,
    signupBonus: "60,000 points after $6,000 spend in 6 months",
    signupBonusValue: 1200,
    categories: [
      { name: "Dining", rate: 4, unit: "pts", icon: "🍽️" },
      { name: "US Supermarkets", rate: 4, unit: "pts", icon: "🛒" },
      { name: "Flights", rate: 3, unit: "pts", icon: "✈️" },
    ],
    baseRate: 1,
    baseUnit: "pts",
    pointValue: 0.02,
    description: "Top-tier dining and grocery rewards with Amex Membership Rewards",
    bestFor: ["Dining", "Groceries", "Flights"],
    foreignTransactionFee: false,
  },
  {
    id: "amex-blue-cash-preferred",
    name: "Blue Cash Preferred",
    issuer: "American Express",
    network: "Amex",
    type: "cashback",
    color: "#0061a3",
    gradient: "from-blue-700 to-cyan-500",
    annualFee: 95,
    signupBonus: "$250 after $3,000 spend in 6 months",
    signupBonusValue: 250,
    categories: [
      { name: "US Supermarkets", rate: 6, unit: "%", icon: "🛒" },
      { name: "Streaming", rate: 6, unit: "%", icon: "📺" },
      { name: "US Gas Stations", rate: 3, unit: "%", icon: "⛽" },
      { name: "Transit", rate: 3, unit: "%", icon: "🚌" },
    ],
    baseRate: 1,
    baseUnit: "%",
    pointValue: 0.01,
    description: "Best-in-class supermarket and streaming cashback",
    bestFor: ["Groceries", "Streaming", "Gas"],
    foreignTransactionFee: true,
  },
  {
    id: "citi-double-cash",
    name: "Double Cash",
    issuer: "Citi",
    network: "Mastercard",
    type: "cashback",
    color: "#003f7f",
    gradient: "from-indigo-900 to-blue-600",
    annualFee: 0,
    signupBonus: "$200 after $1,500 spend in 6 months",
    signupBonusValue: 200,
    categories: [],
    baseRate: 2,
    baseUnit: "%",
    pointValue: 0.01,
    description: "Simple 2% cashback on everything — 1% when you buy, 1% when you pay",
    bestFor: ["Flat-Rate Cashback", "Everything"],
    foreignTransactionFee: true,
  },
  {
    id: "capital-one-venture",
    name: "Venture Rewards",
    issuer: "Capital One",
    network: "Visa",
    type: "miles",
    color: "#c41f3e",
    gradient: "from-red-800 to-red-600",
    annualFee: 95,
    signupBonus: "75,000 miles after $4,000 spend in 3 months",
    signupBonusValue: 1312,
    categories: [
      { name: "Hotels & Rentals (C1 Travel)", rate: 5, unit: "mi", icon: "🏨" },
    ],
    baseRate: 2,
    baseUnit: "mi",
    pointValue: 0.0175,
    description: "Flat-rate miles on every purchase, easy travel redemption",
    bestFor: ["Travel", "Flat-Rate Miles"],
    foreignTransactionFee: false,
  },
  {
    id: "discover-it-cashback",
    name: "Discover it® Cash Back",
    issuer: "Discover",
    network: "Discover",
    type: "cashback",
    color: "#ff6600",
    gradient: "from-orange-600 to-orange-400",
    annualFee: 0,
    signupBonus: "Cashback Match™ — all cashback earned in year 1 matched",
    signupBonusValue: 300,
    categories: [
      { name: "Rotating (Q)", rate: 5, unit: "%", icon: "🔄" },
    ],
    baseRate: 1,
    baseUnit: "%",
    pointValue: 0.01,
    description: "5% rotating categories + first-year cashback match",
    bestFor: ["Rotating Categories", "First Year Bonus"],
    foreignTransactionFee: false,
  },
  {
    id: "wells-fargo-active-cash",
    name: "Active Cash",
    issuer: "Wells Fargo",
    network: "Visa",
    type: "cashback",
    color: "#c0392b",
    gradient: "from-red-700 to-rose-500",
    annualFee: 0,
    signupBonus: "$200 after $500 spend in 3 months",
    signupBonusValue: 200,
    categories: [],
    baseRate: 2,
    baseUnit: "%",
    pointValue: 0.01,
    description: "Unlimited 2% cashback on all purchases, no annual fee",
    bestFor: ["Flat-Rate Cashback", "Simplicity"],
    foreignTransactionFee: true,
  },
  {
    id: "bof-travel-rewards",
    name: "Travel Rewards",
    issuer: "Bank of America",
    network: "Visa",
    type: "points",
    color: "#e31837",
    gradient: "from-red-800 to-red-600",
    annualFee: 0,
    signupBonus: "25,000 points after $1,000 spend in 90 days",
    signupBonusValue: 250,
    categories: [
      { name: "Travel", rate: 3, unit: "pts", icon: "✈️" },
    ],
    baseRate: 1.5,
    baseUnit: "pts",
    pointValue: 0.01,
    description: "No annual fee travel rewards with BofA Preferred Rewards bonuses",
    bestFor: ["Travel", "No Annual Fee"],
    foreignTransactionFee: false,
  },
  {
    id: "amex-platinum",
    name: "Platinum Card",
    issuer: "American Express",
    network: "Amex",
    type: "points",
    color: "#8a8a8a",
    gradient: "from-gray-600 to-gray-400",
    annualFee: 695,
    signupBonus: "80,000 points after $8,000 spend in 6 months",
    signupBonusValue: 1600,
    categories: [
      { name: "Flights (Direct)", rate: 5, unit: "pts", icon: "✈️" },
      { name: "Hotels (Amex Travel)", rate: 5, unit: "pts", icon: "🏨" },
    ],
    baseRate: 1,
    baseUnit: "pts",
    pointValue: 0.02,
    description: "Premium travel card with unmatched lounge access and travel perks",
    bestFor: ["Premium Travel", "Lounge Access"],
    foreignTransactionFee: false,
  },
  {
    id: "chase-sapphire-reserve",
    name: "Sapphire Reserve",
    issuer: "Chase",
    network: "Visa",
    type: "points",
    color: "#1c1c1c",
    gradient: "from-zinc-900 to-zinc-700",
    annualFee: 550,
    signupBonus: "60,000 points after $4,000 spend in 3 months",
    signupBonusValue: 900,
    categories: [
      { name: "Travel", rate: 10, unit: "pts", icon: "✈️" },
      { name: "Dining", rate: 10, unit: "pts", icon: "🍽️" },
      { name: "Other Travel", rate: 3, unit: "pts", icon: "🗺️" },
      { name: "Other Dining", rate: 3, unit: "pts", icon: "🥘" },
    ],
    baseRate: 1,
    baseUnit: "pts",
    pointValue: 0.015,
    description: "Luxury travel card with $300 travel credit and Priority Pass lounge access",
    bestFor: ["Premium Travel", "Dining", "High Spenders"],
    foreignTransactionFee: false,
  },
];

export const SPENDING_CATEGORIES = [
  { id: "dining", name: "Dining & Restaurants", icon: "🍽️", keywords: ["restaurant", "dining", "food", "cafe", "pizza", "sushi", "burger", "chipotle", "doordash", "ubereats", "grubhub", "starbucks"] },
  { id: "groceries", name: "Groceries", icon: "🛒", keywords: ["grocery", "supermarket", "whole foods", "trader joe", "kroger", "safeway", "costco", "walmart", "target", "aldi"] },
  { id: "gas", name: "Gas & Fuel", icon: "⛽", keywords: ["gas", "fuel", "shell", "bp", "chevron", "exxon", "mobil", "sunoco"] },
  { id: "travel", name: "Travel", icon: "✈️", keywords: ["flight", "airline", "hotel", "airbnb", "vrbo", "car rental", "uber", "lyft", "train", "amtrak"] },
  { id: "streaming", name: "Streaming & Entertainment", icon: "📺", keywords: ["netflix", "spotify", "hulu", "disney", "apple tv", "amazon prime", "youtube", "streaming"] },
  { id: "drugstores", name: "Drugstores & Pharmacy", icon: "💊", keywords: ["cvs", "walgreens", "pharmacy", "rite aid", "drugstore"] },
  { id: "transit", name: "Transit & Commute", icon: "🚌", keywords: ["transit", "metro", "subway", "bus", "commute", "parking", "toll"] },
  { id: "shopping", name: "Shopping & Retail", icon: "🛍️", keywords: ["amazon", "walmart", "target", "retail", "shopping", "store", "ebay"] },
  { id: "utilities", name: "Utilities & Bills", icon: "💡", keywords: ["electric", "water", "internet", "phone", "utility", "bill", "subscription"] },
  { id: "healthcare", name: "Healthcare & Medical", icon: "🏥", keywords: ["doctor", "hospital", "medical", "dental", "vision", "health", "clinic"] },
  { id: "other", name: "Other / Miscellaneous", icon: "💳", keywords: [] },
];

export function detectCategory(description: string): string {
  const lower = description.toLowerCase();
  for (const cat of SPENDING_CATEGORIES) {
    if (cat.keywords.some((kw) => lower.includes(kw))) {
      return cat.id;
    }
  }
  return "other";
}

export function getCardRewardRate(card: CreditCard, categoryId: string): { rate: number; unit: string } {
  const catMap: Record<string, string[]> = {
    dining: ["Dining", "Other Dining"],
    groceries: ["US Supermarkets", "Online Groceries"],
    gas: ["US Gas Stations"],
    travel: ["Travel", "Flights", "Hotels & Rentals (C1 Travel)", "Flights (Direct)", "Hotels (Amex Travel)", "Other Travel", "Travel (Chase)"],
    streaming: ["Streaming"],
    drugstores: ["Drugstores"],
    transit: ["Transit"],
    rotating: ["Rotating (Q)"],
  };

  const matchNames = catMap[categoryId] || [];
  for (const cat of card.categories) {
    if (matchNames.includes(cat.name)) {
      return { rate: cat.rate, unit: cat.unit };
    }
  }
  return { rate: card.baseRate, unit: card.baseUnit };
}

export function calculateRewardValue(card: CreditCard, amount: number, categoryId: string): number {
  const { rate } = getCardRewardRate(card, categoryId);
  if (card.type === "cashback") {
    return (amount * rate) / 100;
  }
  const points = amount * rate;
  return points * card.pointValue;
}
