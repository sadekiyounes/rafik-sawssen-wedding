export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

/** Time left until `targetIso`, measured from `nowMs`. Never negative. */
export function getCountdown(targetIso: string, nowMs: number): CountdownParts {
  const diff = new Date(targetIso).getTime() - nowMs;
  if (!Number.isFinite(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    isPast: false,
  };
}

/** Date parts formatted in the venue's time zone so server and browser agree. */
export function getDateParts(iso: string, locale: string, timeZone: string) {
  const d = new Date(iso);
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, { timeZone, ...o }).format(d);
  return {
    weekday: fmt({ weekday: "long" }),
    day: fmt({ day: "numeric" }),
    month: fmt({ month: "long" }),
    year: fmt({ year: "numeric" }),
    time: fmt({ hour: "2-digit", minute: "2-digit", hour12: false }),
    long: fmt({ day: "numeric", month: "long", year: "numeric" }),
    numeric: fmt({ day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, " · "),
  };
}

function icsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function icsEscape(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** A calendar file guests can add to their phone calendar. */
export function buildIcs(opts: {
  uid: string;
  title: string;
  startIso: string;
  durationHours: number;
  location: string;
  description: string;
}) {
  const start = new Date(opts.startIso);
  const end = new Date(start.getTime() + opts.durationHours * 3600 * 1000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NEXEIO//Wedding Invitations//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${opts.uid}@nexeio`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${icsEscape(opts.title)}`,
    `LOCATION:${icsEscape(opts.location)}`,
    `DESCRIPTION:${icsEscape(opts.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
