import { Link } from 'react-router-dom'

export default function Beranda() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Modul pembelajaran</p>
        <h1>Penyakit Jantung pada Kehamilan</h1>
        <p className="lead">
          Materi ringkas untuk dokter umum: fisiologi, deteksi dini, evaluasi, dan stratifikasi risiko ibu hamil dengan
          penyakit jantung, berlandaskan pedoman ESC 2025.
        </p>
      </section>
      <div className="cards">
        <Link to="/modul" className="card">
          <h2>Modul pengetahuan</h2>
          <p>Baca materi per bab, lengkap dengan Poin Klinis dan daftar pustaka.</p>
          <span className="card-cta">Buka modul →</span>
        </Link>
        <Link to="/risiko" className="card">
          <h2>Penilaian risiko</h2>
          <p>Hitung klasifikasi mWHO, skor CARPREG II, dan skor ZAHARA untuk pasien Anda.</p>
          <span className="card-cta">Mulai menilai →</span>
        </Link>
      </div>
    </>
  )
}
