import type { Soal } from '@/components/belajar/Kuis'

/** Kuis recall Bab 8. Jawaban dan pembahasan hanya bersandar pada isi Bab 8. */
export const kuis: Soal[] = [
  {
    id: 'b8-q1',
    tanya: 'Hipertensi arteri pulmonal (PAH) termasuk kelas mWHO 2.0 berapa?',
    opsi: ['Kelas II', 'Kelas II–III', 'Kelas III', 'Kelas IV'],
    benar: 3,
    pembahasan:
      'PAH termasuk mWHO 2.0 kelas IV, yaitu risiko kehamilan sangat tinggi. *Pregnancy Heart Team* membahas risiko melanjutkan kehamilan dan pilihan terminasi melalui pengambilan keputusan bersama, disertai dukungan psikologis [3,8].',
  },
  {
    id: 'b8-q2',
    tanya: 'Kapan sebagian besar kematian maternal pada PAH terjadi?',
    opsi: ['Trimester pertama', 'Trimester kedua', 'Setelah persalinan', 'Sebelum konsepsi'],
    benar: 2,
    pembahasan:
      'Sebagian besar kematian maternal terjadi setelah persalinan, ketika autotransfusi dan redistribusi cairan meningkatkan *preload* secara mendadak. Pemantauan intensif dilanjutkan beberapa hari pascasalin [1,6].',
  },
  {
    id: 'b8-q3',
    tanya: 'Ibu hamil dengan sesak progresif memiliki EKG normal. Apakah hipertensi pulmonal sudah dapat disingkirkan?',
    opsi: [
      'Ya, EKG normal menyingkirkan hipertensi pulmonal',
      'Tidak, EKG normal tidak menyingkirkan hipertensi pulmonal sehingga ekokardiografi tetap diperlukan',
      'Ya, bila saturasi oksigen di atas 90%',
      'Tidak, tetapi cukup diulang EKG satu bulan lagi',
    ],
    benar: 1,
    pembahasan:
      'EKG dapat memperlihatkan deviasi aksis kanan atau tanda beban ventrikel kanan, tetapi EKG normal tidak menyingkirkan PH. Ekokardiografi merupakan pencitraan awal [2,5].',
  },
  {
    id: 'b8-q4',
    tanya: 'Obat PAH mana yang tidak direkomendasikan selama kehamilan?',
    opsi: ['Sildenafil', 'Analog prostasiklin', 'Antagonis reseptor endotelin (ERA)', 'Epoprostenol intravena'],
    benar: 2,
    pembahasan:
      'Antagonis reseptor endotelin, riociguat, dan selexipag tidak direkomendasikan selama kehamilan (kelas III, level C). Sildenafil dan analog prostasiklin dapat digunakan dengan pengawasan ahli [3,4].',
  },
  {
    id: 'b8-q5',
    tanya: 'Apa tindakan dokter umum bila ibu hamil dengan riwayat PAH datang dengan sinkop dan hipoksemia berat?',
    opsi: [
      'Pantau di rumah dan kontrol minggu depan',
      'Stabilisasi dan rujukan emergensi',
      'Hentikan semua obat PAH',
      'Mulai antagonis reseptor endotelin',
    ],
    benar: 1,
    pembahasan:
      'Sinkop, hipotensi, atau hipoksemia berat memerlukan stabilisasi dan rujukan emergensi. Perubahan terapi PAH dikoordinasikan dengan dokter spesialis [2,3,5].',
  },
]
