import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: false,

  vite: {
    base: "/",
  },

  tanstackStart: {
    server: {
      entry: "server",
    },

    router: {
      basepath: "/",
    },

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
          outputPath: "/invite/sawssen-and-rafik/index.html",
        },
      },
    ],
  },
});
