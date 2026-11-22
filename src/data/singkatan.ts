/** Kepanjangan singkatan yang dipakai di kalkulator risiko. */
export const SINGKATAN: Record<string, string> = {
  ARVC: 'arrhythmogenic right ventricular cardiomyopathy',
  ASD: 'atrial septal defect',
  ASI: 'aortic size index (diameter aorta per luas permukaan tubuh)',
  AVSD: 'atrioventricular septal defect',
  CPVT: 'catecholaminergic polymorphic ventricular tachycardia',
  DCM: 'dilated cardiomyopathy (kardiomiopati dilatasi)',
  EF: 'ejection fraction (fraksi ejeksi) ventrikel kiri',
  HCM: 'hypertrophic cardiomyopathy (kardiomiopati hipertrofik)',
  HTAD: 'heritable thoracic aortic disease (penyakit aorta torakal herediter)',
  INR: 'international normalized ratio',
  LQT2: 'long QT syndrome tipe 2',
  LQTS: 'long QT syndrome (sindrom QT panjang)',
  NDLVC: 'non-dilated left ventricular cardiomyopathy',
  'NSTE-ACS': 'non-ST-elevation acute coronary syndrome',
  NYHA: 'New York Heart Association (kelas fungsional)',
  PAH: 'pulmonary arterial hypertension (hipertensi arteri pulmonal)',
  PDA: 'patent ductus arteriosus',
  PPCM: 'peripartum cardiomyopathy (kardiomiopati peripartum)',
  SCAD: 'spontaneous coronary artery dissection (diseksi arteri koroner spontan)',
  STEMI: 'ST-elevation myocardial infarction',
  TGA: 'transposition of the great arteries',
  VSD: 'ventricular septal defect',
}

const POLA = new RegExp(
  `(?<![A-Za-z0-9-])(${Object.keys(SINGKATAN)
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/[-]/g, '\\-'))
    .join('|')})(?![A-Za-z0-9])`,
  'g',
)

/** Pecah teks menjadi potongan biasa dan singkatan yang dikenal. */
export function pecahSingkatan(teks: string): { teks: string; singkatan?: string }[] {
  const hasil: { teks: string; singkatan?: string }[] = []
  let akhir = 0
  for (const m of teks.matchAll(POLA)) {
    if (m.index! > akhir) hasil.push({ teks: teks.slice(akhir, m.index) })
    hasil.push({ teks: m[0], singkatan: SINGKATAN[m[0]] })
    akhir = m.index! + m[0].length
  }
  if (akhir < teks.length) hasil.push({ teks: teks.slice(akhir) })
  return hasil
}

/** Singkatan yang muncul dalam sekumpulan teks, urut abjad. */
export function singkatanDalam(teks: string[]): string[] {
  const s = new Set<string>()
  for (const t of teks) for (const p of pecahSingkatan(t)) if (p.singkatan) s.add(p.teks)
  return [...s].sort()
}
