import { describe, expect, it } from 'vitest'
import { nilaiVital } from '../data/panduan'
import { hitungTriase } from './triase'

const s = (...ids: string[]) => new Set(ids)

describe('nilaiVital', () => {
  it('ambang merah dan kuning', () => {
    expect(nilaiVital({ nadi: 120 })[0].tingkat).toBe('merah')
    expect(nilaiVital({ nadi: 110 })[0].tingkat).toBe('kuning')
    expect(nilaiVital({ nadi: 109 })).toHaveLength(0)
    expect(nilaiVital({ tds: 85 })[0].tingkat).toBe('merah')
    expect(nilaiVital({ tds: 140 })[0].tingkat).toBe('kuning')
    expect(nilaiVital({ rr: 24 })[0].tingkat).toBe('kuning')
    expect(nilaiVital({ spo2: 94 })[0].tingkat).toBe('merah')
    expect(nilaiVital({ spo2: 96 })[0].tingkat).toBe('kuning')
    expect(nilaiVital({ spo2: 97 })).toHaveLength(0)
  })
})

describe('hitungTriase', () => {
  it('tanpa temuan = hijau', () => {
    expect(hitungTriase(s(), { nadi: 90, tds: 110, rr: 18, spo2: 99 }).triase).toBe('hijau')
  })
  it('satu tanda bahaya = merah', () => {
    expect(hitungTriase(s('g-sinkop'), {}).triase).toBe('merah')
    expect(hitungTriase(s(), { spo2: 93 }).triase).toBe('merah')
  })
  it('bising diastolik: kuning bila ibu tanpa keluhan, merah bila ada keluhan', () => {
    expect(hitungTriase(s('p-diastolik'), {}).triase).toBe('kuning')
    expect(hitungTriase(s('p-diastolik', 'g-sesak'), {}).triase).toBe('merah')
  })
  it('S3 tanpa keluhan diabaikan', () => {
    expect(hitungTriase(s('p-s3'), {}).triase).toBe('hijau')
    expect(hitungTriase(s('p-s3', 'g-ortopnea'), {}).triase).toBe('merah')
  })
  it('kombinasi gejala + vital kuning + faktor risiko = kuning', () => {
    expect(hitungTriase(s('g-sesak', 'f-usia'), { nadi: 112 }).triase).toBe('kuning')
  })
  it('satu gejala kuning saja tetap hijau', () => {
    expect(hitungTriase(s('g-batuk'), {}).triase).toBe('hijau')
  })
  it('≥4 temuan kuning = kuning', () => {
    expect(hitungTriase(s('f-usia', 'f-imt', 'f-dm', 'f-ht'), {}).triase).toBe('kuning')
    expect(hitungTriase(s('f-usia', 'f-imt', 'f-dm'), {}).triase).toBe('hijau')
  })
  it('EKG abnormal atau riwayat penyakit jantung = kuning', () => {
    expect(hitungTriase(s('e-rad'), {}).triase).toBe('kuning')
    expect(hitungTriase(s('r-pjb'), {}).triase).toBe('kuning')
  })
})
