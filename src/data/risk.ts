/**
 * Data kriteria skor risiko kardiovaskular maternal.
 *
 * mWHO 2.0 mengikuti Tabel 6 pedoman ESC 2025 (De Backer, Eur Heart J
 * 2025;46:4462–568, doi 10.1093/eurheartj/ehaf193), diverifikasi 23 Nov 2026.
 * Poin CARPREG II sama dengan modifier di Tabel 6; persentase risiko per skor
 * berasal dari publikasi asli (Silversides 2018), bukan dari ESC.
 */

export type Kriteria = {
  id: string
  label: string
  keterangan?: string
  poin: number
}

export type Rentang = {
  /** batas bawah skor (inklusif) */
  min: number
  /** batas atas skor (inklusif); Infinity untuk kategori terakhir */
  max: number
  label: string
  risiko: string
}

export type SkorRisiko = {
  id: 'carpreg2'
  nama: string
  deskripsi: string
  sumber: string
  kriteria: Kriteria[]
  rentang: Rentang[]
}

export const CARPREG2: SkorRisiko = {
  id: 'carpreg2',
  nama: 'CARPREG II',
  deskripsi:
    'Memprediksi kejadian kardiak maternal (gagal jantung, aritmia, stroke, henti jantung, kematian) pada perempuan hamil dengan penyakit jantung. ESC 2025 memakai prediktor CARPREG II untuk menyesuaikan risiko kelas mWHO 2.0 tiap pasien.',
  sumber:
    'Silversides CK, et al. J Am Coll Cardiol. 2018;71(21):2419–30. doi:10.1016/j.jacc.2018.02.076',
  kriteria: [
    { id: 'riwayat-kejadian', label: 'Riwayat kejadian kardiak atau aritmia sebelumnya', poin: 3 },
    { id: 'nyha-sianosis', label: 'Kelas fungsional NYHA III–IV atau sianosis saat awal', poin: 3 },
    { id: 'katup-mekanik', label: 'Katup jantung mekanik', poin: 3 },
    { id: 'disfungsi-ventrikel', label: 'Disfungsi ventrikel', poin: 2 },
    {
      id: 'katup-kiri',
      label: 'Penyakit katup jantung kiri risiko tinggi atau obstruksi alur keluar ventrikel kiri',
      poin: 2,
    },
    { id: 'hipertensi-pulmonal', label: 'Hipertensi pulmonal', poin: 2 },
    { id: 'pjk', label: 'Penyakit jantung koroner', poin: 2 },
    { id: 'aortopati', label: 'Aortopati risiko tinggi', poin: 2 },
    { id: 'tanpa-intervensi', label: 'Belum pernah menjalani intervensi jantung', poin: 1 },
    { id: 'evaluasi-terlambat', label: 'Evaluasi pertama kali setelah usia kehamilan 20 minggu', poin: 1 },
  ],
  rentang: [
    { min: 0, max: 1, label: '0–1 poin', risiko: '5%' },
    { min: 2, max: 2, label: '2 poin', risiko: '10%' },
    { min: 3, max: 3, label: '3 poin', risiko: '15%' },
    { min: 4, max: 4, label: '4 poin', risiko: '22%' },
    { min: 5, max: Infinity, label: '>4 poin', risiko: '41%' },
  ],
}

export type KelasMWHO = 'I' | 'II' | 'II–III' | 'III' | 'IV'

export type KelompokMWHO =
  | 'Fungsi ventrikel dan hipertensi pulmonal'
  | 'Aritmia'
  | 'Kardiomiopati'
  | 'Penyakit jantung bawaan'
  | 'Penyakit katup jantung'
  | 'Aortopati'
  | 'Penyakit didapat, koroner, dan lainnya'

export type KondisiMWHO = { id: string; kelompok: KelompokMWHO; label: string }

export type InfoKelasMWHO = {
  kelas: KelasMWHO
  risiko: string
  /** Rerata angka kejadian kardiak maternal menurut dua kohort yang dikutip Tabel 6 ESC 2025. */
  kejadian: { vanHagen: string; silversides: string }
  pht: string
  konseling: string
  perawatan: string
  persalinan: string
  kondisi: KondisiMWHO[]
}

const FV = 'Fungsi ventrikel dan hipertensi pulmonal' as const
const AR = 'Aritmia' as const
const KM = 'Kardiomiopati' as const
const PJB = 'Penyakit jantung bawaan' as const
const KT = 'Penyakit katup jantung' as const
const AO = 'Aortopati' as const
const LN = 'Penyakit didapat, koroner, dan lainnya' as const

export const MWHO: InfoKelasMWHO[] = [
  {
    kelas: 'I',
    risiko: 'Tidak ada peningkatan mortalitas maternal yang terdeteksi; tidak ada atau sedikit peningkatan morbiditas.',
    kejadian: { vanHagen: '9,9%', silversides: '3,1%' },
    pht: 'Tidak',
    konseling: 'Ya, oleh tenaga kesehatan yang biasa menangani',
    perawatan: 'Rumah sakit setempat',
    persalinan: 'Rumah sakit setempat',
    kondisi: [
      { id: 'i-ektopik', kelompok: AR, label: 'Denyut ektopik atrial atau ventrikel yang terisolasi' },
      { id: 'i-hcm-gen', kelompok: KM, label: 'HCM genotipe positif, fenotipe negatif' },
      {
        id: 'i-koreksi',
        kelompok: PJB,
        label: 'Lesi sederhana yang berhasil dikoreksi tanpa komplikasi residual bermakna (ASD, VSD, PDA, anomali drainase vena pulmonal)',
      },
      { id: 'i-ps', kelompok: KT, label: 'Stenosis pulmonal kecil atau ringan' },
      { id: 'i-mvp', kelompok: KT, label: 'Prolaps katup mitral tanpa regurgitasi bermakna' },
      { id: 'i-aorta', kelompok: AO, label: 'Dilatasi aorta ringan (< 40 mm) bukan HTAD' },
    ],
  },
  {
    kelas: 'II',
    risiko: 'Peningkatan kecil mortalitas maternal atau peningkatan sedang morbiditas.',
    kejadian: { vanHagen: '7,7%', silversides: '21,7%' },
    pht: 'Tidak',
    konseling: 'Ya, oleh tenaga kesehatan yang biasa menangani',
    perawatan: 'Rumah sakit setempat',
    persalinan: 'Rumah sakit setempat',
    kondisi: [
      { id: 'ii-svt', kelompok: AR, label: 'Sebagian besar aritmia supraventrikular' },
      { id: 'ii-pacu', kelompok: AR, label: 'Bradikardia yang memerlukan pacu jantung' },
      { id: 'ii-asd-vsd', kelompok: PJB, label: 'ASD atau VSD tanpa komplikasi yang belum dioperasi' },
      { id: 'ii-tof', kelompok: PJB, label: 'Tetralogi Fallot terkoreksi tanpa lesi residual hemodinamik atau aritmia bermakna' },
      { id: 'ii-tga', kelompok: PJB, label: 'TGA pasca-operasi arterial switch tanpa lesi residual bermakna' },
      {
        id: 'ii-turner',
        kelompok: AO,
        label: 'Sindrom Turner tanpa kelainan kardiovaskular (katup aorta bikuspid, koarktasio, hipertensi, dilatasi aorta)',
      },
    ],
  },
  {
    kelas: 'II–III',
    risiko: 'Peningkatan sedang mortalitas maternal atau peningkatan sedang–berat morbiditas.',
    kejadian: { vanHagen: '17,7%', silversides: '12,8%' },
    pht: 'Ya',
    konseling: 'Ya, konseling ahli oleh Pregnancy Heart Team',
    perawatan: 'Perawatan bersama rumah sakit setempat dan Pregnancy Heart Team',
    persalinan: 'Bersama rumah sakit setempat dan Pregnancy Heart Team; lokasi bergantung pada status kardiovaskular dan perjalanan kehamilan',
    kondisi: [
      { id: 'iiiii-lv-ringan', kelompok: FV, label: 'Gangguan fungsi ventrikel kiri ringan (EF > 45%)' },
      { id: 'iiiii-rv', kelompok: FV, label: 'Gangguan bermakna fungsi ventrikel kanan (subpulmonal)' },
      { id: 'iiiii-lqts', kelompok: AR, label: 'LQTS risiko rendah: tanpa kejadian sebelumnya dan dengan beta-bloker dosis penuh' },
      { id: 'iiiii-cpvt', kelompok: AR, label: 'CPVT risiko rendah: terkontrol baik dengan obat' },
      { id: 'iiiii-brs', kelompok: AR, label: 'Sindrom Brugada tanpa kejadian sebelumnya' },
      { id: 'iiiii-arvc', kelompok: KM, label: 'ARVC risiko rendah: genotipe positif, tanpa fenotipe atau fenotipe ringan' },
      { id: 'iiiii-hcm', kelompok: KM, label: 'HCM tanpa komplikasi' },
      { id: 'iiiii-dcm', kelompok: KM, label: 'DCM/NDLVC dengan fungsi ventrikel kiri normal atau gangguan ringan (EF > 45%)' },
      { id: 'iiiii-avsd', kelompok: PJB, label: 'AVSD terkoreksi tanpa lesi residual bermakna' },
      {
        id: 'iiiii-ebstein',
        kelompok: PJB,
        label: 'Anomali Ebstein tanpa komplikasi: regurgitasi trikuspid ringan–sedang, tanpa stenosis trikuspid, tanpa jalur aksesori',
      },
      {
        id: 'iiiii-katup',
        kelompok: KT,
        label: 'Penyakit katup native, homograft, atau bioprostetik yang tidak termasuk kelas I atau IV (stenosis mitral ringan, stenosis aorta sedang)',
      },
      { id: 'iiiii-regurgitasi', kelompok: KT, label: 'Regurgitasi katup sedang' },
      { id: 'iiiii-marfan', kelompok: AO, label: 'Sindrom Marfan atau HTAD lain tanpa dilatasi aorta' },
      { id: 'iiiii-bav', kelompok: AO, label: 'Aorta < 45 mm pada kelainan katup aorta bikuspid' },
      { id: 'iiiii-koarktasio', kelompok: AO, label: 'Koarktasio yang sudah dikoreksi' },
    ],
  },
  {
    kelas: 'III',
    risiko: 'Peningkatan bermakna mortalitas maternal atau morbiditas berat.',
    kejadian: { vanHagen: '28,9%', silversides: '21,1%' },
    pht: 'Ya',
    konseling: 'Ya, konseling ahli oleh Pregnancy Heart Team',
    perawatan: 'Dipimpin Pregnancy Heart Team',
    persalinan: 'Pusat ahli, dipimpin Pregnancy Heart Team',
    kondisi: [
      { id: 'iii-lv-sedang', kelompok: FV, label: 'Gangguan fungsi ventrikel kiri sedang (EF 30–45%)' },
      { id: 'iii-ppcm', kelompok: FV, label: 'Riwayat PPCM dengan sisa gangguan fungsi ventrikel kiri paling banyak ringan' },
      { id: 'iii-vt', kelompok: AR, label: 'Takikardia ventrikel menetap (sustained) dari etiologi apa pun' },
      { id: 'iii-lqt2', kelompok: AR, label: 'LQT2 (masa pascapersalinan)' },
      { id: 'iii-kanalopati', kelompok: AR, label: 'CPVT simtomatik atau LQTS yang tidak terkontrol dengan terapi' },
      { id: 'iii-brs', kelompok: AR, label: 'Sindrom Brugada dengan kejadian sebelumnya' },
      { id: 'iii-arvc', kelompok: KM, label: 'ARVC sedang atau berat' },
      { id: 'iii-hcm', kelompok: KM, label: 'HCM dengan komplikasi aritmia dan/atau hemodinamik sedang' },
      { id: 'iii-dcm', kelompok: KM, label: 'DCM/NDLVC dengan gangguan fungsi ventrikel kiri sedang (EF 30–45%)' },
      { id: 'iii-sianotik', kelompok: PJB, label: 'Penyakit jantung sianotik yang belum dikoreksi (bukan Eisenmenger)' },
      { id: 'iii-rv-sistemik', kelompok: PJB, label: 'Ventrikel kanan sistemik dengan fungsi baik atau sedikit menurun' },
      {
        id: 'iii-fontan',
        kelompok: PJB,
        label: 'Sirkulasi Fontan tanpa komplikasi: fungsi ventrikel baik, tanpa penyakit katup atau aritmia bermakna, toleransi latihan baik, saturasi arteri normal',
      },
      { id: 'iii-ebstein', kelompok: PJB, label: 'Anomali Ebstein dengan komplikasi apa pun' },
      { id: 'iii-mekanik', kelompok: KT, label: 'Katup mekanik tanpa komplikasi dengan INR stabil dan terkontrol baik' },
      { id: 'iii-ms-sedang', kelompok: KT, label: 'Stenosis mitral sedang' },
      { id: 'iii-as-berat', kelompok: KT, label: 'Stenosis aorta berat asimtomatik' },
      { id: 'iii-regurgitasi', kelompok: KT, label: 'Regurgitasi katup sisi kiri yang berat' },
      {
        id: 'iii-aorta',
        kelompok: AO,
        label: 'Dilatasi aorta sedang: 40–45 mm pada Marfan/HTAD lain; 45–50 mm pada katup bikuspid; ASI 20–25 mm/m² pada Turner; dilatasi aorta lain < 50 mm',
      },
      { id: 'iii-marfan-op', kelompok: AO, label: 'Marfan dengan riwayat penggantian pangkal aorta' },
      { id: 'iii-diseksi', kelompok: AO, label: 'Riwayat diseksi aorta dengan diameter stabil' },
      { id: 'iii-scad', kelompok: LN, label: 'Riwayat SCAD (diseksi arteri koroner spontan)' },
      { id: 'iii-ska', kelompok: LN, label: 'Riwayat kejadian iskemik jantung (STEMI/NSTE-ACS)' },
      { id: 'iii-hamil', kelompok: LN, label: 'Riwayat luaran kehamilan buruk yang memerlukan rawat inap' },
      { id: 'iii-kanker', kelompok: LN, label: 'Riwayat efek samping kardiovaskular terapi kanker' },
    ],
  },
  {
    kelas: 'IV',
    risiko: 'Risiko mortalitas maternal atau morbiditas berat yang sangat tinggi.',
    kejadian: { vanHagen: '50,3%', silversides: '35,6%' },
    pht: 'Ya',
    konseling:
      'Ya, konseling ahli oleh Pregnancy Heart Team, dengan diskusi yang jelas dan menyeluruh tentang risiko kehamilan yang sangat tinggi serta pengambilan keputusan bersama mengenai terminasi bila terjadi kehamilan',
    perawatan: 'Dipimpin Pregnancy Heart Team',
    persalinan: 'Pusat ahli, dipimpin Pregnancy Heart Team',
    kondisi: [
      { id: 'iv-lv-berat', kelompok: FV, label: 'Gangguan fungsi ventrikel kiri berat (EF < 30% atau NYHA III–IV)' },
      { id: 'iv-ppcm', kelompok: FV, label: 'Riwayat PPCM dengan sisa gangguan fungsi ventrikel kiri lebih dari ringan' },
      { id: 'iv-pah', kelompok: FV, label: 'Hipertensi arteri pulmonal (PAH)' },
      { id: 'iv-dcm', kelompok: KM, label: 'DCM/NDLVC dengan gangguan fungsi ventrikel kiri berat (EF < 30% atau NYHA III–IV)' },
      { id: 'iv-hcm-lvoto', kelompok: KM, label: 'HCM dengan obstruksi alur keluar berat simtomatik (≥ 50 mmHg)' },
      { id: 'iv-hcm-lv', kelompok: KM, label: 'HCM dengan disfungsi ventrikel kiri sangat simtomatik (EF < 50%)' },
      { id: 'iv-rv-sistemik', kelompok: PJB, label: 'Ventrikel kanan sistemik dengan fungsi menurun sedang atau berat' },
      { id: 'iv-fontan', kelompok: PJB, label: 'Sirkulasi Fontan dengan komplikasi apa pun' },
      { id: 'iv-eisenmenger', kelompok: PJB, label: 'Sindrom Eisenmenger' },
      { id: 'iv-ms-berat', kelompok: KT, label: 'Stenosis mitral berat' },
      { id: 'iv-as-berat', kelompok: KT, label: 'Stenosis aorta berat simtomatik' },
      {
        id: 'iv-aorta',
        kelompok: AO,
        label: 'Dilatasi aorta berat: > 45 mm pada Marfan/HTAD lain; > 50 mm pada katup bikuspid; ASI > 25 mm/m² pada Turner; dilatasi aorta lain > 50 mm',
      },
      { id: 'iv-ehlers', kelompok: AO, label: 'Sindrom Ehlers-Danlos vaskular' },
      { id: 'iv-koarktasio', kelompok: AO, label: '(Re)koarktasio berat' },
      { id: 'iv-diseksi', kelompok: AO, label: 'Riwayat diseksi aorta dengan diameter yang bertambah' },
    ],
  },
]

export const SUMBER_MWHO =
  'De Backer J, et al. 2025 ESC Guidelines for the management of cardiovascular disease and pregnancy. Eur Heart J. 2025;46(43):4462–568. doi:10.1093/eurheartj/ehaf193 (Tabel 6)'

/** Sumber angka kejadian kardiak per kelas mWHO yang dikutip Tabel 6 ESC 2025. */
export const SUMBER_KEJADIAN = {
  vanHagen:
    'van Hagen IM, Boersma E, Johnson MR, Thorne SA, Parsonage WA, Escribano Subías P, et al. Global cardiac risk assessment in the Registry of Pregnancy and Cardiac Disease: results of a registry from the European Society of Cardiology. Eur J Heart Fail. 2016;18:523–33. doi:10.1002/ejhf.501',
  silversides: CARPREG2.sumber,
}

/** Definisi kejadian kardiak menurut catatan kaki Tabel 6 ESC 2025. */
export const DEFINISI_KEJADIAN =
  'Kejadian kardiak: henti jantung, kematian kardiak, aritmia yang memerlukan terapi, gagal jantung kiri/kanan, kejadian tromboemboli, diseksi aorta, sindrom koroner akut, atau rawat inap karena alasan jantung. Endokarditis hanya dihitung oleh van Hagen dkk.'
