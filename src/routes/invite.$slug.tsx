import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { InvitationExperience } from "@/components/invitation/InvitationExperience";
import { getWedding } from "@/weddings";

export const Route = createFileRoute("/invite/$slug")({
  loader: ({ params }) => {
    const wedding = getWedding(params.slug);
    if (!wedding) throw notFound();
    return { wedding };
  },
  head: ({ loaderData }) => {
    const w = loaderData?.wedding;
    if (!w) {
      return { meta: [{ title: "Invitation unavailable" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: w.seo.title },
        { name: "description", content: w.seo.description },
        { property: "og:title", content: w.seo.title },
        { property: "og:description", content: w.seo.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: w.seo.title },
        { name: "twitter:description", content: w.seo.description },
      ],
      links: [{ rel: "preload", as: "image", href: w.hero.image.src, type: "image/webp" }],
    };
  },
  component: InvitePage,
  notFoundComponent: InviteNotFound,
});

function InvitePage() {
  const { wedding } = Route.useLoaderData();
  return <InvitationExperience wedding={wedding} />;
}

function InviteNotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-paper-grain px-6 text-center">
      <p className="font-display text-[0.65rem] font-feature-display text-gold-deep">NEXEIO</p>
      <h1 className="mt-4 font-serif text-4xl italic text-foreground">This invitation could not be found</h1>
      <p className="mt-3 max-w-sm font-serif text-lg text-ink-soft">
        Please check the link you received from the couple.
      </p>
      <Link to="/" className="mt-8 font-display text-[0.65rem] font-feature-display text-gold-deep underline underline-offset-4">
        View our sample invitation
      </Link>
    </div>
  );
}
