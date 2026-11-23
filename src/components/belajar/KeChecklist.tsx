import { ClipboardCheck, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TeksJudul } from './TeksJudul'

/** Pintasan dari bab ke langkah tertentu di Checklist Pemeriksaan (langkah dihitung dari 1). */
export function KeChecklist({ langkah, judul, isi }: { langkah?: number; judul: string; isi: string }) {
  const tujuan = langkah ? `/checklist?langkah=${langkah}` : '/checklist'
  return (
    <aside className="kunci ke-checklist" aria-label={judul.replace(/\*/g, '')}>
      <span className="ke-checklist-ikon" aria-hidden><ClipboardCheck /></span>
      <div className="ke-checklist-teks">
        <p className="ke-checklist-judul"><TeksJudul>{judul}</TeksJudul></p>
        <p>{isi}</p>
      </div>
      <Link to={tujuan} className="ke-checklist-tombol">
        Buka checklist <ArrowRight aria-hidden />
      </Link>
    </aside>
  )
}
