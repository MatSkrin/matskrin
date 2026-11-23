import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import type { Soal } from '@/components/belajar/Kuis'
import { POLA_SITASI, uraiNomor } from './sitasi'

const DIR = join(__dirname, '../content/pelajaran')
const modul = import.meta.glob<{ kuis: Soal[] }>('../content/pelajaran/kuis/*.ts', { eager: true })

/** Jumlah entri `export const pustaka = [...]` di MDX bab. */
function jumlahPustaka(nomor: string): number {
  const file = readdirSync(DIR).find((f) => f.startsWith(nomor) && f.endsWith('.mdx'))!
  const isi = readFileSync(join(DIR, file), 'utf8')
  const blok = isi.match(/export const pustaka = \[([\s\S]*?)\n\]/)
  return blok ? (blok[1].match(/^\s+["'`]/gm) ?? []).length : 0
}

describe('kuis per bab', () => {
  const entri = Object.entries(modul)
  it('tersedia untuk 15 bab', () => expect(entri).toHaveLength(15))

  const semuaId = entri.flatMap(([, m]) => m.kuis.map((s) => s.id))
  it('id soal unik', () => expect(new Set(semuaId).size).toBe(semuaId.length))

  for (const [path, { kuis }] of entri) {
    const nomor = path.match(/(\d+)\.ts$/)![1]
    it(`Bab ${Number(nomor)}: kunci jawaban valid dan sitasi ada di pustaka bab`, () => {
      const maks = jumlahPustaka(nomor)
      expect(kuis.length).toBeGreaterThanOrEqual(5)
      for (const s of kuis) {
        expect(s.id.startsWith(`b${Number(nomor)}-`)).toBe(true)
        expect(s.benar).toBeGreaterThanOrEqual(0)
        expect(s.benar).toBeLessThan(s.opsi.length)
        expect(new Set(s.opsi).size).toBe(s.opsi.length)
        for (const m of s.pembahasan.matchAll(POLA_SITASI)) for (const n of uraiNomor(m[1])) expect(n).toBeLessThanOrEqual(maks)
        expect(`${s.tanya} ${s.opsi.join(' ')} ${s.pembahasan}`).not.toMatch(/\b(SpOG|SpJP|ANC)\b/)
      }
    })
  }
})
