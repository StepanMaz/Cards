import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import http from 'http'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      "/socket.io": {
        target: 'ws://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
        agent: new http.Agent()
      },
    },
  },
})
