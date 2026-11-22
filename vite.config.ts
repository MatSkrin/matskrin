import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import { fileURLToPath } from 'node:url'
import remarkSitasi from './src/lib/remark-sitasi'

// base relatif agar bisa di-deploy ke GitHub Pages (subpath /matskrin/) maupun Vercel/Netlify.
export default defineConfig({
  base: './',
  plugins: [
    { enforce: 'pre', ...mdx({ include: /\.mdx$/, remarkPlugins: [remarkGfm, remarkSitasi], providerImportSource: '@mdx-js/react' }) },
    react({ include: /\.(mdx|ts|tsx)$/ }),
    tailwindcss(),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
