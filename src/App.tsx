import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import Beranda from './pages/Beranda'
import DaftarModul from './pages/DaftarModul'
import HalamanBab from './pages/HalamanBab'
import PenilaianRisiko from './pages/PenilaianRisiko'
import PanduanKlinis from './pages/checklist/PanduanKlinis'
import Tentang from './pages/Tentang'

export default function App() {
  return (
    <HashRouter>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <NavLink to="/" className="brand">
            <span className="brand-mark" aria-hidden>♥</span>
            Jantung &amp; Kehamilan
          </NavLink>
          <nav>
            <NavLink to="/modul">Modul</NavLink>
            <NavLink to="/checklist">Checklist</NavLink>
            <NavLink to="/risiko">Skor Risiko</NavLink>
            <NavLink to="/tentang">Tentang</NavLink>
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
