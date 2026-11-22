import { visit } from 'unist-util-visit'
import type { Root, Text, Parent } from 'mdast'
import { POLA_SITASI } from './sitasi'

/**
 * Ubah teks "[1]" / "[1,2]" / "[1–3]" di MDX menjadi <Cite r="..." />, sehingga penulis
 * konten cukup menulis sitasi angka biasa seperti di naskah.
 */
export default function remarkSitasi() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent: Parent | undefined) => {
      if (!parent || index === undefined || !POLA_SITASI.test(node.value)) return
      POLA_SITASI.lastIndex = 0
      const hasil: Parent['children'] = []
      let akhir = 0
      for (const m of node.value.matchAll(POLA_SITASI)) {
        if (m.index! > akhir) hasil.push({ type: 'text', value: node.value.slice(akhir, m.index) })
        hasil.push({
          type: 'mdxJsxTextElement',
          name: 'Cite',
          attributes: [{ type: 'mdxJsxAttribute', name: 'r', value: m[1] }],
          children: [],
        } as unknown as Text)
        akhir = m.index! + m[0].length
      }
      if (akhir < node.value.length) hasil.push({ type: 'text', value: node.value.slice(akhir) })
      parent.children.splice(index, 1, ...hasil)
      return index + hasil.length
    })
  }
}
