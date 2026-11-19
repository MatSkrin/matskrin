/**
 * Data kriteria skor risiko kardiovaskular maternal.
 *
 * STATUS VERIFIKASI: kriteria di bawah disusun dari publikasi asli
 * (CARPREG II: Silversides 2018; ZAHARA: Drenthen 2010) dan tabel mWHO
 * pada pedoman ESC 2018. Belum dicocokkan baris per baris dengan
 * pedoman ESC 2025 (De Backer, Eur Heart J 2025;46:4462–568,
 * doi 10.1093/eurheartj/ehaf193). Jangan dipakai klinis sebelum diverifikasi.
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
  id: 'carpreg2' | 'zahara'
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
    'Memprediksi kejadian kardiak maternal (gagal jantung, aritmia, stroke, henti jantung, kematian) pada perempuan hamil dengan penyakit jantung.',
  sumber:
    'Silversides CK, et al. J Am Coll Cardiol. 2018;71(21):2419–30. doi:10.1016/j.jacc.2018.02.076',
  kriteria: [
    { id: 'riwayat-kejadian', label: 'Riwayat kejadian kardiak atau aritmia sebelumnya', poin: 3 },
    { id: 'nyha-sianosis', label: 'Kelas fungsional NYHA III–IV atau sianosis saat awal', poin: 3 },
    { id: 'katup-mekanik', label: 'Katup jantung mekanik', poin: 3 },
    { id: 'disfungsi-ventrikel', label: 'Disfungsi ventrikel (sedang–berat)', poin: 2 },
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

export const ZAHARA: SkorRisiko = {
  id: 'zahara',
  nama: 'ZAHARA',
  deskripsi:
    'Memprediksi komplikasi kardiovaskular maternal pada perempuan hamil dengan penyakit jantung bawaan.',
  sumber:
    'Drenthen W, et al. Eur Heart J. 2010;31(17):2124–32. doi:10.1093/eurheartj/ehq200',
  kriteria: [
    { id: 'riwayat-aritmia', label: 'Riwayat aritmia', poin: 1.5 },
    { id: 'obat-jantung', label: 'Penggunaan obat jantung sebelum hamil', poin: 1.5 },
    { id: 'nyha', label: 'Kelas fungsional NYHA > II (III–IV) sebelum hamil', poin: 0.75 },
    {
      id: 'obstruksi-kiri',
      label: 'Obstruksi jantung kiri',
      keterangan: 'Gradien puncak > 50 mmHg atau area katup aorta < 1,0 cm²',
      poin: 2.5,
    },
    { id: 'regurgitasi-av-sistemik', label: 'Regurgitasi katup AV sistemik sedang–berat', poin: 0.75 },
    { id: 'regurgitasi-av-pulmonal', label: 'Regurgitasi katup AV pulmonal sedang–berat', poin: 0.75 },
    { id: 'katup-mekanik', label: 'Katup prostetik mekanik', poin: 4.25 },
    { id: 'sianotik', label: 'Penyakit jantung sianotik (sudah atau belum dikoreksi)', poin: 1 },
  ],
  rentang: [
    { min: 0, max: 0.5, label: '0–0,50 poin', risiko: '2,9%' },
    { min: 0.51, max: 1.5, label: '0,51–1,50 poin', risiko: '7,5%' },
    { min: 1.51, max: 2.5, label: '1,51–2,50 poin', risiko: '17,5%' },
    { min: 2.51, max: 3.5, label: '2,51–3,50 poin', risiko: '43,1%' },
    { min: 3.51, max: Infinity, label: '> 3,50 poin', risiko: '70%' },
  ],
}

export type KelasMWHO = 'I' | 'II' | 'II–III' | 'III' | 'IV'

export type InfoKelasMWHO = {
  kelas: KelasMWHO
  risiko: string
  kejadian: string
  konseling: string
  pusat: string
  kontrol: string
  kondisi: { id: string; label: string }[]
}

export const MWHO: InfoKelasMWHO[] = [
  {
    kelas: 'I',
    risiko: 'Tidak ada peningkatan mortalitas maternal yang terdeteksi; tidak ada atau sedikit peningkatan morbiditas.',
    kejadian: '2,5–5%',
    konseling: 'Ya',
    pusat: 'Rumah sakit setempat',
    kontrol: 'Satu atau dua kali selama kehamilan',
    kondisi: [
      { id: 'i-ringan', label: 'Stenosis pulmonal, PDA, atau prolaps katup mitral yang kecil/ringan tanpa komplikasi' },
      { id: 'i-koreksi', label: 'Lesi sederhana yang berhasil dikoreksi (ASD, VSD, PDA, anomali drainase vena pulmonal)' },
      { id: 'i-ektopik', label: 'Denyut ektopik atrial atau ventrikel yang terisolasi' },
    ],
  },
  {
    kelas: 'II',
    risiko: 'Peningkatan kecil mortalitas maternal atau peningkatan sedang morbiditas.',
    kejadian: '5,7–10,5%',
    konseling: 'Ya',
    pusat: 'Rumah sakit setempat',
    kontrol: 'Setiap trimester',
    kondisi: [
      { id: 'ii-asd-vsd', label: 'ASD atau VSD yang belum dioperasi' },
      { id: 'ii-tof', label: 'Tetralogi Fallot yang sudah dikoreksi' },
      { id: 'ii-aritmia', label: 'Sebagian besar aritmia (aritmia supraventrikular)' },
      { id: 'ii-turner', label: 'Sindrom Turner tanpa dilatasi aorta' },
    ],
  },
  {
    kelas: 'II–III',
    risiko: 'Peningkatan sedang mortalitas maternal atau peningkatan sedang–berat morbiditas.',
    kejadian: '10–19%',
    konseling: 'Ya',
    pusat: 'Rumah sakit rujukan',
    kontrol: 'Setiap dua bulan',
    kondisi: [
      { id: 'iiiii-lv-ringan', label: 'Gangguan fungsi ventrikel kiri ringan (EF > 45%)' },
      { id: 'iiiii-hcm', label: 'Kardiomiopati hipertrofik' },
      { id: 'iiiii-katup', label: 'Penyakit katup native atau bioprostetik yang tidak termasuk kelas I atau IV (stenosis mitral ringan, stenosis aorta sedang)' },
      { id: 'iiiii-marfan', label: 'Sindrom Marfan atau HTAD lain tanpa dilatasi aorta' },
      { id: 'iiiii-bav', label: 'Aorta < 45 mm pada katup aorta bikuspid' },
      { id: 'iiiii-koarktasio', label: 'Koarktasio yang sudah dikoreksi' },
      { id: 'iiiii-avsd', label: 'Defek septum atrioventrikular (AVSD)' },
    ],
  },
  {
    kelas: 'III',
    risiko: 'Peningkatan bermakna mortalitas maternal atau morbiditas berat.',
    kejadian: '19–27%',
    konseling: 'Ya: konseling ahli diperlukan',
    pusat: 'Pusat rujukan ahli kehamilan dan penyakit jantung',
    kontrol: 'Setiap bulan atau dua bulan',
    kondisi: [
      { id: 'iii-lv-sedang', label: 'Gangguan fungsi ventrikel kiri sedang (EF 30–45%)' },
      { id: 'iii-ppcm', label: 'Riwayat PPCM tanpa sisa gangguan fungsi ventrikel kiri' },
      { id: 'iii-mekanik', label: 'Katup mekanik' },
      { id: 'iii-rv-sistemik', label: 'Ventrikel kanan sistemik dengan fungsi baik atau sedikit menurun' },
      { id: 'iii-fontan', label: 'Sirkulasi Fontan (jika kondisi lain baik)' },
      { id: 'iii-sianotik', label: 'Penyakit jantung sianotik yang belum dikoreksi' },
      { id: 'iii-kompleks', label: 'Penyakit jantung kompleks lainnya' },
      { id: 'iii-ms-sedang', label: 'Stenosis mitral sedang' },
      { id: 'iii-as-berat', label: 'Stenosis aorta berat asimtomatik' },
      { id: 'iii-aorta', label: 'Dilatasi aorta sedang (40–45 mm pada Marfan/HTAD; 45–50 mm pada katup bikuspid; ASI 20–25 mm/m² pada Turner; < 50 mm pada tetralogi Fallot)' },
      { id: 'iii-vt', label: 'Takikardia ventrikel' },
    ],
  },
  {
    kelas: 'IV',
    risiko: 'Risiko mortalitas maternal atau morbiditas berat sangat tinggi; kehamilan dikontraindikasikan.',
    kejadian: '40–100%',
    konseling: 'Ya: kehamilan dikontraindikasikan; bila hamil, diskusikan terminasi',
    pusat: 'Pusat rujukan ahli kehamilan dan penyakit jantung',
    kontrol: 'Setiap bulan',
    kondisi: [
      { id: 'iv-pah', label: 'Hipertensi arteri pulmonal' },
      { id: 'iv-lv-berat', label: 'Disfungsi ventrikel sistemik berat (EF < 30% atau NYHA III–IV)' },
      { id: 'iv-ppcm', label: 'Riwayat PPCM dengan sisa gangguan fungsi ventrikel kiri' },
      { id: 'iv-ms-berat', label: 'Stenosis mitral berat' },
      { id: 'iv-as-berat', label: 'Stenosis aorta berat simtomatik' },
      { id: 'iv-rv-sistemik', label: 'Ventrikel kanan sistemik dengan fungsi menurun sedang–berat' },
      { id: 'iv-aorta', label: 'Dilatasi aorta berat (> 45 mm pada Marfan/HTAD; > 50 mm pada katup bikuspid; ASI > 25 mm/m² pada Turner; > 50 mm pada tetralogi Fallot)' },
      { id: 'iv-ehlers', label: 'Sindrom Ehlers-Danlos vaskular' },
      { id: 'iv-koarktasio', label: '(Re)koarktasio berat' },
      { id: 'iv-fontan', label: 'Sirkulasi Fontan dengan komplikasi apa pun' },
    ],
  },
]

export const SUMBER_MWHO =
  'Regitz-Zagrosek V, et al. 2018 ESC Guidelines for the management of cardiovascular diseases during pregnancy. Eur Heart J. 2018;39(34):3165–241. doi:10.1093/eurheartj/ehy340'
