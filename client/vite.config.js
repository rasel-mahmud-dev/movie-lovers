import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./app")
    }
  }
})
