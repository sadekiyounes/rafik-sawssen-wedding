import { assetUrl } from "@/utils/assetUrl";
import type { WeddingConfig } from "@/weddings/types";
import { getDateParts } from "@/lib/wedding-time";

import { ARCH_CLIP_ID, ArchClipDefs, ArchFrame, Lantern } from "./ornaments";
import { Particles } from "./Particles";

export function HeroSection({ wedding, opened }: { wedding: WeddingConfig; opened: boolean }) {
  const date = getDateParts(wedding.dateTime, wedding.locale, wedding.timeZone);

  return (
    <section
      className="relative min-h-svh overflow-hidden bg-paper-grain"
      data-opened={opened ? "true" : "false"}
      aria-label={`${wedding.bride.name} and ${wedding.groom.name}`}
    >
      <ArchClipDefs />
      <div className="absolute inset-0 bg-islamic-pattern opacity-40" aria-hidden />
      <Particles count={16} className="z-20" />

      {/* hanging lanterns flanking the arch */}
      <Lantern
        className="hero-in absolute left-[3%] top-0 z-30 sm:left-[14%]"
        style={{ "--chain": "18svh", "--d": "900ms", "--sway": "7s" } as React.CSSProperties}
      />
      <Lantern
        className="hero-in absolute right-[3%] top-0 z-30 sm:right-[14%]"
        style={{ "--chain": "26svh", "--d": "1100ms", "--sway": "6.2s", "--delay": "-2s" } as React.CSSProperties}
      />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-xl flex-col items-center px-5 pb-8 pt-[calc(env(safe-area-inset-top)+4.25rem)]">
        <p className="hero-in font-display text-[0.68rem] font-feature-display text-gold-deep" style={{ "--d": "200ms" } as React.CSSProperties}>
          {wedding.hero.eyebrow}
        </p>

        <div
          className="hero-in relative mt-5 aspect-[300/460] w-[min(80vw,400px,37svh)]"
          style={{ "--d": "350ms" } as React.CSSProperties}
        >
          <div className="absolute inset-0 shadow-soft" style={{ clipPath: `url(#${ARCH_CLIP_ID})` }}>
            <img
              src={wedding.hero.image.src}
              alt={wedding.hero.image.alt}
              width={wedding.hero.image.width}
              height={wedding.hero.image.height}
              fetchPriority="high"
              className="hero-image size-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[image:var(--gradient-veil)]" aria-hidden />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,color-mix(in_oklab,var(--gold-light)_35%,transparent),transparent_60%)]"
              aria-hidden
            />
          </div>
          <ArchFrame className="absolute -inset-[7px] size-[calc(100%+14px)]" />
          <Lantern
            className="absolute left-1/2 top-[9%] z-10 -translate-x-1/2"
            style={{ "--chain": "8%", "--lantern-w": "26px", "--sway": "5.4s" } as React.CSSProperties}
          />

          <img
            src={assetUrl("/images/f1.png")}
            alt=""
            aria-hidden
            width={1400}
            height={700}
            className="flower-sway pointer-events-none absolute -bottom-[13%] left-1/2 w-[150%] max-w-none -translate-x-1/2 mix-blend-multiply [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_72%)]"
          />
        </div>

        <h1 className="relative z-10 mt-14 flex flex-col items-center text-center">
          <span className="sr-only">
            The wedding of {wedding.bride.name} and {wedding.groom.name}
          </span>
          <span
            aria-hidden
            className="hero-in font-script font-normal text-[clamp(2.8rem,12vw,4.5rem)] leading-[1.05] text-gold-foil animate-foil"
            style={{ "--d": "800ms" } as React.CSSProperties}
          >
            {wedding.bride.name}
            <span className="mx-2 align-middle font-serif text-[0.45em] italic text-gold-deep">&</span>
            {wedding.groom.name}
          </span>
        </h1>

        <p
          className="hero-in mt-3 w-full whitespace-nowrap text-center font-display text-[0.58rem] font-feature-display text-ink-soft"
          style={{ "--d": "1100ms" } as React.CSSProperties}
        >
          YOU ARE INVITED TO A MARRIAGE CEREMONY
        </p>

        <a
          href="#save-the-date"
          className="hero-in mt-auto flex flex-col items-center gap-2 pt-6 text-gold-deep"
          style={{ "--d": "1500ms" } as React.CSSProperties}
        >
          <span className="font-display text-[0.58rem] font-feature-display">Scroll</span>
          <span className="relative h-8 w-px overflow-hidden bg-gold/30">
            <span className="scroll-cue absolute left-0 top-0 h-3 w-px bg-gold-deep" />
          </span>
        </a>
      </div>
    </section>
  );
}


