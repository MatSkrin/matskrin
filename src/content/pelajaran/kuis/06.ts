import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 6. Jawaban dan pembahasan hanya bersandar pada isi Bab 6. */
export const kuis: Soal[] = [
  {
    id: 'b6-q1',
    tanya: 'Instrumen apa yang menjadi alat utama stratifikasi risiko kardiovaskular maternal menurut ESC 2025?',
    opsi: ['Skor CARPREG II', 'Klasifikasi mWHO 2.0', 'Kelas NYHA saja', 'Skor CHA₂DS₂-VASc'],
    benar: 1,
    pembahasan:
      'Klasifikasi mWHO 2.0 merupakan instrumen utama dan dianjurkan untuk semua perempuan usia reproduktif dengan penyakit kardiovaskular (kelas I, level C). CARPREG II dipakai untuk menambah penilaian individual [1–3].',
  },
  {
    id: 'b6-q2',
    tanya: 'Termasuk kelas mWHO 2.0 berapa tetralogi Fallot yang telah diperbaiki tanpa residu bermakna?',
    opsi: ['Kelas I', 'Kelas II', 'Kelas III', 'Kelas IV'],
    benar: 1,
    pembahasan:
      'Tabel 6.1 menempatkan tetralogi Fallot yang telah diperbaiki tanpa residu bermakna pada kelas II, dengan pelayanan lokal dan penilaian kardiovaskular terencana [1].',
  },
  {
    id: 'b6-q3',
    tanya: 'Kondisi mana yang termasuk mWHO 2.0 kelas IV?',
    opsi: [
      'Ekstrasistol ventrikel terisolasi',
      'Defek septum atrium yang belum diperbaiki tanpa komplikasi',
      'Hipertensi arteri pulmonal',
      'Disfungsi ventrikel kiri ringan (EF >45%)',
    ],
    benar: 2,
    pembahasan:
      'Hipertensi arteri pulmonal termasuk kelas IV, bersama disfungsi ventrikel kiri berat (EF <30% atau NYHA III–IV) dan riwayat kardiomiopati peripartum dengan disfungsi residu lebih dari ringan [1].',
  },
  {
    id: 'b6-q4',
    tanya: 'Berapa estimasi risiko kejadian jantung maternal pada skor CARPREG II 3?',
    opsi: ['5%', '10%', '15%', '41%'],
    benar: 2,
    pembahasan:
      'Pada Tabel 6.2, skor 3 setara estimasi risiko 15%. Angka ini berasal dari populasi derivasi dan ditafsirkan sebagai perkiraan [2].',
  },
  {
    id: 'b6-q5',
    tanya: 'Perempuan dengan riwayat stroke meminta kontrasepsi. Metode mana yang perlu dihindari?',
    opsi: ['Implan progestin', 'IUD levonorgestrel', 'Pil kombinasi estrogen–progestin', 'IUD tembaga'],
    benar: 2,
    pembahasan:
      'U.S. MEC 2024 menggolongkan kontrasepsi kombinasi sebagai kategori 4 pada riwayat stroke, penyakit jantung iskemik, dan penyakit katup komplikata. IUD dan implan progestin efektif dan sesuai untuk banyak kondisi kardiovaskular [1,5,8].',
  },
]
