import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 10. Jawaban dan pembahasan hanya bersandar pada isi Bab 10. */
export const kuis: Soal[] = [
  {
    id: 'b10-q1',
    tanya: 'Obat gagal jantung mana yang tetap dilanjutkan selama kehamilan?',
    opsi: ['Penghambat ACE (ACE-I)', 'Penghambat SGLT2', 'Penyekat beta (kecuali atenolol)', 'Sakubitril/valsartan (ARNI)'],
    benar: 2,
    pembahasan:
      'ACE-I, ARB, ARNI, MRA, ivabradin, dan penghambat SGLT2 tidak boleh diberikan selama kehamilan karena efek buruk pada janin. Penyekat beta tidak dihentikan, kecuali atenolol yang perlu dihindari [1].',
  },
  {
    id: 'b10-q2',
    tanya: 'Bagaimana definisi kardiomiopati peripartum (PPCM)?',
    opsi: [
      'Gagal jantung dengan LVEF <45% tanpa penyebab lain, menjelang akhir kehamilan atau beberapa bulan setelah persalinan',
      'Gagal jantung yang selalu muncul pada trimester pertama',
      'Hipertrofi ventrikel kiri dengan obstruksi jalan keluar',
      'Gagal jantung akibat stenosis mitral rematik',
    ],
    benar: 0,
    pembahasan:
      'PPCM merupakan gagal jantung dengan LVEF <45% tanpa penyebab lain yang terjadi menjelang akhir kehamilan atau dalam beberapa bulan setelah persalinan, keguguran, atau terminasi. PPCM merupakan diagnosis eksklusi [1,2].',
  },
  {
    id: 'b10-q3',
    tanya: 'Manakah yang termasuk faktor risiko PPCM?',
    opsi: ['Primigravida usia muda', 'Preeklamsia', 'Kehamilan tunggal tanpa komplikasi', 'Indeks massa tubuh rendah'],
    benar: 1,
    pembahasan:
      'Faktor risiko PPCM meliputi preeklamsia dan hipertensi dalam kehamilan, kehamilan ganda, multiparitas, usia ibu yang lebih tua, dan latar belakang etnis atau geografis tertentu [1,2,8].',
  },
  {
    id: 'b10-q4',
    tanya: 'Ibu nifas hari ke-10 datang dengan ortopnea, ronki basah, dan SpO₂ 92%. Langkah stabilisasi mana yang tepat sebelum merujuk?',
    opsi: [
      'Posisi telentang datar dan infus cairan cepat',
      'Posisi setengah duduk, oksigen, akses intravena, batasi cairan, dan furosemid intravena',
      'Pulangkan dengan edukasi istirahat',
      'Tunda rujukan sampai hasil BNP tersedia',
    ],
    benar: 1,
    pembahasan:
      'Stabilisasi awal meliputi posisi setengah duduk, oksigen bila saturasi turun, akses intravena, pembatasan cairan intravena, dan furosemid intravena bila ada kongesti paru. Rujukan tidak ditunda untuk menunggu pemeriksaan penunjang [1,5,10].',
  },
  {
    id: 'b10-q5',
    tanya: 'Apa yang perlu disampaikan kepada ibu dengan riwayat PPCM yang LVEF-nya sudah kembali normal?',
    opsi: [
      'Tidak ada risiko lagi pada kehamilan berikutnya',
      'Tetap perlu konseling risiko kambuh dan kontrasepsi',
      'Boleh menghentikan semua obat sendiri',
      'Tidak perlu kontrol ke spesialis jantung',
    ],
    benar: 1,
    pembahasan:
      'Konseling risiko kambuh pada kehamilan berikutnya dan kontrasepsi direkomendasikan pada semua ibu dengan PPCM, termasuk setelah LVEF pulih (kelas I, level C) [1].',
  },
]
