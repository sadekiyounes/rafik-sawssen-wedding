import type { WeddingConfig } from "@/weddings/types";

import { CornerFiligree, EightPointStar, GoldDivider } from "./ornaments";
import { Reveal } from "./Reveal";

export function NikahSection({ wedding }: { wedding: WeddingConfig }) {
  const { nikah, bride, groom } = wedding;
  return (
    <section aria-labelledby="nikah-title" className="relative px-5 py-20 sm:py-28">
      <div className="absolute inset-0 bg-islamic-pattern opacity-30" aria-hidden />
      <Reveal className="relative mx-auto max-w-2xl">
        <div className="relative border border-gold/60 bg-paper-grain px-6 py-14 text-center shadow-paper sm:px-14">
          <div className="pointer-events-none absolute inset-2 border border-gold/30" aria-hidden />
          <CornerFiligree corner="tl" />
          <CornerFiligree corner="tr" />
          <CornerFiligree corner="bl" />
          <CornerFiligree corner="br" />

          <p dir="rtl" lang="ar" className="font-arabic text-3xl leading-relaxed text-gold-deep sm:text-4xl">
            {nikah.bismillah}
          </p>
          <GoldDivider className="mt-5" />

          <p dir="rtl" lang="ar" className="mt-8 font-arabic text-xl leading-loose text-foreground sm:text-2xl">
            {nikah.verse.arabic}
          </p>
          <p className="mt-4 font-serif text-lg italic leading-relaxed text-ink-soft">“{nikah.verse.translation}”</p>
          <p className="mt-2 font-display text-[0.6rem] font-feature-display text-gold-deep">{nikah.verse.reference}</p>

          <h2 id="nikah-title" className="sr-only">
            Nikah invitation
          </h2>
          <p className="mx-auto mt-10 max-w-md font-serif text-xl leading-relaxed text-foreground">
            {nikah.invitationText}
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6">
            <div>
              <p className="font-script text-5xl leading-tight text-gold-foil animate-foil">{bride.name}</p>
              <p className="mt-1 font-display text-[0.62rem] font-feature-display text-foreground">{bride.fullName}</p>
              <p className="mt-2 font-serif text-base italic text-ink-soft">{bride.parentsLine}</p>
            </div>
            <div className="flex items-center justify-center gap-3 text-gold">
              <span className="h-px w-10 bg-gold/60 sm:hidden" />
              <EightPointStar className="size-6" />
              <span className="h-px w-10 bg-gold/60 sm:hidden" />
            </div>
            <div>
              <p className="font-script text-5xl leading-tight text-gold-foil animate-foil">{groom.name}</p>
              <p className="mt-1 font-display text-[0.62rem] font-feature-display text-foreground">{groom.fullName}</p>
              <p className="mt-2 font-serif text-base italic text-ink-soft">{groom.parentsLine}</p>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-sm font-serif text-lg italic text-ink-soft">{nikah.closingLine}</p>
        </div>
      </Reveal>
    </section>
  );
}
