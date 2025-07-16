// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Get directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Hapus baris import untuk tailwindcss dari '@tailwindcss/vite'
// import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Hapus plugin tailwindcss() dari array plugins
  plugins: [react()],

  // Add path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Optimization to avoid loading unused modules like ethers
  optimizeDeps: {
    exclude: ["ethers"],
  },

  // Prevent loading of specific modules in production
  build: {
    rollupOptions: {
      external: ["ethers"],
    },
  },
});
