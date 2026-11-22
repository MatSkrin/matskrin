import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { perilakuGulir } from '@/lib/utils'

/** Tombol melayang "kembali ke atas", muncul setelah halaman digulir cukup jauh. */
export default function KeAtas() {
  const [tampil, setTampil] = useState(false)
  useEffect(() => {
    const cek = () => setTampil(window.scrollY > 600)
    cek()
    window.addEventListener('scroll', cek, { passive: true })
    return () => window.removeEventListener('scroll', cek)
  }, [])
  if (!tampil) return null
  return (
    <button
      type="button"
      className="fab"
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
      onClick={() => window.scrollTo({ top: 0, behavior: perilakuGulir() })}
    >
      <ArrowUp aria-hidden />
    </button>
  )
}
