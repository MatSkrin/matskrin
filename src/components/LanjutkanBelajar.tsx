import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DAFTAR_BAB } from '@/lib/content'
import { baca } from '@/lib/progres'
import { cn, perilakuGulir } from '@/lib/utils'

/** Kartu "Lanjutkan belajar": menuju kartu pertama yang belum selesai di bab yang sedang dipelajari. */
export default function LanjutkanBelajar({ className }: { className?: string }) {
  const nav = useNavigate()
  const progres = baca()
  const bab = DAFTAR_BAB.find((b) => {
    const n = b.kartu.filter((k) => progres[b.slug]?.selesai.includes(k.id)).length
    return n > 0 && n < b.kartu.length
  })
  const kartu = bab?.kartu.find((k) => !progres[bab.slug]?.selesai.includes(k.id))
  if (!bab || !kartu) return null
  return (
    <button
      type="button"
      onClick={() => {
        nav(`/modul/${bab.slug}`)
        setTimeout(() => document.getElementById(kartu.id)?.scrollIntoView({ behavior: perilakuGulir() }), 120)
      }}
      className={cn(
        'flex w-full cursor-pointer items-center gap-4 rounded-card border border-poin/40 bg-poin-bg px-4 py-3 text-left font-[inherit] text-ink',
        className,
      )}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold text-poin">Lanjutkan belajar</span>
        <span className="block truncate font-semibold">
          Bab {bab.nomor} · {kartu.nomor ? `${kartu.nomor} ` : ''}
          {kartu.teks}
        </span>
      </span>
      <ArrowRight className="size-5 shrink-0 text-poin" aria-hidden />
    </button>
  )
}
