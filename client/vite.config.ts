import react from "@vitejs/plugin-react";
import { UserConfigExport, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3030",
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    include: ["src/tests/**/*.spec.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["src/tests/setupTests/setupTests.ts"],
  },
  optimizeDeps: {
    include: ["i18next", "react-i18next"],
  },
} as UserConfigExport);
