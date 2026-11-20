CREATE TABLE public.rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_slug TEXT NOT NULL CHECK (char_length(wedding_slug) BETWEEN 1 AND 80),
  guest_name TEXT NOT NULL CHECK (char_length(guest_name) BETWEEN 1 AND 120),
  attending BOOLEAN NOT NULL,
  guest_count INTEGER NOT NULL DEFAULT 1 CHECK (guest_count BETWEEN 0 AND 20),
  phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 40),
  message TEXT CHECK (message IS NULL OR char_length(message) <= 1000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.rsvps TO anon, authenticated;
GRANT ALL ON public.rsvps TO service_role;

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guests can send an RSVP"
ON public.rsvps
FOR INSERT
TO anon, authenticated
WITH CHECK (char_length(trim(guest_name)) > 0);

CREATE INDEX rsvps_wedding_slug_idx ON public.rsvps (wedding_slug, created_at DESC);