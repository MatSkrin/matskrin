/**
 * Panduan klinis deteksi dini penyakit jantung pada ibu hamil di FKTP/puskesmas.
 *
 * Sumber: materi "Auskultasi Terstruktur, Varian Normal EKG Kehamilan, dan Kriteria Rujukan
 * Ekokardiografi" (Bintang Kusuma Prabowo, FK-KMK UGM/RSUP Dr. Sardjito, Nov 2026), yang
 * mengadaptasi algoritma ACOG 2023 (red flags) dan CMQCC/CDPH CVD in Pregnancy Toolkit 2017.
 * Ambang tanda vital dan aturan triase berasal dari ACOG/CMQCC, bukan dari ESC 2025 (ESC tidak
 * menetapkan ambang triase antenatal). Butir riwayat, EKG, biomarker, dan katup mekanik
 * diselaraskan dengan ESC 2025 (verifikasi 23 Nov 2026). Kriteria EKG: konduksi dan
 * preeksitasi dari Surawicz 2009, ST-T dan QTc dari Rautaharju 2009, pola ASD dari Webb &
 * Gatzoulis 2006, petunjuk PPCM dari Bauersachs 2019, palpitasi dari Adamson & Nelson-Piercy 2007,
 * kesalahan perekaman dari Kligfield 2007, Batchvarov 2007, dan Walsh 2018 (sesuai slide materi).
 */

export type Tingkat = 'merah' | 'kuning'

export type Temuan = {
  id: string
  label: string
  detail?: string
  tingkat: Tingkat
  /** Naik menjadi merah bila ibu datang dengan keluhan (gejala waspada). */
  merahBilaGejala?: boolean
  /** Hanya dihitung bila ibu datang dengan keluhan (mis. S3). */
  hanyaBilaGejala?: boolean
}

export type Kategori = 'riwayat' | 'faktor' | 'gejala' | 'vital' | 'fisik' | 'ekg'

export const RIWAYAT: Temuan[] = [
  { id: 'r-pjb', label: 'Penyakit jantung bawaan, termasuk yang sudah dioperasi/dikoreksi', tingkat: 'kuning' },
  { id: 'r-katup', label: 'Penyakit katup jantung atau riwayat demam rematik', tingkat: 'kuning' },
  { id: 'r-kardiomiopati', label: 'Kardiomiopati, termasuk riwayat PPCM', tingkat: 'kuning' },
  { id: 'r-aorta', label: 'Aortopati (mis. sindrom Marfan)', tingkat: 'kuning' },
  { id: 'r-hp', label: 'Hipertensi pulmonal atau desaturasi yang tidak terjelaskan', tingkat: 'kuning' },
  { id: 'r-kemo', label: 'Riwayat kemoterapi kardiotoksik (mis. doksorubisin)', tingkat: 'kuning' },
  { id: 'r-koroner', label: 'Riwayat SCAD atau sindrom koroner akut (STEMI/NSTE-ACS)', tingkat: 'kuning' },
  {
    id: 'r-kanalopati',
    label: 'Kanalopati (sindrom QT panjang, sindrom Brugada, CPVT) atau aritmia yang pernah diterapi',
    tingkat: 'kuning',
  },
  { id: 'r-pacu', label: 'Memakai pacu jantung', tingkat: 'kuning' },
  { id: 'r-katup-mekanik', label: 'Katup jantung mekanik (minum antikoagulan)', tingkat: 'kuning' },
  { id: 'r-hamil', label: 'Rawat inap karena masalah jantung pada kehamilan sebelumnya', tingkat: 'kuning' },
  { id: 'r-keluarga', label: 'Keluarga dengan penyakit jantung herediter atau kematian mendadak usia muda', tingkat: 'kuning' },
]

export const FAKTOR_RISIKO: Temuan[] = [
  { id: 'f-usia', label: 'Usia ≥ 40 tahun', tingkat: 'kuning' },
  { id: 'f-imt', label: 'IMT ≥ 35', tingkat: 'kuning' },
  { id: 'f-dm', label: 'Diabetes melitus', tingkat: 'kuning' },
  { id: 'f-ht', label: 'Hipertensi', tingkat: 'kuning' },
  { id: 'f-rokok', label: 'Merokok atau penggunaan zat', tingkat: 'kuning' },
]

export const KELUHAN_WAJAR = [
  'Sesak ringan saat aktivitas, membaik dengan istirahat',
  'Mudah lelah',
  'Edema tungkai ringan yang dependen',
  'Berdebar sesaat tanpa pusing atau pingsan',
  'Pusing saat lama telentang, membaik bila miring kiri',
]

export const GEJALA: Temuan[] = [
  { id: 'g-sesak-istirahat', label: 'Sesak saat istirahat atau ortopnea berat', tingkat: 'merah' },
  {
    id: 'g-nyeri-dada-berat',
    label: 'Nyeri dada saat istirahat/aktivitas ringan, atau terasa seperti robek',
    tingkat: 'merah',
  },
  { id: 'g-sinkop', label: 'Sinkop, atau palpitasi disertai hampir pingsan', tingkat: 'merah' },
  { id: 'g-sesak', label: 'Sesak yang progresif atau tidak sebanding dengan usia kehamilan', tingkat: 'kuning' },
  { id: 'g-ortopnea', label: 'Ortopnea atau PND (terbangun karena sesak)', tingkat: 'kuning' },
  { id: 'g-nyeri-dada', label: 'Nyeri dada', tingkat: 'kuning' },
  { id: 'g-batuk', label: 'Batuk atau mengi baru, termasuk pada masa nifas', tingkat: 'kuning' },
]

export const VITAL_TAMBAHAN: Temuan[] = [
  { id: 'v-takikardia', label: 'Takikardia sinus > 100 kali/menit yang menetap tanpa sebab jelas', tingkat: 'kuning' },
  { id: 'v-desaturasi', label: 'Desaturasi saat berjalan', tingkat: 'kuning' },
]

export const FISIK: Temuan[] = [
  { id: 'p-diastolik', label: 'Bising diastolik apa pun', tingkat: 'kuning', merahBilaGejala: true },
  { id: 'p-keras', label: 'Bising ≥ 3/6 atau teraba thrill', tingkat: 'kuning', merahBilaGejala: true },
  { id: 'p-holosistolik', label: 'Bising holosistolik atau sistolik akhir', tingkat: 'kuning' },
  {
    id: 'p-kontinu',
    label: 'Bising kontinu',
    detail: 'Kecuali venous hum atau mammary souffle yang khas',
    tingkat: 'kuning',
  },
  { id: 'p-jalar', label: 'Bising menjalar ke leher atau punggung', tingkat: 'kuning' },
  {
    id: 'p-s2',
    label: 'Klik ejeksi, opening snap, split S2 lebar menetap, atau P2 keras',
    tingkat: 'kuning',
  },
  { id: 'p-s4', label: 'S4', tingkat: 'kuning', merahBilaGejala: true },
  {
    id: 'p-s3',
    label: 'S3',
    detail: 'Dihitung hanya bila ibu datang dengan keluhan',
    tingkat: 'merah',
    hanyaBilaGejala: true,
  },
  {
    id: 'p-klik',
    label: 'Pada ibu dengan katup mekanik: bunyi klik katup berubah atau melemah, atau ada bising baru',
    detail: 'Curigai trombosis katup. Bila disertai sesak, tanda emboli, atau sinkop, perlu penilaian segera',
    tingkat: 'kuning',
    merahBilaGejala: true,
  },
  { id: 'p-heave', label: 'Heave parasternal', tingkat: 'kuning' },
  { id: 'p-ronki', label: 'Ronki basal atau mengi', tingkat: 'merah' },
  { id: 'p-jvp', label: 'Distensi vena leher menetap', tingkat: 'merah' },
  { id: 'p-sianosis', label: 'Sianosis atau jari tabuh', tingkat: 'kuning' },
]

export const EKG: Temuan[] = [
  { id: 'e-rad', label: 'Aksis ke kanan (RAD, > +90°) atau R dominan di V1', detail: 'Beban ventrikel kanan: ASD, HP, MS', tingkat: 'kuning' },
  { id: 'e-rbbb', label: 'RBBB (inkomplet/komplet) disertai RAD', detail: 'Curigai ASD sekundum', tingkat: 'kuning' },
  { id: 'e-aritmia', label: 'AF, flutter, SVT, atau VT', detail: 'Pada ibu hamil dengan AF, pikirkan stenosis mitral rematik', tingkat: 'kuning' },
  { id: 'e-ektopik', label: 'Ekstrasistol sering, berpasangan, beruntun, atau bergejala', tingkat: 'kuning' },
  { id: 'e-delta', label: 'PR pendek dengan gelombang delta (preeksitasi)', tingkat: 'kuning' },
  { id: 'e-blok', label: 'Blok AV derajat 2–3', tingkat: 'kuning' },
  { id: 'e-lbbb', label: 'LBBB atau QRS ≥ 120 ms', detail: 'Pikirkan kardiomiopati, termasuk PPCM', tingkat: 'kuning' },
  {
    id: 'e-iskemia',
    label: 'Q patologis, ST elevasi/depresi bermakna, atau T inversi dalam di lateral',
    tingkat: 'kuning',
  },
  { id: 'e-qtc', label: 'QTc ≥ 460 ms', detail: 'Batas QTc memanjang pada perempuan (Rautaharju 2009)', tingkat: 'kuning' },
  { id: 'e-hipertrofi', label: 'LVH/RVH dengan strain, atau P mitral/pulmonal', tingkat: 'kuning' },
  {
    id: 'e-np',
    label: 'BNP atau NT-proBNP meningkat (bila tersedia)',
    detail:
      'ESC 2025: belum ada titik potong yang jelas selama kehamilan; nilai normal memiliki nilai prediksi negatif tinggi untuk gagal jantung',
    tingkat: 'kuning',
  },
]

export type Vital = { nadi?: number; tds?: number; rr?: number; spo2?: number }

export type HasilVital = { label: string; nilai: string; tingkat: Tingkat }

/** Ambang tanda vital istirahat (adaptasi ACOG 2023 dan CMQCC). */
export function nilaiVital(v: Vital): HasilVital[] {
  const out: HasilVital[] = []
  if (v.nadi != null) {
    if (v.nadi >= 120) out.push({ label: 'Nadi ≥ 120', nilai: `${v.nadi}/menit`, tingkat: 'merah' })
    else if (v.nadi >= 110) out.push({ label: 'Nadi ≥ 110', nilai: `${v.nadi}/menit`, tingkat: 'kuning' })
  }
  if (v.tds != null) {
    if (v.tds >= 160) out.push({ label: 'TD sistolik ≥ 160', nilai: `${v.tds} mmHg`, tingkat: 'merah' })
    else if (v.tds < 90) out.push({ label: 'TD sistolik < 90', nilai: `${v.tds} mmHg`, tingkat: 'merah' })
    else if (v.tds >= 140) out.push({ label: 'TD sistolik ≥ 140', nilai: `${v.tds} mmHg`, tingkat: 'kuning' })
  }
  if (v.rr != null) {
    if (v.rr >= 25) out.push({ label: 'Laju napas ≥ 25', nilai: `${v.rr}/menit`, tingkat: 'merah' })
    else if (v.rr >= 24) out.push({ label: 'Laju napas ≥ 24', nilai: `${v.rr}/menit`, tingkat: 'kuning' })
  }
  if (v.spo2 != null) {
    if (v.spo2 <= 94) out.push({ label: 'SpO₂ ≤ 94%', nilai: `${v.spo2}%`, tingkat: 'merah' })
    else if (v.spo2 <= 96) out.push({ label: 'SpO₂ ≤ 96%', nilai: `${v.spo2}%`, tingkat: 'kuning' })
  }
  return out
}

export const SUMBER_PANDUAN = [
  'Prabowo BK. Auskultasi Terstruktur, Varian Normal EKG Kehamilan, dan Kriteria Rujukan Ekokardiografi. FK-KMK UGM/RSUP Dr. Sardjito; November 2026.',
  'American College of Obstetricians and Gynecologists. Cardiovascular Disease in Pregnancy and Postpartum Algorithm; 2023.',
  'California Maternal Quality Care Collaborative/CDPH. Cardiovascular Disease in Pregnancy and Postpartum Toolkit; 2017.',
  'ACOG Practice Bulletin No. 212: Pregnancy and Heart Disease. Obstet Gynecol. 2019;133:e320–56.',
  'Surawicz B, Childers R, Deal BJ, Gettes LS, Bailey JJ, Gorgels A, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram: part III: intraventricular conduction disturbances. Circulation. 2009;119(10):e235–40.',
  'Rautaharju PM, Surawicz B, Gettes LS, Bailey JJ, Childers R, Deal BJ, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram: part IV: the ST segment, T and U waves, and the QT interval. Circulation. 2009;119(10):e241–50.',
  'Webb G, Gatzoulis MA. Atrial septal defects in the adult: recent progress and overview. Circulation. 2006;114(15):1645–53.',
  'Bauersachs J, König T, van der Meer P, Petrie MC, Hilfiker-Kleiner D, Mbakwem A, et al. Pathophysiology, diagnosis and management of peripartum cardiomyopathy: a position statement from the Heart Failure Association of the European Society of Cardiology Study Group on peripartum cardiomyopathy. Eur J Heart Fail. 2019;21(7):827–43.',
  'Adamson DL, Nelson-Piercy C. Managing palpitations and arrhythmias during pregnancy. Heart. 2007;93(12):1630–6.',
  'Kligfield P, Gettes LS, Bailey JJ, Childers R, Deal BJ, Hancock EW, et al. Recommendations for the standardization and interpretation of the electrocardiogram: part I: the electrocardiogram and its technology. Circulation. 2007;115(10):1306–24.',
  'Batchvarov VN, Malik M, Camm AJ. Incorrect electrode cable connection during electrocardiographic recording. Europace. 2007;9(11):1081–90.',
  'Walsh B. Misplacing V1 and V2 can have clinical consequences. Am J Emerg Med. 2018;36(5):865–70.',
  'De Backer J, et al. 2025 ESC Guidelines for the management of cardiovascular disease and pregnancy. Eur Heart J. 2025;46(43):4462–568. doi:10.1093/eurheartj/ehaf193',
]
