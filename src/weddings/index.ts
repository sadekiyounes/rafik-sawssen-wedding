import type { WeddingConfig } from "./types";
import { aminaAndYusuf } from "./amina-and-yusuf";

export type { WeddingConfig } from "./types";

/**
 * Registry of every published invitation, keyed by URL slug.
 * Add a new wedding by creating a config file next to this one and listing it here.
 */
const registry: WeddingConfig[] = [aminaAndYusuf];

const bySlug = new Map(registry.map((w) => [w.slug, w]));

export const DEMO_WEDDING_SLUG = aminaAndYusuf.slug;

export function getWedding(slug: string): WeddingConfig | undefined {
  return bySlug.get(slug.toLowerCase());
}

export function listWeddingSlugs(): string[] {
  return registry.map((w) => w.slug);
}
