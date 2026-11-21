import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: "/rafik-sawssen-wedding/",
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: false,
      autoStaticPathsDiscovery: false,
      failOnError: true,
    },
    pages: [
      {
        path: "/invite/sawssen-and-rafik",
        prerender: {
          enabled: true,
          outputPath: "/invite/amina-and-yusuf/index.html",
        },
      },
    ],
  },
});
