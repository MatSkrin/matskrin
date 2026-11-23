import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 5. Jawaban dan pembahasan hanya bersandar pada isi Bab 5. */
export const kuis: Soal[] = [
  {
    id: 'b5-q1',
    tanya: 'Bising sistolik dengan intensitas berapa yang perlu dirujuk untuk ekokardiografi?',
    opsi: ['≥1/6', '≥2/6', '≥3/6', 'Hanya 6/6'],
    benar: 2,
    pembahasan:
      'Intensitas bising sistolik dinilai dengan skala Levine. Bising ≥3/6 perlu dirujuk untuk ekokardiografi, sedangkan bising ejeksi hanya dapat dianggap fisiologis bila ≤2/6 dan ciri lainnya aman [9,14,15].',
  },
  {
    id: 'b5-q2',
    tanya: 'Bunyi jantung mana yang tidak lazim pada kehamilan normal sehingga setiap temuannya perlu dievaluasi?',
    opsi: ['S1 yang lebih keras', '*Split* S2 fisiologis', 'S3 pada ibu tanpa keluhan', 'S4'],
    benar: 3,
    pembahasan:
      'S1 lebih keras, *split* S2 fisiologis, dan S3 pada ibu tanpa keluhan dengan tanda vital normal dapat ditemukan pada kehamilan normal. S4 tidak lazim dijumpai sehingga setiap S4 perlu dievaluasi [12].',
  },
  {
    id: 'b5-q3',
    tanya: 'Posisi apa yang memperjelas *rumble* stenosis mitral saat auskultasi?',
    opsi: [
      'Duduk condong ke depan dengan ekspirasi ditahan',
      'Dekubitus lateral kiri dengan *bell* di apeks',
      'Telentang datar dengan diafragma di area aorta',
      'Berdiri dengan inspirasi dalam',
    ],
    benar: 1,
    pembahasan:
      'Posisi miring kiri dengan *bell* ditempel ringan di apeks memperjelas *rumble* stenosis mitral, S3, dan S4. Duduk condong ke depan dengan ekspirasi ditahan dipakai untuk mencari regurgitasi aorta [10,17].',
  },
  {
    id: 'b5-q4',
    tanya: 'Petunjuk apa yang mengarah pada ASD sekundum, yang bisingnya sering menyerupai bising sistolik fungsional?',
    opsi: [
      '*Split* S2 lebar menetap, deviasi aksis kanan, dan pola RBBB inkomplet',
      'Bising holosistolik di apeks yang menjalar ke aksila',
      'Bising kontinu tipe *machinery* di infraklavikula kiri',
      'Bising ejeksi yang mengeras saat Valsalva',
    ],
    benar: 0,
    pembahasan:
      'Bising ejeksi ASD sekundum di area pulmonal menyerupai bising fungsional dan pasien sering tidak mengeluh. Petunjuknya adalah *split* S2 lebar menetap serta deviasi aksis kanan dan pola RBBB inkomplet pada EKG [13].',
  },
  {
    id: 'b5-q5',
    tanya: 'Temuan EKG mana yang masih dapat diterima sebagai varian kehamilan normal?',
    opsi: [
      'Deviasi aksis kanan (>+90°)',
      'QTc 480 ms',
      'Inversi gelombang T di sadapan III',
      'PR pendek dengan gelombang delta',
    ],
    benar: 2,
    pembahasan:
      'Gelombang T dapat datar atau inversi di III, aVF, dan V1–V3 pada kehamilan. Deviasi aksis kanan, QTc ≥460 ms, dan gelombang delta bukan varian normal [1,4,20].',
  },
  {
    id: 'b5-q6',
    tanya: 'Bagaimana sikap terhadap pemeriksaan berbasis radiasi, seperti CT angiografi, pada ibu hamil dengan dugaan emboli paru?',
    opsi: [
      'Selalu dikontraindikasikan selama kehamilan',
      'Ditunda sampai setelah persalinan',
      'Dapat dilakukan bila diperlukan, dengan dosis serendah yang dapat dicapai (ALARA)',
      'Hanya boleh pada trimester pertama',
    ],
    benar: 2,
    pembahasan:
      'Pemeriksaan penting tidak perlu ditunda semata-mata karena kekhawatiran radiasi. Paparan dibatasi serendah yang dapat dicapai secara wajar (ALARA) dan dosis janin sebaiknya <50 mGy (kelas I, level C) [1,2,33].',
  },
]
