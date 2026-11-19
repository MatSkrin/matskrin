import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relatif agar bisa di-deploy ke GitHub Pages (subpath /matskrin/) maupun Vercel/Netlify.
export default defineConfig({
  base: './',
  plugins: [react()],
})
