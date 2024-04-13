import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db(), preact()],
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    }
  },
  output: "server",
  adapter: vercel()
});