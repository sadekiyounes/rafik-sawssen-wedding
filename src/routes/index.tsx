import { createFileRoute, redirect } from "@tanstack/react-router";

import { DEMO_WEDDING_SLUG } from "@/weddings";

// Each wedding lives at its own /invite/<slug> URL; the root opens the demo invitation.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/invite/$slug", params: { slug: DEMO_WEDDING_SLUG }, replace: true });
  },
  head: () => ({
    meta: [
      { title: "NEXEIO Wedding Invitations" },
      { name: "description", content: "Luxury cinematic Islamic wedding invitations by NEXEIO." },
      { property: "og:title", content: "NEXEIO Wedding Invitations" },
      { property: "og:description", content: "Luxury cinematic Islamic wedding invitations by NEXEIO." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
