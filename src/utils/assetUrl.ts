export const SITE_BASE = "/";

export function assetUrl(path: string): string {
  return SITE_BASE + path.replace(/^\/+/, "");
}
