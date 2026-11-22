import { useId, useState } from 'react'
import { cn } from '@/lib/utils'
import { TeksSitasi } from './Cite'

export type BarisMWHO = { kelas: string; contoh: string; implikasi: string }

// Gradasi risiko hijau → merah; sama di mode terang/gelap.
const WARNA = ['#2f7d5b', '#5b9a3c', '#c99a12', '#d9692b', '#b2384a']

/** Ilustrasi interaktif: tangga risiko mWHO 2.0. Pilih anak tangga untuk melihat contoh & implikasi. */
export function TanggaMWHO({ data, sumber }: { data: BarisMWHO[]; sumber: string }) {
  const [i, setI] = useState(0)
  const id = useId()
  const b = data[i]
  return (
    <figure className="kunci my-6 rounded-card border border-line bg-bg p-4 sm:p-5">
      <figcaption className="mb-3 text-sm font-semibold">Tangga risiko mWHO 2.0 · pilih kelas</figcaption>
      <div role="tablist" aria-label="Kelas mWHO 2.0" className="grid grid-cols-5 items-end gap-1.5 sm:gap-2">
        {data.map((d, k) => (
          <button
            key={d.kelas}
            role="tab"
            id={`${id}-t${k}`}
            aria-selected={i === k}
            aria-controls={`${id}-p`}
            onClick={() => setI(k)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') setI(Math.min(data.length - 1, k + 1))
              if (e.key === 'ArrowLeft') setI(Math.max(0, k - 1))
            }}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-end rounded-t-lg border-0 pb-2 font-[inherit] text-sm font-bold text-white transition-all sm:text-base',
              i === k ? 'opacity-100 ring-2 ring-ink ring-offset-2 ring-offset-bg' : 'opacity-55 hover:opacity-85',
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
          <p className="m-0 text-xs font-bold tracking-wider text-muted uppercase">Contoh kondisi (kelas {b.kelas})</p>
          <p className="m-0 mt-1 text-[0.95rem]">{b.contoh}</p>
        </div>
        <div>
          <p className="m-0 text-xs font-bold tracking-wider text-muted uppercase">Implikasi pelayanan</p>
          <p className="m-0 mt-1 text-[0.95rem]">{b.implikasi}</p>
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
    <table>
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
            <td>{d.contoh}</td>
            <td>{d.implikasi}</td>
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
    <figure className="kunci my-6 rounded-card border border-line bg-bg p-4 sm:p-5">
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
          className="w-full accent-[var(--accent)]"
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
              k === i ? 'bg-accent text-white' : 'bg-line text-muted hover:bg-accent-soft',
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
