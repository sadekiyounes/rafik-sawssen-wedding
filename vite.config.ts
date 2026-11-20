
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  nitro: false,
  plugins: [netlify()],
  tanstackStart: {
    server: { entry: "server" },
  },
});
