import { CalendarPlus, MapPin } from "lucide-react";

import type { WeddingConfig } from "@/weddings/types";
import { buildIcs, getDateParts } from "@/lib/wedding-time";
import { Button } from "@/components/ui/button";

import { CornerFiligree } from "./ornaments";
import { Reveal } from "./Reveal";
import { SectionHeading, SectionShell } from "./SectionHeading";

export function VenueSection({ wedding }: { wedding: WeddingConfig }) {
  const { venue } = wedding;
  const date = getDateParts(wedding.dateTime, wedding.locale, wedding.timeZone);
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&z=14&output=embed`;

  const addToCalendar = () => {
    const ics = buildIcs({
      uid: wedding.slug,
      title: `Wedding of ${wedding.bride.name} & ${wedding.groom.name}`,
      startIso: wedding.dateTime,
      durationHours: 7,
      location: [venue.name, ...venue.addressLines].join(", "),
      description: `${wedding.nikah.invitationText} ${wedding.bride.name} & ${wedding.groom.name}.`,
    });
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${wedding.slug}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  return (
    <SectionShell labelledBy="venue-title">
      <SectionHeading eyebrow="Where" title="The Venue" id="venue-title" />
      <Reveal delay={120} className="mx-auto mt-12 max-w-lg">
        <div className="relative border border-gold/70 bg-paper-grain p-2 shadow-paper">
          <div className="pointer-events-none absolute inset-1 border border-gold/25" aria-hidden />
          <div className="relative aspect-[4/3] overflow-hidden border border-gold/40 bg-muted">
            <iframe
              title={`Map showing ${venue.name}`}
              src={embedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 grayscale-[35%] sepia-[25%]"
            />
          </div>
          <div className="relative px-5 pb-8 pt-7 text-center">
            <CornerFiligree corner="bl" />
            <CornerFiligree corner="br" />
            <MapPin className="mx-auto size-5 text-gold-deep" aria-hidden />
            <h3 className="mt-3 font-serif text-3xl text-foreground">{venue.name}</h3>
            <address className="mt-2 font-serif text-lg not-italic leading-snug text-ink-soft">
              {venue.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="mt-4 font-display text-[0.62rem] font-feature-display text-gold-deep">
              {date.weekday} · {date.long} · {date.time}
            </p>
            {venue.note && <p className="mt-3 font-serif text-base italic text-ink-soft">{venue.note}</p>}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="gold" size="xl">
                <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin aria-hidden /> Open in Google Maps
                </a>
              </Button>
              <Button variant="ivory" size="xl" onClick={addToCalendar}>
                <CalendarPlus aria-hidden /> Add to calendar
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
