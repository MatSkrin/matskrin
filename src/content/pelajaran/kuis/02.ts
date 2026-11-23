import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 2. Jawaban dan pembahasan hanya bersandar pada isi Bab 2. */
export const kuis: Soal[] = [
  {
    id: 'b2-q1',
    tanya: 'Berapa besar peningkatan curah jantung selama kehamilan normal?',
    opsi: ['5–10%', '15–20%', '30–50%', '70–100%'],
    benar: 2,
    pembahasan:
      'Curah jantung meningkat sekitar 30–50% akibat peningkatan volume sekuncup dan frekuensi jantung sekitar 10–20 kali per menit [1,2].',
  },
  {
    id: 'b2-q2',
    tanya: 'Seorang ibu hamil 30 minggu memiliki nadi istirahat 105 kali/menit. Bagaimana menyikapinya?',
    opsi: [
      'Normal karena kehamilan selalu menaikkan nadi di atas 100 kali/menit',
      'Tidak langsung dianggap normal karena kenaikan frekuensi jantung pada kehamilan lebih kecil dari itu',
      'Pasti fibrilasi atrium sehingga perlu antikoagulan',
      'Abaikan bila tekanan darah normal',
    ],
    benar: 1,
    pembahasan:
      'Rerata frekuensi jantung naik dari sekitar 79 menjadi 87 kali/menit dari usia kehamilan 10 ke 40 minggu, sehingga frekuensi jantung istirahat >100 kali/menit tidak boleh langsung dianggap normal karena kehamilan [5].',
  },
  {
    id: 'b2-q3',
    tanya: 'Mengapa hemoglobin dan hematokrit dapat menurun pada kehamilan normal?',
    opsi: [
      'Produksi sel darah merah berhenti',
      'Volume plasma meningkat lebih besar daripada massa sel darah merah',
      'Selalu terjadi perdarahan tersembunyi',
      'Resistensi vaskular sistemik meningkat',
    ],
    benar: 1,
    pembahasan:
      'Volume plasma meningkat sekitar 45%, sedangkan massa sel darah merah meningkat dalam proporsi lebih kecil sehingga terjadi hemodilusi fisiologis [3,6].',
  },
  {
    id: 'b2-q4',
    tanya: 'Temuan pemeriksaan fisik mana yang merupakan indikasi ekokardiografi pada ibu hamil?',
    opsi: [
      'Bising sistolik ejeksi lembut',
      'Edema tungkai bilateral ringan setelah berdiri lama',
      'Bising diastolik',
      'Takikardia sinus ringan',
    ],
    benar: 2,
    pembahasan:
      'Bising sistolik ejeksi fungsional (*flow murmur*) dapat bersifat fisiologis, sedangkan bising diastolik, peningkatan tekanan vena jugularis, ronki paru, atau tanda gagal jantung merupakan indikasi ekokardiografi [1,2].',
  },
  {
    id: 'b2-q5',
    tanya: 'Kapan ibu dengan penyakit jantung paling perlu diobservasi ketat di sekitar persalinan?',
    opsi: [
      'Hanya pada kala I awal',
      'Pada jam-jam pertama postpartum saat aliran balik vena meningkat',
      'Mulai hari ke-7 postpartum',
      'Tidak perlu observasi khusus setelah plasenta lahir',
    ],
    benar: 1,
    pembahasan:
      'Segera setelah persalinan, kontraksi uterus dan hilangnya tekanan pada vena kava inferior meningkatkan aliran balik vena sehingga dapat memicu dekompensasi. Ibu dengan penyakit jantung perlu diobservasi ketat pada jam-jam pertama postpartum [1–3].',
  },
]
