import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 1. Jawaban dan pembahasan hanya bersandar pada isi Bab 1. */
export const kuis: Soal[] = [
  {
    id: 'b1-q1',
    tanya: 'Dalam registri ROPAC, kelompok penyakit jantung apa yang paling banyak ditemukan pada kehamilan?',
    opsi: ['Kardiomiopati', 'Penyakit jantung bawaan', 'Penyakit jantung koroner', 'Penyakit aorta'],
    benar: 1,
    pembahasan: 'Penyakit jantung bawaan mencakup 57% kasus di ROPAC, disusul penyakit katup sebesar 29% [3].',
  },
  {
    id: 'b1-q2',
    tanya: 'Di negara berpendapatan rendah dan menengah, kelompok penyakit jantung apa yang masih menjadi masalah utama pada kehamilan?',
    opsi: ['Penyakit katup, termasuk penyakit jantung rematik', 'Penyakit jantung koroner aterosklerotik', 'Aritmia ventrikel', 'Penyakit aorta terkait sindrom Marfan'],
    benar: 0,
    pembahasan:
      'Penyakit jantung bawaan paling menonjol di negara berpendapatan tinggi, sedangkan penyakit katup, termasuk penyakit jantung rematik, masih menjadi masalah utama di negara berpendapatan rendah dan menengah [1,5].',
  },
  {
    id: 'b1-q3',
    tanya: 'Menurut tinjauan sistematis Syairaji dkk., bagaimana porsi kematian ibu akibat penyebab nonobstetrik di Indonesia berubah pada 1990–2020?',
    opsi: ['Turun dari 49% menjadi 10%', 'Tetap sekitar 10%', 'Naik dari 10% menjadi 49%', 'Naik dari 23% menjadi 30%'],
    benar: 2,
    pembahasan:
      'Kematian akibat perdarahan dan sepsis menurun, sedangkan kematian akibat penyebab nonobstetrik naik dari 10% menjadi 49% [4].',
  },
  {
    id: 'b1-q4',
    tanya: 'Dalam registri COHARD-PH di RSUP Dr. Sardjito, jenis penyakit jantung bawaan apa yang paling banyak ditemukan?',
    opsi: ['Defek septum ventrikel', 'Duktus arteriosus persisten', 'Tetralogi Fallot', 'Defek septum atrium sekundum'],
    benar: 3,
    pembahasan:
      'Sebanyak 73,4% pasien merupakan defek septum atrium sekundum, dan 77,1% sudah menunjukkan tanda hipertensi pulmonal pada ekokardiografi [8].',
  },
  {
    id: 'b1-q5',
    tanya: 'Sejak kapan perempuan dengan risiko mWHO 2.0 kelas II–III atau lebih tinggi direkomendasikan ditangani *Pregnancy Heart Team*?',
    opsi: ['Sejak masa prakonsepsi', 'Sejak trimester kedua', 'Saat menjelang persalinan', 'Setelah muncul gejala gagal jantung'],
    benar: 0,
    pembahasan:
      'ESC 2025 merekomendasikan evaluasi dan penatalaksanaan oleh *Pregnancy Heart Team* sejak prakonsepsi, selama kehamilan, hingga pascapersalinan (kelas I, level C) [1].',
  },
]
