import { describe, expect, it } from 'vitest'
import { gabungPustaka } from './pustakaGabungan'

describe('gabungPustaka', () => {
  it('menggabungkan rujukan sama dari beberapa bab dan memisahkan judul sama beda penulis', () => {
    const h = gabungPustaka([
      { nomor: 1, pustaka: ['Ramlakhan KP, Johnson MR. Pregnancy and cardiovascular disease. Nat Rev Cardiol 2020;17:718-31.', 'Bortnick AE, Levine LD. Valvular Heart Disease in Pregnancy. Clin Obstet Gynecol. 2020.'] },
      { nomor: 3, pustaka: ['Ramlakhan KP, Johnson MR. Pregnancy and cardiovascular disease. Nat Rev Cardiol. 2020;17(11):718-31.'] },
      { nomor: 9, pustaka: ['Lewey J, Levine LD. Valvular Heart Disease in Pregnancy. Cardiol Clin. 2021.'] },
    ])
    expect(h).toHaveLength(3)
    expect(h.find((r) => r.teks.startsWith('Ramlakhan'))?.bab).toEqual([1, 3])
    expect(h.map((r) => r.teks[0])).toEqual(['B', 'L', 'R'])
  })
})
