import { describe, expect, it } from 'vitest'
import { baca, jawab, tandai, KUNCI } from './progres'
import { uraiNomor } from './sitasi'

describe('progres belajar', () => {
  it('menandai dan membatalkan kartu selesai tanpa duplikat', () => {
    let p = { selesai: [], kuis: {} } as { selesai: string[]; kuis: Record<string, number> }
    p = tandai(tandai(p, 'a', true), 'a', true)
    expect(p.selesai).toEqual(['a'])
    expect(tandai(p, 'a', false).selesai).toEqual([])
  })
  it('menyimpan jawaban kuis', () => {
    expect(jawab({ selesai: [], kuis: {} }, 'q1', 2).kuis).toEqual({ q1: 2 })
  })
  it('tahan terhadap data localStorage rusak', () => {
    expect(baca({ getItem: () => '{rusak' })).toEqual({})
    expect(baca({ getItem: (k) => (k === KUNCI ? '{"x":{"selesai":["a"],"kuis":{}}}' : null) }).x.selesai).toEqual(['a'])
  })
})

describe('sitasi', () => {
  it('mengurai rentang dan daftar', () => {
    expect(uraiNomor('1,3–5')).toEqual([1, 3, 4, 5])
    expect(uraiNomor('2')).toEqual([2])
  })
})
