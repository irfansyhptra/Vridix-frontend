// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Hapus baris import untuk tailwindcss dari '@tailwindcss/vite'
// import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Hapus plugin tailwindcss() dari array plugins
  plugins: [react()],
});
