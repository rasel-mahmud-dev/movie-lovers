import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src"),
      "components": path.resolve(__dirname, "./components"),
      "@app": path.resolve(__dirname, "./app")
    }
  }
})
