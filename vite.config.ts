import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ["react", "react-router-dom"],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
