import { describe, expect, it } from 'vitest'
import { CARPREG2, MWHO } from '../data/risk'
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

describe('mWHO', () => {
  it('tanpa pilihan = null', () => expect(kelasMWHO(new Set())).toBeNull())
  it('mengambil kelas tertinggi', () => {
    expect(kelasMWHO(new Set(['i-ektopik', 'iii-mekanik']))?.kelas).toBe('III')
    expect(kelasMWHO(new Set(['iv-pah', 'ii-tof']))?.kelas).toBe('IV')
    expect(kelasMWHO(new Set(['ii-tof', 'iiiii-avsd']))?.kelas).toBe('II–III')
  })
  it('id kondisi unik', () => {
    const ids = MWHO.flatMap((k) => k.kondisi.map((c) => c.id))
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('angka kejadian sesuai Tabel 6 ESC 2025', () => {
    expect(MWHO.map((k) => k.kejadian.vanHagen)).toEqual(['9,9%', '7,7%', '17,7%', '28,9%', '50,3%'])
    expect(MWHO.map((k) => k.kejadian.silversides)).toEqual(['3,1%', '21,7%', '12,8%', '21,1%', '35,6%'])
  })
  it('Eisenmenger = kelas IV', () => expect(kelasMWHO(new Set(['iv-eisenmenger']))?.kelas).toBe('IV'))
})
