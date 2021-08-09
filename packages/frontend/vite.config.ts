import { defineConfig } from 'vite';

import reactRefresh from '@vitejs/plugin-react-refresh';

import EnvVariables from '../../.env.json';

const { API_URL: API_URL_FROM_FILE } = EnvVariables;
const { API_URL: API_URL_FROM_ENV } = process.env;

export default defineConfig({
  server: {
    port: 8080,
  },
  build: {
    assetsDir: "",
  },
  define: {
    ENVIRONMENT: {
      apiUrl: API_URL_FROM_ENV ?? API_URL_FROM_FILE,
    },
  },
  plugins: [reactRefresh()],
});
