import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 13. Jawaban dan pembahasan hanya bersandar pada isi Bab 13. */
export const kuis: Soal[] = [
  {
    id: 'b13-q1',
    tanya: 'Kapan sebagian besar diseksi aorta terkait kehamilan terjadi?',
    opsi: ['Trimester pertama', 'Trimester kedua', 'Masa pascapersalinan', 'Sebelum konsepsi'],
    benar: 2,
    pembahasan:
      'Sekitar 62% diseksi terjadi pada masa pascapersalinan, sehingga ibu dan keluarga perlu diedukasi tentang tanda bahaya diseksi pada minggu-minggu awal setelah persalinan [2].',
  },
  {
    id: 'b13-q2',
    tanya: 'Manakah petunjuk yang mengarah pada kemungkinan penyakit aorta pada ibu hamil?',
    opsi: [
      'Riwayat keluarga diseksi aorta atau kematian mendadak usia muda',
      'Edema tungkai bilateral ringan',
      'Bising sistolik ejeksi lembut',
      'Takikardia sinus ringan',
    ],
    benar: 0,
    pembahasan:
      'Petunjuk penyakit aorta meliputi riwayat keluarga diseksi atau kematian mendadak usia muda, ciri Marfan atau sindrom lain, katup aorta bikuspid, koarktasio, dan bising diastolik regurgitasi aorta [2,5].',
  },
  {
    id: 'b13-q3',
    tanya: 'Pada diameter aorta berapa persalinan per vaginam direkomendasikan?',
    opsi: ['<40 mm', '40–45 mm', '≥45 mm', '≥50 mm'],
    benar: 0,
    pembahasan:
      'Persalinan per vaginam direkomendasikan pada diameter <40 mm (kelas I). Pada 40–45 mm dipertimbangkan per vaginam dengan epidural dan kala dua dipersingkat, sedangkan pada ≥45 mm seksio sesarea sebaiknya dipertimbangkan (kelas IIa) [2].',
  },
  {
    id: 'b13-q4',
    tanya: 'Uterotonika apa yang tidak diberikan setelah persalinan pada ibu dengan penyakit aorta?',
    opsi: ['Oksitosin', 'Ergometrin', 'Semua uterotonika', 'Tidak ada pembatasan'],
    benar: 1,
    pembahasan: 'Ergometrin tidak digunakan setelah persalinan pada ibu dengan penyakit aorta karena dapat meningkatkan tekanan darah [2].',
  },
  {
    id: 'b13-q5',
    tanya: 'Ibu nifas datang dengan nyeri punggung hebat mendadak seperti robek dan perbedaan tekanan darah kedua lengan. Apa tindakan yang tepat?',
    opsi: [
      'Beri analgesik dan pulangkan',
      'Analgesia, turunkan tekanan darah dan denyut jantung bila tidak syok, akses intravena, dan rujuk darurat',
      'Tunggu hasil CT di fasilitas yang tidak memiliki CT',
      'Berikan ergometrin',
    ],
    benar: 1,
    pembahasan:
      'Kondisi ini perlu dicurigai sebagai diseksi aorta. Ibu dirujuk darurat ke rumah sakit dengan layanan bedah jantung dan obstetri, dan rujukan tidak ditunda untuk pemeriksaan penunjang [2,14].',
  },
]
