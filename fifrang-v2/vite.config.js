import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
        '/api/nexon-image': {
            target: 'https://fco.dn.nexoncdn.co.kr',
            // target: 'https://fo4.dn.nexoncdn.co.kr/',
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api\/nexon-image/, ''),
            onProxyRes: (proxyRes) => {
              proxyRes.headers['Cache-Control'] = 'no-cache';
            }
        },
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@", replacement: "/src" },
    ],
  },
});