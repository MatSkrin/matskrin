import { describe, expect, it } from 'vitest'
import { kartuDari } from './content'

describe('kartuDari', () => {
  it('membaca id, nomor, dan judul kartu dari MDX', () => {
    const mdx = '<LessonCard id="a" nomor="1.1" judul="Latar Belakang">\n\nx\n\n</LessonCard>\n<LessonCard id="kuis" judul="Uji">'
    expect(kartuDari(mdx)).toEqual([
      { id: 'a', teks: 'Latar Belakang', nomor: '1.1' },
      { id: 'kuis', teks: 'Uji', nomor: undefined },
    ])
  })
})
