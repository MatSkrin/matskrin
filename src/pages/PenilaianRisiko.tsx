import { useMemo, useState } from 'react'
import { CARPREG2, MWHO, SUMBER_MWHO, ZAHARA, type SkorRisiko } from '../data/risk'
import { hitungSkor, kategoriSkor, kelasMWHO } from '../lib/risk'

type Tab = 'mwho' | 'carpreg2' | 'zahara'

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

function KalkulatorSkor({ skor }: { skor: SkorRisiko }) {
  const [dipilih, toggle, reset] = useToggleSet()
  const nilai = hitungSkor(skor, dipilih)
  const kat = kategoriSkor(skor, nilai)
  return (
    <div className="calc">
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
      <aside className="result" aria-live="polite">
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
      <div className="calc-form">
        <p className="muted">
          Centang semua kondisi yang dimiliki pasien. Kelas mWHO ditentukan oleh kondisi dengan kelas tertinggi.
        </p>
        {MWHO.map((k) => (
          <fieldset key={k.kelas}>
            <legend>mWHO {k.kelas}</legend>
            {k.kondisi.map((c) => (
              <label key={c.id} className="check">
                <input type="checkbox" checked={dipilih.has(c.id)} onChange={() => toggle(c.id)} />
                <span>{c.label}</span>
              </label>
            ))}
          </fieldset>
        ))}
        <button type="button" className="ghost" onClick={reset}>Atur ulang</button>
      </div>
      <aside className="result" aria-live="polite">
        {hasil ? (
          <>
            <p className="result-label">Klasifikasi</p>
            <p className={`result-num kelas-${hasil.kelas.replace('–', '-')}`}>mWHO {hasil.kelas}</p>
            <p className="result-label">Angka kejadian kardiak maternal</p>
            <p className="result-risk">{hasil.kejadian}</p>
            <dl>
              <dt>Risiko</dt>
              <dd>{hasil.risiko}</dd>
              <dt>Konseling</dt>
              <dd>{hasil.konseling}</dd>
              <dt>Tempat perawatan</dt>
              <dd>{hasil.pusat}</dd>
              <dt>Kontrol minimal</dt>
              <dd>{hasil.kontrol}</dd>
            </dl>
          </>
        ) : (
          <p className="muted">Belum ada kondisi yang dipilih.</p>
        )}
        <p className="source">{SUMBER_MWHO}</p>
      </aside>
    </div>
  )
}

export default function PenilaianRisiko() {
  const [tab, setTab] = useState<Tab>('mwho')
  return (
    <>
      <h1>Penilaian Risiko</h1>
      <p className="warn">
        Kriteria belum diverifikasi terhadap pedoman ESC 2025. Gunakan hanya untuk pembelajaran sampai verifikasi
        selesai.
      </p>
      <div className="tabs" role="tablist">
        {(
          [
            ['mwho', 'mWHO'],
            ['carpreg2', 'CARPREG II'],
            ['zahara', 'ZAHARA'],
          ] as const
        ).map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'mwho' && <KalkulatorMWHO />}
      {tab === 'carpreg2' && <KalkulatorSkor key="c" skor={CARPREG2} />}
      {tab === 'zahara' && <KalkulatorSkor key="z" skor={ZAHARA} />}
    </>
  )
}
