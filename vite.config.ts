import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages works with relative assets. If you prefer an absolute base,
// replace './' with '/your-repository-name/'.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
