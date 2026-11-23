import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 3. Jawaban dan pembahasan hanya bersandar pada isi Bab 3. */
export const kuis: Soal[] = [
  {
    id: 'b3-q1',
    tanya: 'Komplikasi kardiovaskular maternal apa yang paling sering terjadi pada kehamilan dengan penyakit jantung?',
    opsi: ['Tromboemboli', 'Aritmia', 'Gagal jantung', 'Diseksi aorta'],
    benar: 2,
    pembahasan: 'Gagal jantung merupakan komplikasi tersering dan terjadi pada sekitar 11% kehamilan dalam registri ROPAC [9,10].',
  },
  {
    id: 'b3-q2',
    tanya: 'Kapan gagal jantung paling sering muncul pada ibu hamil dengan penyakit jantung menurut registri ROPAC?',
    opsi: [
      'Trimester pertama',
      'Akhir trimester kedua atau setelah persalinan',
      'Hanya saat kala II persalinan',
      'Lebih dari satu tahun setelah persalinan',
    ],
    benar: 1,
    pembahasan: 'Gagal jantung paling sering muncul pada akhir trimester kedua atau setelah persalinan, sehingga pemantauan perlu dilanjutkan setelah bayi lahir [9].',
  },
  {
    id: 'b3-q3',
    tanya: 'Mengapa takikardia sangat memperberat stenosis mitral?',
    opsi: [
      'Memperpendek waktu pengisian diastolik',
      'Menurunkan volume plasma',
      'Menurunkan tekanan atrium kiri',
      'Meningkatkan resistensi vaskular sistemik',
    ],
    benar: 0,
    pembahasan:
      'Takikardia memperpendek waktu pengisian diastolik sehingga memperberat kondisi yang bergantung pada pengisian ventrikel, seperti stenosis mitral dan disfungsi diastolik [1,2,6].',
  },
  {
    id: 'b3-q4',
    tanya: 'Pada hipertensi arteri pulmonal, apa mekanisme utama yang menyebabkan kolaps hemodinamik saat persalinan dan postpartum?',
    opsi: [
      'Regurgitasi mitral akut',
      'Gagal ventrikel kanan akut akibat perubahan cepat volume dan tekanan vaskular',
      'Obstruksi aliran keluar ventrikel kiri',
      'Hiperkoagulabilitas fisiologis',
    ],
    benar: 1,
    pembahasan:
      'Ventrikel kanan sudah menanggung beban tekanan tinggi. Perubahan cepat volume atau tekanan saat persalinan dan postpartum dapat mencetuskan gagal ventrikel kanan akut dengan hipotensi dan kolaps hemodinamik [1,7].',
  },
  {
    id: 'b3-q5',
    tanya: 'Dampak janin apa yang berkaitan dengan gangguan hemodinamik maternal?',
    opsi: [
      'Makrosomia',
      'Polihidramnion',
      'Hambatan pertumbuhan janin dan prematuritas',
      'Kehamilan postterm',
    ],
    benar: 2,
    pembahasan:
      'Gangguan hemodinamik maternal dapat mengurangi perfusi uteroplasenta dan berkaitan dengan hambatan pertumbuhan janin serta prematuritas, sehingga pertumbuhan dan kesejahteraan janin ikut dipantau [1,4].',
  },
]
