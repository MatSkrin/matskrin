/** Pola sitasi Vancouver angka: [1], [1,3], [1–3]. Dipakai remark plugin dan teks kuis. */
export const POLA_SITASI = /\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g

/** "1,3–5" → [1,3,4,5] */
export function uraiNomor(isi: string): number[] {
  const nomor: number[] = []
  for (const bagian of isi.split(',')) {
    const r = bagian.split(/[–-]/).map((x) => Number(x.trim()))
    if (r.length === 2) for (let n = r[0]; n <= r[1]; n++) nomor.push(n)
    else nomor.push(r[0])
  }
  return nomor
}
