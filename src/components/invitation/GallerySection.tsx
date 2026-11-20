import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { WeddingConfig } from "@/weddings/types";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { Reveal } from "./Reveal";
import { SectionHeading, SectionShell } from "./SectionHeading";

export function GallerySection({ wedding }: { wedding: WeddingConfig }) {
  const photos = wedding.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  if (photos.length === 0) return null;
  const current = index === null ? null : photos[index];

  return (
    <SectionShell labelledBy="gallery-title">
      <SectionHeading eyebrow="Moments" title="Our Gallery" id="gallery-title" />
      <div className="mt-12 columns-2 gap-3 sm:gap-4">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={(i % 2) * 120} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "group relative block w-full cursor-zoom-in overflow-hidden border border-gold/60 bg-paper p-1.5 shadow-paper",
                i === 0 ? "rounded-t-full" : "rounded-sm",
              )}
              aria-label={`View photo: ${p.alt}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                loading="lazy"
                decoding="async"
                className={cn(
                  "h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]",
                  i === 0 ? "rounded-t-full" : "rounded-[2px]",
                )}
              />
            </button>
          </Reveal>
        ))}
      </div>

      <Dialog open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="w-[94vw] max-w-3xl gap-0 border-gold/50 bg-paper p-2 sm:p-3">
          <DialogTitle className="sr-only">Photo gallery</DialogTitle>
          <DialogDescription className="sr-only">{current?.alt ?? ""}</DialogDescription>
          <div className="flex h-9 items-center pl-2 font-display text-[0.6rem] font-feature-display text-gold-deep">
            {index !== null && `${index + 1} / ${photos.length}`}
          </div>
          {current && (
            <div
              className="relative"
              onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
              onTouchEnd={(e) => {
                const start = touchX.current;
                const end = e.changedTouches[0]?.clientX;
                touchX.current = null;
                if (start === null || end === undefined) return;
                if (Math.abs(end - start) > 40) go(end < start ? 1 : -1);
              }}
            >
              <img
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className="mx-auto max-h-[72svh] w-auto animate-in fade-in-0 duration-500"
              />
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gold/60 bg-paper/85 text-gold-deep backdrop-blur"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gold/60 bg-paper/85 text-gold-deep backdrop-blur"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
}
