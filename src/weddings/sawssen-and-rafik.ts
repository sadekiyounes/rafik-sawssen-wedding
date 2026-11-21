import { assetUrl } from "@/utils/assetUrl";
import type { WeddingConfig } from "./types";

/** Demo invitation. Duplicate this file to create a new wedding, then register it in index.ts. */
export const sawssenAndRafik: WeddingConfig = {
  slug: "sawssen-and-rafik",
  locale: "en-GB",
  timeZone: "Africa/Algiers",

  bride: {
    name: "Sawssen",
    fullName: "Sawssen",
  },
  groom: {
    name: "Rafik",
    fullName: "Rafik",
  },
  monogram: "Sawssen & Rafik",

  envelope: {
    eyebrow: "You are invited",
    hint: "Tap the golden seal to open",
    autoOpenDelayMs: 3000,
  },

  hero: {
    eyebrow: "The Wedding of",
    image: {
      src: assetUrl("/images/v1.jpg"),
      alt: "A white marble mosque glowing at golden hour",
      width: 1024,
      height: 1536,
    },
  },

  dateTime: "2027-03-08T16:00:00+01:00",

  scratch: {
    title: "Save the Date",
    hint: "Scratch the gold to reveal our date",
  },

  nikah: {
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    verse: {
      arabic:
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
      translation:
        "And among His signs is that He created for you spouses from among yourselves, that you may find tranquillity in them, and He placed between you affection and mercy.",
      reference: "Surah Ar-Rum · 30:21",
    },
    invitationText:
      "With the blessings of Allah, together with their families, we joyfully request the honour of your presence at the Nikah and wedding celebration of",
    closingLine: "Your presence and duas will make our day complete.",
  },

  timeline: [
    {
      time: "16:00",
      title: "Nikah Ceremony",
      description: "The sacred union, in the presence of our families and the Imam.",
      icon: "nikah",
    },
    {
      time: "17:30",
      title: "Welcome & Mint Tea",
      description: "Dates, sweets and mint tea in the courtyard garden.",
      icon: "lantern",
    },
    {
      time: "19:00",
      title: "Walima Reception",
      description: "The couple's grand entrance beneath the arches.",
      icon: "reception",
    },
    {
      time: "20:30",
      title: "Wedding Dinner",
      description: "A celebratory feast shared with those we love.",
      icon: "dinner",
    },
    {
      time: "22:30",
      title: "Farewell",
      description: "Closing duas and a send-off filled with blessings.",
      icon: "flower",
    },
  ],

  venue: {
    name: "Dar El Yasmine Palace",
    addressLines: ["Route de Sidi Fredj", "Staouéli, Algiers", "Algeria"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sidi+Fredj+Staoueli+Algiers",
    mapQuery: "Sidi Fredj, Staouéli, Algiers",
    note: "Valet parking available at the main gate.",
  },

  gallery: [
    { src: assetUrl("/images/1.jpg"), alt: "Wedding photograph 1", width: 768, height: 960 },
    { src: assetUrl("/images/2.jpg"), alt: "Wedding photograph 2", width: 768, height: 960 },
    { src: assetUrl("/images/3.jpg"), alt: "Wedding photograph 3", width: 768, height: 960 },
    { src: assetUrl("/images/4.jpg"), alt: "Wedding photograph 4", width: 768, height: 960 },
    { src: assetUrl("/images/5.jpg"), alt: "Wedding photograph 5", width: 768, height: 960 },
  ],

  music: {
    src: assetUrl("/music/wedding.mp3"),
    title: "Nikah Ambience",
  },

  rsvp: {
    enabled: true,
    deadline: "15 May 2027",
    maxGuests: 6,
  },

  closing: {
    dua: {
      arabic:
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
      translation:
        "May Allah bless you both, shower His blessings upon you, and unite you in goodness.",
    },
    message: "We would be honoured to celebrate this blessed day with you.",
    signature: "With love, Sawssen & Rafik",
  },

  seo: {
    title: "Wedding Invitation | Sawssen & Rafik",
    description:
      "You are warmly invited to the Nikah and wedding celebration of Sawssen & Rafik on 8 March 2027 in Algiers.",
  },

  theme: {
    background: "#FBF3E9",
    gold: "#C6A15B",
    goldDeep: "#8C6A2E",
    ink: "#3B2E22",
  },
};
