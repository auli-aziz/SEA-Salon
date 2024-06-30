import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const baseURL = 'https://sea-salon-api.vercel.app';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/customer': {
        target: baseURL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/customer/, '/customer'),
      },
      '/authentication': {
        target: baseURL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/authentication/, '/authentication'),
      },
      '/administrator': {
        target: baseURL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/administrator/, '/administrator'),
      },
    }
  }
})
