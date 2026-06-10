import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedStatProps {
  value: string;
  label: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

const AnimatedStat = ({
  value,
  label,
  className = "",
  valueClassName = "block text-2xl md:text-3xl font-bold text-foreground font-serif leading-none mb-1",
  labelClassName = "text-xs text-muted-foreground font-medium uppercase tracking-wider leading-tight block",
}: AnimatedStatProps) => {
  const { display, ref } = useCountUp(value);

  return (
    <div className={className}>
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className={valueClassName}
      >
        {display}
      </span>
      <span className={labelClassName}>{label}</span>
    </div>
  );
};

export default AnimatedStat;
