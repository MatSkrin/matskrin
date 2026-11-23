import { SINGKATAN } from './singkatan'

/**
 * Glosarium istilah klinis untuk dokter umum/puskesmas. Ditampilkan sebagai popover saat istilah
 * disorot atau diketuk. `alias` = bentuk lain yang dicocokkan di teks. Singkatan huruf besar
 * dicocokkan peka huruf besar-kecil; istilah kata biasa tidak.
 */
export type Istilah = { judul: string; isi: string; alias?: string[] }

const KLINIS: Record<string, Istilah> = {
  // ---- Pemeriksaan fisik ----
  heave: {
    judul: 'Heave parasternal',
    isi: 'Dorongan dinding dada di tepi kiri sternum yang teraba saat sistol bila tumit telapak tangan diletakkan di sana. Menandakan ventrikel kanan membesar atau bekerja melawan tekanan tinggi (mis. hipertensi pulmonal, stenosis mitral, ASD besar).',
    alias: ['heave parasternal', 'heave'],
  },
  thrill: {
    judul: 'Thrill',
    isi: 'Getaran halus yang teraba di dinding dada, seperti dengkur kucing, di tempat bising terdengar paling keras. Adanya thrill berarti bising minimal derajat 4/6.',
    alias: ['thrill'],
  },
  iktus: {
    judul: 'Iktus kordis',
    isi: 'Denyut apeks jantung yang teraba di dinding dada, normalnya di ICS 5 linea midklavikula kiri. Dipakai untuk menentukan letak apeks sebelum auskultasi area mitral.',
    alias: ['iktus kordis', 'iktus'],
  },
  apeks: {
    judul: 'Apeks',
    isi: 'Ujung bawah jantung (ventrikel kiri), normalnya di ICS 5 linea midklavikula kiri. Tempat terbaik mendengar bunyi dari katup mitral.',
    alias: ['apeks'],
  },
  ics: {
    judul: 'ICS (sela iga)',
    isi: 'Intercostal space: ruang di antara dua iga. ICS 2 berada tepat di bawah iga ke-2, yang menempel pada sudut Louis.',
    alias: ['ICS'],
  },
  louis: {
    judul: 'Sudut Louis',
    isi: 'Tonjolan melintang di sternum (pertemuan manubrium dan korpus sternum). Iga ke-2 menempel di sini, sehingga sela di bawahnya adalah ICS 2. Titik awal menghitung sela iga.',
    alias: ['sudut Louis'],
  },
  parasternal: {
    judul: 'Parasternal',
    isi: 'Tepat di samping tulang dada (sternum), kanan atau kiri.',
    alias: ['parasternal'],
  },
  mcl: {
    judul: 'Linea midklavikula',
    isi: 'Garis vertikal khayal yang ditarik dari titik tengah klavikula (tulang selangka) ke bawah.',
    alias: ['linea midklavikula', 'midklavikula'],
  },
  erb: {
    judul: 'Titik Erb',
    isi: 'ICS 3 tepi kiri sternum. Bising regurgitasi aorta sering paling jelas di sini, terutama saat ibu duduk condong ke depan dan menahan napas setelah ekspirasi.',
    alias: ['Erb'],
  },
  semifowler: {
    judul: 'Semi-Fowler',
    isi: 'Posisi setengah duduk dengan punggung ditinggikan 30–45°. Mengurangi tekanan rahim pada vena kava dibanding telentang datar.',
    alias: ['Semi-Fowler'],
  },
  dekubitus: {
    judul: 'Dekubitus lateral kiri',
    isi: 'Berbaring miring ke kiri. Apeks jantung mendekat ke dinding dada sehingga bunyi bernada rendah di apeks (rumble MS, S3, S4) lebih mudah terdengar.',
    alias: ['dekubitus lateral kiri', 'miring kiri'],
  },
  diafragma: {
    judul: 'Diafragma stetoskop',
    isi: 'Sisi stetoskop yang lebar dan datar. Ditekan cukup kuat ke kulit untuk mendengar bunyi bernada tinggi: S1, S2, klik, bising sistolik, regurgitasi aorta.',
    alias: ['diafragma'],
  },
  bell: {
    judul: 'Bell stetoskop',
    isi: 'Sisi stetoskop yang berbentuk mangkuk. Ditempel ringan tanpa ditekan untuk mendengar bunyi bernada rendah: S3, S4, rumble stenosis mitral. Bila ditekan kuat, bell berubah fungsi seperti diafragma.',
    alias: ['bell'],
  },
  jvp: {
    judul: 'Distensi vena leher',
    isi: 'Vena jugularis di leher tampak penuh/menonjol saat ibu setengah duduk. Bila menetap, menunjukkan tekanan di sisi kanan jantung meningkat, misalnya pada gagal jantung.',
    alias: ['distensi vena leher', 'JVP'],
  },
  ronki: {
    judul: 'Ronki basah basal',
    isi: 'Bunyi napas tambahan seperti gemeretak di dasar paru. Pada ibu hamil dengan sesak, merupakan tanda bendungan paru (edema paru) sampai terbukti lain.',
    alias: ['ronki basal', 'ronki'],
  },
  mengi: { judul: 'Mengi', isi: 'Bunyi napas bernada tinggi seperti siulan, akibat penyempitan saluran napas. Dapat berasal dari asma, tetapi juga dari bendungan paru pada gagal jantung.', alias: ['mengi'] },
  sianosis: { judul: 'Sianosis', isi: 'Warna kebiruan pada bibir, lidah, atau kuku akibat kadar oksigen darah rendah.', alias: ['sianosis'] },
  tabuh: { judul: 'Jari tabuh', isi: 'Ujung jari membulat seperti pemukul genderang dan sudut kuku hilang. Tanda hipoksia kronik, misalnya pada penyakit jantung bawaan sianotik.', alias: ['jari tabuh'] },
  ortopnea: { judul: 'Ortopnea', isi: 'Sesak saat berbaring datar yang membaik bila duduk atau memakai beberapa bantal. Tanda bendungan paru.', alias: ['ortopnea'] },
  pnd: { judul: 'PND', isi: 'Paroxysmal nocturnal dyspnea: terbangun malam hari karena sesak dan harus duduk. Tanda gagal jantung.', alias: ['PND'] },
  sinkop: { judul: 'Sinkop', isi: 'Pingsan: hilang kesadaran sesaat lalu pulih sendiri. Presinkop = hampir pingsan. Sinkop saat aktivitas atau disertai berdebar perlu dicurigai sebab jantung.', alias: ['sinkop', 'presinkop'] },
  valsalva: { judul: 'Manuver Valsalva', isi: 'Mengejan dengan mulut dan hidung tertutup beberapa detik. Mengurangi aliran balik vena sehingga kebanyakan bising melemah, kecuali bising kardiomiopati hipertrofik yang justru mengeras.', alias: ['Valsalva'] },
  // ---- Bunyi jantung dan bising ----
  s1: { judul: 'S1 (bunyi jantung I)', isi: 'Bunyi penutupan katup mitral dan trikuspid di awal sistol ("lub"). Terjadi hampir bersamaan dengan denyut karotis.', alias: ['S1'] },
  s2: { judul: 'S2 (bunyi jantung II)', isi: 'Bunyi penutupan katup aorta (A2) dan pulmonal (P2) di akhir sistol ("dub"). Normal terbelah (split) saat inspirasi.', alias: ['S2', 'S2 tunggal'] },
  s3: { judul: 'S3 (bunyi jantung III)', isi: 'Bunyi bernada rendah di awal diastol, sesaat setelah S2 (irama derap "lub-dub-da"). Bisa normal pada kehamilan, tetapi bila disertai sesak, takikardia, atau ronki menandakan gagal jantung.', alias: ['S3'] },
  s4: { judul: 'S4 (bunyi jantung IV)', isi: 'Bunyi bernada rendah tepat sebelum S1 ("da-lub-dub"), akibat atrium mendorong darah ke ventrikel yang kaku. Tidak lazim pada kehamilan; setiap S4 perlu dievaluasi.', alias: ['S4'] },
  split: { judul: 'Split S2', isi: 'S2 terdengar dua komponen (A2 lalu P2). Normal melebar saat inspirasi dan menyatu saat ekspirasi. Split lebar yang menetap pada inspirasi dan ekspirasi (fixed split) mencurigakan ASD.', alias: ['split S2 lebar menetap', 'split lebar menetap', 'split fisiologis', 'split'] },
  p2: { judul: 'P2', isi: 'Komponen pulmonal dari S2, paling jelas di area pulmonal (ICS 2 kiri). P2 yang keras menandakan tekanan arteri pulmonal tinggi (hipertensi pulmonal).', alias: ['P2'] },
  os: { judul: 'Opening snap (OS)', isi: 'Bunyi "jentikan" bernada tinggi sesaat setelah S2, saat katup mitral yang kaku dan menyempit terbuka. Khas stenosis mitral rematik.', alias: ['opening snap', 'OS'] },
  klik: { judul: 'Klik ejeksi', isi: 'Bunyi tajam di awal sistol, sesaat setelah S1, saat katup aorta atau pulmonal yang abnormal terbuka. Ditemukan pada katup aorta bikuspid atau stenosis pulmonal.', alias: ['klik ejeksi'] },
  bising: { judul: 'Bising (murmur)', isi: 'Bunyi "desir" akibat aliran darah turbulen, melalui katup yang sempit/bocor, lubang di sekat jantung, atau karena aliran yang sangat deras (seperti pada kehamilan). Dinilai dari fase, bentuk, lokasi, penjalaran, dan derajat.', alias: ['murmur'] },
  rumble: { judul: 'Rumble', isi: 'Bising diastolik bernada rendah seperti gemuruh, paling jelas di apeks dengan bell dan ibu miring kiri. Khas stenosis mitral. Mudah terlewat bila nadi cepat.', alias: ['rumble'] },
  holosistolik: { judul: 'Bising holosistolik', isi: 'Bising dengan intensitas rata sepanjang sistol, dari S1 sampai S2. Khas kebocoran katup mitral/trikuspid atau VSD; tidak pernah fungsional.', alias: ['holosistolik', 'pansistolik'] },
  ejeksi: { judul: 'Bising mid-sistolik tipe ejeksi', isi: 'Bising berbentuk belah ketupat (mengeras lalu melemah) di tengah sistol, berhenti sebelum S2. Bising aliran kehamilan berbentuk ini; stenosis aorta/pulmonal juga, tetapi biasanya lebih keras dan menjalar.', alias: ['mid-sistolik tipe ejeksi', 'mid-sistolik'] },
  kontinu: { judul: 'Bising kontinu', isi: 'Bising yang terdengar terus melewati S2, dari sistol sampai diastol, misalnya pada PDA. Venous hum dan mammary souffle adalah bising kontinu yang jinak.', alias: ['bising kontinu'] },
  diastolik: { judul: 'Bising diastolik', isi: 'Bising yang terdengar setelah S2, saat jantung mengisi. Bising diastolik selalu patologis dan perlu dicari aktif.', alias: ['bising diastolik'] },
  hum: { judul: 'Venous hum', isi: 'Bising kontinu jinak dari aliran vena di leher, paling jelas di supraklavikula kanan saat duduk. Hilang bila vena jugularis ditekan ringan.', alias: ['venous hum'] },
  souffle: { judul: 'Mammary souffle', isi: 'Bising jinak dari aliran darah arteri payudara pada trimester 2–3 dan masa menyusui. Berkurang atau hilang bila stetoskop ditekan.', alias: ['mammary souffle'] },
  levine: { judul: 'Skala Levine', isi: 'Derajat kekerasan bising 1/6 sampai 6/6. Bising ≥ 3/6 dianggap bermakna dan perlu dirujuk; ≥ 4/6 disertai thrill.', alias: ['Levine'] },
  // ---- EKG ----
  aksis: { judul: 'Aksis QRS', isi: 'Arah rata-rata listrik ventrikel pada bidang frontal, dalam derajat. Normal −30° sampai +90°. Pada kehamilan bergeser sedikit ke kiri karena jantung terdorong diafragma.', alias: ['aksis'] },
  rad: { judul: 'RAD (deviasi aksis kanan)', isi: 'Aksis QRS > +90°: QRS negatif di sadapan I dan positif di aVF. Bukan varian kehamilan; curigai beban ventrikel kanan (ASD, hipertensi pulmonal, stenosis mitral). Singkirkan dulu kabel lengan tertukar.', alias: ['RAD'] },
  lad: { judul: 'LAD (deviasi aksis kiri)', isi: 'Aksis QRS < −30°: QRS positif di I, negatif di II dan aVF. Pergeseran ringan ke kiri normal pada kehamilan, tetapi tidak sampai melewati −30°.', alias: ['LAD'] },
  rbbb: { judul: 'RBBB', isi: 'Right bundle branch block: hambatan hantaran di cabang berkas kanan. Pola rSR′ ("M") di V1. Inkomplet bila QRS < 120 ms. Disertai RAD, curigai ASD sekundum.', alias: ['RBBB'] },
  lbbb: { judul: 'LBBB', isi: 'Left bundle branch block: hambatan hantaran di cabang berkas kiri, QRS ≥ 120 ms dengan R lebar bertakik di I, V5–V6. Pada ibu hamil, pikirkan kardiomiopati termasuk PPCM.', alias: ['LBBB'] },
  qrs: { judul: 'QRS', isi: 'Kompleks gelombang saat ventrikel berdepolarisasi (berkontraksi). Normal lebarnya < 120 ms (kurang dari 3 kotak kecil).', alias: ['QRS'] },
  pr: { judul: 'Interval PR', isi: 'Dari awal gelombang P sampai awal QRS: waktu hantaran atrium ke ventrikel. Normal 120–200 ms (3–5 kotak kecil). Sedikit memendek pada kehamilan.', alias: ['PR'] },
  qtc: { judul: 'QTc', isi: 'Interval QT (awal QRS sampai akhir T) yang dikoreksi terhadap laju jantung, misalnya rumus Bazett QT/√RR. Pada checklist ini, QTc ≥ 460 ms dianggap abnormal.', alias: ['QTc'] },
  delta: { judul: 'Gelombang delta (preeksitasi)', isi: 'Awal QRS yang landai/melandai sehingga PR tampak pendek dan QRS sedikit melebar. Tanda jalur pintas listrik (pola Wolff-Parkinson-White) yang dapat memicu takikardia.', alias: ['gelombang delta', 'preeksitasi'] },
  blokav: { judul: 'Blok AV', isi: 'Hambatan hantaran dari atrium ke ventrikel. Derajat 2: sebagian gelombang P tidak diikuti QRS. Derajat 3 (total): P dan QRS berjalan sendiri-sendiri.', alias: ['Blok AV'] },
  ekstrasistol: { judul: 'Ekstrasistol', isi: 'Denyut prematur yang datang lebih awal dari irama dasar, dari atrium atau ventrikel. Ekstrasistol terisolasi sering ditemukan pada kehamilan; yang sering, berpasangan, beruntun, atau bergejala perlu dievaluasi.', alias: ['ekstrasistol'] },
  af: { judul: 'AF (fibrilasi atrium)', isi: 'Irama tidak teratur sama sekali tanpa gelombang P yang jelas. Pada ibu hamil muda, pikirkan stenosis mitral rematik.', alias: ['AF'] },
  flutter: { judul: 'Flutter atrium', isi: 'Takikardia atrium teratur dengan gelombang "gigi gergaji" di II, III, aVF, sering dengan laju ventrikel sekitar 150 kali/menit.', alias: ['flutter'] },
  svt: { judul: 'SVT', isi: 'Supraventricular tachycardia: takikardia QRS sempit yang teratur, mulai dan berhenti mendadak, biasanya 150–250 kali/menit.', alias: ['SVT'] },
  vt: { judul: 'VT', isi: 'Ventricular tachycardia: takikardia QRS lebar dari ventrikel. Berbahaya; stabilisasi dan rujuk segera.', alias: ['VT'] },
  pmitral: { judul: 'P mitral', isi: 'Gelombang P lebar (≥ 120 ms) dan bertakik di sadapan II, tanda atrium kiri membesar, misalnya pada stenosis mitral.', alias: ['P mitral'] },
  ppulmonal: { judul: 'P pulmonal', isi: 'Gelombang P tinggi runcing (> 2,5 mm) di sadapan II, tanda atrium kanan membesar, misalnya pada hipertensi pulmonal.', alias: ['P pulmonal', 'mitral/pulmonal'] },
  lvh: { judul: 'LVH / RVH', isi: 'Hipertrofi ventrikel kiri/kanan: voltase QRS tinggi di sadapan prekordial. "Strain" = ST depresi dan T inversi asimetris di sadapan yang sama, menandakan beban tekanan berat.', alias: ['LVH/RVH', 'LVH', 'RVH', 'voltase hipertrofi', 'strain'] },
  qpatologis: { judul: 'Q patologis', isi: 'Gelombang Q yang lebar (≥ 40 ms) atau dalam (> 25% tinggi R) di sadapan selain III dan aVR; tanda infark lama. Q kecil di II, III, aVF dapat normal pada kehamilan.', alias: ['Q patologis'] },
  st: { judul: 'Segmen ST', isi: 'Garis antara akhir QRS dan awal gelombang T; normal sejajar garis dasar. ST elevasi atau depresi bermakna menandakan iskemia atau infark, bukan varian kehamilan.', alias: ['ST elevasi/depresi', 'ST-T', 'ST'] },
  tinversi: { judul: 'T inversi', isi: 'Gelombang T terbalik (negatif). Pada kehamilan boleh di III, aVF, V1–V3; inversi dalam di I, aVL, V5–V6 tidak normal.', alias: ['T inversi', 'inversi'] },
  rv1: { judul: 'R dominan di V1', isi: 'Gelombang R lebih tinggi dari S di sadapan V1, tanda beban ventrikel kanan.', alias: ['R dominan di V1'] },
  holter: { judul: 'Holter', isi: 'Perekaman EKG terus-menerus 24 jam atau lebih saat ibu beraktivitas biasa, untuk menangkap aritmia yang hilang timbul.', alias: ['Holter'] },
  sadapan: { judul: '12 sadapan', isi: 'EKG standar: 6 sadapan ekstremitas (I, II, III, aVR, aVL, aVF) melihat jantung dari bidang frontal, 6 sadapan prekordial (V1–V6) dari bidang horizontal.', alias: ['12-sadapan'] },
  // ---- Lain-lain ----
  bnp: { judul: 'BNP / NT-proBNP', isi: 'Hormon yang dilepas otot jantung yang teregang. Nilai normal membuat gagal jantung tidak mungkin; ESC 2025 belum menetapkan titik potong khusus kehamilan.', alias: ['NT-proBNP', 'BNP'] },
  spo2: { judul: 'SpO₂', isi: 'Saturasi oksigen yang diukur oksimeter nadi di jari.', alias: ['SpO₂'] },
  spjp: { judul: 'SpJP', isi: 'Dokter spesialis jantung dan pembuluh darah (kardiolog).', alias: ['SpJP'] },
  anc: { judul: 'ANC', isi: 'Antenatal care: pemeriksaan kehamilan rutin.', alias: ['ANC'] },
  ekokardiografi: { judul: 'Ekokardiografi', isi: 'USG jantung. Ekokardiografi transtorakal (lewat dinding dada) adalah pencitraan lini pertama untuk ibu hamil yang dicurigai penyakit jantung.', alias: ['ekokardiografi'] },
  ms: { judul: 'MS (stenosis mitral)', isi: 'Penyempitan katup mitral, umumnya akibat demam rematik. Sering baru bergejala saat hamil karena laju jantung dan volume darah naik.', alias: ['MS', 'stenosis mitral'] },
  mr: { judul: 'MR (regurgitasi mitral)', isi: 'Kebocoran katup mitral: bising holosistolik di apeks yang menjalar ke aksila.', alias: ['MR'] },
  as: { judul: 'AS (stenosis aorta)', isi: 'Penyempitan katup aorta: bising ejeksi kasar di ICS 2 kanan yang menjalar ke leher (karotis).', alias: ['AS', 'stenosis aorta'] },
  tr: { judul: 'TR (regurgitasi trikuspid)', isi: 'Kebocoran katup trikuspid: bising holosistolik di tepi kiri bawah sternum yang mengeras saat inspirasi.', alias: ['TR'] },
  ps: { judul: 'PS (stenosis pulmonal)', isi: 'Penyempitan katup pulmonal: bising ejeksi di ICS 2 kiri, sering didahului klik ejeksi.', alias: ['PS', 'stenosis pulmonal'] },
  hp: { judul: 'HP (hipertensi pulmonal)', isi: 'Tekanan tinggi di arteri paru. Pada kehamilan risikonya sangat tinggi (mWHO IV). Tanda: P2 keras, heave parasternal, RAD/RVH di EKG.', alias: ['HP', 'hipertensi pulmonal'] },
  ar: { judul: 'Regurgitasi aorta', isi: 'Kebocoran katup aorta: bising diastolik dini bernada tinggi yang melemah (dekresendo), paling jelas di titik Erb saat duduk condong ke depan.', alias: ['regurgitasi aorta'] },
}

/** Glosarium lengkap: istilah klinis + kepanjangan singkatan kalkulator risiko. */
export const ISTILAH: Record<string, Istilah> = { ...KLINIS }
for (const [k, v] of Object.entries(SINGKATAN)) {
  const ada = Object.values(KLINIS).some((x) => x.alias?.includes(k))
  if (!ada) ISTILAH[k] = { judul: k, isi: v.charAt(0).toUpperCase() + v.slice(1) + '.', alias: [k] }
}

// Peta alias -> kunci. Singkatan (huruf besar/angka) peka huruf; selain itu dicocokkan lower-case.
const PETA = new Map<string, string>()
const singk = (s: string) => /^[A-Z0-9₂][A-Za-z0-9₂/-]*$/.test(s) && /[A-Z]{2}|^[A-Z][0-9]/.test(s)
for (const [k, v] of Object.entries(ISTILAH)) {
  for (const a of v.alias ?? [v.judul]) PETA.set(singk(a) ? a : a.toLowerCase(), k)
}
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const ci = (s: string) => esc(s).replace(/\p{L}/gu, (c) => (c.toLowerCase() === c.toUpperCase() ? c : `[${c.toLowerCase()}${c.toUpperCase()}]`))
const POLA = new RegExp(
  `(?<![\\p{L}\\p{N}-])(${[...PETA.keys()]
    .sort((a, b) => b.length - a.length)
    .map((a) => (singk(a) ? esc(a) : ci(a)))
    .join('|')})(?![\\p{L}\\p{N}′])`,
  'gu',
)

export function kunciIstilah(teks: string): string | undefined {
  return PETA.get(teks) ?? PETA.get(teks.toLowerCase())
}

/** Pecah teks menjadi potongan biasa dan istilah glosarium. */
export function pecahIstilah(teks: string): { teks: string; kunci?: string }[] {
  const out: { teks: string; kunci?: string }[] = []
  let akhir = 0
  for (const m of teks.matchAll(POLA)) {
    const kunci = kunciIstilah(m[0])
    if (!kunci) continue
    if (m.index! > akhir) out.push({ teks: teks.slice(akhir, m.index) })
    out.push({ teks: m[0], kunci })
    akhir = m.index! + m[0].length
  }
  if (akhir < teks.length) out.push({ teks: teks.slice(akhir) })
  return out
}
