/** Gabungan daftar pustaka seluruh bab: duplikat antarbab digabung, diurutkan menurut abjad. */
export type RujukanGabungan = { teks: string; bab: number[] }

/** Kunci duplikat: nama penulis pertama + awal judul (beda ejaan/tanda baca diabaikan). */
export function kunciRujukan(r: string): string {
  const penulis = (r.match(/^[^,.]+/)?.[0] ?? '').toLowerCase().replace(/[^a-z]/g, '')
  const judul = (r.split('. ')[1] ?? r).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 40)
  return `${penulis}|${judul}`
}

export function gabungPustaka(perBab: { nomor: number; pustaka: string[] }[]): RujukanGabungan[] {
  const peta = new Map<string, { varian: Map<string, number>; bab: Set<number> }>()
  for (const { nomor, pustaka } of perBab) {
    for (const r of pustaka) {
      const k = kunciRujukan(r)
      const e = peta.get(k) ?? { varian: new Map(), bab: new Set() }
      e.varian.set(r, (e.varian.get(r) ?? 0) + 1)
      e.bab.add(nomor)
      peta.set(k, e)
    }
  }
  // Varian yang paling sering dipakai; bila seri, yang paling lengkap.
  return [...peta.values()]
    .map(({ varian, bab }) => ({
      teks: [...varian.entries()].sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)[0][0],
      bab: [...bab].sort((a, b) => a - b),
    }))
    .sort((a, b) => a.teks.localeCompare(b.teks, 'id', { sensitivity: 'base' }))
}
