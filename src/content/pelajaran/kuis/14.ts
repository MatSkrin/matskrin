import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 14. Jawaban dan pembahasan hanya bersandar pada isi Bab 14. */
export const kuis: Soal[] = [
  {
    id: 'b14-q1',
    tanya: 'Hipertensi yang pertama kali muncul pada usia kehamilan ≥20 minggu tanpa kriteria preeklamsia disebut apa?',
    opsi: ['Hipertensi kronis', 'Hipertensi gestasional', 'Preeklamsia *superimposed*', '*White-coat hypertension*'],
    benar: 1,
    pembahasan:
      'Hipertensi gestasional muncul pertama kali pada usia kehamilan ≥20 minggu tanpa kriteria preeklamsia. Hipertensi kronis sudah ada sebelum hamil atau terdiagnosis sebelum 20 minggu [1,2].',
  },
  {
    id: 'b14-q2',
    tanya: 'Menurut ESC 2025, pada tekanan darah berapa terapi antihipertensi dimulai pada ibu hamil?',
    opsi: ['≥130/80 mmHg', '≥140/90 mmHg', '≥150/100 mmHg', '≥160/110 mmHg'],
    benar: 1,
    pembahasan:
      'ESC 2025 merekomendasikan terapi mulai tekanan darah ≥140/90 mmHg dengan target <140/90 mmHg (kelas I, level B) [1].',
  },
  {
    id: 'b14-q3',
    tanya: 'Obat antihipertensi mana yang dikontraindikasikan selama kehamilan?',
    opsi: ['Labetalol', 'Nifedipin lepas lambat', 'Metildopa', 'Penghambat ACE dan ARB'],
    benar: 3,
    pembahasan:
      'Penghambat ACE dan ARB dikontraindikasikan karena risiko toksisitas janin. Labetalol, nifedipin, dan metildopa merupakan pilihan utama [1,2].',
  },
  {
    id: 'b14-q4',
    tanya: 'Tekanan darah 165/112 mmHg menetap pada ibu hamil 34 minggu. Bagaimana penanganannya?',
    opsi: [
      'Kontrol ulang dua minggu lagi',
      'Kegawatan: tangani di rumah sakit dengan labetalol intravena atau nifedipin oral kerja pendek',
      'Mulai penghambat ACE',
      'Turunkan tekanan darah secepat mungkin hingga normal dalam beberapa menit',
    ],
    benar: 1,
    pembahasan:
      'Tekanan darah ≥160/110 mmHg yang menetap merupakan kegawatan dan ditangani di rumah sakit. Penurunan dilakukan terkontrol tanpa hipotensi berlebihan. Hidralazin intravena merupakan pilihan lini kedua [1,2].',
  },
  {
    id: 'b14-q5',
    tanya: 'Apa makna riwayat preeklamsia bagi kesehatan jangka panjang perempuan?',
    opsi: [
      'Tidak berdampak setelah persalinan',
      'Faktor risiko hipertensi kronis, penyakit jantung koroner, stroke, dan gagal jantung',
      'Hanya meningkatkan risiko diabetes tipe 1',
      'Menurunkan risiko kardiovaskular',
    ],
    benar: 1,
    pembahasan:
      'Riwayat preeklamsia berhubungan dengan risiko hipertensi kronis, penyakit jantung koroner, stroke, dan gagal jantung di kemudian hari, sehingga perlu dicatat dan faktor risiko dipantau berkala [9–12].',
  },
]
