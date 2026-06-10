import { useEffect, useRef, useState } from "react";

function parseValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

export function useCountUp(value: string, duration = 1600) {
  const { num, suffix } = parseValue(value);
  const [display, setDisplay] = useState("0" + suffix);
  const ref = useRef<HTMLElement | null>(null);
  const animating = useRef(false);

  useEffect(() => {
    if (num === 0) {
      setDisplay("0" + suffix);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animating.current) {
          animating.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * num);
            setDisplay(current + suffix);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num, suffix, duration]);

  return { display, ref };
}
