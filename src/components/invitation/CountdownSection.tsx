import { useEffect, useState } from "react";

import type { WeddingConfig } from "@/weddings/types";
import { getCountdown } from "@/lib/wedding-time";

import { Reveal } from "./Reveal";
import { SectionHeading, SectionShell } from "./SectionHeading";

export function CountdownSection({ wedding }: { wedding: WeddingConfig }) {
  // Start empty so the server render and first browser render match.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts = now === null ? null : getCountdown(wedding.dateTime, now);
  const units: Array<[string, number | undefined]> = [
    ["Days", parts?.days],
    ["Hours", parts?.hours],
    ["Minutes", parts?.minutes],
    ["Seconds", parts?.seconds],
  ];

  return (
    <SectionShell labelledBy="countdown-title" className="overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold-light)_30%,transparent),transparent_70%)]" aria-hidden />
      <SectionHeading eyebrow="Counting the Moments" title="Until We Say Qabul" id="countdown-title" />
      {parts?.isPast ? (
        <Reveal className="mt-10 text-center">
          <p className="font-script text-5xl text-gold-foil">Alhamdulillah</p>
          <p className="mt-3 font-serif text-xl italic text-ink-soft">The blessed day has arrived.</p>
        </Reveal>
      ) : (
        <Reveal delay={120} className="relative mx-auto mt-12 grid max-w-xl grid-cols-4 gap-2.5 sm:gap-4">
          {units.map(([label, value]) => (
            <div
              key={label}
              className="relative flex aspect-[3/4] flex-col items-center justify-center rounded-t-full border border-gold/70 bg-paper-grain shadow-paper"
            >
              <span className="absolute inset-1 rounded-t-full border border-gold/25" aria-hidden />
              <span className="font-serif text-4xl font-light nums-lining text-gold-foil sm:text-6xl">
                {value === undefined ? "—" : String(value).padStart(2, "0")}
              </span>
              <span className="mt-1 font-display text-[0.5rem] uppercase tracking-[0.16em] text-ink-soft sm:text-[0.6rem] sm:tracking-[0.28em]">
                {label}
              </span>
            </div>
          ))}
        </Reveal>
      )}
      <p className="sr-only" aria-live="off">
        {parts && !parts.isPast
          ? `${parts.days} days, ${parts.hours} hours and ${parts.minutes} minutes to go`
          : ""}
      </p>
    </SectionShell>
  );
}
