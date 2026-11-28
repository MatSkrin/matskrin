/**
 * Hitungan tanggal kehamilan dari HPHT (hari pertama haid terakhir).
 * HPL (hari perkiraan lahir) = HPHT + 280 hari (40 minggu), setara kaidah Naegele.
 * Semua tanggal berupa string ISO "YYYY-MM-DD" dan dihitung dalam UTC agar tidak bergeser oleh zona waktu.
 */

const HARI_MS = 86_400_000
export const LAMA_KEHAMILAN = 280

export function keHari(iso: string): number | undefined {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return undefined
  const t = Date.UTC(+m[1], +m[2] - 1, +m[3])
  const d = new Date(t)
  if (d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) return undefined
  return Math.round(t / HARI_MS)
}

export function keIso(hari: number): string {
  return new Date(hari * HARI_MS).toISOString().slice(0, 10)
}

export function geserHari(iso: string, n: number): string | undefined {
  const h = keHari(iso)
  return h == null ? undefined : keIso(h + n)
}

export const hplDariHpht = (hpht: string) => geserHari(hpht, LAMA_KEHAMILAN)
export const hphtDariHpl = (hpl: string) => geserHari(hpl, -LAMA_KEHAMILAN)

export type UsiaKehamilan = { totalHari: number; minggu: number; hari: number; trimester: 1 | 2 | 3 }

/** Usia kehamilan pada tanggal `pada` (ISO). Undefined bila tanggal tidak valid. */
export function usiaKehamilan(hpht: string, pada: string): UsiaKehamilan | undefined {
  const a = keHari(hpht)
  const b = keHari(pada)
  if (a == null || b == null) return undefined
  const totalHari = b - a
  const minggu = Math.floor(totalHari / 7)
  const hari = totalHari - minggu * 7
  const trimester = minggu < 14 ? 1 : minggu < 28 ? 2 : 3
  return { totalHari, minggu, hari, trimester }
}

/** Format "32 minggu 4 hari" atau ringkas "32+4". */
export function teksUsia(u: UsiaKehamilan, ringkas = false): string {
  if (ringkas) return u.hari ? `${u.minggu}+${u.hari}` : `${u.minggu}`
  return u.hari ? `${u.minggu} minggu ${u.hari} hari` : `${u.minggu} minggu`
}

export function hariIni(): string {
  const d = new Date()
  return keIso(Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / HARI_MS))
}

const FMT = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export function teksTanggal(iso: string): string {
  const h = keHari(iso)
  return h == null ? iso : FMT.format(new Date(h * HARI_MS))
}
