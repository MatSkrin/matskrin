import { MWHO, type InfoKelasMWHO, type Rentang, type SkorRisiko } from '../data/risk'

/** Jumlahkan poin kriteria yang dipilih. Pembulatan 2 desimal mencegah galat floating point (0,75 + 1,5 ...). */
export function hitungSkor(skor: SkorRisiko, dipilih: ReadonlySet<string>): number {
  const total = skor.kriteria.reduce((acc, k) => (dipilih.has(k.id) ? acc + k.poin : acc), 0)
  return Math.round(total * 100) / 100
}

export function kategoriSkor(skor: SkorRisiko, nilai: number): Rentang {
  const r = skor.rentang.find((x) => nilai >= x.min && nilai <= x.max)
  if (!r) throw new Error(`Skor ${nilai} di luar rentang ${skor.nama}`)
  return r
}

/** Kelas mWHO pasien = kelas tertinggi dari semua kondisi yang dipilih. */
export function kelasMWHO(dipilih: ReadonlySet<string>): InfoKelasMWHO | null {
  let hasil: InfoKelasMWHO | null = null
  for (const k of MWHO) {
    if (k.kondisi.some((c) => dipilih.has(c.id))) hasil = k
  }
  return hasil
}
