/**
 * One wedding invitation = one WeddingConfig. Every piece of text, every date, photo, song and
 * color shown on an invitation comes from here; design components never hardcode wedding data.
 */

export type TimelineIcon = "nikah" | "rings" | "reception" | "dinner" | "lantern" | "flower";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PersonDetails {
  /** Short name shown in calligraphy, e.g. "Amina". */
  name: string;
  /** Full name used in the formal Nikah wording. */
  fullName: string;
  /** e.g. "Daughter of Mr. & Mrs. Karim Benali". */
  parentsLine: string;
}

export interface WeddingTheme {
  /** Page / paper ivory. Any CSS color. */
  background: string;
  /** Champagne gold used for ornaments and borders. */
  gold: string;
  /** Darker gold used for readable gold text. */
  goldDeep: string;
  /** Body text color. */
  ink: string;
}

export interface WeddingConfig {
  /** Unique URL segment: /invite/<slug>. Lowercase letters, numbers and hyphens. */
  slug: string;
  /** BCP-47 locale used for dates, e.g. "en-GB". */
  locale: string;
  /** IANA time zone of the venue, e.g. "Africa/Algiers". */
  timeZone: string;

  bride: PersonDetails;
  groom: PersonDetails;
  /** Initials shown on the envelope card, e.g. "A & Y". */
  monogram: string;

  envelope: {
    /** Small line above the envelope, e.g. "You are invited". */
    eyebrow: string;
    /** Hint shown under the envelope. */
    hint: string;
    /** Delay before automatic opening once the guest chooses it. */
    autoOpenDelayMs: number;
  };

  hero: {
    eyebrow: string;
    image: ImageAsset;
  };

  /** Ceremony start, ISO 8601 with the venue offset, e.g. "2027-06-12T16:00:00+01:00". */
  dateTime: string;
  /** Optional Islamic calendar line, e.g. "7 Muharram 1449 AH". */
  hijriDate?: string;

  scratch: {
    title: string;
    hint: string;
  };

  nikah: {
    bismillah: string;
    verse: { arabic: string; translation: string; reference: string };
    invitationText: string;
    closingLine: string;
  };

  timeline: Array<{ time: string; title: string; description: string; icon: TimelineIcon }>;

  venue: {
    name: string;
    addressLines: string[];
    /** Link opened by the "Open in Google Maps" button. */
    mapsUrl: string;
    /** Search text or "lat,lng" for the embedded map. */
    mapQuery: string;
    note?: string;
  };

  gallery: ImageAsset[];

  music?: {
    src: string;
    title: string;
  };

  rsvp: {
    enabled: boolean;
    /** Shown as "Kindly reply by …". */
    deadline: string;
    maxGuests: number;
  };

  closing: {
    dua: { arabic: string; translation: string };
    message: string;
    signature: string;
  };

  seo: {
    title: string;
    description: string;
  };

  theme: WeddingTheme;
}
