import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 15. Jawaban dan pembahasan hanya bersandar pada isi Bab 15. */
export const kuis: Soal[] = [
  {
    id: 'b15-q1',
    tanya: 'Antikoagulan apa yang menjadi pilihan utama untuk sebagian besar indikasi antikoagulasi selama kehamilan?',
    opsi: ['Warfarin', 'Heparin berat molekul rendah (LMWH)', 'Rivaroksaban', 'Dabigatran'],
    benar: 1,
    pembahasan:
      'LMWH, seperti enoksaparin, merupakan pilihan utama karena tidak melewati plasenta dan responsnya lebih dapat diprediksi dibanding UFH [10].',
  },
  {
    id: 'b15-q2',
    tanya: 'Perempuan pengguna rivaroksaban mengetahui dirinya hamil. Apa sikap yang tepat?',
    opsi: [
      'Lanjutkan rivaroksaban karena aman',
      'Hentikan semua antikoagulan tanpa pengganti',
      'Evaluasi segera untuk penggantian, umumnya ke LMWH, secara terencana',
      'Ganti dengan aspirin saja',
    ],
    benar: 2,
    pembahasan:
      'DOAC tidak direkomendasikan selama kehamilan (kelas III, level C). Penggantian dilakukan secara terencana, umumnya ke LMWH, agar tidak ada periode tanpa perlindungan antitrombotik [1].',
  },
  {
    id: 'b15-q3',
    tanya: 'Pada pasien katup mekanik yang memakai LMWH, pemeriksaan apa yang wajib tersedia?',
    opsi: ['INR', 'Kadar anti-faktor Xa', 'Hitung trombosit saja', 'D-dimer'],
    benar: 1,
    pembahasan:
      'Dosis LMWH disesuaikan dengan kadar puncak anti-faktor Xa 4–6 jam setelah suntikan, umumnya target 1,0–1,2 IU/mL. LMWH tidak direkomendasikan bila pemantauan anti-faktor Xa tidak tersedia (kelas III, level C) [1].',
  },
  {
    id: 'b15-q4',
    tanya: 'Berapa lama antikoagulasi terapeutik dilanjutkan setelah persalinan pada tromboemboli vena akut yang terjadi selama kehamilan?',
    opsi: [
      'Cukup sampai hari ke-3 postpartum',
      'Setidaknya 6 minggu postpartum, dengan total durasi minimal 3 bulan',
      'Dihentikan saat persalinan',
      'Seumur hidup pada semua pasien',
    ],
    benar: 1,
    pembahasan:
      'Antikoagulasi terapeutik dilanjutkan setidaknya enam minggu postpartum dengan total durasi pengobatan minimal tiga bulan [1,10].',
  },
  {
    id: 'b15-q5',
    tanya: 'Obat kardiovaskular mana yang umumnya dihindari selama menyusui?',
    opsi: ['Metoprolol', 'Nifedipin', 'Warfarin', 'Amiodaron'],
    benar: 3,
    pembahasan:
      'Amiodaron umumnya dihindari selama menyusui karena waktu paruh panjang, akumulasi dalam ASI, dan potensi gangguan tiroid bayi. Metoprolol, nifedipin, dan warfarin dapat digunakan [1,14].',
  },
]
