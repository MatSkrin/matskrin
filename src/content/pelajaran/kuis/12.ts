import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 12. Jawaban dan pembahasan hanya bersandar pada isi Bab 12. */
export const kuis: Soal[] = [
  {
    id: 'b12-q1',
    tanya: 'Dalam berapa menit EKG 12 sadapan perlu direkam pada ibu hamil dengan nyeri dada?',
    opsi: ['10 menit pertama', '1 jam', '6 jam', '24 jam'],
    benar: 0,
    pembahasan: 'EKG 12 sadapan direkam dalam 10 menit pertama, mengikuti protokol yang sama dengan perempuan tidak hamil [1].',
  },
  {
    id: 'b12-q2',
    tanya: 'Temuan EKG mana yang tidak pernah normal pada kehamilan?',
    opsi: ['Inversi gelombang T ringan', 'Depresi segmen ST sementara', 'Elevasi segmen ST', 'Takikardia sinus ringan'],
    benar: 2,
    pembahasan:
      'Depresi ST sementara dan inversi gelombang T ringan dapat ditemukan pada kehamilan normal. Elevasi segmen ST tidak normal dan memerlukan penanganan segera [1,9].',
  },
  {
    id: 'b12-q3',
    tanya: 'Ibu muda tanpa faktor risiko mengalami nyeri dada khas iskemia pada minggu pertama pascapersalinan. Penyebab SKA apa yang perlu diwaspadai?',
    opsi: [
      'Diseksi arteri koroner spontan (SCAD)',
      'Aterosklerosis tiga pembuluh',
      'Spasme esofagus',
      'Perikarditis uremik',
    ],
    benar: 0,
    pembahasan:
      'Lebih dari 70% SCAD terkait kehamilan terjadi pada awal pascapersalinan, terutama minggu pertama, dan sering mengenai ibu muda tanpa faktor risiko [1,7].',
  },
  {
    id: 'b12-q4',
    tanya: 'Tata laksana awal mana yang sesuai pada dugaan SKA di layanan primer?',
    opsi: [
      'Tunda rujukan sampai hasil troponin keluar',
      'Aspirin 150–300 mg per oral bila tidak ada kontraindikasi, oksigen bila saturasi <90%, akses intravena, dan rujuk segera',
      'Berikan warfarin dan pulangkan',
      'Hindari aspirin karena ibu sedang hamil',
    ],
    benar: 1,
    pembahasan:
      'Langkah awal meliputi pemantauan tanda vital dan irama, oksigen bila saturasi <90%, akses intravena, aspirin 150–300 mg, dan nitrat sublingual bila tekanan darah memadai. Rujukan tidak perlu menunggu hasil troponin [1,9].',
  },
  {
    id: 'b12-q5',
    tanya: 'Bila diperlukan antiplatelet ganda selama kehamilan, penghambat P2Y12 apa yang menjadi pilihan?',
    opsi: ['Tikagrelor', 'Prasugrel', 'Klopidogrel', 'Tidak boleh ada penghambat P2Y12'],
    benar: 2,
    pembahasan:
      'Klopidogrel direkomendasikan sebagai penghambat P2Y12 pilihan selama kehamilan, sedangkan aspirin dosis rendah aman selama kehamilan dan menyusui [1].',
  },
]
