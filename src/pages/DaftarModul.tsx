import { Link } from 'react-router-dom'
import { DAFTAR_BAB } from '../lib/content'

export default function DaftarModul() {
  return (
    <>
      <h1>Modul</h1>
      <ol className="bab-list">
        {DAFTAR_BAB.map((b) => (
          <li key={b.slug}>
            <Link to={`/modul/${b.slug}`}>
              <span className="bab-no">Bab {b.nomor}</span>
              <span className="bab-judul">{b.judul}</span>
              {b.ringkasan && <span className="bab-ringkas">{b.ringkasan}</span>}
            </Link>
          </li>
        ))}
      </ol>
    </>
  )
}
