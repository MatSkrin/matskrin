import { useCallback, useEffect, useState } from 'react'

/** Progres belajar disimpan di localStorage peramban pengguna saja (tanpa akun/backend). */
export type ProgresPelajaran = { selesai: string[]; kuis: Record<string, number> }
type Semua = Record<string, ProgresPelajaran>

export const KUNCI = 'matskrin:progres:v1'
const kosong = (): ProgresPelajaran => ({ selesai: [], kuis: {} })

export function baca(store: Pick<Storage, 'getItem'> | undefined = globalThis.localStorage): Semua {
  try {
    const raw = store?.getItem(KUNCI)
    const data = raw ? JSON.parse(raw) : {}
    return data && typeof data === 'object' ? (data as Semua) : {}
  } catch {
    return {}
  }
}

function tulis(data: Semua) {
  try {
    localStorage.setItem(KUNCI, JSON.stringify(data))
  } catch {
    /* mode privat / penyimpanan diblokir: progres hanya berlaku di sesi ini */
  }
}

export function tandai(p: ProgresPelajaran, id: string, selesai: boolean): ProgresPelajaran {
  const set = new Set(p.selesai)
  if (selesai) set.add(id)
  else set.delete(id)
  return { ...p, selesai: [...set] }
}

export function jawab(p: ProgresPelajaran, soal: string, pilihan: number): ProgresPelajaran {
  return { ...p, kuis: { ...p.kuis, [soal]: pilihan } }
}

export function useProgres(slug: string) {
  const [p, setP] = useState<ProgresPelajaran>(() => baca()[slug] ?? kosong())
  useEffect(() => setP(baca()[slug] ?? kosong()), [slug])

  const ubah = useCallback(
    (f: (p: ProgresPelajaran) => ProgresPelajaran) =>
      setP((lama) => {
        const baru = f(lama)
        tulis({ ...baca(), [slug]: baru })
        return baru
      }),
    [slug],
  )
  return {
    progres: p,
    tandai: (id: string, selesai: boolean) => ubah((x) => tandai(x, id, selesai)),
    jawab: (soal: string, pilihan: number) => ubah((x) => jawab(x, soal, pilihan)),
    ulangKuis: () => ubah((x) => ({ ...x, kuis: {} })),
    reset: () => ubah(() => kosong()),
  }
}

/** Preferensi kecil per pengguna (misal mode ringkas). */
export function usePreferensi(kunci: string, awal: boolean) {
  const [v, setV] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(kunci)
      return raw === null ? awal : raw === '1'
    } catch {
      return awal
    }
  })
  const set = (baru: boolean) => {
    setV(baru)
    try {
      localStorage.setItem(kunci, baru ? '1' : '0')
    } catch {
      /* abaikan */
    }
  }
  return [v, set] as const
}
