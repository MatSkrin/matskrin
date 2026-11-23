import { useEffect } from 'react'
import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { DAFTAR_BAB } from './lib/content'
import Beranda from './pages/Beranda'
import DaftarModul from './pages/DaftarModul'
import HalamanBab from './pages/HalamanBab'
import PenilaianRisiko from './pages/PenilaianRisiko'
import PanduanKlinis from './pages/checklist/PanduanKlinis'
import Tentang from './pages/Tentang'
import Logo from './components/Logo'
import KeAtas from './components/KeAtas'
import TombolTema from './components/TombolTema'

// Di ponsel, menu ini menjadi bilah tab di bawah layar (lihat .nav-utama di index.css).
const MENU = [
  { to: '/modul', label: 'Modul', ikon: 'M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5zM13 4h5.5A1.5 1.5 0 0 1 20 5.5v12a1.5 1.5 0 0 1-1.5 1.5H13z' },
  { to: '/checklist', label: 'Checklist', ikon: 'M9 5h10M9 12h10M9 19h10M4 5l1 1 2-2M4 12l1 1 2-2M4 19l1 1 2-2' },
  { to: '/risiko', label: 'Skor Risiko', ikon: 'M5 20V12M10 20V7M15 20v-5M20 20V4' },
  { to: '/tentang', label: 'Tentang', ikon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01' },
]

const JUDUL: Record<string, string> = { '/': '', '/modul': 'Modul', '/checklist': 'Checklist Puskesmas', '/risiko': 'Skor Risiko', '/tentang': 'Tentang' }

/** Judul tab per halaman (WCAG 2.4.2) dan pindah ke atas saat ganti halaman. */
function JudulHalaman() {
  const { pathname } = useLocation()
  useEffect(() => {
    const bab = DAFTAR_BAB.find((b) => pathname === `/modul/${b.slug}`)
    const judul = bab ? `Bab ${bab.nomor}: ${bab.judul}` : JUDUL[pathname]
    document.title = judul ? `${judul} · MatSkrin` : 'MatSkrin · Penyakit Jantung pada Kehamilan'
  }, [pathname])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <JudulHalaman />
      <a href="#konten" className="lewati" onClick={(e) => { e.preventDefault(); const m = document.getElementById('konten'); m?.focus(); m?.scrollIntoView() }}>
        Lewati ke konten
      </a>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <NavLink to="/" className="brand" aria-label="MatSkrin, ke beranda">
            <Logo className="brand-mark" />
            <span className="brand-nama">
              <b>Mat</b>Skrin
            </span>
          </NavLink>
          <nav className="nav-utama" aria-label="Menu utama">
            {MENU.map((m) => (
              <NavLink key={m.to} to={m.to}>
                <svg className="nav-ikon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={m.ikon} />
                </svg>
                <span>{m.label}</span>
              </NavLink>
            ))}
          </nav>
          <TombolTema />
        </div>
      </header>
      <main className="wrap" id="konten" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/modul" element={<DaftarModul />} />
          <Route path="/modul/:slug" element={<HalamanBab />} />
          <Route path="/checklist" element={<PanduanKlinis />} />
          <Route path="/risiko" element={<PenilaianRisiko />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="*" element={<p>Halaman tidak ditemukan.</p>} />
        </Routes>
      </main>
      <footer className="wrap footer">
        <p className="m-0">
          Alat bantu edukasi untuk tenaga kesehatan. Tidak menggantikan penilaian klinis dan konsultasi spesialis.
        </p>
        <p className="footer-lisensi">
          © 2026 COHARD-PH, Departemen Kardiologi dan Kedokteran Vaskular, RSUP Dr. Sardjito/FK-KMK UGM. Konten:{' '}
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.id" target="_blank" rel="license noopener">
            CC BY-NC-SA 4.0
          </a>
          . Kode: MIT. <NavLink to="/tentang">Rincian lisensi</NavLink>
        </p>
      </footer>
      <div className="fab-grup">
        <KeAtas />
      </div>
    </HashRouter>
  )
}
