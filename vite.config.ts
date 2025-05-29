import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [preact(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@root": path.resolve(__dirname, "."),
      "nostr-commerce-schema": resolve(
        __dirname,
        "external/nostr-commerce-schema"
      ),
    },
  },
});
