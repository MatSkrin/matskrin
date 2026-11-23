import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 4. Jawaban dan pembahasan hanya bersandar pada isi Bab 4. */
export const kuis: Soal[] = [
  {
    id: 'b4-q1',
    tanya: 'Manakah yang termasuk tanda bahaya kardiovaskular pada kehamilan menurut Poin Klinis 4.1?',
    opsi: [
      'Denyut jantung istirahat 95 kali/menit',
      'Tekanan darah sistolik ≥160 mmHg',
      'Saturasi oksigen 98%',
      'Edema tungkai bilateral ringan',
    ],
    benar: 1,
    pembahasan:
      'Tanda bahaya meliputi sesak saat istirahat atau ortopnea berat, nadi istirahat ≥120 kali/menit, tekanan darah sistolik ≥160 mmHg, frekuensi napas ≥30 kali/menit, dan SpO₂ ≤94% [2].',
  },
  {
    id: 'b4-q2',
    tanya: 'Pemeriksaan pencitraan apa yang menjadi lini pertama untuk evaluasi penyakit kardiovaskular selama kehamilan?',
    opsi: ['Radiografi toraks', 'CT angiografi', 'Ekokardiografi transtorasik', 'MRI jantung'],
    benar: 2,
    pembahasan:
      'Ekokardiografi transtorasik (TTE) merupakan modalitas pencitraan lini pertama. ESC 2025 merekomendasikan TTE untuk gejala atau tanda kardiovaskular baru atau yang belum dapat dijelaskan (kelas I, level C) [1].',
  },
  {
    id: 'b4-q3',
    tanya: 'Ibu hamil 28 minggu datang dengan sesak saat istirahat dan SpO₂ 93%. Termasuk kategori urgensi rujukan apa?',
    opsi: [
      'Hijau: lanjutkan pemeriksaan antenatal',
      'Kuning: rujukan terencana cepat',
      'Merah: stabilisasi dan rujuk hari ini juga',
      'Cukup kontrol ulang satu bulan lagi',
    ],
    benar: 2,
    pembahasan:
      'Sesak saat istirahat dan SpO₂ ≤94% termasuk kriteria merah. Pasien distabilkan dan dirujuk pada hari yang sama ke rumah sakit dengan layanan obstetri dan jantung, dan tidak dipulangkan [2,8,9].',
  },
  {
    id: 'b4-q4',
    tanya: 'Bagaimana pendekatan penilaian awal pada ibu hamil dengan dugaan kegawatan kardiovaskular?',
    opsi: [
      'Menunggu hasil ekokardiografi sebelum stabilisasi',
      'Penilaian ABCDE, pantau tanda vital, oksigen bila hipoksemia, dan koordinasi rujukan emergensi bila tidak stabil',
      'Langsung memulangkan pasien dengan obat simptomatik',
      'Melengkapi semua pemeriksaan laboratorium sebelum merujuk',
    ],
    benar: 1,
    pembahasan:
      'Penilaian awal memakai pendekatan ABCDE. EKG 12 sadapan direkam bila tersedia tanpa menunda stabilisasi, dan pasien dengan ketidakstabilan hemodinamik dirujuk secara emergensi [1].',
  },
  {
    id: 'b4-q5',
    tanya: 'Apa makna klinis nilai BNP atau NT-proBNP yang normal pada ibu hamil dengan dugaan gagal jantung?',
    opsi: [
      'Memastikan diagnosis gagal jantung',
      'Memiliki nilai prediksi negatif yang tinggi terhadap gagal jantung',
      'Menunjukkan adanya iskemia miokard',
      'Tidak bermakna selama kehamilan',
    ],
    benar: 1,
    pembahasan:
      'Nilai BNP atau NT-proBNP dalam batas normal memiliki nilai prediksi negatif yang tinggi terhadap gagal jantung selama kehamilan dan periode awal postpartum [1,7].',
  },
]
