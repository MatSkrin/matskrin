import { Check } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Progress } from '@/components/ui/progress'
import { DAFTAR_BAB } from '@/lib/content'
import { baca } from '@/lib/progres'

export default function DaftarModul() {
  const nav = useNavigate()
  const progres = baca()
  const buka = (slug: string, id: string) => {
    nav(`/modul/${slug}`)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
  }
  return (
    <>
      <h1>Daftar Isi Modul</h1>
      <p className="muted -mt-2 mb-6">
        Setiap bab dibagi menjadi kartu pelajaran. Tandai kartu yang sudah dipelajari; progres tersimpan di perangkat ini.
      </p>
      <ol className="bab-list">
        {DAFTAR_BAB.map((b) => {
          const selesai = b.kartu.filter((k) => progres[b.slug]?.selesai.includes(k.id))
          const persen = b.kartu.length ? (selesai.length / b.kartu.length) * 100 : 0
          return (
            <li key={b.slug}>
              <Link to={`/modul/${b.slug}`} className="bab-head">
                <span className="bab-no">Bab {b.nomor}</span>
                <span className="bab-judul">{b.judul}</span>
                {b.ringkasan && <span className="bab-ringkas">{b.ringkasan}</span>}
                <span className="mt-2 flex items-center gap-2">
                  <Progress value={persen} label={`Progres Bab ${b.nomor}`} className="h-1.5 max-w-56" />
                  <span className="text-xs text-muted tabular-nums">
                    {selesai.length}/{b.kartu.length} kartu
                  </span>
                </span>
              </Link>
              <ul className="bab-sub">
                {b.kartu.map((k) => (
                  <li key={k.id}>
                    <button type="button" onClick={() => buka(b.slug, k.id)} className="inline-flex items-start gap-1.5">
                      {selesai.includes(k) ? (
                        <Check className="mt-1 size-3.5 shrink-0 text-ok" aria-label="Selesai" />
                      ) : (
                        <span className="min-w-[2.2em] text-muted/80 tabular-nums">{k.nomor}</span>
                      )}
                      {k.teks}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>
      <p className="muted">Bab 10–13 akan ditambahkan menyusul.</p>
    </>
  )
}
