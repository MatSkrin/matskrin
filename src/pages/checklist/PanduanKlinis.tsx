import { TeksIstilah } from '@/components/Istilah'
import { perilakuGulir } from '@/lib/utils'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  EKG,
  FAKTOR_RISIKO,
  FISIK,
  GEJALA,
  RIWAYAT,
  SUMBER_PANDUAN,
  VITAL_TAMBAHAN,
  nilaiVital,
  type Temuan,
  type Vital,
} from '../../data/panduan'
import { hitungTriase, type HasilTriase } from '../../lib/triase'
import { AcuanAuskultasi, AcuanEKG, AcuanGejala, AcuanRiwayat, AcuanVital } from './Acuan'

type Identitas = { usia: string; uk: string; gpa: string; keluhan: string; obat: string; catatan: string }

type State = { dipilih: string[]; vital: Record<keyof Vital, string>; identitas: Identitas }

const KOSONG: State = {
  dipilih: [],
  vital: { nadi: '', tds: '', rr: '', spo2: '' },
  identitas: { usia: '', uk: '', gpa: '', keluhan: '', obat: '', catatan: '' },
}

const KUNCI = 'panduan-klinis-v1'

function muat(): State {
  try {
    const raw = localStorage.getItem(KUNCI)
    if (raw) return { ...KOSONG, ...JSON.parse(raw) }
  } catch {
    /* penyimpanan tidak tersedia */
  }
  return KOSONG
}

const LANGKAH = ['Riwayat', 'Gejala', 'Tanda vital', 'Auskultasi & fisik', 'EKG', 'Hasil & rujukan'] as const

const INFO_TRIASE = {
  merah: {
    judul: 'MERAH: rujuk hari ini',
    aksi: 'Stabilisasi dan rujuk ke RS dengan layanan obstetri dan jantung. Jangan dipulangkan.',
  },
  kuning: {
    judul: 'KUNING: rujukan terencana',
    aksi: 'Rujuk terencana cepat untuk telaah SpJP dan ekokardiografi.',
  },
  hijau: {
    judul: 'HIJAU: lanjutkan pemeriksaan antenatal',
    aksi: 'Edukasi tanda bahaya; nilai ulang setiap kunjungan, termasuk masa nifas. Ambang rujuk rendah bila ragu.',
  },
} as const

function Daftar({ items, dipilih, toggle }: { items: Temuan[]; dipilih: Set<string>; toggle: (id: string) => void }) {
  return (
    <div className="ceklis">
      {items.map((t) => (
        <label key={t.id} className={`check ${dipilih.has(t.id) ? 'on' : ''}`}>
          <input type="checkbox" checked={dipilih.has(t.id)} onChange={() => toggle(t.id)} />
          <span>
            <TeksIstilah>{t.label}</TeksIstilah>
            {t.detail && <small><TeksIstilah>{t.detail}</TeksIstilah></small>}
          </span>
          <span className={`pill ${t.tingkat}`}>{t.hanyaBilaGejala ? 'bila keluhan' : t.merahBilaGejala ? 'kuning/merah' : t.tingkat}</span>
        </label>
      ))}
    </div>
  )
}

// Rentang warna tiap tanda vital, sesuai ambang nilaiVital(): [batas atas, tingkat]
const PITA: Record<keyof Vital, { min: number; max: number; seg: [number, 'hijau' | 'kuning' | 'merah'][] }> = {
  nadi: { min: 50, max: 140, seg: [[110, 'hijau'], [120, 'kuning'], [140, 'merah']] },
  tds: { min: 70, max: 180, seg: [[90, 'merah'], [140, 'hijau'], [160, 'kuning'], [180, 'merah']] },
  rr: { min: 10, max: 32, seg: [[24, 'hijau'], [25, 'kuning'], [32, 'merah']] },
  spo2: { min: 88, max: 100, seg: [[94.5, 'merah'], [96.5, 'kuning'], [100, 'hijau']] },
}

/** Pita hijau-kuning-merah dengan penanda nilai yang diisi. */
function PitaVital({ k, nilai }: { k: keyof Vital; nilai?: number }) {
  const p = PITA[k]
  const pct = (v: number) => ((Math.min(Math.max(v, p.min), p.max) - p.min) / (p.max - p.min)) * 100
  let awal = p.min
  return (
    <span className="pita" aria-hidden>
      {p.seg.map(([batas, w]) => {
        const el = <i key={batas} className={w} style={{ left: `${pct(awal)}%`, width: `${pct(batas) - pct(awal)}%` }} />
        awal = batas
        return el
      })}
      {nilai != null && <b style={{ left: `${pct(nilai)}%` }} />}
    </span>
  )
}

function suratRujukan(st: State, hasil: HasilTriase): string {
  const id = st.identitas
  const v = st.vital
  const pilih = (items: Temuan[]) => items.filter((t) => st.dipilih.includes(t.id)).map((t) => t.label)
  const baris = (label: string, isi: string[] | string) => {
    const teks = Array.isArray(isi) ? isi.join('; ') : isi
    return `${label}: ${teks || '-'}`
  }
  return [
    `Ibu ${id.usia ? id.usia + ' tahun' : '...'}, ${id.gpa || 'G_P_A_'}, usia kehamilan ${id.uk || '...'} minggu.`,
    baris('Keluhan utama', id.keluhan),
    baris('Gejala', pilih(GEJALA)),
    baris('Riwayat penyakit jantung', pilih(RIWAYAT)),
    baris('Faktor risiko', pilih(FAKTOR_RISIKO)),
    `Tanda vital: nadi ${v.nadi || '-'}/menit, TD sistolik ${v.tds || '-'} mmHg, RR ${v.rr || '-'}/menit, SpO₂ ${v.spo2 || '-'}%.`,
    baris('Pemeriksaan fisik/auskultasi', [...pilih(FISIK), ...(id.catatan ? [id.catatan] : [])]),
    baris('EKG (rekaman terlampir)', pilih(EKG)),
    baris('Obat yang diminum', id.obat),
    `Kategori urgensi: ${hasil.triase.toUpperCase()}.`,
    'Mohon evaluasi dan rekomendasi tata laksana serta tempat persalinan.',
  ].join('\n')
}

export default function PanduanKlinis() {
  const [st, setSt] = useState<State>(muat)
  const [param] = useSearchParams()
  // ?langkah=N (1–6) membuka langsung langkah tertentu, dipakai pintasan dari bab.
  const [langkah, setLangkah] = useState(() => {
    const n = Number(param.get('langkah'))
    return Number.isInteger(n) && n >= 1 && n <= LANGKAH.length ? n - 1 : 0
  })
  const [tersalin, setTersalin] = useState(false)
  const stepperRef = useRef<HTMLElement>(null)
  const langkahAwal = useRef(true)

  // Saat pindah langkah: geser tombol langkah aktif ke tengah (stepper bisa digulir di ponsel)
  // dan bawa layar kembali ke awal langkah bila pengguna sudah menggulir jauh ke bawah.
  useEffect(() => {
    if (langkahAwal.current) {
      langkahAwal.current = false
      return
    }
    const nav = stepperRef.current
    const aktif = nav?.querySelector<HTMLElement>('[aria-current="step"]')
    if (nav && aktif) nav.scrollTo({ left: aktif.offsetLeft - (nav.clientWidth - aktif.offsetWidth) / 2, behavior: perilakuGulir() })
    if (nav && nav.getBoundingClientRect().top < 0) nav.scrollIntoView({ behavior: perilakuGulir(), block: 'start' })
  }, [langkah])

  useEffect(() => {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(st))
    } catch {
      /* abaikan */
    }
  }, [st])

  const dipilih = useMemo(() => new Set(st.dipilih), [st.dipilih])
  const vital: Vital = useMemo(() => {
    const n = (s: string) => (s.trim() === '' || isNaN(Number(s)) ? undefined : Number(s))
    return { nadi: n(st.vital.nadi), tds: n(st.vital.tds), rr: n(st.vital.rr), spo2: n(st.vital.spo2) }
  }, [st.vital])
  const hasil = useMemo(() => hitungTriase(dipilih, vital), [dipilih, vital])

  const toggle = (id: string) =>
    setSt((s) => ({ ...s, dipilih: s.dipilih.includes(id) ? s.dipilih.filter((x) => x !== id) : [...s.dipilih, id] }))
  const setVital = (k: keyof Vital, val: string) => setSt((s) => ({ ...s, vital: { ...s.vital, [k]: val } }))
  const setId = (k: keyof Identitas, val: string) => setSt((s) => ({ ...s, identitas: { ...s.identitas, [k]: val } }))
  const reset = () => {
    setSt(KOSONG)
    setLangkah(0)
  }

  const surat = suratRujukan(st, hasil)
  const info = INFO_TRIASE[hasil.triase]

  return (
    <>
      <h1>Checklist Pemeriksaan</h1>
      <p className="lead-sm">
        Checklist deteksi dini penyakit jantung pada ibu hamil saat pemeriksaan antenatal: riwayat, gejala, tanda vital, auskultasi, dan
        EKG. Hasil triase diperbarui otomatis.
      </p>

      <div className={`triase-bar ${hasil.triase}`} aria-live="polite">
        <strong>{info.judul}</strong>
        <span>{hasil.alasan.length ? `${hasil.alasan.length} temuan` : 'Belum ada temuan'}</span>
        <button type="button" className="link" onClick={() => setLangkah(5)}>Lihat hasil →</button>
      </div>

      <nav className="stepper" aria-label="Langkah pemeriksaan" ref={stepperRef}>
        {LANGKAH.map((l, i) => (
          <button key={l} type="button" aria-current={langkah === i ? 'step' : undefined} onClick={() => setLangkah(i)}>
            <span className="step-no">{i + 1}</span>
            <span className="step-label">{l}</span>
          </button>
        ))}
      </nav>

      <section className="step-body">
        {langkah === 0 && (
          <>
            <h2>1. Riwayat dan faktor risiko</h2>
            <AcuanRiwayat />
            <h3>Riwayat penyakit jantung</h3>
            <Daftar items={RIWAYAT} dipilih={dipilih} toggle={toggle} />
            <h3>Faktor risiko</h3>
            <Daftar items={FAKTOR_RISIKO} dipilih={dipilih} toggle={toggle} />
          </>
        )}
        {langkah === 1 && (
          <>
            <h2>2. Gejala</h2>
            <AcuanGejala />
            <h3>Tanda waspada</h3>
            <Daftar items={GEJALA} dipilih={dipilih} toggle={toggle} />
          </>
        )}
        {langkah === 2 && (
          <>
            <h2>3. Tanda vital (istirahat)</h2>
            <AcuanVital />
            <div className="vital-grid">
              {(
                [
                  ['nadi', 'Nadi', 'kali/menit'],
                  ['tds', 'TD sistolik', 'mmHg'],
                  ['rr', 'Laju napas', 'kali/menit'],
                  ['spo2', 'SpO₂', '%'],
                ] as const
              ).map(([k, label, unit]) => {
                const nilai = nilaiVital({ [k]: vital[k] })[0]
                return (
                  <label key={k} className={`vital ${nilai?.tingkat ?? ''}`}>
                    <span>{label}</span>
                    <span className="vital-input">
                      <input
                        type="number"
                        inputMode="numeric"
                        value={st.vital[k]}
                        onChange={(e) => setVital(k, e.target.value)}
                      />
                      <small>{unit}</small>
                    </span>
                    {nilai && <em>{nilai.tingkat}</em>}
                    <PitaVital k={k} nilai={vital[k]} />
                  </label>
                )
              })}
            </div>
            <Daftar items={VITAL_TAMBAHAN} dipilih={dipilih} toggle={toggle} />
          </>
        )}
        {langkah === 3 && (
          <>
            <h2>4. Auskultasi dan pemeriksaan fisik</h2>
            <AcuanAuskultasi />
            <h3>Temuan abnormal</h3>
            <Daftar items={FISIK} dipilih={dipilih} toggle={toggle} />
            <label className="field">
              <span>Catatan auskultasi (opsional)</span>
              <textarea
                rows={2}
                placeholder="mis. bising mid-sistolik 2/6 di area P, tidak menjalar"
                value={st.identitas.catatan}
                onChange={(e) => setId('catatan', e.target.value)}
              />
            </label>
          </>
        )}
        {langkah === 4 && (
          <>
            <h2>5. EKG 12-sadapan</h2>
            <AcuanEKG />
            <h3>Temuan yang bukan varian normal</h3>
            <Daftar items={EKG} dipilih={dipilih} toggle={toggle} />
          </>
        )}
        {langkah === 5 && (
          <>
            <h2>6. Hasil triase</h2>
            <div className={`hasil ${hasil.triase}`}>
              <p className="hasil-judul">{info.judul}</p>
              <p>{info.aksi}</p>
              {hasil.alasan.length > 0 && (
                <ul>
                  {hasil.alasan.map((a) => (
                    <li key={a.kategori + a.teks}>
                      <span className={`pill ${a.tingkat}`}>{a.tingkat}</span> {a.teks}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <details className="acuan">
              <summary>Bagaimana triase dihitung?</summary>
              <div className="acuan-isi prose">
                <ul>
                  <li><strong>Merah</strong>: satu saja tanda bahaya (gejala berat, tanda vital merah, ronki/distensi vena leher, atau bising keras/diastolik, S3, S4 pada ibu yang datang dengan keluhan).</li>
                  <li><strong>Kuning</strong>: ≥ 1 gejala + ≥ 1 tanda vital kuning + ≥ 1 faktor risiko, atau ≥ 4 temuan kuning, atau bising patologis/EKG abnormal pada ibu stabil, atau riwayat penyakit jantung yang belum dievaluasi pada kehamilan ini.</li>
                  <li><strong>Hijau</strong>: selain itu.</li>
                </ul>
                <p>
                  Pemeriksaan lanjutan: ekokardiografi transtorakal adalah pencitraan lini pertama. Foto toraks
                  dipertimbangkan hanya bila pemeriksaan lain belum memberi jawaban (ESC 2025).
                </p>
                <p className="muted">
                  Ambang dan aturan triase diadaptasi dari red flags algoritma ACOG 2023 dan CMQCC toolkit 2017. Pedoman
                  ESC 2025 tidak menetapkan ambang triase untuk pelayanan antenatal.
                </p>
              </div>
            </details>

            <h3>Surat rujukan</h3>
            <div className="field-grid">
              <label className="field"><span>Usia ibu (tahun)</span><input value={st.identitas.usia} onChange={(e) => setId('usia', e.target.value)} inputMode="numeric" /></label>
              <label className="field"><span>Usia kehamilan (minggu)</span><input value={st.identitas.uk} onChange={(e) => setId('uk', e.target.value)} inputMode="numeric" /></label>
              <label className="field"><span>G-P-A</span><input value={st.identitas.gpa} onChange={(e) => setId('gpa', e.target.value)} placeholder="G2P1A0" /></label>
            </div>
            <label className="field"><span>Keluhan utama, onset, progresivitas</span><textarea rows={2} value={st.identitas.keluhan} onChange={(e) => setId('keluhan', e.target.value)} placeholder="mis. sesak memberat 2 minggu, ortopnea 3 bantal" /></label>
            <label className="field"><span>Obat yang sedang diminum</span><input value={st.identitas.obat} onChange={(e) => setId('obat', e.target.value)} /></label>
            <pre className="surat">{surat}</pre>
            <div className="aksi">
              <button
                type="button"
                className="primary"
                onClick={() => {
                  navigator.clipboard?.writeText(surat).then(
                    () => {
                      setTersalin(true)
                      setTimeout(() => setTersalin(false), 2000)
                    },
                    () => {},
                  )
                }}
              >
                {tersalin ? 'Tersalin ✓' : 'Salin teks rujukan'}
              </button>
              <button type="button" className="ghost" onClick={reset}>Mulai pasien baru</button>
            </div>
            <p className="muted small">Lampirkan rekaman EKG 12-sadapan. Data hanya tersimpan di perangkat ini.</p>
          </>
        )}
      </section>

      <div className="step-nav">
        <button type="button" className="ghost" disabled={langkah === 0} onClick={() => setLangkah((l) => l - 1)}>← Sebelumnya</button>
        {langkah < 5 && <button type="button" className="primary" onClick={() => setLangkah((l) => l + 1)}>Berikutnya →</button>}
      </div>

      <details className="acuan sumber">
        <summary>Sumber</summary>
        <ol className="small">{SUMBER_PANDUAN.map((s) => <li key={s}>{s}</li>)}</ol>
      </details>
    </>
  )
}
