import { useCallback, useEffect, useRef, useState } from "react";

import type { WeddingConfig } from "@/weddings/types";
import { getDateParts } from "@/lib/wedding-time";
import { Button } from "@/components/ui/button";

import { EightPointStar } from "./ornaments";
import { Reveal } from "./Reveal";
import { SectionHeading, SectionShell } from "./SectionHeading";

const BRUSH = 26;
const REVEAL_AT = 0.5;

function resolveColor(el: HTMLElement, cssVar: string, fallback: string) {
  const probe = document.createElement("span");
  probe.style.color = `var(${cssVar})`;
  probe.style.display = "none";
  el.appendChild(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value || fallback;
}

export function ScratchDate({ wedding }: { wedding: WeddingConfig }) {
  const date = getDateParts(wedding.dateTime, wedding.locale, wedding.timeZone);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    const gold = resolveColor(wrap, "--gold", "#C6A15B");
    const deep = resolveColor(wrap, "--gold-deep", "#8C6A2E");
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, deep);
    g.addColorStop(0.35, gold);
    g.addColorStop(0.55, gold);
    g.addColorStop(1, deep);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    // soft sheen
    const sheen = ctx.createLinearGradient(0, 0, width, 0);
    sheen.addColorStop(0, "rgba(255,255,255,0)");
    sheen.addColorStop(0.5, "rgba(255,250,235,0.35)");
    sheen.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, width, height);

    // foil grain
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,248,225,0.18)" : "rgba(90,60,20,0.12)";
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.2, 1.2);
    }

    ctx.fillStyle = "rgba(255,250,238,0.95)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `500 ${Math.max(11, width * 0.035)}px Cinzel, serif`;
    const label = "SCRATCH TO REVEAL";
    ctx.fillText(label.split("").join(String.fromCharCode(8202)), width / 2, height / 2);
    ctx.strokeStyle = "rgba(255,250,238,0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width * 0.3, height / 2 + 18);
    ctx.lineTo(width * 0.7, height / 2 + 18);
    ctx.stroke();
  }, []);

  useEffect(() => {
    if (revealed) return;
    paint();
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === "undefined") return;
    let w = wrap.clientWidth;
    const ro = new ResizeObserver(() => {
      if (Math.abs(wrap.clientWidth - w) > 2) {
        w = wrap.clientWidth;
        paint();
      }
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [paint, revealed]);

  const pointFrom = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) {
      total++;
      if (data[i]! < 40) clear++;
    }
    if (total > 0 && clear / total > REVEAL_AT) setRevealed(true);
  };

  const scratch = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH * 2;
    ctx.beginPath();
    const from = last.current ?? { x, y };
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last.current = { x, y };
    moves.current++;
    if (moves.current % 10 === 0) checkProgress();
  };

  return (
    <SectionShell labelledBy="save-the-date-title">
      <div id="save-the-date" className="scroll-mt-10" />
      <SectionHeading eyebrow={wedding.scratch.title} title="Our Blessed Day" id="save-the-date-title" />

      <Reveal delay={150} className="mx-auto mt-10 w-full max-w-sm">
        <div
          ref={wrapRef}
          className="relative aspect-[4/5] overflow-hidden rounded-t-full border border-gold/70 bg-paper-grain shadow-paper"
        >
          <div className="absolute inset-2 rounded-t-full border border-gold/40" aria-hidden />
          <div className="flex h-full flex-col items-center justify-center px-6 pt-10 text-center" aria-live="polite">
            <p className="font-display text-[0.65rem] font-feature-display text-gold-deep">{date.weekday}</p>
            <p className="mt-2 font-serif text-[6.5rem] font-light leading-none nums-lining text-gold-foil">{date.day}</p>
            <p className="font-serif text-3xl italic text-foreground">
              {date.month} {date.year}
            </p>
            {wedding.hijriDate && (
              <p className="mt-3 font-serif text-base text-ink-soft">{wedding.hijriDate}</p>
            )}
            <div className="mt-4 flex items-center gap-2 text-gold">
              <EightPointStar className="size-3" />
              <p className="font-display text-[0.65rem] font-feature-display text-gold-deep">{date.time}</p>
              <EightPointStar className="size-3" />
            </div>
            {revealed && (
              <span className="sr-only">
                Revealed: {date.weekday}, {date.long} at {date.time}
              </span>
            )}
          </div>

          <canvas
            ref={canvasRef}
            className="scratch-canvas absolute inset-0 size-full cursor-grab"
            data-revealed={revealed ? "true" : "false"}
            aria-hidden
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              last.current = null;
              if (!started) {
                setStarted(true);
                if ("vibrate" in navigator) navigator.vibrate?.(8);
              }
              const p = pointFrom(e);
              scratch(p.x, p.y);
            }}
            onPointerMove={(e) => {
              if (e.buttons === 0 && e.pointerType === "mouse") return;
              if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
              const p = pointFrom(e);
              scratch(p.x, p.y);
            }}
            onPointerUp={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
              last.current = null;
              checkProgress();
            }}
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <p className="font-serif text-lg italic text-ink-soft">
            {revealed ? "We can't wait to celebrate with you." : wedding.scratch.hint}
          </p>
          {!revealed && (
            <Button variant="ivory" size="sm" onClick={() => setRevealed(true)}>
              Reveal the date
            </Button>
          )}
        </div>
      </Reveal>
    </SectionShell>
  );
}
