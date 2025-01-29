import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend server
      '/api': {
        target: 'https://bonanza.tililtech.com', // Backend server URL
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS on the backend
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
  css: {
    postcss: {
      // plugins: [tailwindcss()],
    },
  },
})
// function tailwindcss(): import("postcss").AcceptedPlugin {
//   throw new Error('Function not implemented.')
// }