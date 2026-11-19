import { describe, expect, it } from 'vitest'
import { CARPREG2, ZAHARA } from '../data/risk'
import { hitungSkor, kategoriSkor, kelasMWHO } from './risk'

describe('CARPREG II', () => {
  it('tanpa kriteria = 0 poin, risiko 5%', () => {
    const s = hitungSkor(CARPREG2, new Set())
    expect(s).toBe(0)
    expect(kategoriSkor(CARPREG2, s).risiko).toBe('5%')
  })
  it('katup mekanik + tanpa intervensi = 4 poin, 22%', () => {
    const s = hitungSkor(CARPREG2, new Set(['katup-mekanik', 'tanpa-intervensi']))
    expect(s).toBe(4)
    expect(kategoriSkor(CARPREG2, s).risiko).toBe('22%')
  })
  it('>4 poin = 41%', () => {
    const s = hitungSkor(CARPREG2, new Set(['katup-mekanik', 'hipertensi-pulmonal']))
    expect(kategoriSkor(CARPREG2, s).risiko).toBe('41%')
  })
  it('semua rentang bersambung tanpa celah untuk skor bulat', () => {
    for (let n = 0; n <= 21; n++) expect(() => kategoriSkor(CARPREG2, n)).not.toThrow()
  })
})

describe('ZAHARA', () => {
  it('0,75 + 0,75 = 1,5 → 7,5%', () => {
    const s = hitungSkor(ZAHARA, new Set(['nyha', 'regurgitasi-av-sistemik']))
    expect(s).toBe(1.5)
    expect(kategoriSkor(ZAHARA, s).risiko).toBe('7,5%')
  })
  it('katup mekanik saja = 4,25 → 70%', () => {
    const s = hitungSkor(ZAHARA, new Set(['katup-mekanik']))
    expect(kategoriSkor(ZAHARA, s).risiko).toBe('70%')
  })
  it('semua kombinasi kriteria jatuh ke satu kategori', () => {
    const ids = ZAHARA.kriteria.map((k) => k.id)
    for (let mask = 0; mask < 1 << ids.length; mask++) {
      const set = new Set(ids.filter((_, i) => mask & (1 << i)))
      expect(() => kategoriSkor(ZAHARA, hitungSkor(ZAHARA, set))).not.toThrow()
    }
  })
})

describe('mWHO', () => {
  it('tanpa pilihan = null', () => expect(kelasMWHO(new Set())).toBeNull())
  it('mengambil kelas tertinggi', () => {
    expect(kelasMWHO(new Set(['i-ektopik', 'iii-mekanik']))?.kelas).toBe('III')
    expect(kelasMWHO(new Set(['iv-pah', 'ii-tof']))?.kelas).toBe('IV')
  })
})
