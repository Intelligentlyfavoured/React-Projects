import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend server
      '/api': {
        target: 'http://197.248.122.31:3000', // Backend server URL
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS on the backend
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  }
})
