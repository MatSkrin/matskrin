import { Check, ChevronDown, Search } from 'lucide-react'
import LanjutkanBelajar from '@/components/LanjutkanBelajar'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Progress } from '@/components/ui/progress'
import { DAFTAR_BAB } from '@/lib/content'
import { baca } from '@/lib/progres'
import { cn, perilakuGulir } from '@/lib/utils'

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')

export default function DaftarModul() {
  const nav = useNavigate()
  const progres = useMemo(() => baca(), [])
  const [cari, setCari] = useState('')
  const [buka, setBuka] = useState<string | null>(null)

  const buka_kartu = (slug: string, id: string) => {
    nav(`/modul/${slug}`)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: perilakuGulir() }), 120)
  }

  const data = DAFTAR_BAB.map((b) => {
    const selesai = new Set(progres[b.slug]?.selesai ?? [])
    return { ...b, selesai, jumlahSelesai: b.kartu.filter((k) => selesai.has(k.id)).length }
  })
  const totalKartu = data.reduce((n, b) => n + b.kartu.length, 0)
  const totalSelesai = data.reduce((n, b) => n + b.jumlahSelesai, 0)


  const q = norm(cari.trim())
  const tampil = q
    ? data
        .map((b) => {
          const cocokBab = norm(`bab ${b.nomor} ${b.judul} ${b.ringkasan}`).includes(q)
          const kartu = b.kartu.filter((k) => norm(`${k.nomor ?? ''} ${k.teks}`).includes(q))
          return cocokBab || kartu.length ? { ...b, cocok: cocokBab ? b.kartu : kartu } : null
        })
        .filter((b): b is NonNullable<typeof b> => !!b)
    : data.map((b) => ({ ...b, cocok: b.kartu }))

  return (
    <div className="daftar-modul">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <h1 className="mb-1">Modul</h1>
          <p className="m-0 text-muted">
            {DAFTAR_BAB.length} bab, {totalKartu} kartu pelajaran
            {totalSelesai > 0 && `, ${totalSelesai} sudah selesai`}
          </p>
        </div>
        <label className="relative w-full sm:w-72">
          <span className="sr-only">Cari bab atau subbab</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari bab atau subbab…"
            className="h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 font-[inherit] text-[0.95rem] text-ink outline-none focus:border-accent"
          />
        </label>
      </div>

      {!q && <LanjutkanBelajar className="mt-5" />}

      <ol className="mt-5 grid list-none items-start gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {tampil.map((b) => {
          const terbuka = buka === b.slug || !!q
          const persen = b.kartu.length ? (b.jumlahSelesai / b.kartu.length) * 100 : 0
          const tuntas = b.kartu.length > 0 && b.jumlahSelesai === b.kartu.length
          return (
            <li
              key={b.slug}
              className={cn(
                'flex flex-col rounded-card border bg-surface transition-colors hover:border-accent/60',
                tuntas ? 'border-poin/50' : 'border-line',
              )}
            >
              <Link to={`/modul/${b.slug}`} className="flex flex-1 flex-col gap-1 px-4 pt-3.5 pb-3 sm:pt-4 text-ink no-underline">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-accent">Bab {b.nomor}</span>
                  {tuntas && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-poin">
                      <Check className="size-3.5" aria-hidden /> Selesai
                    </span>
                  )}
                </span>
                <span className="text-[1.02rem] leading-snug font-semibold">{b.judul}</span>
                {b.ringkasan && <span className="hidden text-sm text-muted sm:line-clamp-2">{b.ringkasan}</span>}
                <span className="mt-auto flex items-center gap-2 pt-2">
                  <Progress value={persen} label={`Progres Bab ${b.nomor}`} className="h-1.5" />
                  <span className="text-xs whitespace-nowrap text-muted tabular-nums">
                    {b.jumlahSelesai}/{b.kartu.length}
                  </span>
                </span>
              </Link>
              <button
                type="button"
                aria-expanded={terbuka}
                onClick={() => setBuka(terbuka && !q ? null : b.slug)}
                className="flex cursor-pointer items-center justify-between border-0 border-t border-line bg-transparent px-4 py-2 font-[inherit] text-[0.85rem] text-muted hover:text-ink"
              >
                {q ? `${b.cocok.length} subbab cocok` : `${b.kartu.length} subbab`}
                <ChevronDown className={cn('size-4 transition-transform', terbuka && 'rotate-180')} aria-hidden />
              </button>
              {terbuka && (
                <ul className="m-0 list-none px-2 pb-2">
                  {b.cocok.map((k) => (
                    <li key={k.id}>
                      <button
                        type="button"
                        onClick={() => buka_kartu(b.slug, k.id)}
                        className="flex w-full cursor-pointer items-start gap-2 rounded-md border-0 bg-transparent px-2 py-1.5 text-left font-[inherit] text-sm text-ink hover:bg-accent-soft"
                      >
                        {b.selesai.has(k.id) ? (
                          <Check className="mt-0.5 size-4 shrink-0 text-ok" aria-label="Selesai" />
                        ) : (
                          <span className="min-w-8 shrink-0 text-muted tabular-nums">{k.nomor ?? '·'}</span>
                        )}
                        <span>{k.teks}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ol>
      {q && tampil.length === 0 && <p className="mt-6 text-muted">Tidak ada bab atau subbab yang cocok dengan “{cari}”.</p>}
      <p className="mt-6 text-sm text-muted">Bab 10–13 akan ditambahkan menyusul.</p>
    </div>
  )
}
