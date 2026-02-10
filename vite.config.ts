import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths()],
  // En production (GitHub Pages), utiliser /esspo/ comme base. En dev, utiliser /
  base: mode === "production" ? "/esspo/" : "/",
}));
