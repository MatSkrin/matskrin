import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TeksSitasi } from './Cite'
import { usePelajaran } from './konteks'

export type Soal = { id: string; kasus: string; tanya: string; opsi: string[]; benar: number; pembahasan: string }

/** Kuis berbasis kasus. Jawaban dan skor disimpan di localStorage. */
export function Kuis({ soal }: { soal: Soal[] }) {
  const { progres, jawab, ulangKuis } = usePelajaran()
  const dijawab = soal.filter((s) => progres.kuis[s.id] !== undefined)
  const benar = dijawab.filter((s) => progres.kuis[s.id] === s.benar).length
  return (
    <div className="sembunyi-ringkas">
      <ol className="m-0 list-none space-y-5 p-0">
        {soal.map((s, n) => {
          const pilih = progres.kuis[s.id]
          const sudah = pilih !== undefined
          return (
            <li key={s.id} className="rounded-card border border-line bg-bg p-4 sm:p-5">
              <p className="m-0 text-xs font-bold tracking-wider text-accent uppercase">Kasus {n + 1}</p>
              <p className="mt-1 mb-2">{s.kasus}</p>
              <p className="m-0 mb-3 font-semibold">{s.tanya}</p>
              <div className="grid gap-2" role="group" aria-label={`Pilihan jawaban kasus ${n + 1}`}>
                {s.opsi.map((o, k) => {
                  const ini = pilih === k
                  const kunci = sudah && k === s.benar
                  return (
                    <button
                      key={o}
                      disabled={sudah}
                      onClick={() => jawab(s.id, k)}
                      className={cn(
                        'flex w-full items-start gap-2 rounded-lg border bg-surface px-3 py-2.5 text-left font-[inherit] text-[0.95rem] text-ink transition-colors',
                        !sudah && 'cursor-pointer border-line hover:border-accent',
                        kunci && 'border-ok bg-poin-bg',
                        sudah && ini && !kunci && 'border-accent bg-accent-soft',
                        sudah && !ini && !kunci && 'border-line opacity-60',
                      )}
                    >
                      <span className="mt-0.5 font-bold text-muted">{String.fromCharCode(65 + k)}.</span>
                      <span className="flex-1">{o}</span>
                      {kunci && <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ok" aria-label="Jawaban benar" />}
                      {sudah && ini && !kunci && <XCircle className="mt-0.5 size-5 shrink-0 text-accent" aria-label="Jawaban Anda" />}
                    </button>
                  )
                })}
              </div>
              {sudah && (
                <div className="mt-3 rounded-lg bg-surface p-3 text-[0.95rem]" aria-live="polite">
                  <p className={cn('m-0 font-bold', pilih === s.benar ? 'text-ok' : 'text-accent')}>
                    {pilih === s.benar ? 'Tepat.' : `Kurang tepat. Jawaban: ${String.fromCharCode(65 + s.benar)}.`}
                  </p>
                  <p className="m-0 mt-1">
                    <TeksSitasi>{s.pembahasan}</TeksSitasi>
                  </p>
                </div>
              )}
            </li>
          )
        })}
      </ol>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 text-sm text-muted">
          Skor: <b className="text-ink">{benar}</b> / {soal.length}
          {dijawab.length < soal.length && ` · ${soal.length - dijawab.length} soal belum dijawab`}
        </p>
        {dijawab.length > 0 && (
          <Button variant="ghost" size="sm" onClick={ulangKuis}>
            <RotateCcw /> Ulangi kuis
          </Button>
        )}
      </div>
    </div>
  )
}
