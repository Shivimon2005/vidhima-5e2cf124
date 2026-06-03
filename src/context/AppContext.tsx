import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CreditCard, CARD_CATALOG } from "../data/cards";

export interface UserCard {
  id: string;
  cardId: string;
  nickname: string;
  lastFour: string;
  totalEarned: number;
  currentBalance: number;
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  categoryId: string;
  cardId: string;
  rewardValue: number;
  rewardRate: number;
  rewardUnit: string;
}

interface AppState {
  userCards: UserCard[];
  transactions: Transaction[];
  addUserCard: (card: UserCard) => void;
  removeUserCard: (id: string) => void;
  addTransaction: (tx: Transaction) => void;
  removeTransaction: (id: string) => void;
  getCardDetails: (cardId: string) => CreditCard | undefined;
  totalRewardsEarned: number;
  monthlyRewards: number;
}

const AppContext = createContext<AppState | null>(null);

const DEMO_CARDS: UserCard[] = [
  { id: "uc1", cardId: "chase-sapphire-preferred", nickname: "Chase Sapphire", lastFour: "4521", totalEarned: 187.50, currentBalance: 0 },
  { id: "uc2", cardId: "amex-gold", nickname: "Amex Gold", lastFour: "1008", totalEarned: 312.00, currentBalance: 0 },
  { id: "uc3", cardId: "citi-double-cash", nickname: "Citi Double Cash", lastFour: "7734", totalEarned: 95.20, currentBalance: 0 },
];

const DEMO_TRANSACTIONS: Transaction[] = [
  { id: "t1", date: "2026-06-01", merchant: "Whole Foods Market", amount: 85.40, categoryId: "groceries", cardId: "uc2", rewardValue: 6.83, rewardRate: 4, rewardUnit: "pts" },
  { id: "t2", date: "2026-06-01", merchant: "Chipotle", amount: 32.50, categoryId: "dining", cardId: "uc2", rewardValue: 2.60, rewardRate: 4, rewardUnit: "pts" },
  { id: "t3", date: "2026-05-30", merchant: "United Airlines", amount: 420.00, categoryId: "travel", cardId: "uc1", rewardValue: 10.50, rewardRate: 2, rewardUnit: "pts" },
  { id: "t4", date: "2026-05-29", merchant: "Netflix", amount: 22.99, categoryId: "streaming", cardId: "uc2", rewardValue: 0.46, rewardRate: 1, rewardUnit: "pts" },
  { id: "t5", date: "2026-05-28", merchant: "Walgreens", amount: 45.00, categoryId: "drugstores", cardId: "uc3", rewardValue: 0.90, rewardRate: 2, rewardUnit: "%" },
  { id: "t6", date: "2026-05-27", merchant: "Shake Shack", amount: 28.75, categoryId: "dining", cardId: "uc2", rewardValue: 2.30, rewardRate: 4, rewardUnit: "pts" },
  { id: "t7", date: "2026-05-26", merchant: "Shell Gas Station", amount: 62.00, categoryId: "gas", cardId: "uc3", rewardValue: 1.24, rewardRate: 2, rewardUnit: "%" },
  { id: "t8", date: "2026-05-25", merchant: "Amazon", amount: 134.99, categoryId: "shopping", cardId: "uc3", rewardValue: 2.70, rewardRate: 2, rewardUnit: "%" },
  { id: "t9", date: "2026-05-24", merchant: "Marriott Hotel", amount: 289.00, categoryId: "travel", cardId: "uc1", rewardValue: 7.23, rewardRate: 2, rewardUnit: "pts" },
  { id: "t10", date: "2026-05-23", merchant: "Trader Joe's", amount: 67.85, categoryId: "groceries", cardId: "uc2", rewardValue: 5.43, rewardRate: 4, rewardUnit: "pts" },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [userCards, setUserCards] = useState<UserCard[]>(() => {
    try {
      const saved = localStorage.getItem("savesage_cards");
      return saved ? JSON.parse(saved) : DEMO_CARDS;
    } catch {
      return DEMO_CARDS;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem("savesage_transactions");
      return saved ? JSON.parse(saved) : DEMO_TRANSACTIONS;
    } catch {
      return DEMO_TRANSACTIONS;
    }
  });

  useEffect(() => {
    localStorage.setItem("savesage_cards", JSON.stringify(userCards));
  }, [userCards]);

  useEffect(() => {
    localStorage.setItem("savesage_transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addUserCard = (card: UserCard) => setUserCards((prev) => [...prev, card]);
  const removeUserCard = (id: string) => setUserCards((prev) => prev.filter((c) => c.id !== id));
  const addTransaction = (tx: Transaction) => setTransactions((prev) => [tx, ...prev]);
  const removeTransaction = (id: string) => setTransactions((prev) => prev.filter((t) => t.id !== id));
  const getCardDetails = (cardId: string) => CARD_CATALOG.find((c) => c.id === cardId);

  const totalRewardsEarned = transactions.reduce((sum, t) => sum + t.rewardValue, 0);
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlyRewards = transactions
    .filter((t) => t.date.startsWith(thisMonth))
    .reduce((sum, t) => sum + t.rewardValue, 0);

  return (
    <AppContext.Provider value={{ userCards, transactions, addUserCard, removeUserCard, addTransaction, removeTransaction, getCardDetails, totalRewardsEarned, monthlyRewards }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
