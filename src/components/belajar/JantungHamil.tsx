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

const KANAN = '#4f74ad'
const KIRI = '#c0394b'

/** Skema jantung potongan koronal (empat ruang). Atrium lalu ventrikel berkontraksi sesuai frekuensi. */
function Jantung({
  bpm,
  jalan,
  skala = 1,
  vkiTertekan = false,
}: {
  bpm: number
  jalan: boolean
  skala?: number
  vkiTertekan?: boolean
}) {
  const dur = { animationDuration: `${60 / bpm}s` }
  return (
    <svg viewBox="0 0 200 215" className="jh-jantung" style={{ width: `${150 * skala}px` }} role="img" aria-label="Skema jantung potongan koronal">
      {/* Vena kava superior & inferior */}
      <path d="M46 0 H62 V44 H46 Z" fill={KANAN} opacity=".85" />
      <path
        d={vkiTertekan ? 'M30 100 L38 102 L35 124 L36 150 H31 L32 124 Z' : 'M26 100 L40 102 V150 H26 Z'}
        fill={KANAN}
        opacity=".85"
        className="jh-vki"
      />
      {/* Atrium */}
      <g className={jalan ? 'jh-atrium jalan' : 'jh-atrium'} style={dur}>
        <path d="M30 62 Q30 40 52 38 Q80 36 92 58 L96 106 H40 Q30 92 30 62 Z" fill={KANAN} />
        <path d="M104 60 Q110 40 134 40 Q160 42 164 66 Q164 94 150 104 L106 106 Z" fill={KIRI} />
        <text x="62" y="80" className="jh-label">RA</text>
        <text x="134" y="78" className="jh-label">LA</text>
      </g>
      {/* Ventrikel */}
      <g className={jalan ? 'jh-ventrikel jalan' : 'jh-ventrikel'} style={dur}>
        <path d="M40 110 Q34 152 70 184 Q88 198 104 198 L100 110 Z" fill={KANAN} />
        <path d="M108 110 L110 198 Q132 208 154 198 Q176 176 172 138 Q168 112 150 108 Z" fill={KIRI} />
        <path d="M104 110 L107 198" stroke="var(--surface)" strokeWidth="4" />
        <text x="72" y="150" className="jh-label">RV</text>
        <text x="140" y="152" className="jh-label">LV</text>
      </g>
      {/* Katup trikuspid & mitral */}
      <path d="M42 108 H98 M108 108 H150" stroke="var(--surface)" strokeWidth="3" strokeLinecap="round" />
      {/* Arteri pulmonalis & aorta */}
      <path d="M112 108 V40 Q112 12 140 12 Q168 12 168 40 V64 H156 V40 Q156 25 140 25 Q125 25 125 40 V108 Z" fill={KIRI} stroke="var(--surface)" strokeWidth="2" />
      <path d="M72 110 Q70 72 92 56 L110 46 L116 60 L100 70 Q92 82 94 110 Z" fill={KANAN} stroke="var(--surface)" strokeWidth="2" />
      <text x="140" y="21" className="jh-label kecil">Ao</text>
      <text x="88" y="80" className="jh-label kecil">AP</text>
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
            <Jantung bpm={HR_ILUSTRASI_SEBELUM} jalan={jalan} />
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
            <Jantung bpm={hr} jalan={jalan} skala={1 + sv / 250} vkiTertekan={tertekan} />
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
        Skema potongan koronal. RA/RV: atrium/ventrikel kanan; LA/LV: atrium/ventrikel kiri; Ao: aorta; AP: arteri
        pulmonalis. Vena kava inferior tampak menyempit saat ibu telentang. <TeksSitasi>{sumber}</TeksSitasi>
        {kurangiGerak && ' Animasi dijeda karena pengaturan perangkat mengurangi gerakan.'}
      </p>
    </figure>
  )
}
