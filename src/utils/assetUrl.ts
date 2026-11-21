export const GITHUB_BASE = "/rafik-sawssen-wedding/";

export function assetUrl(path: string): string {
  return GITHUB_BASE + path.replace(/^\/+/, "");
}
