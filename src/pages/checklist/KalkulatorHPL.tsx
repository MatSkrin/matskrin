import { useState } from 'react'
import { hariIni, hphtDariHpl, hplDariHpht, teksTanggal, teksUsia, usiaKehamilan } from '../../lib/kehamilan'

type Mode = 'hpht' | 'hpl'

/**
 * Kalkulator HPHT ↔ HPL dan usia kehamilan hari ini.
 * Nilai yang disimpan hanya HPHT; HPL selalu diturunkan darinya (HPHT + 280 hari).
 */
export default function KalkulatorHPL({ hpht, onHpht }: { hpht: string; onHpht: (hpht: string, ukRingkas: string) => void }) {
  const [mode, setMode] = useState<Mode>('hpht')
  const hpl = hpht ? (hplDariHpht(hpht) ?? '') : ''
  const hari = hariIni()
  const uk = hpht ? usiaKehamilan(hpht, hari) : undefined

  const ubah = (val: string, dari: Mode) => {
    const baru = !val ? '' : dari === 'hpht' ? val : (hphtDariHpl(val) ?? '')
    const u = baru ? usiaKehamilan(baru, hari) : undefined
    onHpht(baru, u && u.totalHari >= 0 ? teksUsia(u, true) : '')
  }

  let peringatan = ''
  if (uk && uk.totalHari < 0) peringatan = 'HPHT jatuh setelah hari ini. Periksa kembali tanggalnya.'
  else if (uk && uk.minggu >= 42) peringatan = 'Usia kehamilan ≥ 42 minggu. Periksa kembali tanggal, atau kehamilan sudah lewat waktu.'

  return (
    <div className="kalk-hpl">
      <div className="kalk-hpl-kepala">
        <h3>Kalkulator HPL dan usia kehamilan</h3>
        <div className="tabs kecil" role="tablist" aria-label="Hitung dari">
          {(
            [
              ['hpht', 'Dari HPHT'],
              ['hpl', 'Dari HPL'],
            ] as const
          ).map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => setMode(id)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {mode === 'hpht' ? (
        <label className="field">
          <span>HPHT (hari pertama haid terakhir)</span>
          <input type="date" value={hpht} max={hari} onChange={(e) => ubah(e.target.value, 'hpht')} />
        </label>
      ) : (
        <label className="field">
          <span>HPL (hari perkiraan lahir)</span>
          <input type="date" value={hpl} onChange={(e) => ubah(e.target.value, 'hpl')} />
        </label>
      )}

      {hpht && uk ? (
        <dl className="kalk-hpl-hasil" aria-live="polite">
          <div>
            <dt>{mode === 'hpht' ? 'HPL' : 'HPHT'}</dt>
            <dd>{teksTanggal(mode === 'hpht' ? hpl : hpht)}</dd>
          </div>
          <div>
            <dt>Usia kehamilan hari ini</dt>
            <dd>
              {uk.totalHari >= 0 ? teksUsia(uk) : '–'}
              {uk.totalHari >= 0 && <small>Trimester {uk.trimester}</small>}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="muted small">Isi tanggal untuk menghitung. Usia kehamilan di surat rujukan terisi otomatis.</p>
      )}
      {peringatan && <p className="kalk-hpl-awas small">{peringatan}</p>}
      <p className="muted small">
        HPL = HPHT + 280 hari (kaidah Naegele), dengan anggapan siklus haid teratur 28 hari. Bila HPHT tidak pasti atau
        siklus tidak teratur, pakai taksiran dari USG trimester pertama.
      </p>
    </div>
  )
}
