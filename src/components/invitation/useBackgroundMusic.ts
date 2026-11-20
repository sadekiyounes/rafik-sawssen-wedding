
import { useCallback, useEffect, useRef, useState } from "react";

const TARGET_VOLUME = 0.55;

export function useBackgroundMusic(src: string | undefined) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const wantPlayRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  const ensureAudio = useCallback(() => {
    if (!src || typeof window === "undefined") return null;

    if (!audioRef.current) {
      const a = new Audio(src);
      a.loop = true;
      a.preload = "auto";
      a.volume = 0;
      a.addEventListener("play", () => setPlaying(true));
      a.addEventListener("pause", () => setPlaying(false));
      audioRef.current = a;
    }

    return audioRef.current;
  }, [src]);

  const fadeTo = useCallback((target: number, ms: number, done?: () => void) => {
    const a = audioRef.current;
    if (!a) return;

    if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);

    const from = a.volume;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      a.volume = from + (target - from) * t;

      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        fadeRef.current = null;
        done?.();
      }
    };

    fadeRef.current = requestAnimationFrame(step);
  }, []);

  // Unlock audio silently during the guest's interaction with the video.
  const prepare = useCallback(() => {
    const a = ensureAudio();
    if (!a) return;

    a.volume = 0;
    a.play().catch(() => setPlaying(false));
  }, [ensureAudio]);

  // Start the music audibly when the opening video finishes.
  const start = useCallback(() => {
    const a = ensureAudio();
    if (!a) return;

    wantPlayRef.current = true;

    if (a.paused) {
      a.volume = 0;
      a.play()
        .then(() => fadeTo(TARGET_VOLUME, 3000))
        .catch(() => setPlaying(false));
    } else {
      fadeTo(TARGET_VOLUME, 3000);
    }
  }, [ensureAudio, fadeTo]);

  const play = useCallback(() => {
    const a = ensureAudio();
    if (!a) return;

    wantPlayRef.current = true;

    a.play()
      .then(() => fadeTo(TARGET_VOLUME, 2200))
      .catch(() => setPlaying(false));
  }, [ensureAudio, fadeTo]);

  const pause = useCallback(() => {
    wantPlayRef.current = false;
    const a = audioRef.current;
    if (!a) return;

    fadeTo(0, 500, () => a.pause());
  }, [fadeTo]);

  const toggle = useCallback(() => {
    if (wantPlayRef.current && audioRef.current && !audioRef.current.paused) {
      pause();
    } else {
      play();
    }
  }, [pause, play]);

  useEffect(() => {
    const onVisibility = () => {
      const a = audioRef.current;
      if (!a) return;

      if (document.hidden) {
        a.pause();
      } else if (wantPlayRef.current) {
        a.play().catch(() => undefined);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);
      audioRef.current?.pause();
    };
  }, []);

  return {
    playing,
    play,
    pause,
    toggle,
    prepare,
    start,
    available: Boolean(src),
  };
}
