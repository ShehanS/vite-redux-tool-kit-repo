import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/token-service': {
        target: 'https://accounts.zoho.com', // Replace with your API server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/token-service/, ''),
      },
    },
  },
})
