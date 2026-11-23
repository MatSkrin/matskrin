import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePelajaran } from './konteks'
import { TeksJudul } from './TeksJudul'

/** Satu kartu pelajaran = satu subbab. Tombol "Tandai selesai" menyimpan progres di localStorage. */
export function LessonCard({
  id,
  nomor,
  judul,
  latihan = false,
  children,
}: {
  id: string
  nomor?: string
  judul: string
  /** Kartu latihan (kuis) disembunyikan di mode ringkas klinis. */
  latihan?: boolean
  children: ReactNode
}) {
  const { progres, tandai, ringkas } = usePelajaran()
  const selesai = progres.selesai.includes(id)
  return (
    <section
      id={id}
      data-kartu={judul.replace(/\*/g, '')}
      className={cn(
        'my-6 scroll-mt-20 rounded-card border bg-surface p-4 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-colors sm:p-7',
        selesai ? 'border-poin/50' : 'border-line',
        latihan && 'sembunyi-ringkas',
      )}
    >
      <header className="flex items-start gap-3">
        {nomor && (
          <span
            className={cn(
              'mt-0.5 inline-flex h-7 min-w-11 shrink-0 items-center justify-center rounded-md px-2 text-xs font-bold',
              selesai ? 'bg-ok text-white' : 'bg-accent-soft text-accent',
            )}
          >
            {selesai ? <Check className="size-4" aria-label="Selesai" /> : nomor}
          </span>
        )}
        <h2 className="kartu-judul flex-1 text-[1.2rem] sm:text-[1.35rem]"><TeksJudul>{judul}</TeksJudul></h2>
      </header>
      <div className="kartu-isi mt-3">{children}</div>
      {!ringkas && (
        <footer className="mt-5 flex justify-end border-t border-line pt-4">
          <Button variant={selesai ? 'success' : 'outline'} size="sm" aria-pressed={selesai} onClick={() => tandai(id, !selesai)}>
            <Check /> {selesai ? 'Selesai dipelajari' : 'Tandai selesai'}
          </Button>
        </footer>
      )}
    </section>
  )
}
