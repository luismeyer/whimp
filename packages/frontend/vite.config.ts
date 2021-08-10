import { defineConfig } from "vite";

import reactRefresh from "@vitejs/plugin-react-refresh";

const { STAGE } = process.env;

export default defineConfig({
  server: {
    port: 8080,
  },
  build: {
    assetsDir: "",
  },
  define: {
    ENVIRONMENT: {
      stage: STAGE ?? "dev",
    },
  },
  plugins: [reactRefresh()],
});
