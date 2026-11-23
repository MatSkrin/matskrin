import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 11. Jawaban dan pembahasan hanya bersandar pada isi Bab 11. */
export const kuis: Soal[] = [
  {
    id: 'b11-q1',
    tanya: 'Kapan EKG 12 sadapan paling berguna untuk menilai keluhan berdebar?',
    opsi: [
      'Direkam saat ibu merasakan keluhan',
      'Direkam seminggu setelah keluhan hilang',
      'Hanya setelah persalinan',
      'EKG tidak diperlukan pada keluhan berdebar',
    ],
    benar: 0,
    pembahasan:
      'EKG yang direkam saat gejala sudah hilang sering normal dan tidak menyingkirkan aritmia. Karena itu, EKG 12 sadapan direkam saat keluhan muncul [3].',
  },
  {
    id: 'b11-q2',
    tanya: 'Ibu hamil dengan SVT QRS sempit, tekanan darah stabil, dan sadar baik. Apa langkah pertama?',
    opsi: ['Amiodaron intravena', 'Kardioversi listrik', 'Manuver vagal', 'Atenolol oral'],
    benar: 2,
    pembahasan:
      'Pada SVT yang stabil, langkah pertama adalah manuver vagal (Valsalva yang dimodifikasi atau pijat sinus karotis). Bila gagal, adenosin intravena diberikan. Kardioversi listrik dipakai bila hemodinamik tidak stabil [1,5].',
  },
  {
    id: 'b11-q3',
    tanya: 'Bagaimana sikap dokter umum terhadap fibrilasi atrium yang baru ditemukan pada ibu hamil?',
    opsi: [
      'Cukup edukasi karena selalu jinak',
      'Selalu dirujuk ke spesialis jantung dan pembuluh darah',
      'Langsung diberi amiodaron',
      'Ditunggu sampai setelah persalinan',
    ],
    benar: 1,
    pembahasan:
      'FA baru selalu merupakan indikasi rujukan karena sering menjadi petunjuk penyakit jantung struktural, seperti stenosis mitral, serta perlu dicari tirotoksikosis dan hipertensi [1,7].',
  },
  {
    id: 'b11-q4',
    tanya: 'Pada sindrom QT panjang (LQTS), kapan risiko kejadian aritmia meningkat?',
    opsi: ['Trimester pertama', 'Trimester kedua', 'Masa pascapersalinan, terutama 9 bulan pertama', 'Tidak pernah berubah'],
    benar: 2,
    pembahasan:
      'Risiko aritmia pada LQTS tidak meningkat selama kehamilan, tetapi meningkat pada masa pascapersalinan, terutama 9 bulan pertama. Penyekat beta tidak boleh dihentikan [1,9].',
  },
  {
    id: 'b11-q5',
    tanya: 'Pada henti jantung ibu hamil ≥20 minggu, kapan seksio sesarea segera dilakukan bila janin viabel?',
    opsi: [
      'Bila ROSC belum tercapai setelah 4 menit resusitasi',
      'Setelah 30 menit resusitasi',
      'Hanya bila ibu sudah sadar',
      'Tidak pernah dilakukan selama resusitasi',
    ],
    benar: 0,
    pembahasan:
      'Bila ROSC belum kembali setelah 4 menit dan janin viabel, seksio sesarea segera dilakukan di fasilitas dengan tim obstetri. Selama RJP, uterus digeser ke kiri secara manual terus-menerus [1,12].',
  },
]
