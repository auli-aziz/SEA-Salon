import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const baseURL = 'https://sea-salon-api.vercel.app';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/customer': {
        target: baseURL,
        changeOrigin: true,
        secure: true,
      },
      '/authentication': {
        target: baseURL,
        changeOrigin: true,
        secure: true,
      },
      '/administrator': {
        target: baseURL,
        changeOrigin: true,
        secure: true,
      },
    }
  }
});
