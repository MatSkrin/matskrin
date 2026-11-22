import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DAFTAR_BAB, type Judul } from '../lib/content'
import { PELAJARAN } from '../content/pelajaran'
import HalamanPelajaran from './HalamanPelajaran'

function gulirKe(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function DaftarIsi({ toc, aktif, onPilih }: { toc: Judul[]; aktif: string; onPilih?: () => void }) {
  return (
    <ul className="toc">
      {toc.map((t) => (
        <li key={t.id} className={`lv${t.level}${aktif === t.id ? ' on' : ''}`}>
          <button
            type="button"
            onClick={() => {
              gulirKe(t.id)
              onPilih?.()
            }}
          >
            {t.teks}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function HalamanBab() {
  const { slug = '' } = useParams()
  const i = DAFTAR_BAB.findIndex((b) => b.slug === slug)
  // Bab yang sudah punya versi pelajaran interaktif (MDX) memakai halaman pelajaran.
  const pelajaran = PELAJARAN[slug]
  if (pelajaran) return <HalamanPelajaran pelajaran={pelajaran} prev={DAFTAR_BAB[i - 1]} next={DAFTAR_BAB[i + 1]} />
  return <HalamanBabMarkdown slug={slug} />
}

function HalamanBabMarkdown({ slug }: { slug: string }) {
  const i = DAFTAR_BAB.findIndex((b) => b.slug === slug)
  const bab = DAFTAR_BAB[i]
  const [aktif, setAktif] = useState('')
  const [tocBuka, setTocBuka] = useState(false)

  // Sorot subbab yang sedang dibaca.
  useEffect(() => {
    if (!bab) return
    const els = bab.toc.map((t) => document.getElementById(t.id)).filter((e): e is HTMLElement => !!e)
    const obs = new IntersectionObserver(
      (entries) => {
        const terlihat = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (terlihat[0]) setAktif(terlihat[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )
    els.forEach((e) => obs.observe(e))
    window.scrollTo(0, 0)
    return () => obs.disconnect()
  }, [bab])

  if (!bab) return <p>Bab tidak ditemukan. <Link to="/modul">Kembali ke daftar modul</Link></p>
  const prev = DAFTAR_BAB[i - 1]
  const next = DAFTAR_BAB[i + 1]
  return (
    <div className="bab-layout">
      <aside className="toc-side" aria-label="Daftar isi bab">
        <p className="toc-title">Daftar isi</p>
        <DaftarIsi toc={bab.toc} aktif={aktif} />
      </aside>
      <article className="bab">
        <Link to="/modul" className="back">← Daftar modul</Link>
        <p className="eyebrow">Bab {bab.nomor}</p>
        <h1>{bab.judul}</h1>
        <div className="toc-mobile">
          <button type="button" className="ghost" aria-expanded={tocBuka} onClick={() => setTocBuka((v) => !v)}>
            {tocBuka ? 'Tutup daftar isi' : 'Daftar isi'}
          </button>
          {tocBuka && <DaftarIsi toc={bab.toc} aktif={aktif} onPilih={() => setTocBuka(false)} />}
        </div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: bab.html }} />
        <nav className="pager">
          {prev ? <Link to={`/modul/${prev.slug}`}>← Bab {prev.nomor}: {prev.judul}</Link> : <span />}
          {next && <Link to={`/modul/${next.slug}`}>Bab {next.nomor}: {next.judul} →</Link>}
        </nav>
      </article>
    </div>
  )
}
