import type { ReactNode } from 'react'
import { Lightbulb } from 'lucide-react'
import { TeksSitasi } from './Cite'

/** Kotak "Inti bab ini" di awal pelajaran. */
export function Ringkasan({ children }: { children: ReactNode }) {
  return (
    <div className="ringkasan kunci">
      <p className="ringkasan-judul">Inti bab ini</p>
      {children}
    </div>
  )
}

/** Poin Klinis: butir singkat yang tetap tampil di mode ringkas. */
export function PoinKlinis({ judul, children }: { judul: string; children: ReactNode }) {
  return (
    <aside className="kunci my-5 rounded-r-card border-l-4 border-poin bg-poin-bg px-5 py-3" aria-label={judul}>
      <p className="m-0 mt-1 flex items-center gap-2 font-bold text-poin">
        <Lightbulb className="size-4 shrink-0" aria-hidden /> {judul}
      </p>
      <div className="[&_ul]:mb-1 [&_ul]:pl-5">{children}</div>
    </aside>
  )
}

const KELAS: Record<string, string> = { I: 'kelas-i', IIa: 'kelas-iia', IIb: 'kelas-iib', III: 'kelas-iii' }

export type Rekomendasi = { teks: string; kelas: string; level: string }

/** Kotak Rekomendasi ESC 2025: kelas/level hanya dari naskah, tidak boleh dikarang. */
export function RekomendasiESC({ items }: { items: Rekomendasi[] }) {
  return (
    <div className="rekomendasi kunci">
      <table>
        <thead>
          <tr>
            <th>Rekomendasi ESC 2025</th>
            <th>Kelas</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.teks}>
              <td>
                <TeksSitasi>{r.teks}</TeksSitasi>
              </td>
              <td className={KELAS[r.kelas]}>{r.kelas}</td>
              <td>{r.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
