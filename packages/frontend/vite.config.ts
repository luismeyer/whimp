import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

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
  plugins: [vue()],
});
