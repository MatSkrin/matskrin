import { describe, expect, it } from 'vitest'
import { hphtDariHpl, hplDariHpht, keHari, teksUsia, usiaKehamilan } from './kehamilan'

describe('kalkulator HPL', () => {
  it('HPL = HPHT + 280 hari, dan sebaliknya', () => {
    expect(hplDariHpht('2026-03-01')).toBe('2026-12-06')
    expect(hphtDariHpl('2026-12-06')).toBe('2026-03-01')
    expect(hplDariHpht('2024-01-01')).toBe('2024-10-07') // tahun kabisat
  })

  it('menolak tanggal tidak valid', () => {
    expect(keHari('2026-02-30')).toBeUndefined()
    expect(hplDariHpht('')).toBeUndefined()
  })

  it('usia kehamilan dalam minggu dan hari', () => {
    const u = usiaKehamilan('2026-03-01', '2026-11-28')!
    expect(u.totalHari).toBe(272)
    expect([u.minggu, u.hari, u.trimester]).toEqual([38, 6, 3])
    expect(teksUsia(u)).toBe('38 minggu 6 hari')
    expect(teksUsia(u, true)).toBe('38+6')
    expect(usiaKehamilan('2026-03-01', '2026-06-07')!.trimester).toBe(2) // 14+0
    expect(usiaKehamilan('2026-03-01', '2026-06-06')!.trimester).toBe(1) // 13+6
  })
})
