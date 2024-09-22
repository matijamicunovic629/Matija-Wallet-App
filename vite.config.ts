import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Matija Wallet',
        short_name: 'MB Wallet',
        description: 'Wallet for Managing Matija Tokens :-)',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'MB-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'MB-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    react(),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      global: 'rollup-plugin-node-polyfills/polyfills/global',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
