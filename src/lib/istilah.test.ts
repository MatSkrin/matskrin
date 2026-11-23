import { describe, expect, it } from 'vitest'
import { pecahIstilah } from '@/data/istilah'

const kunci = (t: string) => pecahIstilah(t).filter((p) => p.kunci).map((p) => p.teks)

describe('pecahIstilah', () => {
  it('menandai istilah klinis dan singkatan', () => {
    expect(kunci('Heave parasternal')).toEqual(['Heave parasternal'])
    expect(kunci('RBBB (inkomplet/komplet) disertai RAD')).toEqual(['RBBB', 'RAD'])
    expect(kunci('LBBB atau QRS ≥ 120 ms')).toEqual(['LBBB', 'QRS'])
    expect(kunci('NT-proBNP dan CPVT')).toEqual(['NT-proBNP', 'CPVT'])
  })
  it('tidak menandai potongan kata atau satuan', () => {
    expect(kunci('120 ms')).toEqual([])
    expect(kunci('STEMI')).toEqual(['STEMI'])
    expect(kunci('ASDXYZ, ramas')).toEqual([])
  })
})
