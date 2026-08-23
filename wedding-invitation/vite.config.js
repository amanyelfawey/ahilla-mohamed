import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves from /ahilla-mohamed/ — Vercel serves from /
const base = process.env.VERCEL ? "/" : "/ahilla-mohamed/";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  base,

  server: {
    open: base,
  },

  preview: {
    open: base,
  },
});
