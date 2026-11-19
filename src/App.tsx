import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import Beranda from './pages/Beranda'
import DaftarModul from './pages/DaftarModul'
import HalamanBab from './pages/HalamanBab'
import PenilaianRisiko from './pages/PenilaianRisiko'
import PanduanKlinis from './pages/checklist/PanduanKlinis'
import Tentang from './pages/Tentang'

// Di ponsel, menu ini menjadi bilah tab di bawah layar (lihat .nav-utama di index.css).
const MENU = [
  { to: '/modul', label: 'Modul', ikon: 'M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5zM13 4h5.5A1.5 1.5 0 0 1 20 5.5v12a1.5 1.5 0 0 1-1.5 1.5H13z' },
  { to: '/checklist', label: 'Checklist', ikon: 'M9 5h10M9 12h10M9 19h10M4 5l1 1 2-2M4 12l1 1 2-2M4 19l1 1 2-2' },
  { to: '/risiko', label: 'Skor Risiko', ikon: 'M5 20V12M10 20V7M15 20v-5M20 20V4' },
  { to: '/tentang', label: 'Tentang', ikon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01' },
]

export default function App() {
  return (
    <HashRouter>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <NavLink to="/" className="brand">
            <span className="brand-mark" aria-hidden>♥</span>
            Jantung &amp; Kehamilan
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
        </div>
      </header>
      <main className="wrap">
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
        Alat bantu edukasi untuk tenaga kesehatan. Tidak menggantikan penilaian klinis dan konsultasi spesialis.
      </footer>
    </HashRouter>
  )
}
