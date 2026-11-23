import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 9. Jawaban dan pembahasan hanya bersandar pada isi Bab 9. */
export const kuis: Soal[] = [
  {
    id: 'b9-q1',
    tanya: 'Jenis lesi katup mana yang umumnya lebih sulit ditoleransi selama kehamilan?',
    opsi: ['Regurgitasi mitral ringan', 'Regurgitasi aorta ringan', 'Stenosis mitral bermakna', 'Regurgitasi trikuspid ringan'],
    benar: 2,
    pembahasan:
      'Lesi stenotik lebih sulit ditoleransi karena peningkatan curah jantung memperbesar gradien melintasi katup yang menyempit. Penurunan resistensi vaskular sistemik justru dapat mengurangi beban regurgitasi [1,2].',
  },
  {
    id: 'b9-q2',
    tanya: 'Obat apa yang dipakai pada stenosis mitral untuk memperpanjang waktu pengisian diastolik?',
    opsi: ['Penyekat beta yang sesuai untuk kehamilan', 'Nitrat dosis tinggi', 'Penghambat ACE', 'Digoksin sebagai lini pertama'],
    benar: 0,
    pembahasan:
      'Penyekat beta yang sesuai untuk kehamilan memperpanjang waktu pengisian diastolik, sedangkan diuretik diberikan hati-hati bila ada kongesti paru [1,4].',
  },
  {
    id: 'b9-q3',
    tanya: 'Jenis katup prostetik apa yang direkomendasikan ESC 2025 untuk perempuan muda yang membutuhkan penggantian katup dan merencanakan kehamilan?',
    opsi: ['Katup mekanik', 'Katup bioprostetik', 'Tidak ada preferensi', 'Penggantian ditunda sampai menopause'],
    benar: 1,
    pembahasan:
      'Katup bioprostetik lebih dipilih daripada katup mekanik (kelas I, level B) karena umumnya tidak memerlukan antikoagulasi jangka panjang [1].',
  },
  {
    id: 'b9-q4',
    tanya: 'Pada ibu hamil dengan katup mekanik yang memakai VKA, kapan VKA dihentikan dan diganti heparin menjelang persalinan?',
    opsi: [
      'Minggu ke-20',
      'Minggu ke-36 atau 2 minggu sebelum persalinan terencana',
      'Saat persalinan dimulai',
      'Tidak perlu dihentikan',
    ],
    benar: 1,
    pembahasan:
      'ESC 2025 merekomendasikan penggantian VKA dengan LMWH dosis terapeutik atau UFH intravena dosis tersesuaikan pada minggu ke-36 atau 2 minggu sebelum persalinan terencana (kelas I, level C) [1].',
  },
  {
    id: 'b9-q5',
    tanya: 'Ibu hamil dengan katup mekanik datang dengan sesak mendadak dan bunyi katup yang berubah. Apa yang harus dicurigai?',
    opsi: ['Bising fungsional kehamilan', 'Trombosis katup mekanik', 'Anemia fisiologis', 'Kecemasan'],
    benar: 1,
    pembahasan:
      'Trombosis katup perlu dicurigai bila ada sesak mendadak, gejala emboli, atau perubahan bunyi katup mekanik. Kondisi ini memerlukan evaluasi segera dengan ekokardiografi [1,7].',
  },
]
