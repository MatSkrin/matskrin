import { useId, useState } from 'react'
import { cn } from '@/lib/utils'
import { TeksSitasi } from './Cite'

export type BarisMWHO = { kelas: string; contoh: string; implikasi: string }

/** Daftar kondisi dipisah titik koma di data; tampilkan sebagai butir agar mudah dipindai. */
function Butir({ teks, className }: { teks: string; className?: string }) {
  const butir = teks.replace(/\.$/, '').split(/;\s*/)
  if (butir.length < 2) return <p className={className}>{teks}</p>
  return (
    <ul className={cn(className, 'list-disc pl-5')}>
      {butir.map((x) => (
        <li key={x}>{x.charAt(0).toUpperCase() + x.slice(1)}</li>
      ))}
    </ul>
  )
}

// Gradasi risiko hijau → merah; cukup gelap agar teks putih kontras ≥ 4.5:1 (WCAG AA).
const WARNA = ['#276b4d', '#3f6f22', '#7f5a00', '#a8461a', '#a8323f']

/** Ilustrasi interaktif: tangga risiko mWHO 2.0. Pilih anak tangga untuk melihat contoh & implikasi. */
export function TanggaMWHO({ data, sumber }: { data: BarisMWHO[]; sumber: string }) {
  const [i, setI] = useState(0)
  const id = useId()
  const b = data[i]
  return (
    <figure className="kunci my-6 rounded-card border border-line bg-bg p-3 sm:p-5">
      <figcaption className="mb-3 text-sm font-semibold">Tangga risiko mWHO 2.0 · pilih kelas</figcaption>
      <div role="tablist" aria-label="Kelas mWHO 2.0" className="grid grid-cols-5 items-end gap-1 sm:gap-2">
        {data.map((d, k) => (
          <button
            key={d.kelas}
            role="tab"
            id={`${id}-t${k}`}
            aria-selected={i === k}
            aria-controls={`${id}-p`}
            onClick={() => setI(k)}
            tabIndex={i === k ? 0 : -1}
            onKeyDown={(e) => {
              const ke = { ArrowRight: k + 1, ArrowLeft: k - 1, Home: 0, End: data.length - 1 }[e.key]
              if (ke === undefined) return
              e.preventDefault()
              const n = Math.max(0, Math.min(data.length - 1, ke))
              setI(n)
              document.getElementById(`${id}-t${n}`)?.focus()
            }}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-end rounded-t-lg border-0 pb-2 font-[inherit] text-sm font-bold text-white transition-all sm:text-base',
              i === k ? 'ring-[3px] ring-ink ring-offset-2 ring-offset-bg' : 'saturate-[.85] hover:saturate-100',
            )}
            style={{ background: WARNA[k], height: `${48 + k * 22}px` }}
          >
            {d.kelas}
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted">
        <span>Risiko terendah</span>
        <span>Risiko tertinggi</span>
      </div>
      <div
        id={`${id}-p`}
        role="tabpanel"
        aria-labelledby={`${id}-t${i}`}
        aria-live="polite"
        className="mt-4 grid gap-3 rounded-lg border-l-4 bg-surface p-4 sm:grid-cols-2"
        style={{ borderColor: WARNA[i] }}
      >
        <div>
          <p className="m-0 text-xs font-bold text-muted">Contoh kondisi (kelas {b.kelas})</p>
          <Butir teks={b.contoh} className="m-0 mt-1 text-[0.95rem]" />
        </div>
        <div>
          <p className="m-0 text-xs font-bold text-muted">Implikasi pelayanan</p>
          <Butir teks={b.implikasi} className="m-0 mt-1 text-[0.95rem]" />
        </div>
      </div>
      <p className="catatan">
        <TeksSitasi>{sumber}</TeksSitasi>
      </p>
    </figure>
  )
}

export function TabelMWHO({ data }: { data: BarisMWHO[] }) {
  return (
    <table tabIndex={0}>
      <thead>
        <tr>
          <th>Kelas</th>
          <th>Contoh kondisi (terpilih)</th>
          <th>Implikasi pelayanan</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.kelas}>
            <td className="font-bold whitespace-nowrap">{d.kelas}</td>
            <td><Butir teks={d.contoh} /></td>
            <td><Butir teks={d.implikasi} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export type SkorRisiko = { skor: string; risiko: number }

/** Ilustrasi interaktif: geser skor CARPREG II untuk melihat estimasi risiko kejadian jantung maternal. */
export function SkorCarpreg({ data, sumber }: { data: SkorRisiko[]; sumber: string }) {
  const [i, setI] = useState(0)
  const id = useId()
  const d = data[i]
  const maks = Math.max(...data.map((x) => x.risiko))
  return (
    <figure className="kunci my-6 rounded-card border border-line bg-bg p-3 sm:p-5">
      <figcaption className="mb-3 text-sm font-semibold">
        <label htmlFor={id}>Geser skor CARPREG II</label>
      </figcaption>
      <div className="flex items-center gap-4">
        <input
          id={id}
          type="range"
          min={0}
          max={data.length - 1}
          step={1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          aria-valuetext={`Skor ${d.skor}: risiko ${d.risiko}%`}
          className="h-6 w-full cursor-pointer accent-[var(--accent)]"
        />
        <output htmlFor={id} className="min-w-24 text-right" aria-live="polite">
          <span className="block text-xs text-muted">Skor {d.skor}</span>
          <span className="text-2xl font-bold text-accent">{d.risiko}%</span>
        </output>
      </div>
      <div className="mt-4 flex h-24 items-end gap-2" aria-hidden>
        {data.map((x, k) => (
          <button
            key={x.skor}
            tabIndex={-1}
            onClick={() => setI(k)}
            className={cn(
              'flex flex-1 cursor-pointer flex-col items-center justify-end rounded-t-md border-0 p-0 font-[inherit] text-[0.7rem] transition-colors',
              k === i ? 'bg-accent text-[var(--on-accent)]' : 'bg-line text-muted hover:bg-accent-soft',
            )}
            style={{ height: `${Math.max(18, (x.risiko / maks) * 100)}%` }}
          >
            {x.skor}
          </button>
        ))}
      </div>
      <p className="catatan">
        <TeksSitasi>{sumber}</TeksSitasi>
      </p>
    </figure>
  )
}
