import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ignore TypeScript errors during build
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore TypeScript and ESLint warnings
        if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
        if (warning.code === "CIRCULAR_DEPENDENCY") return;
        warn(warning);
      },
    },
  },
  esbuild: {
    // Ignore TypeScript errors
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
