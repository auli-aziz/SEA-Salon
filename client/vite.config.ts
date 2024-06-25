import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const target = 'http://localhost:3000';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/customer': {
        target: target,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/customer/, '/customer'),
      },
      '/login': {
        target: target,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/login/, '/login'),
      },
      '/signup': {
        target: target,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/signup/, '/signup'),
      },
      '/administrator': {
        target: target,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/administrator/, '/administrator'),
      },
    }
  }
})
