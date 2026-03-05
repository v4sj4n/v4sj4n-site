import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: cloudflare(),
  vite: {
    resolve: {
      alias: {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
});