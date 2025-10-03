import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': __dirname,
      'src': `${__dirname}/src`,
    },
  },
  server: {
    open: true,
    port: Number(process.env.VITE_PORT),
    proxy: {
      [process.env.VITE_API_ALIAS!]: {
        target: process.env.VITE_BASE_API_URL,
        changeOrigin: true,
      },
    }
  },
})
