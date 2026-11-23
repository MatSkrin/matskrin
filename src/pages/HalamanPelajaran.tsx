import { MDXProvider } from '@mdx-js/react'
import { BookOpenText, Check, BookMarked, Flag, ChevronLeft, ChevronRight, List, PanelLeftClose, PanelLeftOpen, RotateCcw, Stethoscope, X } from 'lucide-react'
import { useEffect, useState, type ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import * as B from '@/components/belajar'
import { Pelajaran as KonteksPelajaran } from '@/components/belajar/konteks'
import { TeksRujukan } from '@/components/belajar/Pustaka'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { Pelajaran } from '@/content/pelajaran'
import type { Bab } from '@/lib/content'
import { usePreferensi, useProgres } from '@/lib/progres'
import { cn, perilakuGulir } from '@/lib/utils'

const komponenMDX = {
  ...B,
  // Tabel bisa digulir horizontal di layar sempit; tabIndex agar bisa digulir dengan keyboard (WCAG 2.1.1).
  table: (p: ComponentProps<'table'>) => <table tabIndex={0} {...p} />,
}

function gulirKe(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: perilakuGulir(), block: 'start' })
}

function DaftarKartu({
  bab,
  selesai,
  aktif,
  onPilih,
}: {
  bab: Bab
  selesai: string[]
  aktif: string
  onPilih?: () => void
}) {
  const item = [...bab.kartu, { id: 'daftar-pustaka', teks: 'Daftar Pustaka', nomor: undefined }]
  return (
    <ul className="toc">
      {item.map((k) => {
        const done = selesai.includes(k.id)
        return (
          <li key={k.id} className={cn('lv2', aktif === k.id && 'on')}>
            <button
              type="button"
              onClick={() => {
                gulirKe(k.id)
                onPilih?.()
              }}
            >
              <span className="flex items-start gap-2">
                <span
                  className={cn(
                    'mt-px inline-flex h-[1.15rem] min-w-8 shrink-0 items-center justify-center rounded text-[0.68rem] font-bold',
                    done ? 'bg-ok text-white' : 'bg-line/70 text-muted',
                  )}
                  aria-label={done ? 'Selesai' : undefined}
                >
                  {done ? (
                    <Check className="size-3" />
                  ) : k.nomor ? (
                    k.nomor
                  ) : k.id === 'daftar-pustaka' ? (
                    <BookMarked className="size-3" aria-hidden />
                  ) : (
                    <Flag className="size-3" aria-hidden />
                  )}
                </span>
                <span>{k.teks}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default function HalamanPelajaran({
  pelajaran,
  bab,
  prev,
  next,
}: {
  pelajaran: Pelajaran
  bab: Bab
  prev?: Bab
  next?: Bab
}) {
  const { meta, pustaka, Konten, slug } = pelajaran
  const prog = useProgres(slug)
  const [ringkas, setRingkas] = usePreferensi('matskrin:mode-ringkas', false)
  const [aktif, setAktif] = useState('')
  const [navBuka, setNavBuka] = useState(false)
  const [sidebarTutup, setSidebarTutup] = usePreferensi('matskrin:sidebar-tutup', false)

  // Sorot kartu yang sedang dibaca.
  useEffect(() => {
    const els = [...bab.kartu.map((k) => k.id), 'daftar-pustaka']
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e)
    const obs = new IntersectionObserver(
      (en) => {
        const t = en.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (t[0]) setAktif(t[0].target.id)
      },
      { rootMargin: '-120px 0px -60% 0px' },
    )
    els.forEach((e) => obs.observe(e))
    window.scrollTo(0, 0)
    return () => obs.disconnect()
  }, [bab])

  // Esc menutup daftar kartu melayang.
  useEffect(() => {
    if (!navBuka) return
    const tutup = (e: KeyboardEvent) => e.key === 'Escape' && setNavBuka(false)
    window.addEventListener('keydown', tutup)
    return () => window.removeEventListener('keydown', tutup)
  }, [navBuka])

  const total = bab.kartu.length
  const selesai = bab.kartu.filter((k) => prog.progres.selesai.includes(k.id)).length
  const persen = total ? (selesai / total) * 100 : 0

  return (
    <KonteksPelajaran.Provider value={{ pustaka, ringkas, ...prog }}>
      <div className={cn('bab-layout', sidebarTutup && 'sidebar-tutup')}>
        <aside className="toc-side" aria-label="Kartu pelajaran" hidden={sidebarTutup}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="toc-title m-0">Kartu pelajaran</p>
            <Button
              size="icon"
              variant="ghost"
              className="size-7"
              aria-label="Sembunyikan daftar kartu"
              title="Sembunyikan daftar kartu"
              onClick={() => setSidebarTutup(true)}
            >
              <PanelLeftClose />
            </Button>
          </div>
          <DaftarKartu bab={bab} selesai={prog.progres.selesai} aktif={aktif} />
        </aside>

        <article className={cn('bab pelajaran', ringkas && 'mode-ringkas')}>
          <Link to="/modul" className="back">
            ← Daftar modul
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="eyebrow">Bab {meta.nomor}</p>
            <Badge variant="ok">Pelajaran interaktif</Badge>
          </div>
          <h1>{meta.judul}</h1>
          {meta.ringkasan && <p className="m-0 text-[1.02rem] text-muted">{meta.ringkasan}</p>}

          {/* Bilah alat: mode tampilan, progres, dan (di ponsel) daftar kartu. Menempel saat digulir. */}
          <div className="alat-pelajaran sticky top-[var(--topbar-h)] z-20 mt-5 mb-6 border-b border-line bg-bg py-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
              <div className="inline-flex rounded-lg border border-line bg-surface p-0.5" role="group" aria-label="Mode tampilan">
                <Button size="sm" variant={ringkas ? 'ghost' : 'default'} aria-pressed={!ringkas} onClick={() => setRingkas(false)}>
                  <BookOpenText /> Belajar
                </Button>
                <Button size="sm" variant={ringkas ? 'default' : 'ghost'} aria-pressed={ringkas} onClick={() => setRingkas(true)}>
                  <Stethoscope /> Ringkas klinis
                </Button>
              </div>
              <div className="flex min-w-36 flex-1 items-center gap-2">
                <Progress value={persen} label={`Progres Bab ${meta.nomor}`} />
                <span className="text-xs whitespace-nowrap text-muted tabular-nums">
                  {selesai}/{total}
                </span>
                {selesai > 0 && (
                  <Button size="icon" variant="ghost" className="size-8" aria-label="Atur ulang progres bab ini" title="Atur ulang progres" onClick={prog.reset}>
                    <RotateCcw />
                  </Button>
                )}
              </div>
              {sidebarTutup && (
                <Button
                  size="sm"
                  variant="outline"
                  className="nav-kartu-desktop"
                  aria-label="Tampilkan daftar kartu"
                  onClick={() => setSidebarTutup(false)}
                >
                  <PanelLeftOpen /> Kartu
                </Button>
              )}
            </div>
            {ringkas && (
              <p className="m-0 mt-2 text-xs text-muted">
                Ringkas klinis: hanya inti bab, Poin Klinis, rekomendasi ESC, tabel, dan gambar yang ditampilkan.
              </p>
            )}
          </div>

          <div className="prose">
            <MDXProvider components={komponenMDX}>
              <Konten />
            </MDXProvider>

            <section id="daftar-pustaka" className="pustaka-blok">
              <h2>Daftar Pustaka</h2>
              <ol className="pustaka">
                {pustaka.map((r, i) => (
                  <li key={i} id={`ref-${i + 1}`}>
                    <TeksRujukan>{r}</TeksRujukan>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <nav className="pager-bab" aria-label="Bab sebelumnya dan berikutnya">
            {prev ? (
              <Link to={`/modul/${prev.slug}`} className="pager-kartu">
                <ChevronLeft aria-hidden />
                <span>
                  <small>Bab {prev.nomor}</small>
                  {prev.judul}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/modul/${next.slug}`} className="pager-kartu kanan">
                <span>
                  <small>Bab {next.nomor}</small>
                  {next.judul}
                </span>
                <ChevronRight aria-hidden />
              </Link>
            )}
          </nav>
        </article>
      </div>

      {/* Daftar kartu melayang: bisa dibuka dari mana saja tanpa gulir ke atas. */}
      {navBuka && (
        <div id="nav-kartu" className="panel-kartu-melayang" role="dialog" aria-label="Daftar kartu pelajaran">
          <p className="toc-title">Kartu pelajaran</p>
          <DaftarKartu bab={bab} selesai={prog.progres.selesai} aktif={aktif} onPilih={() => setNavBuka(false)} />
        </div>
      )}
      <button
        type="button"
        className="fab fab-kartu"
        aria-expanded={navBuka}
        aria-controls="nav-kartu"
        onClick={() => setNavBuka((v) => !v)}
      >
        {navBuka ? <X aria-hidden /> : <List aria-hidden />}
        <span>Kartu</span>
      </button>
    </KonteksPelajaran.Provider>
  )
}
