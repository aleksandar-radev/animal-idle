import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/animal-idle/",
  plugins: [react()],
  define: {
    'process.env': process.env
  }
})