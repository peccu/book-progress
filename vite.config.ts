import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          gtagId: process.env.VITE_GTAG_ID
        }
      }
    }),
  ],
  // for glitch generated static site
  build: {
    outDir: "build"
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
