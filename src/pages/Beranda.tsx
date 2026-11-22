import { ArrowRight, BookOpen, ClipboardCheck, Gauge } from 'lucide-react'
import { Link } from 'react-router-dom'
import LanjutkanBelajar from '@/components/LanjutkanBelajar'
import { DAFTAR_BAB } from '@/lib/content'

const jumlahKartu = DAFTAR_BAB.reduce((n, b) => n + b.kartu.length, 0)

const MENU = [
  {
    to: '/modul',
    ikon: BookOpen,
    judul: 'Modul',
    isi: `${DAFTAR_BAB.length} bab dalam ${jumlahKartu} kartu pelajaran, lengkap dengan Poin Klinis, tabel bukti, dan mode Ringkas klinis.`,
    cta: 'Buka modul',
  },
  {
    to: '/checklist',
    ikon: ClipboardCheck,
    judul: 'Checklist Puskesmas',
    isi: 'Panduan langkah demi langkah: riwayat, gejala, tanda vital, auskultasi, EKG, sampai triase dan surat rujukan.',
    cta: 'Mulai checklist',
  },
  {
    to: '/risiko',
    ikon: Gauge,
    judul: 'Skor Risiko',
    isi: 'Tentukan kelas mWHO 2.0 dan skor CARPREG II sesuai pedoman ESC 2025.',
    cta: 'Hitung skor risiko',
  },
]

export default function Beranda() {
  return (
    <>
      <section className="hero">
        <h1>Penyakit Jantung pada Kehamilan</h1>
        <p className="lead">
          Materi ringkas untuk dokter umum: fisiologi, deteksi dini, evaluasi, dan stratifikasi risiko ibu hamil dengan
          penyakit jantung, berlandaskan pedoman ESC 2025.
        </p>
      </section>
      <LanjutkanBelajar className="mb-4" />
      <div className="cards">
        {MENU.map(({ to, ikon: Ikon, judul, isi, cta }) => (
          <Link key={to} to={to} className="card flex flex-col">
            <span className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent" aria-hidden>
              <Ikon className="size-5" />
            </span>
            <h2>{judul}</h2>
            <p>{isi}</p>
            <span className="card-cta mt-auto inline-flex items-center gap-1">
              {cta} <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
