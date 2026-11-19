import {
  EKG,
  FAKTOR_RISIKO,
  FISIK,
  GEJALA,
  RIWAYAT,
  VITAL_TAMBAHAN,
  nilaiVital,
  type Kategori,
  type Temuan,
  type Tingkat,
  type Vital,
} from '../data/panduan'

export type Triase = 'merah' | 'kuning' | 'hijau'

export type Alasan = { kategori: Kategori; teks: string; tingkat: Tingkat }

export type HasilTriase = { triase: Triase; alasan: Alasan[]; jumlahKuning: number }

const KELOMPOK: [Kategori, Temuan[]][] = [
  ['riwayat', RIWAYAT],
  ['faktor', FAKTOR_RISIKO],
  ['gejala', GEJALA],
  ['vital', VITAL_TAMBAHAN],
  ['fisik', FISIK],
  ['ekg', EKG],
]

/**
 * Triase rujukan (adaptasi red flags ACOG 2023 dan CMQCC 2017):
 * - MERAH: satu saja temuan merah → stabilisasi dan rujuk hari ini.
 * - KUNING: ≥1 gejala + ≥1 vital kuning + ≥1 faktor risiko, ATAU ≥4 temuan kuning,
 *   ATAU bising patologis/EKG abnormal pada ibu stabil, ATAU riwayat penyakit jantung.
 * - HIJAU: selain itu → lanjut ANC, edukasi tanda bahaya, nilai ulang tiap kunjungan.
 */
export function hitungTriase(dipilih: ReadonlySet<string>, vital: Vital): HasilTriase {
  const adaGejala = GEJALA.some((g) => dipilih.has(g.id))
  const alasan: Alasan[] = []

  for (const [kategori, daftar] of KELOMPOK) {
    for (const t of daftar) {
      if (!dipilih.has(t.id)) continue
      if (t.hanyaBilaGejala && !adaGejala) continue
      const tingkat: Tingkat = t.merahBilaGejala && adaGejala ? 'merah' : t.tingkat
      alasan.push({ kategori, teks: t.label, tingkat })
    }
  }
  for (const v of nilaiVital(vital)) alasan.push({ kategori: 'vital', teks: `${v.label} (${v.nilai})`, tingkat: v.tingkat })

  const kuning = alasan.filter((a) => a.tingkat === 'kuning')
  const ada = (k: Kategori) => kuning.some((a) => a.kategori === k)

  let triase: Triase = 'hijau'
  if (alasan.some((a) => a.tingkat === 'merah')) triase = 'merah'
  else if (
    (ada('gejala') && ada('vital') && ada('faktor')) ||
    kuning.length >= 4 ||
    ada('fisik') ||
    ada('ekg') ||
    ada('riwayat')
  )
    triase = 'kuning'

  return { triase, alasan, jumlahKuning: kuning.length }
}
