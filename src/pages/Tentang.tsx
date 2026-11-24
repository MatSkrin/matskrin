import { ArrowRight, BookOpen, ChevronRight, ClipboardCheck, Gauge, Hospital, Search, ShieldAlert, Siren, UsersRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TeksRujukan } from '@/components/belajar/Pustaka'
import { PELAJARAN } from '@/content/pelajaran'
import { DAFTAR_BAB } from '@/lib/content'
import { gabungPustaka } from '@/lib/pustakaGabungan'

const PUSTAKA = gabungPustaka(Object.values(PELAJARAN).map((p) => ({ nomor: p.meta.nomor, pustaka: p.pustaka })))
const SLUG = Object.fromEntries(DAFTAR_BAB.map((b) => [b.nomor, b.slug]))

const SASARAN = [
  { ikon: Hospital, judul: 'Puskesmas dan klinik', isi: 'Dokter umum yang menemui ibu hamil saat pemeriksaan antenatal dan menjadi pintu pertama rujukan.' },
  { ikon: Siren, judul: 'Instalasi Gawat Darurat', isi: 'Dokter jaga yang menerima ibu hamil atau nifas dengan sesak, nyeri dada, atau berdebar.' },
  { ikon: UsersRound, judul: 'Bidan dan tenaga kesehatan lain', isi: 'Tenaga yang paling sering bertemu dengan ibu hamil dan perlu tahu kapan harus waspada.' },
]

const LANGKAH = [
  { judul: 'Kenali', isi: 'Tanda dan gejala yang bukan sekadar perubahan fisiologis kehamilan.' },
  { judul: 'Tangani', isi: 'Pemeriksaan dan tata laksana awal yang bisa dikerjakan di layanan primer.' },
  { judul: 'Rujuk', isi: 'Kapan dan ke mana pasien dirujuk, termasuk ke Pregnancy Heart Team.' },
]

const ISI = [
  { to: '/modul', ikon: BookOpen, judul: 'Modul', isi: `${DAFTAR_BAB.length} bab pelajaran interaktif dengan mode Praktis Klinis.` },
  { to: '/checklist', ikon: ClipboardCheck, judul: 'Checklist', isi: 'Deteksi dini dan keputusan merujuk saat pemeriksaan antenatal.' },
  { to: '/risiko', ikon: Gauge, judul: 'Skor Risiko', isi: 'Hitung risiko maternal saat kunjungan menggunakan mWHO 2.0 dan CARPREG II.' },
]

function hurufAwal(t: string) {
  const h = t.normalize('NFD').replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase()
  return h || '#'
}

function DaftarPustaka() {
  const [cari, setCari] = useState('')
  const [terbuka, setTerbuka] = useState<Set<string>>(() => new Set())
  const toggle = (h: string) =>
    setTerbuka((s) => {
      const n = new Set(s)
      if (n.has(h)) n.delete(h)
      else n.add(h)
      return n
    })
  const kelompok = useMemo(() => {
    const q = cari.trim().toLowerCase()
    const hasil = q ? PUSTAKA.filter((r) => r.teks.toLowerCase().includes(q)) : PUSTAKA
    const peta = new Map<string, typeof PUSTAKA>()
    for (const r of hasil) {
      const h = hurufAwal(r.teks)
      peta.set(h, [...(peta.get(h) ?? []), r])
    }
    return [...peta.entries()]
  }, [cari])
  const jumlah = kelompok.reduce((n, [, l]) => n + l.length, 0)

  return (
    <section className="tentang-blok" aria-labelledby="judul-pustaka">
      <div className="tentang-kepala">
        <div>
          <h2 id="judul-pustaka">Menggunakan materi berbasis bukti terkini</h2>
        </div>
        <label className="cari-pustaka">
          <Search aria-hidden />
          <input type="search" placeholder="Cari penulis, judul, atau jurnal" value={cari} onChange={(e) => setCari(e.target.value)} />
        </label>
      </div>
      <p className="pustaka-jumlah" aria-live="polite">
        {cari ? `${jumlah} dari ${PUSTAKA.length} rujukan` : `${PUSTAKA.length} rujukan`}
      </p>
      {kelompok.map(([huruf, daftar]) => {
        const buka = Boolean(cari.trim()) || terbuka.has(huruf)
        const id = `pustaka-${huruf}`
        return (
          <div key={huruf} className="pustaka-grup" data-open={buka || undefined}>
            <button type="button" className="pustaka-toggle" aria-expanded={buka} aria-controls={id} onClick={() => toggle(huruf)}>
              <ChevronRight className="pustaka-chevron" aria-hidden />
              <span className="pustaka-huruf">{huruf}</span>
              <span className="pustaka-hitung">{daftar.length} rujukan</span>
            </button>
            {buka && (
              <ul id={id} className="pustaka-daftar">
                {daftar.map((r) => (
                  <li key={r.teks}>
                    <p>
                      <TeksRujukan>{r.teks}</TeksRujukan>
                    </p>
                    <span className="pustaka-bab">
                      {r.bab.map((n) => (
                        <Link key={n} to={`/modul/${SLUG[n]}`}>
                          Bab {n}
                        </Link>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
      {jumlah === 0 && <p className="muted">Tidak ada rujukan yang cocok.</p>}
    </section>
  )
}

export default function Tentang() {
  return (
    <div className="tentang">
      <section className="hero tentang-hero">
        <h1>Membantu pelayanan dalam menangani ibu hamil dengan penyakit jantung</h1>
        <p className="lead">
          MatSkrin berisi materi belajar dan alat bantu praktis untuk mengenali, menilai, dan merujuk ibu hamil dengan
          penyakit jantung, berdasarkan EBM (<em>evidence-based medicine</em>) terkini.
        </p>
      </section>

      <section className="tentang-blok" aria-labelledby="judul-sasaran">
        <h2 id="judul-sasaran">Dibuat oleh tenaga kesehatan, untuk tenaga kesehatan</h2>
        <div className="tentang-grid">
          {SASARAN.map(({ ikon: Ikon, judul, isi }) => (
            <div key={judul} className="tentang-kartu">
              <span className="tentang-ikon" aria-hidden>
                <Ikon />
              </span>
              <h3>{judul}</h3>
              <p>{isi}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tentang-blok" aria-labelledby="judul-langkah">
        <h2 id="judul-langkah">Kenali, tangani, rujuk</h2>
        <p className="muted tentang-sub">
          Keputusan yang diambil di layanan primer sebelum pasien sampai ke spesialis sangat berharga.
        </p>
        <ol className="tentang-langkah">
          {LANGKAH.map((l, i) => (
            <li key={l.judul}>
              <span className="tentang-langkah-no" aria-hidden>
                {i + 1}
              </span>
              <strong>{l.judul}</strong>
              <p>{l.isi}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="tentang-blok" aria-labelledby="judul-isi">
        <h2 id="judul-isi">Pedoman singkat bagi tenaga kesehatan</h2>
        <div className="cards">
          {ISI.map(({ to, ikon: Ikon, judul, isi }) => (
            <Link key={to} to={to} className="card flex flex-col">
              <span className="tentang-ikon mb-3" aria-hidden>
                <Ikon />
              </span>
              <h3 className="m-0 mb-1 text-[1.1rem]">{judul}</h3>
              <p>{isi}</p>
              <span className="card-cta mt-auto inline-flex items-center gap-1">
                Buka <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <aside className="tentang-catatan">
        <ShieldAlert aria-hidden />
        <p>
          MatSkrin adalah alat bantu edukasi. Hasil kalkulator dan checklist tidak menggantikan penilaian klinis maupun
          konsultasi dengan spesialis.
        </p>
      </aside>

      <section className="tentang-blok" id="lisensi" aria-labelledby="judul-lisensi">
        <p className="eyebrow">Lisensi</p>
        <h2 id="judul-lisensi">Hak cipta dan lisensi</h2>
        <p className="muted">
          © 2026 COHARD-PH, Departemen Kardiologi dan Kedokteran Vaskular, RSUP Dr. Sardjito/FK-KMK UGM.
        </p>
        <div className="sumber-skor">
          <div className="tentang-kartu">
            <h3>Konten edukasi</h3>
            <p>
              Teks modul, checklist, data skor, serta gambar dan diagram buatan tim dilisensikan{' '}
              <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.id" target="_blank" rel="license noopener">
                CC BY-NC-SA 4.0
              </a>
              . Konten dapat dibagikan dan diadaptasi untuk tujuan nonkomersial dengan mencantumkan sumber dan memakai
              lisensi yang sama.
            </p>
          </div>
          <div className="tentang-kartu">
            <h3>Kode sumber</h3>
            <p>
              Kode aplikasi dilisensikan{' '}
              <a href="https://github.com/MatSkrin/matskrin/blob/main/LICENSE" target="_blank" rel="noopener">
                MIT
              </a>
              .
            </p>
          </div>
          <div className="tentang-kartu">
            <h3>Materi pihak ketiga</h3>
            <p>
              Gambar dari Wikimedia Commons dan artikel terbitan terbuka, serta tabel atau gambar yang diadaptasi dari
              pedoman ESC, tetap mengikuti lisensi atau hak cipta pemilik. Atribusi tercantum di keterangan gambar.
            </p>
          </div>
        </div>
      </section>

      <DaftarPustaka />
    </div>
  )
}
