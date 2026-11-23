import { Pause, Play } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { cn } from '@/lib/utils'
import { TeksSitasi } from './Cite'

/*
 * Ilustrasi bergerak 2.1.1: jantung sebelum hamil vs saat hamil.
 * Angka hanya dari teks Bab 2: curah jantung naik 30–50% (puncak trimester II–awal III), volume sekuncup naik 15–25%,
 * frekuensi jantung 79 x/menit (10 mgg) → 87 x/menit (40 mgg) menurut Loerup [5], kompresi vena kava saat telentang.
 * Bentuk kurva antartitik hanya perkiraan untuk ilustrasi.
 */

const HR_AWAL = 79
const HR_AKHIR = 87
// Kecepatan animasi jantung "sebelum hamil": ilustratif, ±15 x/menit lebih lambat (teks: naik 10–20 x/menit).
const HR_ILUSTRASI_SEBELUM = 70

function frekuensi(mg: number) {
  return Math.round(HR_AWAL + ((HR_AKHIR - HR_AWAL) * (mg - 10)) / 30)
}
/** Kenaikan relatif (0–1) menuju puncak di sekitar minggu 28, lalu mendatar. */
function fraksiPuncak(mg: number) {
  return Math.max(0, Math.min(1, (mg - 6) / 22))
}

function Jantung({ bpm, jalan, warna, skala = 1 }: { bpm: number; jalan: boolean; warna: string; skala?: number }) {
  return (
    <svg viewBox="0 0 100 92" className="jh-jantung" style={{ width: `${86 * skala}px` }} aria-hidden>
      <g
        className={cn('jh-detak', jalan && 'jalan')}
        style={{ animationDuration: `${60 / bpm}s`, transformOrigin: '50px 50px' }}
      >
        <path
          d="M50 86 C20 64 4 48 4 28 C4 14 15 4 28 4 C38 4 46 10 50 18 C54 10 62 4 72 4 C85 4 96 14 96 28 C96 48 80 64 50 86 Z"
          fill={warna}
        />
        <path d="M30 22 C24 24 20 30 20 36" stroke="white" strokeOpacity=".45" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function Aliran({ kecepatan, jalan, sempit = false }: { kecepatan: number; jalan: boolean; sempit?: boolean }) {
  // kecepatan relatif: 1 = acuan. Durasi lebih pendek = aliran lebih cepat.
  return (
    <svg viewBox="0 0 200 24" className="jh-aliran" preserveAspectRatio="none" aria-hidden>
      <path
        d={sempit ? 'M0 4 H70 Q100 9 130 4 H200 V20 H130 Q100 15 70 20 H0 Z' : 'M0 4 H200 V20 H0 Z'}
        className="jh-pembuluh"
      />
      <path
        d="M0 12 H200"
        className={cn('jh-darah', jalan && 'jalan')}
        style={{ animationDuration: `${1.6 / kecepatan}s`, strokeWidth: sempit ? 4 : 7 }}
      />
    </svg>
  )
}

export function JantungHamil({ sumber }: { sumber: string }) {
  const id = useId()
  const [mg, setMg] = useState(28)
  const [posisi, setPosisi] = useState<'telentang' | 'miring'>('miring')
  const [kurangiGerak, setKurangiGerak] = useState(false)
  const [jeda, setJeda] = useState(false)

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    setKurangiGerak(mq.matches)
    setJeda(mq.matches)
    const f = () => setKurangiGerak(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])

  const jalan = !jeda
  const hr = frekuensi(mg)
  const p = fraksiPuncak(mg)
  const co = Math.round(40 * p) // titik tengah 30–50%
  const sv = Math.round(20 * p) // titik tengah 15–25%
  const akhir = mg >= 28
  const tertekan = akhir && posisi === 'telentang'
  const aliranHamil = (1 + co / 100) * (tertekan ? 0.55 : 1)
  const trimester = mg < 14 ? 'Trimester I' : mg < 28 ? 'Trimester II' : 'Trimester III'

  return (
    <figure className="kunci jh my-6 rounded-card border border-line bg-bg p-3 sm:p-5">
      <figcaption className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm font-semibold">
        <span>Ilustrasi: jantung sebelum hamil vs saat hamil</span>
        <button type="button" className="jh-putar" onClick={() => setJeda((v) => !v)} aria-pressed={!jeda}>
          {jeda ? <Play aria-hidden /> : <Pause aria-hidden />}
          {jeda ? 'Putar animasi' : 'Jeda'}
        </button>
      </figcaption>

      <div className="jh-panel-grid">
        <div className="jh-panel">
          <p className="jh-judul">Sebelum hamil</p>
          <div className="jh-visual">
            <Jantung bpm={HR_ILUSTRASI_SEBELUM} jalan={jalan} warna="#9a5a66" />
          </div>
          <Aliran kecepatan={1} jalan={jalan} />
          <dl className="jh-angka">
            <div>
              <dt>Curah jantung</dt>
              <dd>Acuan</dd>
            </div>
            <div>
              <dt>Volume sekuncup</dt>
              <dd>Acuan</dd>
            </div>
            <div>
              <dt>Frekuensi jantung</dt>
              <dd>Acuan</dd>
            </div>
          </dl>
        </div>

        <div className="jh-panel hamil">
          <p className="jh-judul">
            Hamil {mg} minggu <span>· {trimester}</span>
          </p>
          <div className="jh-visual">
            <Jantung bpm={hr} jalan={jalan} warna="var(--accent)" skala={1 + sv / 200} />
          </div>
          <Aliran kecepatan={aliranHamil} jalan={jalan} sempit={tertekan} />
          <dl className="jh-angka">
            <div>
              <dt>Curah jantung</dt>
              <dd>
                +{co}%<small> (puncak 30–50%)</small>
              </dd>
              <span className="jh-bar" style={{ width: `${(100 / 150) * (100 + co)}%` }} />
            </div>
            <div>
              <dt>Volume sekuncup</dt>
              <dd>
                +{sv}%<small> (15–25%)</small>
              </dd>
              <span className="jh-bar" style={{ width: `${(100 / 150) * (100 + sv)}%` }} />
            </div>
            <div>
              <dt>Frekuensi jantung</dt>
              <dd>
                ≈{hr}
                <small> x/menit</small>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <label className="jh-slider" htmlFor={`${id}-mg`}>
        <span>Usia kehamilan</span>
        <input
          id={`${id}-mg`}
          type="range"
          min={10}
          max={40}
          step={1}
          value={mg}
          onChange={(e) => setMg(Number(e.target.value))}
          aria-valuetext={`${mg} minggu`}
        />
        <span className="tabular-nums">{mg} mgg</span>
      </label>

      <div className={cn('jh-posisi', !akhir && 'redup')}>
        <div role="group" aria-label="Posisi ibu" className="inline-flex rounded-lg border border-line bg-surface p-0.5">
          {(['miring', 'telentang'] as const).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={posisi === k}
              disabled={!akhir}
              onClick={() => setPosisi(k)}
            >
              {k === 'miring' ? 'Miring ke kiri' : 'Telentang'}
            </button>
          ))}
        </div>
        <p className="m-0 text-[0.9rem]" aria-live="polite">
          {!akhir
            ? 'Geser ke ≥ 28 minggu untuk melihat pengaruh posisi.'
            : tertekan
              ? 'Telentang: uterus menekan vena kava inferior, aliran balik vena berkurang; ibu bisa pusing atau hipotensi.'
              : 'Miring ke kiri: tekanan pada vena kava berkurang dan aliran balik vena membaik.'}
        </p>
      </div>

      <p className="catatan">
        <TeksSitasi>{sumber}</TeksSitasi>
        {kurangiGerak && ' Animasi dijeda karena pengaturan perangkat mengurangi gerakan.'}
      </p>
    </figure>
  )
}
