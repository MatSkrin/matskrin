import { perilakuGulir } from '@/lib/utils'
import { useMemo, useState } from 'react'
import {
  CARPREG2,
  DEFINISI_KEJADIAN,
  MWHO,
  SUMBER_KEJADIAN,
  SUMBER_MWHO,
  type KelompokMWHO,
  type KondisiMWHO,
  type SkorRisiko,
} from '../data/risk'
import { hitungSkor, kategoriSkor, kelasMWHO } from '../lib/risk'

type Tab = 'mwho' | 'carpreg2'

// Kondisi dikelompokkan menurut diagnosis seperti di Tabel 6 ESC 2025; kelas tiap kondisi ditampilkan di kanan.
const KELOMPOK_MWHO: { kelompok: KelompokMWHO; kondisi: (KondisiMWHO & { kelas: string })[] }[] = []
for (const k of MWHO) {
  for (const c of k.kondisi) {
    let g = KELOMPOK_MWHO.find((x) => x.kelompok === c.kelompok)
    if (!g) {
      g = { kelompok: c.kelompok, kondisi: [] }
      KELOMPOK_MWHO.push(g)
    }
    g.kondisi.push({ ...c, kelas: k.kelas })
  }
}
const URUTAN_KELOMPOK: KelompokMWHO[] = [
  'Fungsi ventrikel dan hipertensi pulmonal',
  'Aritmia',
  'Kardiomiopati',
  'Penyakit jantung bawaan',
  'Penyakit katup jantung',
  'Aortopati',
  'Penyakit didapat, koroner, dan lainnya',
]
KELOMPOK_MWHO.sort((a, b) => URUTAN_KELOMPOK.indexOf(a.kelompok) - URUTAN_KELOMPOK.indexOf(b.kelompok))

function useToggleSet() {
  const [set, setSet] = useState<Set<string>>(new Set())
  const toggle = (id: string) =>
    setSet((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  return [set, toggle, () => setSet(new Set())] as const
}

const fmt = (n: number) => n.toLocaleString('id-ID', { maximumFractionDigits: 2 })

// Ringkasan hasil yang menempel di atas layar ponsel, agar hasil tetap terlihat saat mencentang
// daftar kriteria yang panjang. Disembunyikan di layar lebar (hasil lengkap sudah di samping).
function RingkasHasil({ judul, isi }: { judul: string; isi: string }) {
  return (
    <button
      type="button"
      className="result-mini"
      onClick={() => document.getElementById('hasil-risiko')?.scrollIntoView({ behavior: perilakuGulir(), block: 'start' })}
    >
      <strong>{judul}</strong>
      <span>{isi}</span>
      <span className="result-mini-cta">Detail ↓</span>
    </button>
  )
}

function KalkulatorSkor({ skor }: { skor: SkorRisiko }) {
  const [dipilih, toggle, reset] = useToggleSet()
  const nilai = hitungSkor(skor, dipilih)
  const kat = kategoriSkor(skor, nilai)
  return (
    <div className="calc">
      <RingkasHasil judul={`Skor ${fmt(nilai)}`} isi={kat.risiko} />
      <div className="calc-form">
        <p className="muted">{skor.deskripsi}</p>
        <fieldset>
          <legend>Centang prediktor yang ada</legend>
          {skor.kriteria.map((k) => (
            <label key={k.id} className="check">
              <input type="checkbox" checked={dipilih.has(k.id)} onChange={() => toggle(k.id)} />
              <span>
                {k.label}
                {k.keterangan && <small>{k.keterangan}</small>}
              </span>
              <span className="poin">{fmt(k.poin)}</span>
            </label>
          ))}
        </fieldset>
        <button type="button" className="ghost" onClick={reset}>Atur ulang</button>
      </div>
      <aside className="result" id="hasil-risiko" aria-live="polite">
        <p className="result-label">Skor {skor.nama}</p>
        <p className="result-num">{fmt(nilai)}</p>
        <p className="result-label">Risiko kejadian kardiak maternal</p>
        <p className="result-risk">{kat.risiko}</p>
        <table className="ranges">
          <tbody>
            {skor.rentang.map((r) => (
              <tr key={r.label} className={r === kat ? 'on' : ''}>
                <td>{r.label}</td>
                <td>{r.risiko}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="source">{skor.sumber}</p>
      </aside>
    </div>
  )
}

function KalkulatorMWHO() {
  const [dipilih, toggle, reset] = useToggleSet()
  const hasil = useMemo(() => kelasMWHO(dipilih), [dipilih])
  return (
    <div className="calc">
      <RingkasHasil
        judul={hasil ? `mWHO ${hasil.kelas}` : 'mWHO 2.0'}
        isi={hasil ? `${hasil.kejadian.vanHagen} / ${hasil.kejadian.silversides}` : 'Belum ada kondisi dipilih'}
      />
      <div className="calc-form">
        <p className="muted">
          Centang semua kondisi yang dimiliki pasien. Kelas mWHO 2.0 ditentukan oleh kondisi dengan kelas tertinggi,
          lalu disesuaikan per pasien dengan prediktor CARPREG II.
        </p>
        {KELOMPOK_MWHO.map((g) => (
          <fieldset key={g.kelompok}>
            <legend>{g.kelompok}</legend>
            {g.kondisi.map((c) => (
              <label key={c.id} className="check">
                <input type="checkbox" checked={dipilih.has(c.id)} onChange={() => toggle(c.id)} />
                <span>{c.label}</span>
                <span className={`poin kelas-tag kelas-${c.kelas.replace('–', '-')}`}>{c.kelas}</span>
              </label>
            ))}
          </fieldset>
        ))}
        <button type="button" className="ghost" onClick={reset}>Atur ulang</button>
      </div>
      <aside className="result" id="hasil-risiko" aria-live="polite">
        {hasil ? (
          <>
            <p className="result-label">Klasifikasi</p>
            <p className={`result-num kelas-${hasil.kelas.replace('–', '-')}`}>mWHO 2.0 {hasil.kelas}</p>
            <p className="result-label">Rerata angka kejadian kardiak maternal</p>
            <table className="ranges">
              <tbody>
                <tr>
                  <td>van Hagen dkk. (2016)</td>
                  <td>{hasil.kejadian.vanHagen}</td>
                </tr>
                <tr>
                  <td>Silversides dkk. (2018)</td>
                  <td>{hasil.kejadian.silversides}</td>
                </tr>
              </tbody>
            </table>
            <dl>
              <dt>Risiko</dt>
              <dd>{hasil.risiko}</dd>
              <dt>Keterlibatan Pregnancy Heart Team</dt>
              <dd>{hasil.pht}</dd>
              <dt>Konseling</dt>
              <dd>{hasil.konseling}</dd>
              <dt>Perawatan selama kehamilan</dt>
              <dd>{hasil.perawatan}</dd>
              <dt>Tempat persalinan</dt>
              <dd>{hasil.persalinan}</dd>
            </dl>
          </>
        ) : (
          <p className="muted">Belum ada kondisi yang dipilih.</p>
        )}
        <p className="source">{DEFINISI_KEJADIAN}</p>
        <p className="source">{SUMBER_MWHO}</p>
        <p className="source">{SUMBER_KEJADIAN.vanHagen}</p>
        <p className="source">{SUMBER_KEJADIAN.silversides}</p>
      </aside>
    </div>
  )
}

export default function PenilaianRisiko() {
  const [tab, setTab] = useState<Tab>('mwho')
  return (
    <>
      <h1>Skor Risiko</h1>
      <p className="muted">
        Klasifikasi mWHO 2.0 dan prediktor CARPREG II mengikuti Tabel 6 pedoman ESC 2025. Hasil kalkulator membantu
        stratifikasi risiko dan tidak menggantikan penilaian klinis.
      </p>
      <div className="tabs" role="tablist">
        {(
          [
            ['mwho', 'mWHO'],
            ['carpreg2', 'CARPREG II'],
          ] as const
        ).map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'mwho' && <KalkulatorMWHO />}
      {tab === 'carpreg2' && <KalkulatorSkor key="c" skor={CARPREG2} />}
    </>
  )
}
