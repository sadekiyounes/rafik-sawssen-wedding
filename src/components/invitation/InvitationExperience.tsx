
import { useCallback, useEffect, useState } from "react";

import type { WeddingConfig } from "@/weddings/types";

import { ClosingSection } from "./ClosingSection";
import { CountdownSection } from "./CountdownSection";
import { Envelope } from "./Envelope";
import { GallerySection } from "./GallerySection";
import { HeroSection } from "./HeroSection";
import { MusicToggle } from "./MusicToggle";
import { NikahSection } from "./NikahSection";
import { RsvpSection } from "./RsvpSection";
import { ScratchDate } from "./ScratchDate";
import { TimelineSection } from "./TimelineSection";
import { useBackgroundMusic } from "./useBackgroundMusic";
import { VenueSection } from "./VenueSection";

/** Maps a wedding's colors onto the design tokens for everything inside the invitation. */
function themeStyle(wedding: WeddingConfig): React.CSSProperties {
  return {
    "--background": wedding.theme.background,
    "--foreground": wedding.theme.ink,
    "--gold": wedding.theme.gold,
    "--gold-deep": wedding.theme.goldDeep,
    "--card-foreground": wedding.theme.ink,
    "--popover-foreground": wedding.theme.ink,
  } as React.CSSProperties;
}

export function InvitationExperience({ wedding }: { wedding: WeddingConfig }) {
  const [opened, setOpened] = useState(false);
  const [envelopeMounted, setEnvelopeMounted] = useState(true);

  const music = useBackgroundMusic(wedding.music?.src);

  // Lock page scroll while the envelope is on screen.
  useEffect(() => {
    const root = document.documentElement;

    if (envelopeMounted) {
      window.scrollTo(0, 0);
      root.classList.add("scroll-locked");
    } else {
      root.classList.remove("scroll-locked");
    }

    return () => root.classList.remove("scroll-locked");
  }, [envelopeMounted]);

  // Keep the page background in step with the wedding's ivory.
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = wedding.theme.background;

    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, [wedding.theme.background]);

  // Prepare the audio silently when the guest interacts with the envelope video.
  const onInteract = useCallback(() => {
    music.prepare();
  }, [music.prepare]);

  // Start the background music when the opening video finishes.
  const onEnvelopeFinished = useCallback(() => {
    music.start();
    setEnvelopeMounted(false);
  }, [music.start]);

  return (
    <div
      className="invitation-theme relative min-h-svh bg-background text-foreground"
      style={themeStyle(wedding)}
    >
      {music.available && wedding.music && (
        <MusicToggle
          playing={music.playing}
          onToggle={music.toggle}
          title={wedding.music.title}
        />
      )}

      {envelopeMounted && (
        <Envelope
          wedding={wedding}
          onInteract={onInteract}
          onOpened={() => setOpened(true)}
          onFinished={onEnvelopeFinished}
        />
      )}

      <main
        aria-hidden={envelopeMounted && !opened}
        inert={envelopeMounted && !opened ? true : undefined}
      >
        <HeroSection wedding={wedding} opened={opened} />
        <ScratchDate wedding={wedding} />
        <NikahSection wedding={wedding} />
        <TimelineSection wedding={wedding} />
        <CountdownSection wedding={wedding} />
        <VenueSection wedding={wedding} />
        <GallerySection wedding={wedding} />
        <RsvpSection wedding={wedding} />
      </main>

      <ClosingSection wedding={wedding} />
    </div>
  );
}
