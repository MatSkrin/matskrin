import { Link, useParams } from 'react-router-dom'
import { PELAJARAN } from '@/content/pelajaran'
import { DAFTAR_BAB } from '@/lib/content'
import HalamanPelajaran from './HalamanPelajaran'

export default function HalamanBab() {
  const { slug = '' } = useParams()
  const i = DAFTAR_BAB.findIndex((b) => b.slug === slug)
  const pelajaran = PELAJARAN[slug]
  if (!pelajaran || i < 0)
    return (
      <p>
        Bab tidak ditemukan. <Link to="/modul">Kembali ke daftar modul</Link>
      </p>
    )
  return <HalamanPelajaran key={slug} pelajaran={pelajaran} bab={DAFTAR_BAB[i]} prev={DAFTAR_BAB[i - 1]} next={DAFTAR_BAB[i + 1]} />
}
