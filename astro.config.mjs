import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: cloudflare({
    imageService: 'compile',
  }),
  env: {
    schema: {
      NOTION_SECRET: envField.string({ context: "server", access: "secret" }),
      NOTION_DB_ID: envField.string({ context: "server", access: "secret" }),
    },
  },
  vite: {
    resolve: {
      alias: {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
});