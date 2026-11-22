import type { ComponentType } from 'react'
import type { MDXProps } from 'mdx/types'

/** Pelajaran interaktif (MDX). Slug sama dengan file Markdown bab agar URL tidak berubah. */
export type Pelajaran = {
  slug: string
  meta: { nomor: number; judul: string; ringkasan: string }
  pustaka: string[]
  Konten: ComponentType<MDXProps>
}

type Modul = { default: ComponentType<MDXProps>; meta: Pelajaran['meta']; pustaka: string[] }
const files = import.meta.glob<Modul>('./*.mdx', { eager: true })

export const PELAJARAN: Record<string, Pelajaran> = Object.fromEntries(
  Object.entries(files).map(([path, m]) => {
    const slug = path.split('/').pop()!.replace(/\.mdx$/, '')
    return [slug, { slug, meta: m.meta, pustaka: m.pustaka, Konten: m.default }]
  }),
)
