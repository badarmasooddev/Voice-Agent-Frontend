import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Allow `@/` imports
    },
  },
  build: {
    minify: false, // Disable minification
  },
  server: {
    host: true,
    port: 3016, // Ensure it's the correct port
    allowedHosts:true
  }
});