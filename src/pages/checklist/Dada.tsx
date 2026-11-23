import { useState } from 'react'
import { TeksIstilah } from '@/components/Istilah'

type Titik = { id: string; x: number; y: number; label: string; nama: string; lokasi: string; isi: string; tambahan?: boolean }

// Koordinat skematis (viewBox 320×330). Kanan ibu tampil di kiri gambar, seperti saat berhadapan.
const AUSKULTASI: Titik[] = [
  { id: 'A', x: 131, y: 101, label: 'A', nama: 'Aorta', lokasi: 'ICS 2 parasternal kanan', isi: 'Stenosis aorta; dengarkan penjalaran ke karotis.' },
  { id: 'P', x: 169, y: 101, label: 'P', nama: 'Pulmonal', lokasi: 'ICS 2 parasternal kiri', isi: 'Bising sistolik fungsional kehamilan, ASD, stenosis pulmonal. Nilai P2 dan split S2 di sini.' },
  { id: 'E', x: 169, y: 126, label: 'E', nama: 'Erb', lokasi: 'ICS 3 parasternal kiri', isi: 'Regurgitasi aorta/pulmonal. Dengarkan saat ibu duduk condong ke depan dan menahan napas setelah ekspirasi.' },
  { id: 'T', x: 167, y: 163, label: 'T', nama: 'Trikuspid', lokasi: 'ICS 4–5 parasternal kiri', isi: 'Regurgitasi trikuspid, VSD. Bising sisi kanan mengeras saat inspirasi dalam.' },
  { id: 'M', x: 211, y: 176, label: 'M', nama: 'Mitral (apeks)', lokasi: 'Apeks, ICS 5 linea midklavikula kiri', isi: 'MR (menjalar ke aksila); MS (rumble, dengan bell, ibu miring kiri). Pada kehamilan lanjut, tentukan apeks dengan meraba iktus.' },
  { id: 'kar', x: 142, y: 28, label: '', nama: 'Karotis', lokasi: 'Leher, sisi kanan', isi: 'Penjalaran bising stenosis aorta.', tambahan: true },
  { id: 'sup', x: 108, y: 54, label: '', nama: 'Supraklavikula kanan', lokasi: 'Di atas klavikula kanan', isi: 'Venous hum (hilang bila vena jugularis ditekan).', tambahan: true },
  { id: 'inf', x: 204, y: 80, label: '', nama: 'Infraklavikula kiri', lokasi: 'Di bawah klavikula kiri', isi: 'Bising kontinu PDA.', tambahan: true },
  { id: 'aks', x: 276, y: 168, label: '', nama: 'Aksila kiri', lokasi: 'Ketiak kiri', isi: 'Penjalaran bising MR.', tambahan: true },
]

const ELEKTRODA: Titik[] = [
  { id: 'V1', x: 135, y: 151, label: 'V1', nama: 'V1', lokasi: 'ICS 4, tepi kanan sternum', isi: 'Hitung sela iga dari sudut Louis (= ICS 2). V1–V2 yang terlalu tinggi menghasilkan pola mirip RBBB inkomplet/ASD.' },
  { id: 'V2', x: 165, y: 151, label: 'V2', nama: 'V2', lokasi: 'ICS 4, tepi kiri sternum', isi: 'Sejajar V1 di sisi kiri sternum.' },
  { id: 'V3', x: 188, y: 164, label: 'V3', nama: 'V3', lokasi: 'Di tengah antara V2 dan V4', isi: 'Pasang setelah V4.' },
  { id: 'V4', x: 211, y: 177, label: 'V4', nama: 'V4', lokasi: 'ICS 5, linea midklavikula kiri', isi: 'Pada perempuan, letakkan di bawah payudara (bukan di atasnya).' },
  { id: 'V5', x: 242, y: 179, label: 'V5', nama: 'V5', lokasi: 'Linea aksilaris anterior, sejajar V4', isi: 'Di bawah payudara, sejajar horizontal dengan V4.' },
  { id: 'V6', x: 270, y: 181, label: 'V6', nama: 'V6', lokasi: 'Linea aksilaris media, sejajar V4', isi: 'Sejajar horizontal dengan V4 dan V5.' },
]

function Iga({ y }: { y: number }) {
  return (
    <>
      <path d={`M158 ${y} Q215 ${y - 5} 268 ${y + 30}`} />
      <path d={`M142 ${y} Q85 ${y - 5} 52 ${y + 30}`} />
    </>
  )
}

/** Gambar dada skematis yang bisa diketuk: titik auskultasi atau letak elektroda prekordial. */
export function DadaInteraktif({ mode }: { mode: 'auskultasi' | 'ekg' }) {
  const titik = mode === 'ekg' ? ELEKTRODA : AUSKULTASI
  const [pilih, setPilih] = useState(titik[0].id)
  const [tambahan, setTambahan] = useState(false)
  const aktif = titik.find((t) => t.id === pilih) ?? titik[0]
  const tampil = titik.filter((t) => !t.tambahan || tambahan)

  return (
    <figure className="dada">
      <div className="dada-grid">
        <svg viewBox="0 0 320 330" role="img" aria-label={mode === 'ekg' ? 'Letak elektroda prekordial V1 sampai V6' : 'Lima area auskultasi pada dinding dada'}>
          {/* Siluet tubuh */}
          <g className="dada-tubuh">
            <path d="M136 0 Q138 30 128 40 Q100 56 58 66 Q34 76 32 120 L40 330 M184 0 Q182 30 192 40 Q220 56 262 66 Q286 76 288 120 L280 330" />
            <path className="dada-payudara" d="M176 176 Q205 232 258 186 M144 176 Q115 232 62 186" />
          </g>
          {/* Jantung (bayangan) */}
          <path className="dada-jantung" d="M128 96 Q116 140 140 168 Q170 196 214 180 Q214 146 186 112 Q170 92 150 92 Z" />
          {/* Iga, klavikula, sternum */}
          <g className="dada-tulang">
            {[72, 88, 113, 138, 163, 188].map((y) => <Iga key={y} y={y} />)}
            <path d="M146 64 Q112 52 76 64 M174 64 Q208 52 244 64" className="dada-klavikula" />
            <rect x="143" y="62" width="14" height="150" rx="6" className="dada-sternum" />
            <line x1="143" x2="157" y1="88" y2="88" className="dada-louis" />
          </g>
          {mode === 'auskultasi' && (
            <text x="160" y="86" className="dada-ket" textAnchor="start" dx="16">sudut Louis</text>
          )}
          {mode === 'ekg' && <text x="160" y="86" className="dada-ket" dx="16">sudut Louis (ICS 2)</text>}
          {tampil.map((t) => (
            <g
              key={t.id}
              className={`dada-titik ${t.id === aktif.id ? 'on' : ''} ${t.tambahan ? 'tambahan' : ''}`}
              transform={`translate(${t.x} ${t.y})`}
              onClick={() => setPilih(t.id)}
            >
              <circle r={t.tambahan ? 8 : 13} />
              {t.label && <text textAnchor="middle" dy="4.5">{t.label}</text>}
            </g>
          ))}
          <text x="14" y="322" className="dada-ket">kanan ibu</text>
          <text x="306" y="322" className="dada-ket" textAnchor="end">kiri ibu</text>
        </svg>
        <div className="dada-info" aria-live="polite">
          <div className="dada-pilihan" role="group" aria-label="Pilih titik">
            {tampil.map((t) => (
              <button key={t.id} type="button" aria-pressed={t.id === aktif.id} onClick={() => setPilih(t.id)} className={t.tambahan ? 'tambahan' : ''}>
                {t.label || t.nama}
              </button>
            ))}
          </div>
          <p className="dada-nama">{mode === 'ekg' ? `Elektroda ${aktif.nama}` : aktif.label ? `${aktif.label} · ${aktif.nama}` : aktif.nama}</p>
          <p className="dada-lokasi"><TeksIstilah>{aktif.lokasi}</TeksIstilah></p>
          <p><TeksIstilah>{aktif.isi}</TeksIstilah></p>
          {mode === 'auskultasi' && (
            <label className="dada-toggle">
              <input type="checkbox" checked={tambahan} onChange={(e) => setTambahan(e.target.checked)} /> Tampilkan area tambahan
            </label>
          )}
        </div>
      </div>
      <figcaption>
        {mode === 'ekg'
          ? 'Ketuk elektroda untuk melihat letaknya. Gambar skematis; kanan ibu di sisi kiri gambar.'
          : 'Ketuk titik untuk melihat apa yang dicari. Gambar skematis; kanan ibu di sisi kiri gambar.'}
      </figcaption>
    </figure>
  )
}
