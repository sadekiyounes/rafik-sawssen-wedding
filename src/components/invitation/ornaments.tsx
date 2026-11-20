import type { SVGProps } from "react";

import type { TimelineIcon } from "@/weddings/types";
import { cn } from "@/lib/utils";

/** Pointed Islamic arch in 0..1 box units, shared by clip paths and frames. */
export const ARCH_CLIP_ID = "nexeio-arch-clip";

export function ArchClipDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <clipPath id={ARCH_CLIP_ID} clipPathUnits="objectBoundingBox">
          <path d="M0,1 L0,0.4 C0,0.18 0.3,0.1 0.5,0 C0.7,0.1 1,0.18 1,0.4 L1,1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Gold double-line frame matching the arch clip, drawn in a 300×460 box. */
export function ArchFrame({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 460" preserveAspectRatio="none" className={cn("pointer-events-none", className)} aria-hidden>
      <defs>
        <linearGradient id="arch-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--gold-deep)" />
          <stop offset="0.45" stopColor="var(--gold-light)" />
          <stop offset="1" stopColor="var(--gold)" />
        </linearGradient>
      </defs>
      <path
        d="M1.5,460 L1.5,184 C1.5,83 90,46 150,1.5 C210,46 298.5,83 298.5,184 L298.5,460"
        fill="none"
        stroke="url(#arch-gold)"
        strokeWidth="3"
      />
      <path
        d="M10,460 L10,188 C10,92 95,56 150,12 C205,56 290,92 290,188 L290,460"
        fill="none"
        stroke="url(#arch-gold)"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* keystone ornament */}
      <g transform="translate(150 22)" fill="url(#arch-gold)">
        <path d="M0,-9 L2.6,-2.6 L9,0 L2.6,2.6 L0,9 L-2.6,2.6 L-9,0 L-2.6,-2.6 Z" />
      </g>
      {/* capitals */}
      {[10, 290].map((x) => (
        <g key={x} transform={`translate(${x} 188)`} fill="none" stroke="url(#arch-gold)" strokeWidth="1">
          <circle r="4" />
          <path d="M-8,10 H8" />
        </g>
      ))}
    </svg>
  );
}

export function EightPointStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-12 -12 24 24" aria-hidden {...props}>
      <path
        d="M0,-11 L3.2,-4.6 L7.8,-7.8 L4.6,-3.2 L11,0 L4.6,3.2 L7.8,7.8 L3.2,4.6 L0,11 L-3.2,4.6 L-7.8,7.8 L-4.6,3.2 L-11,0 L-4.6,-3.2 L-7.8,-7.8 L-3.2,-4.6 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-gold", className)} aria-hidden>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold sm:w-24" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <EightPointStar className="size-5 text-gold" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold sm:w-24" />
    </div>
  );
}

/** Filigree corner for gold-bordered cards. Rotate with the `corner` prop. */
export function CornerFiligree({
  corner,
  className,
}: {
  corner: "tl" | "tr" | "bl" | "br";
  className?: string;
}) {
  const rotate = { tl: 0, tr: 90, br: 180, bl: 270 }[corner];
  const pos = {
    tl: "left-2 top-2",
    tr: "right-2 top-2",
    br: "right-2 bottom-2",
    bl: "left-2 bottom-2",
  }[corner];
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("pointer-events-none absolute size-8 text-gold", pos, className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M2,38 V8 Q2,2 8,2 H38" />
        <path d="M7,38 V12 Q7,7 12,7 H38" opacity="0.6" />
        <path d="M12,12 q6,0 8,6 q-6,0 -8,-6z" fill="currentColor" opacity="0.7" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Embossed floral vine drawn in currentColor; pair with the `emboss` class. */
export function FloralEmboss({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={cn("emboss pointer-events-none", className)} aria-hidden>
      <g fill="currentColor">
        <path d="M0,110 C30,90 50,100 70,80 C85,65 80,45 100,40 C120,35 125,60 140,62 C160,64 170,40 200,30 L200,34 C172,44 162,70 140,67 C122,65 118,42 101,45 C84,48 90,70 73,85 C52,104 32,94 2,114 Z" />
        {[
          [70, 80, 9],
          [100, 40, 7],
          [140, 62, 8],
          [30, 98, 6],
          [178, 40, 6],
        ].map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            {Array.from({ length: 6 }).map((_, k) => (
              <ellipse key={k} rx={r! * 0.45} ry={r!} transform={`rotate(${k * 60}) translate(0 ${-r! * 0.8})`} />
            ))}
          </g>
        ))}
        {[
          [55, 92, 30],
          [88, 58, -30],
          [120, 46, 40],
          [158, 56, -20],
        ].map(([x, y, a], i) => (
          <ellipse key={`l${i}`} cx={x} cy={y} rx="7" ry="3" transform={`rotate(${a} ${x} ${y})`} />
        ))}
      </g>
    </svg>
  );
}

export function Lantern({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn("lantern pointer-events-none relative flex flex-col items-center", className)} style={style} aria-hidden>
      <span className="h-[var(--chain,60px)] w-px bg-gradient-to-b from-gold/0 via-gold to-gold" />
      <div className="relative">
        <span className="lantern-glow absolute left-1/2 top-[55%] size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--gold-light)_0%,transparent_65%)] opacity-80" />
        <svg viewBox="0 0 40 80" className="relative w-full" style={{ width: "var(--lantern-w, 34px)" }}>
          <defs>
            <linearGradient id="lantern-metal" x1="0" x2="1">
              <stop offset="0" stopColor="var(--gold-deep)" />
              <stop offset="0.5" stopColor="var(--gold-light)" />
              <stop offset="1" stopColor="var(--gold-deep)" />
            </linearGradient>
            <radialGradient id="lantern-flame" cx="0.5" cy="0.55" r="0.6">
              <stop offset="0" stopColor="oklch(0.99 0.05 95)" />
              <stop offset="0.5" stopColor="var(--gold-light)" />
              <stop offset="1" stopColor="var(--gold)" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="3" r="2.5" fill="none" stroke="url(#lantern-metal)" strokeWidth="1.2" />
          <path d="M20,6 L10,18 H30 Z" fill="url(#lantern-metal)" />
          <path d="M8,18 H32 L34,22 H6 Z" fill="url(#lantern-metal)" />
          <path d="M9,22 H31 L33,52 L20,62 L7,52 Z" fill="url(#lantern-flame)" />
          <g stroke="url(#lantern-metal)" strokeWidth="1.1" fill="none">
            <path d="M9,22 H31 L33,52 L20,62 L7,52 Z" />
            <path d="M20,22 V62 M14,22 L13.5,56 M26,22 L26.5,56" opacity="0.8" />
            <path d="M8,36 Q20,30 32,36" opacity="0.8" />
          </g>
          <path d="M16,62 H24 L20,74 Z" fill="url(#lantern-metal)" />
          <circle cx="20" cy="76.5" r="2" fill="url(#lantern-metal)" />
        </svg>
      </div>
    </div>
  );
}

const iconPaths: Record<TimelineIcon, React.ReactNode> = {
  nikah: (
    <>
      <path d="M19 5a11 11 0 1 0 8 19 9 9 0 1 1-8-19z" />
      <path d="M23.5 9.5l.9 2.1 2.2.2-1.7 1.4.6 2.2-2-1.2-1.9 1.2.5-2.2-1.7-1.4 2.3-.2z" />
    </>
  ),
  rings: (
    <>
      <circle cx="12" cy="19" r="7" />
      <circle cx="20" cy="19" r="7" />
      <path d="M16 6l2 2.5-2 2.5-2-2.5z" />
    </>
  ),
  reception: (
    <>
      <path d="M6 27V17a10 10 0 0 1 20 0v10" />
      <path d="M16 4v3M14.5 5.5h3" />
      <path d="M11 27v-6a5 5 0 0 1 10 0v6" />
      <path d="M3 27h26" />
    </>
  ),
  dinner: (
    <>
      <path d="M5 22a11 11 0 0 1 22 0z" />
      <path d="M3 25h26" />
      <circle cx="16" cy="9" r="1.6" />
      <path d="M10 18a7 7 0 0 1 4-4" opacity="0.6" />
    </>
  ),
  lantern: (
    <>
      <path d="M16 2v4" />
      <path d="M12 9l4-3 4 3" />
      <path d="M10 9h12l1 13-7 5-7-5z" />
      <path d="M16 9v18" opacity="0.6" />
      <path d="M14 30h4" />
    </>
  ),
  flower: (
    <>
      {Array.from({ length: 8 }).map((_, k) => (
        <ellipse key={k} cx="16" cy="9" rx="2.6" ry="5.5" transform={`rotate(${k * 45} 16 16)`} />
      ))}
      <circle cx="16" cy="16" r="2.4" />
    </>
  ),
};

export function TimelineGlyph({ icon, className }: { icon: TimelineIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {iconPaths[icon]}
    </svg>
  );
}
