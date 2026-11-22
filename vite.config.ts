import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import { fileURLToPath } from 'node:url'
import remarkSitasi from './src/lib/remark-sitasi'

const mdxPlugin = mdx({ include: /\.mdx$/, remarkPlugins: [remarkGfm, remarkSitasi], providerImportSource: '@mdx-js/react' })

// base relatif agar bisa di-deploy ke GitHub Pages (subpath /matskrin/) maupun Vercel/Netlify.
export default defineConfig({
  base: './',
  plugins: [
    {
      ...mdxPlugin,
      enforce: 'pre',
      // Impor "?raw" (dipakai untuk membaca daftar kartu) dibiarkan sebagai teks mentah.
      transform(code, id) {
        if (id.includes('?')) return null
        return (mdxPlugin.transform as (this: unknown, c: string, i: string) => unknown).call(this, code, id)
      },
    } as Plugin,
    react({ include: /\.(mdx|ts|tsx)$/ }),
    tailwindcss(),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
