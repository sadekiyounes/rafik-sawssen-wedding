import { GoldDivider } from "./ornaments";
import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <Reveal className="flex flex-col items-center text-center">
      <p className="font-display text-[0.65rem] font-feature-display text-gold-deep">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-serif text-4xl font-light italic text-foreground sm:text-5xl">
        {title}
      </h2>
      <GoldDivider className="mt-5" />
    </Reveal>
  );
}

export function SectionShell({
  children,
  labelledBy,
  className,
}: {
  children: React.ReactNode;
  labelledBy: string;
  className?: string;
}) {
  return (
    <section aria-labelledby={labelledBy} className={`relative px-5 py-20 sm:py-28 ${className ?? ""}`}>
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}
