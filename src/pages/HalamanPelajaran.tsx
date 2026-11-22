import { MDXProvider } from '@mdx-js/react'
import { BookOpenText, Check, Stethoscope, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as B from '@/components/belajar'
import { Pelajaran as KonteksPelajaran } from '@/components/belajar/konteks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { Pelajaran } from '@/content/pelajaran'
import type { Bab } from '@/lib/content'
import { usePreferensi, useProgres } from '@/lib/progres'
import { cn } from '@/lib/utils'

const komponenMDX = { ...B }

type Kartu = { id: string; judul: string }

export default function HalamanPelajaran({ pelajaran, prev, next }: { pelajaran: Pelajaran; prev?: Bab; next?: Bab }) {
  const { meta, pustaka, Konten, slug } = pelajaran
  const prog = useProgres(slug)
  const [ringkas, setRingkas] = usePreferensi('matskrin:mode-ringkas', false)
  const [kartu, setKartu] = useState<Kartu[]>([])
  const [aktif, setAktif] = useState('')

  // Kumpulkan kartu dari DOM untuk navigasi samping dan hitungan progres.
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('[data-kartu]')]
    setKartu(els.map((e) => ({ id: e.id, judul: e.dataset.kartu ?? '' })))
    const obs = new IntersectionObserver(
      (en) => {
        const t = en.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (t[0]) setAktif(t[0].target.id)
      },
      { rootMargin: '-80px 0px -60% 0px' },
    )
    els.forEach((e) => obs.observe(e))
    window.scrollTo(0, 0)
    return () => obs.disconnect()
  }, [slug])

  const selesai = kartu.filter((k) => prog.progres.selesai.includes(k.id)).length
  const persen = kartu.length ? (selesai / kartu.length) * 100 : 0

  return (
    <KonteksPelajaran.Provider value={{ pustaka, ringkas, ...prog }}>
      <div className="bab-layout">
        <aside className="toc-side" aria-label="Kartu pelajaran">
          <p className="toc-title">Kartu pelajaran</p>
          <ul className="toc">
            {kartu.map((k) => (
              <li key={k.id} className={cn('lv2', aktif === k.id && 'on')}>
                <button type="button" onClick={() => document.getElementById(k.id)?.scrollIntoView({ behavior: 'smooth' })}>
                  <span className="flex items-start gap-1.5">
                    <Check
                      className={cn('mt-0.5 size-3.5 shrink-0', prog.progres.selesai.includes(k.id) ? 'text-ok' : 'text-transparent')}
                      aria-hidden
                    />
                    {k.judul}
                  </span>
                </button>
              </li>
            ))}
            <li className="lv2">
              <button type="button" onClick={() => document.getElementById('daftar-pustaka')?.scrollIntoView({ behavior: 'smooth' })}>
                <span className="pl-5">Daftar Pustaka</span>
              </button>
            </li>
          </ul>
        </aside>

        <article className={cn('bab', ringkas && 'mode-ringkas')}>
          <Link to="/modul" className="back">← Daftar modul</Link>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="eyebrow">Bab {meta.nomor}</p>
            <Badge variant="ok">Pelajaran interaktif</Badge>
          </div>
          <h1>{meta.judul}</h1>
          <p className="m-0 max-w-[760px] text-muted">{meta.ringkasan}</p>

          {/* Bilah progres + pengalih mode, menempel di atas saat digulir */}
          <div className="sticky top-[var(--topbar-h)] z-10 -mx-1 my-5 max-w-[760px] border-b border-line bg-bg/95 px-1 py-3 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-lg border border-line bg-surface p-0.5" role="group" aria-label="Mode tampilan">
                <Button size="sm" variant={ringkas ? 'ghost' : 'default'} aria-pressed={!ringkas} onClick={() => setRingkas(false)}>
                  <BookOpenText /> Belajar
                </Button>
                <Button size="sm" variant={ringkas ? 'default' : 'ghost'} aria-pressed={ringkas} onClick={() => setRingkas(true)}>
                  <Stethoscope /> Ringkas klinis
                </Button>
              </div>
              <div className="flex min-w-40 flex-1 items-center gap-2">
                <Progress value={persen} label="Progres pelajaran" />
                <span className="text-xs whitespace-nowrap text-muted">
                  {selesai}/{kartu.length} kartu
                </span>
              </div>
              {selesai > 0 && (
                <Button size="icon" variant="ghost" aria-label="Atur ulang progres" title="Atur ulang progres" onClick={prog.reset}>
                  <RotateCcw />
                </Button>
              )}
            </div>
            {ringkas && (
              <p className="m-0 mt-2 text-xs text-muted">
                Mode ringkas: hanya inti bab, Poin Klinis, rekomendasi ESC, tabel, dan ilustrasi yang ditampilkan.
              </p>
            )}
          </div>

          <div className="prose">
            <MDXProvider components={komponenMDX}>
              <Konten />
            </MDXProvider>

            <h2 id="daftar-pustaka">Daftar Pustaka</h2>
            <ol className="pustaka">
              {pustaka.map((r, i) => (
                <li key={i} id={`ref-${i + 1}`}>
                  {r}
                </li>
              ))}
            </ol>
          </div>

          <nav className="pager">
            {prev ? <Link to={`/modul/${prev.slug}`}>← Bab {prev.nomor}: {prev.judul}</Link> : <span />}
            {next && <Link to={`/modul/${next.slug}`}>Bab {next.nomor}: {next.judul} →</Link>}
          </nav>
        </article>
      </div>
    </KonteksPelajaran.Provider>
  )
}
