import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DAFTAR_BAB } from '@/lib/content'
import { perilakuGulir } from '@/lib/utils'

/** id elemen tujuan: "tabel-4-2", "gambar-6-1". */
export const idRujukan = (jenis: string, nomor: string) => `${jenis.toLowerCase()}-${nomor.replace('.', '-')}`

/** Buka (bila tertutup) lalu gulir ke tabel/gambar/daftar pustaka. */
export function gulirKeElemen(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (el instanceof HTMLDetailsElement) el.open = true
  // Tabel bukti yang tertutup: buka akordeonnya.
  const pemicu = el.querySelector<HTMLButtonElement>('[data-state="closed"] > button, button[data-state="closed"]')
  pemicu?.click()
  el.scrollIntoView({ behavior: perilakuGulir(), block: 'start' })
}

/** Pintasan rujukan silang di dalam teks: Bab n, Tabel x.y, Gambar x.y. */
export function Rujuk({ jenis, nomor, children }: { jenis: string; nomor: string; children: ReactNode }) {
  const { pathname } = useLocation()
  const babTujuan = Number(nomor.split('.')[0])
  const bab = DAFTAR_BAB.find((b) => b.nomor === babTujuan)
  if (!bab) return <>{children}</>
  if (jenis === 'Bab') {
    return (
      <Link to={`/modul/${bab.slug}`} className="rujuk">
        {children}
      </Link>
    )
  }
  const id = idRujukan(jenis, nomor)
  const babIni = pathname === `/modul/${bab.slug}`
  if (babIni) {
    return (
      <a
        href={`#${id}`}
        className="rujuk"
        onClick={(e) => {
          e.preventDefault()
          gulirKeElemen(id)
        }}
      >
        {children}
      </a>
    )
  }
  return (
    <Link to={`/modul/${bab.slug}?ke=${id}`} className="rujuk">
      {children}
    </Link>
  )
}
