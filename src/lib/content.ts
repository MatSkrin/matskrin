import { marked } from 'marked'

export type Bab = {
  slug: string
  nomor: number
  judul: string
  ringkasan: string
  html: string
}

/** Pisahkan frontmatter sederhana `key: value` di antara dua baris `---`. */
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { meta: {}, body: raw }
  const meta: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return { meta, body: m[2] }
}

const files = import.meta.glob('../content/bab/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>

/** Kotak "Poin Klinis": blockquote yang diawali **Poin Klinis** diberi kelas khusus. */
function render(md: string): string {
  return (marked.parse(md, { async: false }) as string).replace(
    /<blockquote>\s*<p><strong>(Poin Klinis[^<]*)<\/strong>/g,
    '<blockquote class="poin-klinis"><p><strong>$1</strong>',
  )
}

export const DAFTAR_BAB: Bab[] = Object.entries(files)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw)
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    return {
      slug,
      nomor: Number(meta.nomor ?? 0),
      judul: meta.judul ?? slug,
      ringkasan: meta.ringkasan ?? '',
      html: render(body),
    }
  })
  .sort((a, b) => a.nomor - b.nomor)
