import { Link, useParams } from 'react-router-dom'
import { DAFTAR_BAB } from '../lib/content'

export default function HalamanBab() {
  const { slug } = useParams()
  const i = DAFTAR_BAB.findIndex((b) => b.slug === slug)
  if (i < 0) return <p>Bab tidak ditemukan. <Link to="/modul">Kembali ke daftar modul</Link></p>
  const bab = DAFTAR_BAB[i]
  const prev = DAFTAR_BAB[i - 1]
  const next = DAFTAR_BAB[i + 1]
  return (
    <article className="bab">
      <Link to="/modul" className="back">← Daftar modul</Link>
      <p className="eyebrow">Bab {bab.nomor}</p>
      <h1>{bab.judul}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: bab.html }} />
      <nav className="pager">
        {prev ? <Link to={`/modul/${prev.slug}`}>← Bab {prev.nomor}: {prev.judul}</Link> : <span />}
        {next && <Link to={`/modul/${next.slug}`}>Bab {next.nomor}: {next.judul} →</Link>}
      </nav>
    </article>
  )
}
