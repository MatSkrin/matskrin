// Data Bab 6 yang dipakai komponen interaktif. Isi diambil apa adanya dari naskah Bab 6
// (src/content/bab/06-stratifikasi-risiko-dan-konseling.md). Jangan menambah fakta di sini.
import type { BarisMWHO, SkorRisiko } from '@/components/belajar/Interaktif'

/** Tabel 6.1 (diadaptasi dari Tabel 6 ESC 2025 [1]). */
export const mwho: BarisMWHO[] = [
  {
    kelas: 'I',
    contoh: 'Ekstrasistol atrial/ventrikel terisolasi; kelainan sederhana yang telah diperbaiki tanpa komplikasi.',
    implikasi: 'Pelayanan obstetri lokal; evaluasi jantung sesuai indikasi.',
  },
  {
    kelas: 'II',
    contoh:
      'Sebagian besar aritmia supraventrikular; defek septum atrium/ventrikel yang belum diperbaiki tanpa komplikasi; tetralogi Fallot yang telah diperbaiki tanpa residu bermakna.',
    implikasi: 'Pelayanan lokal dengan penilaian kardiovaskular terencana.',
  },
  {
    kelas: 'II–III',
    contoh:
      'Disfungsi ventrikel kiri ringan (EF >45%); defek septum atrioventrikular yang telah diperbaiki tanpa residu bermakna; sindrom Marfan tanpa dilatasi aorta.',
    implikasi: 'Perawatan bersama fasilitas lokal dan Pregnancy Heart Team.',
  },
  {
    kelas: 'III',
    contoh:
      'Disfungsi ventrikel kiri sedang (EF 30–45%); riwayat kardiomiopati peripartum dengan disfungsi residu tidak lebih dari ringan; takikardia ventrikel menetap.',
    implikasi: 'Pelayanan dipimpin Pregnancy Heart Team di pusat berpengalaman.',
  },
  {
    kelas: 'IV',
    contoh:
      'Disfungsi ventrikel kiri berat (EF <30% atau NYHA III–IV); hipertensi arteri pulmonal; riwayat kardiomiopati peripartum dengan disfungsi residu lebih dari ringan; dilatasi aorta berat pada sindrom tertentu.',
    implikasi: 'Pusat ahli; konseling risiko maternal–janin dan keputusan reproduksi bersama.',
  },
]

/** Tabel 6.2 (Silversides et al. [2]). */
export const carpreg: SkorRisiko[] = [
  { skor: '0–1', risiko: 5 },
  { skor: '2', risiko: 10 },
  { skor: '3', risiko: 15 },
  { skor: '4', risiko: 22 },
  { skor: '≥5', risiko: 41 },
]
