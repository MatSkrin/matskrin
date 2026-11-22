import { PELAJARAN } from '@/content/pelajaran'

export type Judul = { id: string; teks: string; nomor?: string }

export type Bab = {
  slug: string
  nomor: number
  judul: string
  ringkasan: string
  /** Kartu pelajaran (subbab) untuk daftar isi dan hitungan progres. */
  kartu: Judul[]
}

// Baca atribut <LessonCard ...> langsung dari sumber MDX agar daftar isi tersedia tanpa merender bab.
const sumber = import.meta.glob('../content/pelajaran/*.mdx', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>

export function kartuDari(mdx: string): Judul[] {
  const out: Judul[] = []
  for (const m of mdx.matchAll(/<LessonCard\s([^>]*)>/g)) {
    const attr = (k: string) => m[1].match(new RegExp(`${k}=(?:"([^"]*)"|\\{"([^"]*)"\\})`))
    const id = attr('id')?.[1]
    const judul = attr('judul')
    if (id && judul) out.push({ id, teks: judul[1] ?? judul[2], nomor: attr('nomor')?.[1] })
  }
  return out
}

export const DAFTAR_BAB: Bab[] = Object.values(PELAJARAN)
  .map((p) => {
    const raw = Object.entries(sumber).find(([path]) => path.endsWith(`/${p.slug}.mdx`))?.[1] ?? ''
    return { slug: p.slug, ...p.meta, kartu: kartuDari(raw) }
  })
  .sort((a, b) => a.nomor - b.nomor)
