/** Pengelompokan bab menjadi bagian (khusus tampilan web). */
export const BAGIAN = [
  { nomor: 'I', judul: 'Dasar Kardiovaskular', bab: [1, 2, 3] },
  { nomor: 'II', judul: 'Deteksi dan Diagnosis', bab: [4, 5, 6] },
  { nomor: 'III', judul: 'Penyakit Kardiovaskular Spesifik', bab: [7, 8, 9, 10, 11, 12, 13] },
  { nomor: 'IV', judul: 'Komplikasi Kardiovaskular', bab: [14] },
  { nomor: 'V', judul: 'Terapi Kardiovaskular', bab: [15] },
] as const

export const bagianDari = (nomorBab: number) => BAGIAN.find((b) => (b.bab as readonly number[]).includes(nomorBab))
