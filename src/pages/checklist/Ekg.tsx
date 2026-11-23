import { useState, type ReactNode } from 'react'
import { TeksIstilah } from '@/components/Istilah'

/*
 * Strip EKG skematis (sadapan II, irama sinus 75/menit) pada kertas 25 mm/s, 10 mm/mV.
 * Satuan gambar = mm; 1 mm = 6 px. Garis dasar di 17 mm dari atas.
 */
const PX = 6
const BASE = 17
const LEBAR = 66
const TINGGI = 26
const BEAT = [8, 28, 48]
const x = (mm: number) => mm * PX
const y = (amp: number) => (BASE - amp) * PX

function jalur(): string {
  let d = `M0 ${y(0)} L${x(1)} ${y(0)} L${x(1)} ${y(10)} L${x(6)} ${y(10)} L${x(6)} ${y(0)}`
  for (const b of BEAT) {
    d += ` L${x(b)} ${y(0)} Q${x(b + 1.25)} ${y(3)} ${x(b + 2.5)} ${y(0)}`
    d += ` L${x(b + 4)} ${y(0)} L${x(b + 4.3)} ${y(-1)} L${x(b + 5)} ${y(12)} L${x(b + 5.8)} ${y(-3)} L${x(b + 6.25)} ${y(0)}`
    d += ` L${x(b + 9)} ${y(0)} C${x(b + 10)} ${y(0)} ${x(b + 10.4)} ${y(3.2)} ${x(b + 11.2)} ${y(3.2)} C${x(b + 12)} ${y(3.2)} ${x(b + 12.6)} ${y(0)} ${x(b + 13.5)} ${y(0)}`
  }
  return d + ` L${x(LEBAR)} ${y(0)}`
}
const JALUR = jalur()

/** Penanda rentang horizontal (mm) dengan label. */
function Rentang({ a, b, h, label }: { a: number; b: number; h: number; label: string }) {
  return (
    <g className="ekg-rentang">
      <path d={`M${x(a)} ${y(h) - 5} V${y(h) + 5} M${x(a)} ${y(h)} H${x(b)} M${x(b)} ${y(h) - 5} V${y(h) + 5}`} />
      <text x={(x(a) + x(b)) / 2} y={y(h) - 8} textAnchor="middle">{label}</text>
    </g>
  )
}
const Sorot = ({ a, b, bawah = -4, atas = 13 }: { a: number; b: number; bawah?: number; atas?: number }) => (
  <rect className="ekg-sorot" x={x(a)} y={y(atas)} width={x(b - a)} height={(atas - bawah) * PX} rx={4} />
)

function Strip({ children, redup }: { children?: ReactNode; redup?: boolean }) {
  return (
    <svg viewBox={`0 0 ${x(LEBAR)} ${x(TINGGI)}`} className={`ekg-strip ${redup ? 'redup' : ''}`} role="img" aria-label="Contoh strip EKG sadapan II, irama sinus 75 kali per menit">
      <defs>
        <pattern id="ekg-kecil" width={PX} height={PX} patternUnits="userSpaceOnUse">
          <path d={`M${PX} 0 H0 V${PX}`} className="ekg-grid-kecil" />
        </pattern>
        <pattern id="ekg-besar" width={PX * 5} height={PX * 5} patternUnits="userSpaceOnUse">
          <rect width={PX * 5} height={PX * 5} fill="url(#ekg-kecil)" />
          <path d={`M${PX * 5} 0 H0 V${PX * 5}`} className="ekg-grid-besar" />
        </pattern>
      </defs>
      <rect width={x(LEBAR)} height={x(TINGGI)} fill="url(#ekg-besar)" />
      {children}
      <path d={JALUR} className="ekg-jalur" />
    </svg>
  )
}

function Frekuensi() {
  const [n, setN] = useState(4)
  const hr = Math.round(300 / n)
  return (
    <div className="ekg-alat">
      <p>Hitung kotak besar di antara dua puncak R yang berdekatan:</p>
      <div className="chip-grup" role="group" aria-label="Jumlah kotak besar antar-R">
        {[2, 2.5, 3, 4, 5, 6].map((v) => (
          <button key={v} type="button" aria-pressed={v === n} onClick={() => setN(v)}>{String(v).replace('.', ',')}</button>
        ))}
      </div>
      <p className={`ekg-hasil ${hr >= 110 ? 'kuning' : ''}`} aria-live="polite">
        300 ÷ {String(n).replace('.', ',')} = <b>{hr} kali/menit</b>
        {hr > 100 ? '. Takikardia: cari sebabnya.' : ''}
      </p>
    </div>
  )
}

function Aksis() {
  const [i, setI] = useState(true)
  const [avf, setAvf] = useState(true)
  const [ii, setIi] = useState(true)
  let hasil: { teks: string; tingkat?: 'kuning' } = { teks: 'Normal (0° sampai +90°).' }
  if (i && !avf) hasil = ii ? { teks: 'Normal (0° sampai −30°). Pergeseran ke kiri ini wajar pada kehamilan.' } : { teks: 'LAD (lebih dari −30°): bukan varian kehamilan.', tingkat: 'kuning' }
  if (!i && avf) hasil = { teks: 'RAD (lebih dari +90°). Pastikan dulu kabel lengan tidak tertukar; bila benar, curigai beban ventrikel kanan (ASD, HP, MS).', tingkat: 'kuning' }
  if (!i && !avf) hasil = { teks: 'Aksis ekstrem. Periksa ulang pemasangan kabel; bila benar, rujuk.', tingkat: 'kuning' }
  const Tombol = ({ label, v, set }: { label: string; v: boolean; set: (b: boolean) => void }) => (
    <div className="aksis-baris">
      <span>QRS di {label}</span>
      <div className="chip-grup" role="group" aria-label={`QRS di ${label}`}>
        <button type="button" aria-pressed={v} onClick={() => set(true)}>positif ↑</button>
        <button type="button" aria-pressed={!v} onClick={() => set(false)}>negatif ↓</button>
      </div>
    </div>
  )
  // Arah panah di lingkaran aksis (derajat, 0° = kanan gambar, +90° = bawah)
  const sudut = i && avf ? 60 : i && !avf ? (ii ? -15 : -60) : !i && avf ? 120 : -135
  const rad = (sudut * Math.PI) / 180
  return (
    <div className="ekg-alat aksis">
      <div>
        <Tombol label="sadapan I" v={i} set={setI} />
        <Tombol label="aVF" v={avf} set={setAvf} />
        {i && !avf && <Tombol label="sadapan II" v={ii} set={setIi} />}
      </div>
      <svg viewBox="-72 -62 144 128" className="aksis-roda" role="img" aria-label={`Perkiraan aksis sekitar ${sudut}°`}>
        <path d="M0 0 L50 0 A50 50 0 0 1 0 50 Z" className="aksis-normal" />
        <path d="M0 0 L50 0 A50 50 0 0 0 43.3 -25 Z" className="aksis-normal" />
        <circle r={50} className="aksis-lingkar" />
        <path d="M-54 0 H54 M0 -54 V54" className="aksis-sumbu" />
        <text x={56} y={3} className="aksis-label" textAnchor="start">0°</text>
        <text x={0} y={59} className="aksis-label" textAnchor="middle">+90°</text>
        <text x={44} y={-30} className="aksis-label">−30°</text>
        <line x1={0} y1={0} x2={Math.cos(rad) * 44} y2={Math.sin(rad) * 44} className={`aksis-panah ${hasil.tingkat ?? ''}`} />
        <circle r={3} className="aksis-pusat" />
      </svg>
      <p className={`ekg-hasil ${hasil.tingkat ?? ''}`} aria-live="polite"><TeksIstilah>{hasil.teks}</TeksIstilah></p>
    </div>
  )
}

function KalkulatorQTc() {
  const [qt, setQt] = useState('380')
  const [hr, setHr] = useState('75')
  const q = Number(qt)
  const h = Number(hr)
  const qtc = q > 0 && h > 0 ? Math.round(q / Math.sqrt(60 / h)) : undefined
  return (
    <div className="ekg-alat">
      <p>QTc (rumus Bazett: QT ÷ √RR detik)</p>
      <div className="qtc-input">
        <label>QT <input inputMode="numeric" value={qt} onChange={(e) => setQt(e.target.value)} /> ms</label>
        <label>Nadi <input inputMode="numeric" value={hr} onChange={(e) => setHr(e.target.value)} /> /menit</label>
      </div>
      {qtc != null && (
        <p className={`ekg-hasil ${qtc >= 460 ? 'kuning' : ''}`} aria-live="polite">
          QTc ≈ <b>{qtc} ms</b> {qtc >= 460 ? '(≥ 460 ms: temuan kuning)' : '(< 460 ms)'}
        </p>
      )}
    </div>
  )
}

type Langkah = { judul: string; cek: string; normal: string; curigai: string; gambar?: ReactNode; alat?: ReactNode; redup?: boolean }

const LANGKAH: Langkah[] = [
  {
    judul: 'Kualitas',
    cek: 'Kecepatan 25 mm/s dan kalibrasi 10 mm/mV (kotak kalibrasi setinggi 2 kotak besar). Garis dasar stabil, tanpa banyak artefak. 1 kotak kecil = 0,04 detik; 1 kotak besar = 0,2 detik.',
    normal: 'Identitas dan usia kehamilan tertulis di rekaman.',
    curigai: 'P dan QRS negatif di sadapan I: curigai kabel lengan tertukar sebelum menyebutnya RAD.',
    gambar: (
      <>
        <Sorot a={0.4} b={6.6} bawah={-1} atas={11} />
        <Rentang a={1} b={6} h={12.5} label="10 mm = 1 mV" />
        <rect x={x(15)} y={y(-5)} width={x(5)} height={x(5)} className="ekg-kotak" />
        <text x={x(17.5)} y={y(-7.3)} textAnchor="middle" className="ekg-catatan">1 kotak besar = 0,2 s</text>
      </>
    ),
  },
  {
    judul: 'Frekuensi',
    cek: 'Hitung 300 dibagi jumlah kotak besar antar-R. Bila irama tidak teratur, hitung QRS dalam 10 detik lalu kalikan 6.',
    normal: 'Naik 10–20 kali/menit dibanding sebelum hamil.',
    curigai: '≥ 110 kali/menit menetap. Bila > 100, cari sebab: demam, anemia, nyeri, hipovolemia, tiroid, gagal jantung.',
    gambar: <Rentang a={13} b={33} h={14} label="4 kotak besar → 300 ÷ 4 = 75/menit" />,
    alat: <Frekuensi />,
  },
  {
    judul: 'Irama',
    cek: 'Apakah sinus? Ada gelombang P di depan setiap QRS, dan setiap P diikuti QRS. Jarak R–R teratur.',
    normal: 'Sinus; ekstrasistol terisolasi.',
    curigai: 'AF, flutter, SVT, VT; ekstrasistol sering, berpasangan, beruntun, atau bergejala; blok AV derajat 2–3.',
    gambar: <>{BEAT.map((b) => <circle key={b} cx={x(b + 1.25)} cy={y(1)} r={13} className="ekg-lingkar" />)}<text x={x(9.25)} y={y(5)} textAnchor="middle" className="ekg-catatan">P</text></>,
  },
  {
    judul: 'Aksis',
    cek: 'Lihat arah QRS di sadapan I dan aVF. Keduanya positif berarti normal.',
    normal: 'Bergeser ke kiri 15–20°, masih dalam −30° sampai +90°.',
    curigai: 'Di luar −30° sampai +90°, terutama RAD.',
    alat: <Aksis />,
    redup: true,
  },
  {
    judul: 'Interval',
    cek: 'PR normal 120–200 ms (3–5 kotak kecil). QRS < 120 ms (< 3 kotak kecil). QT diukur dari awal QRS sampai akhir T, lalu dikoreksi menjadi QTc.',
    normal: 'PR sedikit memendek (± 20 ms); QTc umumnya tidak berubah.',
    curigai: 'PR pendek dengan gelombang delta; QRS ≥ 120 ms atau LBBB; blok AV; QTc ≥ 460 ms.',
    gambar: (
      <>
        <Rentang a={28} b={32} h={-5} label="PR 160 ms" />
        <Rentang a={32} b={34.25} h={13.5} label="QRS 90 ms" />
        <Rentang a={32} b={41.5} h={-8} label="QT 380 ms" />
      </>
    ),
    alat: <KalkulatorQTc />,
  },
  {
    judul: 'Morfologi',
    cek: 'Bentuk gelombang P, tinggi QRS, dan ada tidaknya Q patologis.',
    normal: 'Q dapat tampak jelas di II, III, aVF.',
    curigai: 'Q lebar/dalam di sadapan lain; LVH/RVH dengan strain; P mitral/pulmonal; R dominan di V1.',
    gambar: (
      <>
        <Sorot a={27.6} b={30.9} bawah={-1.5} atas={3} />
        <text x={x(29.25)} y={y(4)} textAnchor="middle" className="ekg-catatan">P</text>
        <Sorot a={32} b={34.4} bawah={-4} atas={12.8} />
        <text x={x(36.6)} y={y(11)} textAnchor="start" className="ekg-catatan">QRS: tinggi?</text>
      </>
    ),
  },
  {
    judul: 'ST-T',
    cek: 'Segmen ST harus sejajar garis dasar. Gelombang T searah dengan QRS di sebagian besar sadapan.',
    normal: 'T datar/inversi di III, aVF, V1–V3; perubahan ST-T nonspesifik ringan.',
    curigai: 'ST elevasi/depresi bermakna; T inversi dalam di I, aVL, V5–V6.',
    gambar: (
      <>
        <Sorot a={34.25} b={37} bawah={-1.5} atas={1.5} />
        <text x={x(35.6)} y={y(-3)} textAnchor="middle" className="ekg-catatan">ST</text>
        <Sorot a={37} b={41.7} bawah={-1} atas={4.2} />
        <text x={x(39.3)} y={y(5.3)} textAnchor="middle" className="ekg-catatan">T</text>
      </>
    ),
  },
]

/** Membaca EKG dalam 7 langkah: setiap langkah menyorot bagian strip yang dinilai. */
export function EkgTujuhLangkah() {
  const [i, setI] = useState(0)
  const l = LANGKAH[i]
  return (
    <div className="interaktif ekg7">
      <ol className="langkah-chip lebar" aria-label="Langkah membaca EKG">
        {LANGKAH.map((s, n) => (
          <li key={s.judul}>
            <button type="button" aria-current={n === i ? 'step' : undefined} onClick={() => setI(n)}>
              <span>{n + 1}</span> {s.judul}
            </button>
          </li>
        ))}
      </ol>
      <Strip redup={l.redup}>{l.gambar}</Strip>
      <div aria-live="polite">
        <p className="interaktif-teks"><b>{i + 1}. {l.judul}.</b> <TeksIstilah>{l.cek}</TeksIstilah></p>
        <div className="banding">
          <div className="hijau"><b>Wajar pada kehamilan</b><TeksIstilah>{l.normal}</TeksIstilah></div>
          <div className="kuning"><b>Curigai / rujuk</b><TeksIstilah>{l.curigai}</TeksIstilah></div>
        </div>
      </div>
      {l.alat}
      <div className="interaktif-nav">
        <button type="button" className="ghost" disabled={i === 0} onClick={() => setI(i - 1)}>← Sebelumnya</button>
        <button type="button" className="ghost" disabled={i === LANGKAH.length - 1} onClick={() => setI(i + 1)}>Berikutnya →</button>
      </div>
    </div>
  )
}
