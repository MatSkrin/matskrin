import { perilakuGulir } from '@/lib/utils'

/** id elemen tujuan: "tabel-4-2", "gambar-6-1". */
export const idRujukan = (jenis: string, nomor: string) => `${jenis.toLowerCase()}-${nomor.replace('.', '-')}`

/** Buka (bila tertutup) lalu gulir ke tabel/gambar/daftar pustaka. */
export function gulirKeElemen(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (el instanceof HTMLDetailsElement) el.open = true
  // Tabel bukti yang tertutup: buka akordeonnya.
  const pemicu = el.querySelector<HTMLButtonElement>('[data-state="closed"] > button, button[data-state="closed"]')
  pemicu?.click()
  el.scrollIntoView({ behavior: perilakuGulir(), block: 'start' })
}

