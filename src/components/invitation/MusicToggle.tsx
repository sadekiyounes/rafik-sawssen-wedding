export function MusicToggle({
  playing,
  onToggle,
  title,
}: {
  playing: boolean;
  onToggle: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? `Pause music: ${title}` : `Play music: ${title}`}
      className="fixed bottom-4 right-4 z-[60] flex size-12 cursor-pointer items-center justify-center rounded-full border border-gold/70 bg-paper/85 text-gold-deep shadow-soft backdrop-blur-md transition-transform active:scale-95 sm:bottom-6 sm:right-6"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <span className="absolute inset-1 rounded-full border border-gold/30" aria-hidden />
      {playing ? (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="eq-bar h-full w-[2px] rounded-full bg-gold-deep"
              style={{ "--delay": `${i * 0.18}s` } as React.CSSProperties}
            />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M9 18V6l10-2v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
        </svg>
      )}
      <span className="sr-only">{playing ? "Music on" : "Music off"}</span>
    </button>
  );
}
