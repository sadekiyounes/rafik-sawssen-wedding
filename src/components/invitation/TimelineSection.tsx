import type { WeddingConfig } from "@/weddings/types";
import { cn } from "@/lib/utils";

import { TimelineGlyph } from "./ornaments";
import { Reveal } from "./Reveal";
import { SectionHeading, SectionShell } from "./SectionHeading";

export function TimelineSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <SectionShell labelledBy="timeline-title">
      <SectionHeading eyebrow="The Celebration" title="Order of the Day" id="timeline-title" />
      <ol className="relative mx-auto mt-14 w-full max-w-2xl px-2">
        <span
          className="absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-gradient-to-b from-gold/0 via-gold to-gold/0"
          aria-hidden
        />
        {wedding.timeline.map((item, i) => {
          const right = i % 2 === 1;
          return (
            <li key={`${item.time}-${item.title}`} className="relative mb-10 last:mb-0">
              <Reveal
                delay={i * 90}
                className={cn(
                  "grid grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] sm:gap-6",
                )}
              >
                <div
                  className={cn(
                    "relative z-10 col-start-2 row-start-1 mx-auto flex size-14 items-center justify-center rounded-full border border-gold bg-paper text-gold-deep shadow-soft sm:size-16",
                  )}
                >
                  <span className="absolute inset-1 rounded-full border border-gold/30" aria-hidden />
                  <TimelineGlyph icon={item.icon} className="size-7 sm:size-8" />
                </div>
                <div
                  className={cn(
                    "row-start-1 min-w-0 pt-1",
                    right ? "col-start-3 text-left" : "col-start-1 text-right",
                  )}
                >
                  <p className="font-display text-xs font-feature-display text-gold-deep">{item.time}</p>
                  <h3 className="mt-1 font-serif text-2xl text-foreground">{item.title}</h3>
                  <p className="mt-1 font-serif text-lg leading-snug text-ink-soft">{item.description}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
