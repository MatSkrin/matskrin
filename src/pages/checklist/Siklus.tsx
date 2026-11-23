import { useState } from 'react'
import { TeksIstilah } from '@/components/Istilah'

/*
 * Diagram satu siklus jantung (fonokardiogram skematis): S1 di x=50, S2 di x=210, S1 berikut di x=430.
 * Sistol = 50–210, diastol = 210–430. Bentuk bising digambar di atas garis dasar y=70.
 */
const Y = 70
const bar = (x: number, h: number, kelas = '') => <rect key={`${x}${kelas}`} x={x - 3} y={Y - h} width={6} height={h * 2} rx={2} className={`bunyi ${kelas}`} />

type Pola = { id: string; nama: string; gambar: React.ReactNode; dengar: string; arti: string }

const BISING: Pola[] = [
  { id: 'normal', nama: 'Normal', gambar: null, dengar: 'Hanya S1 dan S2 ("lub-dub"), sistol lebih pendek dari diastol.', arti: 'Pada kehamilan S1 dapat lebih keras dan split S2 lebih jelas.' },
  { id: 'ejeksi', nama: 'Bising ejeksi', gambar: <path className="bising" d={`M68 ${Y} L128 ${Y - 26} L188 ${Y} L128 ${Y + 26} Z`} />, dengar: 'Belah ketupat di tengah sistol, berhenti sebelum S2.', arti: 'Bising sistolik fungsional kehamilan berbentuk ini. Aman bila ≤ 2/6, tanpa thrill, tidak menjalar, dan S2 normal. Bila keras atau menjalar ke leher, pikirkan stenosis aorta/pulmonal.' },
  { id: 'holo', nama: 'Holosistolik', gambar: <rect className="bising" x={56} y={Y - 20} width={148} height={40} rx={3} />, dengar: 'Rata dari S1 sampai S2, menutupi seluruh sistol.', arti: 'Selalu patologis: MR (apeks, menjalar ke aksila), TR (tepi kiri bawah sternum, mengeras saat inspirasi), atau VSD. Rujuk.' },
  { id: 'ar', nama: 'Diastolik dini', gambar: <path className="bising" d={`M216 ${Y} L218 ${Y - 22} L340 ${Y} L218 ${Y + 22} Z`} />, dengar: 'Bernada tinggi, langsung setelah S2, makin lemah (dekresendo).', arti: 'Regurgitasi aorta. Paling jelas di titik Erb dengan diafragma, ibu duduk condong ke depan, napas ditahan setelah ekspirasi. Setiap bising diastolik dirujuk.' },
  {
    id: 'ms',
    nama: 'Rumble diastolik',
    gambar: (
      <>
        {bar(238, 22, 'tambah')}
        <path className="bising" d={`M248 ${Y} L252 ${Y - 18} L330 ${Y - 6} L380 ${Y - 6} L426 ${Y - 20} L428 ${Y} L426 ${Y + 20} L380 ${Y + 6} L330 ${Y + 6} L252 ${Y + 18} Z`} />
      </>
    ),
    dengar: 'Gemuruh bernada rendah di diastol, didahului opening snap, sering mengeras menjelang S1.',
    arti: 'Stenosis mitral. Dengarkan dengan bell di apeks, ibu miring kiri, saat ekspirasi. Takikardia kehamilan memendekkan diastol sehingga mudah terlewat.',
  },
  {
    id: 'kontinu',
    nama: 'Kontinu',
    gambar: <path className="bising" d={`M58 ${Y} L210 ${Y - 26} L420 ${Y} L210 ${Y + 26} Z`} />,
    dengar: 'Terus-menerus melewati S2, puncak di sekitar S2 ("suara mesin").',
    arti: 'PDA (infraklavikula kiri). Venous hum dan mammary souffle juga kontinu tetapi jinak: hilang bila vena jugularis/stetoskop ditekan.',
  },
  { id: 's3', nama: 'S3', gambar: bar(262, 14, 'tambah'), dengar: 'Bunyi rendah sesaat setelah S2: "lub-dub-da".', arti: 'Bisa normal pada kehamilan. Bila disertai sesak, ortopnea, takikardia, atau ronki, curigai gagal jantung.' },
  { id: 's4', nama: 'S4', gambar: bar(408, 14, 'tambah'), dengar: 'Bunyi rendah tepat sebelum S1: "da-lub-dub".', arti: 'Tidak lazim pada kehamilan. Setiap S4 dievaluasi.' },
  { id: 'klik', nama: 'Klik ejeksi', gambar: bar(74, 20, 'tambah'), dengar: 'Bunyi tajam sesaat setelah S1.', arti: 'Katup aorta bikuspid atau stenosis pulmonal.' },
  {
    id: 'split',
    nama: 'Split S2 lebar menetap',
    gambar: (
      <>
        {bar(204, 26, 'tambah')}
        {bar(226, 20, 'tambah')}
        <text x={204} y={Y + 44} textAnchor="middle" className="siklus-label kecil">A2</text>
        <text x={226} y={Y + 44} textAnchor="middle" className="siklus-label kecil">P2</text>
      </>
    ),
    dengar: 'S2 terbelah lebar, baik saat inspirasi maupun ekspirasi.',
    arti: 'Curigai ASD. Split yang melebar hanya saat inspirasi adalah normal (fisiologis).',
  },
]

const URUTAN: { teks: string; sorot: [number, number][]; tampil?: string[] }[] = [
  { teks: 'Tentukan S1 dan S2 sambil meraba karotis: S1 hampir bersamaan dengan denyut karotis.', sorot: [[38, 62], [198, 222], [418, 442]] },
  { teks: 'Nilai S1: keras-lemahnya dan apakah terbelah (split).', sorot: [[38, 62], [418, 442]] },
  { teks: 'Nilai S2: split saat inspirasi dan kerasnya P2 (area pulmonal).', sorot: [[194, 236]], tampil: ['split'] },
  { teks: 'Cari bunyi tambahan: klik, S3, S4, opening snap.', sorot: [[64, 84], [228, 272], [398, 418]], tampil: ['klik', 's3', 's4', 'os'] },
  { teks: 'Bising sistolik (di antara S1 dan S2): fase, bentuk, derajat.', sorot: [[54, 206]] },
  { teks: 'Bising diastolik (setelah S2 sampai S1 berikutnya): cari aktif, karena mudah terlewat.', sorot: [[214, 426]] },
  { teks: 'Bising kontinu: apakah bising melewati S2?', sorot: [[150, 270]] },
]

function Diagram({ gambar, sorot = [] }: { gambar?: React.ReactNode; sorot?: [number, number][] }) {
  return (
    <svg viewBox="0 0 480 130" className="siklus" role="img" aria-label="Diagram satu siklus jantung: S1, sistol, S2, diastol">
      <text x={130} y={14} textAnchor="middle" className="siklus-label">sistol</text>
      <text x={320} y={14} textAnchor="middle" className="siklus-label">diastol</text>
      <path d="M50 22 V28 M210 22 V28 M430 22 V28 M50 25 H430" className="siklus-skala" />
      {sorot.map(([a, b]) => <rect key={a} x={a} y={30} width={b - a} height={80} rx={6} className="siklus-sorot" />)}
      <line x1={10} x2={470} y1={Y} y2={Y} className="siklus-dasar" />
      {gambar}
      {bar(50, 30)}
      {bar(210, 24)}
      {bar(430, 30)}
      <text x={50} y={124} textAnchor="middle" className="siklus-label">S1</text>
      <text x={210} y={124} textAnchor="middle" className="siklus-label">S2</text>
      <text x={430} y={124} textAnchor="middle" className="siklus-label">S1</text>
    </svg>
  )
}

const tambahan: Record<string, React.ReactNode> = {
  klik: bar(74, 20, 'tambah'),
  s3: bar(262, 14, 'tambah'),
  s4: bar(408, 14, 'tambah'),
  os: bar(238, 18, 'tambah'),
  split: <>{bar(204, 24, 'tambah')}{bar(222, 18, 'tambah')}</>,
}

/** Urutan auskultasi 7 langkah dengan sorotan bagian siklus jantung yang sedang dinilai. */
export function UrutanAuskultasi() {
  const [i, setI] = useState(0)
  const u = URUTAN[i]
  return (
    <div className="interaktif">
      <ol className="langkah-chip" aria-label="Langkah auskultasi">
        {URUTAN.map((_, n) => (
          <li key={n}>
            <button type="button" aria-current={n === i ? 'step' : undefined} onClick={() => setI(n)}>{n + 1}</button>
          </li>
        ))}
      </ol>
      <Diagram sorot={u.sorot} gambar={u.tampil?.map((t) => <g key={t}>{tambahan[t]}</g>)} />
      <p className="interaktif-teks" aria-live="polite"><b>Langkah {i + 1}.</b> <TeksIstilah>{u.teks}</TeksIstilah></p>
      <div className="interaktif-nav">
        <button type="button" className="ghost" disabled={i === 0} onClick={() => setI(i - 1)}>← Sebelumnya</button>
        <button type="button" className="ghost" disabled={i === URUTAN.length - 1} onClick={() => setI(i + 1)}>Berikutnya →</button>
      </div>
    </div>
  )
}

/** Pilih jenis bunyi/bising untuk melihat letaknya dalam siklus jantung. */
export function BentukBising() {
  const [id, setId] = useState('ejeksi')
  const p = BISING.find((b) => b.id === id)!
  return (
    <div className="interaktif">
      <div className="chip-grup" role="group" aria-label="Jenis bunyi atau bising">
        {BISING.map((b) => (
          <button key={b.id} type="button" aria-pressed={b.id === id} onClick={() => setId(b.id)}>{b.nama}</button>
        ))}
      </div>
      <Diagram gambar={p.gambar} />
      <div aria-live="polite">
        <p className="interaktif-teks"><b>Terdengar:</b> <TeksIstilah>{p.dengar}</TeksIstilah></p>
        <p className="interaktif-teks"><b>Artinya:</b> <TeksIstilah>{p.arti}</TeksIstilah></p>
      </div>
    </div>
  )
}

const LEVINE = [
  { d: 1, teks: 'Sangat lemah; baru terdengar setelah berkonsentrasi.' },
  { d: 2, teks: 'Lemah, tetapi langsung terdengar.' },
  { d: 3, teks: 'Cukup keras, tanpa thrill. Rujuk.' },
  { d: 4, teks: 'Keras, disertai thrill. Rujuk.' },
  { d: 5, teks: 'Terdengar dengan stetoskop baru sebagian menempel. Rujuk.' },
  { d: 6, teks: 'Terdengar dengan stetoskop terangkat dari dada. Rujuk.' },
]

/** Skala Levine sebagai tangga yang bisa diketuk. */
export function SkalaLevine() {
  const [d, setD] = useState(2)
  const l = LEVINE[d - 1]
  return (
    <div className="interaktif">
      <div className="levine" role="group" aria-label="Derajat bising">
        {LEVINE.map((x) => (
          <button key={x.d} type="button" aria-pressed={x.d === d} className={x.d >= 3 ? 'rujuk' : ''} style={{ height: 26 + x.d * 10 }} onClick={() => setD(x.d)}>
            {x.d}/6
          </button>
        ))}
      </div>
      <p className={`interaktif-teks levine-teks ${d >= 3 ? 'rujuk' : ''}`} aria-live="polite">
        <b>{d}/6.</b> <TeksIstilah>{l.teks}</TeksIstilah>
      </p>
    </div>
  )
}

const KRITERIA_FUNGSIONAL = [
  'Mid-sistolik tipe ejeksi, ≤ 2/6, tanpa thrill',
  'Di basis/tepi sternum kiri atas, tidak menjalar',
  'S2 normal dengan split fisiologis; tanpa klik atau OS; tanpa bising diastolik',
  'Ibu tanpa keluhan bermakna; tanda vital, SpO₂, dan EKG normal',
]

/** Cek cepat: apakah bising boleh dianggap fungsional? Semua kriteria harus terpenuhi. */
export function CekFungsional() {
  const [ok, setOk] = useState<boolean[]>(KRITERIA_FUNGSIONAL.map(() => false))
  const n = ok.filter(Boolean).length
  const semua = n === ok.length
  return (
    <div className="interaktif">
      <p className="interaktif-teks"><b>Bising fungsional dianggap aman bila semua terpenuhi:</b></p>
      <div className="cek-mini">
        {KRITERIA_FUNGSIONAL.map((k, i) => (
          <label key={k} className={ok[i] ? 'on' : ''}>
            <input type="checkbox" checked={ok[i]} onChange={() => setOk(ok.map((v, j) => (j === i ? !v : v)))} />
            <span><TeksIstilah>{k}</TeksIstilah></span>
          </label>
        ))}
      </div>
      <p className={`cek-hasil ${semua ? 'hijau' : 'kuning'}`} aria-live="polite">
        {semua
          ? 'Semua terpenuhi: sesuai bising fungsional. Lanjutkan pemeriksaan antenatal, nilai ulang tiap kunjungan.'
          : `${n} dari ${ok.length} terpenuhi: belum bisa dianggap fungsional. Bila ragu, anggap belum jinak dan centang temuan di bawah.`}
      </p>
    </div>
  )
}
