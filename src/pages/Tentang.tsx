import { ArrowRight, BookOpen, ClipboardCheck, Gauge, Hospital, Search, ShieldAlert, Siren, Stethoscope, UsersRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TeksRujukan } from '@/components/belajar/Pustaka'
import { PELAJARAN } from '@/content/pelajaran'
import { DAFTAR_BAB } from '@/lib/content'
import { gabungPustaka } from '@/lib/pustakaGabungan'
import { CARPREG2, SUMBER_KEJADIAN } from '../data/risk'

const PUSTAKA = gabungPustaka(Object.values(PELAJARAN).map((p) => ({ nomor: p.meta.nomor, pustaka: p.pustaka })))
const SLUG = Object.fromEntries(DAFTAR_BAB.map((b) => [b.nomor, b.slug]))
const JUMLAH_KARTU = DAFTAR_BAB.reduce((n, b) => n + b.kartu.length, 0)

const SASARAN = [
  { ikon: Hospital, judul: 'Puskesmas dan klinik', isi: 'Dokter umum yang menemui ibu hamil saat ANC dan menjadi pintu pertama rujukan.' },
  { ikon: Siren, judul: 'IGD', isi: 'Dokter jaga yang menerima ibu hamil atau nifas dengan sesak, nyeri dada, atau berdebar.' },
  { ikon: UsersRound, judul: 'Bidan dan tenaga kesehatan lain', isi: 'Tim yang paling sering bertemu ibu hamil dan perlu tahu kapan harus waspada.' },
]

const LANGKAH = [
  { judul: 'Kenali', isi: 'Tanda dan gejala yang bukan sekadar perubahan fisiologis kehamilan.' },
  { judul: 'Tangani', isi: 'Pemeriksaan dan tata laksana awal yang bisa dikerjakan di layanan primer.' },
  { judul: 'Rujuk', isi: 'Kapan dan ke mana pasien dirujuk, termasuk ke Pregnancy Heart Team.' },
]

const ISI = [
  { to: '/modul', ikon: BookOpen, judul: 'Modul', isi: `${DAFTAR_BAB.length} bab pelajaran interaktif dengan mode Ringkas klinis untuk dibaca cepat saat praktik.` },
  { to: '/checklist', ikon: ClipboardCheck, judul: 'Checklist', isi: 'Deteksi dini saat ANC: riwayat, gejala, tanda vital, auskultasi, dan EKG, dengan hasil triase otomatis.' },
  { to: '/risiko', ikon: Gauge, judul: 'Skor Risiko', isi: 'Kalkulator kelas mWHO 2.0 dan skor CARPREG II.' },
]

function hurufAwal(t: string) {
  const h = t.normalize('NFD').replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase()
  return h || '#'
}

function DaftarPustaka() {
  const [cari, setCari] = useState('')
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
          <p className="eyebrow">Rujukan</p>
          <h2 id="judul-pustaka">Daftar pustaka</h2>
          <p className="muted m-0">
            Gabungan dari seluruh bab, diurutkan menurut abjad. Label bab menunjukkan bab yang mengutip rujukan tersebut.
          </p>
        </div>
        <label className="cari-pustaka">
          <Search aria-hidden />
          <input type="search" placeholder="Cari penulis, judul, atau jurnal" value={cari} onChange={(e) => setCari(e.target.value)} />
        </label>
      </div>
      <p className="pustaka-jumlah" aria-live="polite">
        {cari ? `${jumlah} dari ${PUSTAKA.length} rujukan` : `${PUSTAKA.length} rujukan`}
      </p>
      {kelompok.map(([huruf, daftar]) => (
        <div key={huruf} className="pustaka-grup">
          <h3 className="pustaka-huruf">{huruf}</h3>
          <ul className="pustaka-daftar">
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
        </div>
      ))}
      {jumlah === 0 && <p className="muted">Tidak ada rujukan yang cocok.</p>}
    </section>
  )
}

export default function Tentang() {
  return (
    <div className="tentang">
      <section className="hero tentang-hero">
        <p className="eyebrow">Tentang MatSkrin</p>
        <h1>Membantu layanan primer menangani ibu hamil dengan penyakit jantung</h1>
        <p className="lead">
          MatSkrin berisi materi belajar dan alat bantu praktis untuk mengenali, menilai, dan merujuk ibu hamil dengan
          penyakit jantung, berlandaskan pedoman ESC 2025.
        </p>
        <dl className="tentang-angka">
          <div>
            <dt>Bab</dt>
            <dd>{DAFTAR_BAB.length}</dd>
          </div>
          <div>
            <dt>Kartu pelajaran</dt>
            <dd>{JUMLAH_KARTU}</dd>
          </div>
          <div>
            <dt>Rujukan</dt>
            <dd>{PUSTAKA.length}</dd>
          </div>
          <div>
            <dt>Pedoman utama</dt>
            <dd>ESC 2025</dd>
          </div>
        </dl>
      </section>

      <section className="tentang-blok" aria-labelledby="judul-sasaran">
        <p className="eyebrow">Untuk siapa</p>
        <h2 id="judul-sasaran">Tenaga kesehatan di garis depan</h2>
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

      <section className="tentang-blok tentang-sudut" aria-labelledby="judul-sudut">
        <div className="tentang-sudut-teks">
          <span className="tentang-ikon" aria-hidden>
            <Stethoscope />
          </span>
          <h2 id="judul-sudut">Ditulis dari sudut pandang spesialis jantung</h2>
          <p>
            Materi disusun oleh dokter spesialis jantung dan pembuluh darah untuk rekan di layanan primer. Fokusnya pada
            keputusan yang diambil sebelum pasien sampai ke spesialis. Tindakan spesialistik hanya dibahas sekilas.
          </p>
        </div>
        <ol className="tentang-langkah">
          {LANGKAH.map((l, i) => (
            <li key={l.judul}>
              <span className="tentang-langkah-no" aria-hidden>
                {i + 1}
              </span>
              <div>
                <strong>{l.judul}</strong>
                <p>{l.isi}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="tentang-blok" aria-labelledby="judul-isi">
        <p className="eyebrow">Isi</p>
        <h2 id="judul-isi">Yang ada di MatSkrin</h2>
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

      <section className="tentang-blok" aria-labelledby="judul-skor">
        <p className="eyebrow">Sumber skor risiko</p>
        <h2 id="judul-skor">Dasar kalkulator</h2>
        <div className="sumber-skor">
          {[
            { judul: 'mWHO 2.0', isi: 'Tabel 6 pedoman ESC 2025.' },
            { judul: 'CARPREG II', isi: CARPREG2.sumber },
            { judul: 'Angka kejadian kardiak maternal', isi: SUMBER_KEJADIAN.vanHagen },
          ].map((k) => (
            <div key={k.judul} className="tentang-kartu">
              <h3>{k.judul}</h3>
              <p>
                <TeksRujukan>{k.isi}</TeksRujukan>
              </p>
            </div>
          ))}
        </div>
      </section>

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
              . Boleh dibagikan dan diadaptasi untuk tujuan nonkomersial dengan mencantumkan sumber dan memakai lisensi
              yang sama.
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
              pedoman ESC, tetap mengikuti lisensi atau hak cipta pemiliknya. Atribusinya tercantum di keterangan gambar.
            </p>
          </div>
        </div>
      </section>

      <DaftarPustaka />
    </div>
  )
}
