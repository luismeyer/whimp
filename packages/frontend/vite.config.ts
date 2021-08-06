import { defineConfig } from "vite";

import reactRefresh from "@vitejs/plugin-react-refresh";

const { STAGE } = process.env;

const stage = STAGE ?? "dev";

export default defineConfig({
  server: {
    port: 8080,
  },
  build: {
    assetsDir: "",
  },
  base: `/${stage}/`,
  envDir: "../../",
  plugins: [reactRefresh()],
});
