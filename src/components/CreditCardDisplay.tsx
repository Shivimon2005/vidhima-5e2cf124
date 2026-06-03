import { CreditCard as CreditCardType } from "../data/cards";
import { cn } from "../lib/utils";

interface Props {
  card: CreditCardType;
  lastFour?: string;
  nickname?: string;
  small?: boolean;
}

export default function CreditCardDisplay({ card, lastFour = "••••", nickname, small }: Props) {
  const networkLogo: Record<string, string> = {
    Visa: "VISA",
    Mastercard: "MC",
    Amex: "AMEX",
    Discover: "DISC",
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl text-white overflow-hidden shadow-xl select-none",
        `bg-gradient-to-br ${card.gradient}`,
        small ? "w-full aspect-[1.6/1] max-w-[240px]" : "w-full aspect-[1.586/1] max-w-[380px]"
      )}
    >
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full" />

      <div className={cn("relative flex flex-col justify-between h-full", small ? "p-4" : "p-6")}>
        <div className="flex items-start justify-between">
          <div>
            <p className={cn("font-medium opacity-70", small ? "text-xs" : "text-sm")}>{card.issuer}</p>
            <p className={cn("font-bold leading-tight", small ? "text-sm" : "text-lg")}>{nickname || card.name}</p>
          </div>
          <span className={cn("font-black tracking-wider opacity-80", small ? "text-xs" : "text-base")}>
            {networkLogo[card.network] || card.network}
          </span>
        </div>

        <div className={cn("font-mono tracking-widest opacity-90", small ? "text-sm" : "text-xl")}>
          •••• •••• •••• {lastFour}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className={cn("opacity-60 uppercase tracking-wide", small ? "text-[9px]" : "text-xs")}>
              Annual Fee
            </p>
            <p className={cn("font-semibold", small ? "text-xs" : "text-sm")}>
              {card.annualFee === 0 ? "No Fee" : `$${card.annualFee}/yr`}
            </p>
          </div>
          <div className="text-right">
            <p className={cn("opacity-60 uppercase tracking-wide", small ? "text-[9px]" : "text-xs")}>
              Base Reward
            </p>
            <p className={cn("font-semibold", small ? "text-xs" : "text-sm")}>
              {card.baseRate}{card.baseUnit === "%" ? "%" : "x"} {card.baseUnit !== "%" ? card.baseUnit : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
