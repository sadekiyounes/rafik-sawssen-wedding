import { z } from "zod";

export function rsvpSchema(maxGuests: number) {
  return z
    .object({
      guestName: z.string().trim().min(2, "Please enter your name").max(120, "Name is too long"),
      attending: z.boolean({ required_error: "Please let us know if you can attend" }),
      guestCount: z.number().int().min(0).max(maxGuests),
      phone: z
        .string()
        .trim()
        .max(40, "Phone number is too long")
        .optional()
        .transform((v) => (v ? v : undefined)),
      message: z
        .string()
        .trim()
        .max(1000, "Message is too long")
        .optional()
        .transform((v) => (v ? v : undefined)),
    })
    .refine((v) => (v.attending ? v.guestCount >= 1 : true), {
      message: "At least one guest must attend",
      path: ["guestCount"],
    });
}

export type RsvpInput = z.input<ReturnType<typeof rsvpSchema>>;
