import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

type Tema = 'light' | 'dark'
const KUNCI = 'matskrin:tema'

function tersimpan(): Tema | null {
  try {
    const t = localStorage.getItem(KUNCI)
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null
  }
}

/** Tombol mode terang/gelap. Tanpa pilihan tersimpan, tema mengikuti pengaturan sistem. */
export default function TombolTema() {
  const [tema, setTema] = useState<Tema>(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'))

  useEffect(() => {
    document.documentElement.dataset.theme = tema
  }, [tema])

  // Ikuti perubahan tema sistem selama pengguna belum memilih sendiri.
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const ubah = () => {
      if (!tersimpan()) setTema(mq.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', ubah)
    return () => mq.removeEventListener('change', ubah)
  }, [])

  const gelap = tema === 'dark'
  return (
    <button
      type="button"
      className="tombol-tema"
      aria-label={gelap ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      title={gelap ? 'Mode terang' : 'Mode gelap'}
      onClick={() => {
        const baru: Tema = gelap ? 'light' : 'dark'
        setTema(baru)
        try {
          localStorage.setItem(KUNCI, baru)
        } catch {
          /* abaikan */
        }
      }}
    >
      {gelap ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </button>
  )
}
