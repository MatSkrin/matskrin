import { visit, SKIP } from 'unist-util-visit'
import type { Root, Text, Parent } from 'mdast'

/** "Bab 15", "Tabel 4.2", "Gambar 6.1" (juga "Bab 4 dan 14" tidak dipecah; cukup kemunculan pertama per frasa). */
export const POLA_RUJUKAN = /\b(Bab|Tabel|Gambar)\s(\d{1,2}(?:\.\d{1,2})?)\b/g

/**
 * Ubah rujukan silang di teks MDX menjadi <Rujuk jenis=".." nomor=".." /> agar pembaca bisa langsung
 * melompat ke bab, tabel, atau gambar yang dimaksud. Judul (heading) dan keterangan gambar tidak diubah.
 */
export default function remarkRujukan() {
  return (tree: Root) => {
    visit(tree, (node, index, parent: Parent | undefined) => {
      if (node.type === 'heading' || node.type === 'link') return SKIP
      // Jangan ubah nomor di keterangan gambar sendiri (<figcaption><strong>Gambar x.y.</strong>).
      if ((node as { name?: string }).name === 'figcaption') return SKIP
      if (node.type !== 'text' || !parent || index === undefined) return
      const t = node as Text
      POLA_RUJUKAN.lastIndex = 0
      if (!POLA_RUJUKAN.test(t.value)) return
      POLA_RUJUKAN.lastIndex = 0
      const hasil: Parent['children'] = []
      let akhir = 0
      for (const m of t.value.matchAll(POLA_RUJUKAN)) {
        const [jenis, nomor] = [m[1], m[2]]
        // Bab harus berupa angka bulat; Tabel/Gambar harus "x.y".
        if ((jenis === 'Bab') === nomor.includes('.')) continue
        if (m.index! > akhir) hasil.push({ type: 'text', value: t.value.slice(akhir, m.index) })
        hasil.push({
          type: 'mdxJsxTextElement',
          name: 'Rujuk',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'jenis', value: jenis },
            { type: 'mdxJsxAttribute', name: 'nomor', value: nomor },
          ],
          children: [{ type: 'text', value: m[0] }],
        } as unknown as Text)
        akhir = m.index! + m[0].length
      }
      if (!hasil.length) return
      if (akhir < t.value.length) hasil.push({ type: 'text', value: t.value.slice(akhir) })
      parent.children.splice(index, 1, ...hasil)
      return [SKIP, index + hasil.length]
    })
  }
}
