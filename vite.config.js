import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/foliobox/",
  plugins: [
    react(),
    tailwindcss({
      gold: "oklch(42.1% 0.095 57.708)", // now you can use bg-gold
    }),
  ],
});
