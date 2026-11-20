import { useMemo } from "react";

import { cn } from "@/lib/utils";

/** Lightweight drifting gold motes (pure CSS, no per-frame JS). */
export function Particles({ count = 18, className }: { count?: number; className?: string }) {
  const motes = useMemo(() => {
    // Deterministic pseudo-random so server and browser render the same markup.
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: count }, () => ({
      left: `${Math.round(rand() * 100)}%`,
      size: `${(2 + rand() * 4).toFixed(1)}px`,
      dur: `${(12 + rand() * 14).toFixed(1)}s`,
      delay: `${(-rand() * 20).toFixed(1)}s`,
      dx: `${Math.round(rand() * 80 - 40)}px`,
      o: (0.35 + rand() * 0.5).toFixed(2),
    }));
  }, [count]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {motes.map((m, i) => (
        <span
          key={i}
          className="particle"
          style={
            {
              left: m.left,
              "--size": m.size,
              "--dur": m.dur,
              "--delay": m.delay,
              "--dx": m.dx,
              "--o": m.o,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
