import { ArrowRight, BookOpen, ClipboardCheck, Gauge } from 'lucide-react'
import { Link } from 'react-router-dom'
import LanjutkanBelajar from '@/components/LanjutkanBelajar'

const MENU = [
  {
    to: '/modul',
    ikon: BookOpen,
    judul: 'Modul',
    isi: 'Pembelajaran singkat penyakit jantung pada kehamilan, diagnosis, stratifikasi risiko, dan tata laksana.',
    cta: 'Buka modul',
  },
  {
    to: '/checklist',
    ikon: ClipboardCheck,
    judul: 'Checklist Pemeriksaan',
    isi: 'Penilaian anamnesis, gejala, tanda vital, pemeriksaan fisik, serta EKG yang diperlukan untuk keperluan merujuk.',
    cta: 'Mulai checklist',
  },
  {
    to: '/risiko',
    ikon: Gauge,
    judul: 'Skor Risiko',
    isi: 'Penilaian risiko maternal menggunakan mWHO 2.0 dan skor CARPREG II.',
    cta: 'Hitung skor risiko',
  },
]

export default function Beranda() {
  return (
    <>
      <section className="hero">
        <h1 className="hero-judul">
          <span className="text-accent">Mat</span>Skrin
        </h1>
        <p className="hero-sub">Skrining penyakit jantung pada kehamilan</p>
        <p className="lead">Deteksi dini, evaluasi, dan stratifikasi risiko ibu hamil dengan penyakit jantung.</p>
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
