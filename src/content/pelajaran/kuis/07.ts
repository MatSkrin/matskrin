import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 7. Jawaban dan pembahasan hanya bersandar pada isi Bab 7. */
export const kuis: Soal[] = [
  {
    id: 'b7-q1',
    tanya: 'Risiko utama apa yang perlu diperhatikan pada ASD yang belum dikoreksi selama kehamilan?',
    opsi: [
      'Diseksi aorta',
      'Aritmia atrium dan emboli paradoksikal',
      'Obstruksi jalur keluar ventrikel kiri',
      'Regurgitasi aorta berat',
    ],
    benar: 1,
    pembahasan:
      'ASD tanpa komplikasi umumnya berisiko rendah. Pada defek yang belum dikoreksi, aritmia atrium dan emboli paradoksikal perlu diperhatikan [1,3].',
  },
  {
    id: 'b7-q2',
    tanya: 'Seorang perempuan pernah menjalani operasi koreksi PJB saat kecil. Bagaimana menilai risiko kehamilannya?',
    opsi: [
      'Pasti berisiko rendah karena sudah dioperasi',
      'Kelainan residual, fungsi ventrikel, dan aritmia tetap harus dievaluasi',
      'Tidak perlu ekokardiografi',
      'Selalu termasuk mWHO kelas IV',
    ],
    benar: 1,
    pembahasan:
      'Koreksi tidak selalu menghilangkan risiko kehamilan. Pirau residual, kelainan katup, disfungsi ventrikel, aritmia, dan kelainan aorta perlu dinilai melalui riwayat operasi, EKG, dan ekokardiografi [2,3].',
  },
  {
    id: 'b7-q3',
    tanya: 'Kondisi PJB mana yang termasuk mWHO 2.0 kelas IV?',
    opsi: [
      'ASD/VSD/PDA pascakoreksi tanpa residual bermakna',
      'Tetralogi Fallot pascakoreksi tanpa residual bermakna',
      'Fontan tanpa komplikasi',
      'Sindrom Eisenmenger',
    ],
    benar: 3,
    pembahasan:
      'Sindrom Eisenmenger, Fontan dengan komplikasi, dan ventrikel kanan sistemik dengan disfungsi sedang/berat termasuk kelas IV. Fontan tanpa komplikasi termasuk kelas III [1,9,10].',
  },
  {
    id: 'b7-q4',
    tanya: 'Mengapa kehamilan sangat berbahaya pada sindrom Eisenmenger?',
    opsi: [
      'Penurunan resistensi vaskular sistemik memperberat hipoksemia dan gagal jantung kanan',
      'Peningkatan resistensi vaskular sistemik menurunkan aliran pirau',
      'Volume plasma justru menurun',
      'Risiko utamanya hanya perdarahan',
    ],
    benar: 0,
    pembahasan:
      'Pada Eisenmenger terdapat aliran dua arah atau kanan-ke-kiri. Penurunan resistensi vaskular sistemik selama kehamilan dapat memperberat hipoksemia, gagal jantung kanan, dan tromboemboli [1,10].',
  },
  {
    id: 'b7-q5',
    tanya: 'Cara persalinan apa yang diutamakan pada sebagian besar pasien PJB yang stabil?',
    opsi: [
      'Seksio sesarea elektif pada semua pasien',
      'Persalinan pervaginam',
      'Seksio sesarea sebelum usia kehamilan 34 minggu',
      'Induksi persalinan pada usia kehamilan 32 minggu',
    ],
    benar: 1,
    pembahasan:
      'Persalinan pervaginam diutamakan pada sebagian besar pasien PJB yang stabil. Persalinan sesar ditentukan oleh indikasi obstetri atau kondisi kardiovaskular khusus [1].',
  },
]
