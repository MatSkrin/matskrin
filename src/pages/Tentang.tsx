import { CARPREG2, SUMBER_KEJADIAN } from '../data/risk'

export default function Tentang() {
  return (
    <article className="prose">
      <h1>Tentang</h1>
      <p>
        Aplikasi ini adalah pendamping buku ajar <em>Penyakit Jantung pada Kehamilan</em>. Isinya ditujukan untuk
        edukasi tenaga kesehatan dan tidak menggantikan penilaian klinis.
      </p>
      <h2>Pedoman utama</h2>
      <ol>
        <li>
          De Backer J, et al. 2025 ESC Guidelines for the management of cardiovascular disease and pregnancy. Eur Heart
          J. 2025;46:4462–568. doi:10.1093/eurheartj/ehaf193
        </li>
      </ol>
      <h2>Sumber skor risiko</h2>
      <ol>
        <li>mWHO 2.0: Tabel 6 pedoman ESC 2025 di atas.</li>
        <li>{CARPREG2.sumber}</li>
        <li>{SUMBER_KEJADIAN.vanHagen}</li>
      </ol>
    </article>
  )
}
