import { Link } from 'react-router-dom'
import { TeksRujukan } from '@/components/belajar/Pustaka'
import { PELAJARAN } from '@/content/pelajaran'
import { gabungPustaka } from '@/lib/pustakaGabungan'
import { DAFTAR_BAB } from '../lib/content'
import { CARPREG2, SUMBER_KEJADIAN } from '../data/risk'

const PUSTAKA = gabungPustaka(Object.values(PELAJARAN).map((p) => ({ nomor: p.meta.nomor, pustaka: p.pustaka })))
const SLUG = Object.fromEntries(DAFTAR_BAB.map((b) => [b.nomor, b.slug]))

export default function Tentang() {
  return (
    <article className="prose tentang">
      <h1>Tentang MatSkrin</h1>
      <p className="lead">
        MatSkrin membantu dokter di layanan primer mengenali, menilai, dan merujuk ibu hamil dengan penyakit jantung.
      </p>

      <h2>Untuk siapa</h2>
      <p>
        Untuk dokter umum di puskesmas, klinik, dan IGD, serta bidan dan tenaga kesehatan lain yang menjadi kontak
        pertama ibu hamil. Materi disusun dari sudut pandang dokter spesialis jantung dan pembuluh darah: apa yang perlu
        dikenali, apa yang bisa dikerjakan di layanan primer, dan kapan serta ke mana pasien dirujuk. Tindakan yang
        menjadi wewenang spesialis hanya dibahas sekilas.
      </p>

      <h2>Isi</h2>
      <ul>
        <li>
          <Link to="/modul">Modul</Link>: 15 bab pelajaran interaktif, dari fisiologi kehamilan sampai farmakoterapi. Tiap
          bab punya mode ringkas klinis untuk dibaca cepat saat praktik.
        </li>
        <li>
          <Link to="/checklist">Checklist</Link>: daftar periksa deteksi dini saat ANC (riwayat, gejala, tanda vital,
          auskultasi, dan EKG) dengan hasil triase yang diperbarui otomatis.
        </li>
        <li>
          <Link to="/risiko">Skor Risiko</Link>: kalkulator mWHO 2.0 dan CARPREG II.
        </li>
      </ul>
      <p>
        Acuan utamanya adalah pedoman ESC 2025 tentang penyakit kardiovaskular pada kehamilan. MatSkrin adalah alat bantu
        edukasi dan tidak menggantikan penilaian klinis maupun konsultasi dengan spesialis.
      </p>

      <h2>Sumber skor risiko</h2>
      <ol>
        <li>mWHO 2.0: Tabel 6 pedoman ESC 2025.</li>
        <li>{CARPREG2.sumber}</li>
        <li>{SUMBER_KEJADIAN.vanHagen}</li>
      </ol>

      <h2 id="daftar-pustaka">Daftar pustaka</h2>
      <p className="muted">
        Gabungan daftar pustaka dari seluruh bab ({PUSTAKA.length} rujukan), diurutkan menurut abjad. Label di akhir
        tiap rujukan menunjukkan bab yang mengutipnya.
      </p>
      <ol className="pustaka">
        {PUSTAKA.map((r) => (
          <li key={r.teks}>
            <TeksRujukan>{r.teks}</TeksRujukan>{' '}
            <span className="pustaka-bab">
              {r.bab.map((n) => (
                <Link key={n} to={`/modul/${SLUG[n]}`}>
                  Bab {n}
                </Link>
              ))}
            </span>
          </li>
        ))}
      </ol>
    </article>
  )
}
