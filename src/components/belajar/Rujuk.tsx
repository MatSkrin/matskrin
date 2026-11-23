import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DAFTAR_BAB } from '@/lib/content'
import { gulirKeElemen, idRujukan } from '@/lib/rujukan'

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
