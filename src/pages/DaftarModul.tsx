import { Link, useNavigate } from 'react-router-dom'
import { DAFTAR_BAB } from '../lib/content'

export default function DaftarModul() {
  const nav = useNavigate()
  const buka = (slug: string, id: string) => {
    nav(`/modul/${slug}`)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
  }
  return (
    <>
      <h1>Daftar Isi Modul</h1>
      <ol className="bab-list">
        {DAFTAR_BAB.map((b) => (
          <li key={b.slug}>
            <Link to={`/modul/${b.slug}`} className="bab-head">
              <span className="bab-no">Bab {b.nomor}</span>
              <span className="bab-judul">{b.judul}</span>
              {b.ringkasan && <span className="bab-ringkas">{b.ringkasan}</span>}
            </Link>
            <ul className="bab-sub">
              {b.toc
                .filter((t) => t.level === 2 && t.id !== 'daftar-pustaka')
                .map((t) => (
                  <li key={t.id}>
                    <button type="button" onClick={() => buka(b.slug, t.id)}>
                      {t.teks}
                    </button>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="muted">Bab lain akan ditambahkan bertahap.</p>
    </>
  )
}
