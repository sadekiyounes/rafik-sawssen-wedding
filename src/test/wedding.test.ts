import { describe, expect, it } from "vitest";

import { getCountdown } from "@/lib/wedding-time";
import { rsvpSchema } from "@/lib/rsvp";
import { getWedding } from "@/weddings";

describe("wedding registry", () => {
  it("finds the demo invitation by its URL slug", () => {
    const wedding = getWedding("sawssen-and-rafik");
    expect(wedding?.bride.name).toBe("Sawssen");
    expect(wedding?.groom.name).toBe("Rafik");
  });
  it("returns nothing for an unknown slug", () => {
    expect(getWedding("no-such-wedding")).toBeUndefined();
  });
});

describe("countdown", () => {
  it("splits the remaining time into days, hours, minutes and seconds", () => {
    const now = new Date("2027-06-10T13:58:30+01:00").getTime();
    expect(getCountdown("2027-06-12T16:00:00+01:00", now)).toEqual({
      days: 2,
      hours: 2,
      minutes: 1,
      seconds: 30,
      isPast: false,
    });
  });
  it("stops at zero once the wedding has started", () => {
    const now = new Date("2027-06-12T16:00:01+01:00").getTime();
    expect(getCountdown("2027-06-12T16:00:00+01:00", now).isPast).toBe(true);
  });
});

describe("RSVP rules", () => {
  const schema = rsvpSchema(6);
  it("rejects more guests than the invitation allows", () => {
    expect(schema.safeParse({ guestName: "Sara", attending: true, guestCount: 7 }).success).toBe(
      false,
    );
  });
  it("requires at least one guest when attending", () => {
    expect(schema.safeParse({ guestName: "Sara", attending: true, guestCount: 0 }).success).toBe(
      false,
    );
  });
  it("accepts a decline with zero guests", () => {
    expect(schema.safeParse({ guestName: "Sara", attending: false, guestCount: 0 }).success).toBe(
      true,
    );
  });
});
