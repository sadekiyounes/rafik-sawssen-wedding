import { assetUrl } from "@/utils/assetUrl";

import { useEffect, useRef, useState } from "react";
import type { WeddingConfig } from "@/weddings/types";

type Props = {
  wedding: WeddingConfig;
  onInteract: () => void;
  onOpened: () => void;
  onFinished: () => void;
};

type Phase = "opening" | "revealing";

export function Envelope({
  wedding,
  onInteract,
  onOpened,
  onFinished,
}: Props) {
  const [phase, setPhase] = useState<Phase>("opening");
  const finishedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const beginReveal = () => {
    if (finishedRef.current) return;

    finishedRef.current = true;
    setPhase("revealing");
    onOpened();

    timerRef.current = window.setTimeout(() => {
      onFinished();
    }, 1700);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#f8f2e9]"
      aria-label={`${wedding.bride.name} & ${wedding.groom.name} wedding invitation`}
    >
      <video
        src={assetUrl("/videos/Envelope_opening_with_golden_light_202607270136_(2)_3609a468.mp4")}
        autoPlay
        muted
        playsInline
        preload="auto"
        onClick={onInteract}
        onTouchStart={onInteract}
        onEnded={beginReveal}
        onError={beginReveal}
        className={`h-full w-full object-contain transition-opacity duration-[1600ms] ease-in-out ${
          phase === "revealing" ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

