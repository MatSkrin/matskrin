// Data Bab 6 yang dipakai komponen interaktif. Isi diambil apa adanya dari naskah Bab 6
// (src/content/bab/06-stratifikasi-risiko-dan-konseling.md). Jangan menambah fakta di sini.
import type { BarisMWHO, SkorRisiko } from '@/components/belajar/Interaktif'
import type { Soal } from '@/components/belajar/Kuis'

/** Tabel 6.1 (diadaptasi dari Tabel 6 ESC 2025 [1]). */
export const mwho: BarisMWHO[] = [
  {
    kelas: 'I',
    contoh: 'Ekstrasistol atrial/ventrikel terisolasi; kelainan sederhana yang telah diperbaiki tanpa komplikasi.',
    implikasi: 'Pelayanan obstetri lokal; evaluasi jantung sesuai indikasi.',
  },
  {
    kelas: 'II',
    contoh:
      'Sebagian besar aritmia supraventrikular; defek septum atrium/ventrikel yang belum diperbaiki tanpa komplikasi; tetralogi Fallot yang telah diperbaiki tanpa residu bermakna.',
    implikasi: 'Pelayanan lokal dengan penilaian kardiovaskular terencana.',
  },
  {
    kelas: 'II–III',
    contoh:
      'Disfungsi ventrikel kiri ringan (EF >45%); defek septum atrioventrikular yang telah diperbaiki tanpa residu bermakna; sindrom Marfan tanpa dilatasi aorta.',
    implikasi: 'Perawatan bersama fasilitas lokal dan Pregnancy Heart Team.',
  },
  {
    kelas: 'III',
    contoh:
      'Disfungsi ventrikel kiri sedang (EF 30–45%); riwayat kardiomiopati peripartum dengan disfungsi residu tidak lebih dari ringan; takikardia ventrikel menetap.',
    implikasi: 'Pelayanan dipimpin Pregnancy Heart Team di pusat berpengalaman.',
  },
  {
    kelas: 'IV',
    contoh:
      'Disfungsi ventrikel kiri berat (EF <30% atau NYHA III–IV); hipertensi arteri pulmonal; riwayat kardiomiopati peripartum dengan disfungsi residu lebih dari ringan; dilatasi aorta berat pada sindrom tertentu.',
    implikasi: 'Pusat ahli; konseling risiko maternal–janin dan keputusan reproduksi bersama.',
  },
]

/** Tabel 6.2 (Silversides et al. [2]). */
export const carpreg: SkorRisiko[] = [
  { skor: '0–1', risiko: 5 },
  { skor: '2', risiko: 10 },
  { skor: '3', risiko: 15 },
  { skor: '4', risiko: 22 },
  { skor: '≥5', risiko: 41 },
]

/**
 * Kuis kasus. Setiap jawaban dan pembahasan hanya bersandar pada kalimat/tabel Bab 6,
 * dengan nomor sitasi yang sama seperti di bab. Perlu ditinjau penulis sebelum terbit.
 */
export const kuis: Soal[] = [
  {
    id: 'b6-q1',
    kasus:
      'Perempuan 27 tahun dengan tetralogi Fallot yang telah diperbaiki tanpa residu bermakna datang untuk konseling karena ingin hamil.',
    tanya: 'Termasuk kelas mWHO 2.0 berapa kondisi ini, dan apa implikasi pelayanannya?',
    opsi: [
      'Kelas I, pelayanan obstetri lokal tanpa evaluasi jantung',
      'Kelas II, pelayanan lokal dengan penilaian kardiovaskular terencana',
      'Kelas III, pelayanan dipimpin Pregnancy Heart Team di pusat berpengalaman',
      'Kelas IV, konseling risiko maternal–janin di pusat ahli',
    ],
    benar: 1,
    pembahasan:
      'Tabel 6.1 menempatkan tetralogi Fallot yang telah diperbaiki tanpa residu bermakna pada kelas II, dengan pelayanan lokal dan penilaian kardiovaskular terencana [1].',
  },
  {
    id: 'b6-q2',
    kasus: 'Ibu hamil 12 minggu dengan disfungsi ventrikel kiri sedang (EF 35%), tanpa riwayat kardiomiopati peripartum.',
    tanya: 'Bagaimana pengaturan pelayanan yang sesuai?',
    opsi: [
      'Pelayanan obstetri lokal; evaluasi jantung sesuai indikasi',
      'Pelayanan lokal dengan penilaian kardiovaskular terencana',
      'Pelayanan dipimpin Pregnancy Heart Team di pusat berpengalaman',
      'Cukup kontrol di puskesmas hingga persalinan',
    ],
    benar: 2,
    pembahasan:
      'EF 30–45% termasuk mWHO 2.0 kelas III, sehingga pelayanan dipimpin Pregnancy Heart Team di pusat berpengalaman. ESC 2025 merekomendasikan Pregnancy Heart Team untuk kelas II–III ke atas sejak prakonsepsi hingga pascapersalinan [1].',
  },
  {
    id: 'b6-q3',
    kasus: 'Seorang pasien dengan penyakit jantung memiliki skor CARPREG II 3.',
    tanya: 'Bagaimana menyampaikan estimasi risiko kejadian jantung maternalnya?',
    opsi: [
      'Sekitar 5%, dan angka ini pasti berlaku untuk pasien tersebut',
      'Sekitar 15%, sebagai estimasi populasi derivasi dan bukan prediksi pasti',
      'Sekitar 41%, sehingga kehamilan dikontraindikasikan',
      'CARPREG II tidak dapat dipakai bila mWHO 2.0 sudah ditentukan',
    ],
    benar: 1,
    pembahasan:
      'Pada Tabel 6.2, skor 3 setara estimasi risiko 15%. Angka tersebut berasal dari populasi derivasi dan bukan prediksi pasti untuk setiap pasien [2]. CARPREG II melengkapi, bukan menggantikan, mWHO 2.0 [1–3].',
  },
  {
    id: 'b6-q4',
    kasus:
      'Perempuan 32 tahun dengan riwayat stroke dan penyakit jantung meminta kontrasepsi. Ia pernah mendengar tentang pil kombinasi estrogen–progestin.',
    tanya: 'Pilihan mana yang paling sesuai dengan Bab 6?',
    opsi: [
      'Pil kombinasi estrogen–progestin karena paling praktis',
      'Implan progestin atau IUD, setelah konseling sesuai diagnosis jantung',
      'Tidak perlu kontrasepsi karena risiko kehamilan rendah',
      'Menunda pembahasan kontrasepsi sampai pasien hamil',
    ],
    benar: 1,
    pembahasan:
      'U.S. MEC 2024 menggolongkan kontrasepsi kombinasi sebagai kategori 4 pada riwayat stroke [9]. IUD dan implan progestin memiliki efektivitas tinggi, dan implan sesuai untuk banyak kondisi kardiovaskular [1,6,9].',
  },
  {
    id: 'b6-q5',
    kasus:
      'Pasien dengan katup jantung mekanik yang mendapat antikoagulan oral menyatakan ingin hamil tahun depan dan bertanya apakah obatnya sebaiknya dihentikan sekarang.',
    tanya: 'Apa sikap yang tepat?',
    opsi: [
      'Hentikan antikoagulan sekarang agar aman bagi janin',
      'Jangan hentikan sendiri; rujuk untuk konseling prakonsepsi dan perencanaan perubahan terapi',
      'Ganti sendiri ke aspirin sebelum konsepsi',
      'Lanjutkan tanpa perlu konseling karena katup mekanik bukan faktor risiko',
    ],
    benar: 1,
    pembahasan:
      'Perubahan antikoagulan, terutama pada katup mekanik, harus mempertimbangkan risiko trombosis maternal dan komplikasi janin, dan obat tidak dihentikan secara mandiri [1,8]. Peninjauan obat termasuk komponen konseling prakonsepsi (Tabel 6.3).',
  },
]
