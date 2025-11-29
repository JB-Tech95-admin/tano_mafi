import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  optimizeDeps: {
    include: ['leaflet', 'leaflet-routing-machine']
  },
  build: {
    commonjsOptions: {
      include: [/leaflet/, /leaflet-routing-machine/, /node_modules/]
    }
  }
})
