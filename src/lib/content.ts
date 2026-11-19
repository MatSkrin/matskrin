import { marked } from 'marked'

export type Judul = { id: string; teks: string; level: 2 | 3 }

export type Bab = {
  slug: string
  nomor: number
  judul: string
  ringkasan: string
  html: string
  toc: Judul[]
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

const stripTags = (s: string) => s.replace(/<[^>]+>/g, '')

export function slugify(s: string): string {
  return stripTags(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Ubah sitasi [1] / [1,3] / [1–3] di teks menjadi superskrip dengan popover rujukan. */
export function sisipkanSitasi(html: string, refs: Map<number, string>): string {
  return html.replace(/\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g, (asli, isi: string) => {
    const nomor: number[] = []
    for (const bagian of isi.split(',')) {
      const r = bagian.split(/[–-]/).map((x) => Number(x.trim()))
      if (r.length === 2) for (let n = r[0]; n <= r[1]; n++) nomor.push(n)
      else nomor.push(r[0])
    }
    if (!nomor.every((n) => refs.has(n))) return asli
    const item = nomor
      .map(
        (n) =>
          `<span class="cite-item"><b>${n}.</b> ${refs.get(n)}</span>`,
      )
      .join('')
    return `<span class="cite" tabindex="0" role="button" aria-label="Rujukan ${isi}"><sup>[${isi}]</sup><span class="cite-pop" role="tooltip">${item}</span></span>`
  })
}

/** Kotak "Poin Klinis": blockquote yang diawali **Poin Klinis** diberi kelas khusus. */
function poinKlinis(html: string): string {
  return html.replace(
    /<blockquote>\s*<p><strong>(Poin Klinis[^<]*)<\/strong>/g,
    '<blockquote class="poin-klinis"><p><strong>$1</strong>',
  )
}

export function renderBab(body: string): { html: string; toc: Judul[] } {
  // Pisahkan daftar pustaka agar bisa dipakai untuk popover sitasi.
  const [isi, pustaka = ''] = body.split(/^## Daftar Pustaka\s*$/m)
  const refs = new Map<number, string>()
  const pustakaHtml = marked.parse(pustaka, { async: false }) as string
  const li = [...pustakaHtml.matchAll(/<li>([\s\S]*?)<\/li>/g)]
  li.forEach((m, i) => refs.set(i + 1, m[1].replace(/<a /g, '<a target="_blank" rel="noopener" ')))

  let html = poinKlinis(marked.parse(isi, { async: false }) as string)

  const toc: Judul[] = []
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, lv: string, teks: string) => {
    let id = slugify(teks)
    while (toc.some((t) => t.id === id)) id += '-x'
    toc.push({ id, teks: stripTags(teks), level: Number(lv) as 2 | 3 })
    return `<h${lv} id="${id}">${teks}</h${lv}>`
  })
  html = sisipkanSitasi(html, refs)

  if (refs.size) {
    toc.push({ id: 'daftar-pustaka', teks: 'Daftar Pustaka', level: 2 })
    const daftar = [...refs.entries()].map(([n, r]) => `<li id="ref-${n}">${r}</li>`).join('')
    html += `<h2 id="daftar-pustaka">Daftar Pustaka</h2><ol class="pustaka">${daftar}</ol>`
  }
  return { html, toc }
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
      ...renderBab(body),
    }
  })
  .sort((a, b) => a.nomor - b.nomor)
