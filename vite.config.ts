import { defineConfig } from 'vite'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    allowedHosts: ['8e48-180-248-17-184.ngrok-free.app'],
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['https://product-check.carabaopro.com/'],
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
