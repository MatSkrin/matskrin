import { Fragment, type ReactNode } from 'react'
import { POLA_SITASI, uraiNomor } from '@/lib/sitasi'
import { usePelajaran } from './konteks'

/** Sitasi angka [n] dengan popover rujukan lengkap (gaya Vancouver). */
export function Cite({ r }: { r: string }) {
  const { pustaka } = usePelajaran()
  const nomor = uraiNomor(r)
  if (!nomor.every((n) => pustaka[n - 1])) return <>[{r}]</>
  return (
    <span className="cite" tabIndex={0} role="button" aria-label={`Rujukan ${r}`}>
      <sup>[{r}]</sup>
      <span className="cite-pop" role="tooltip">
        {nomor.map((n) => (
          <span key={n} className="cite-item">
            <b>{n}.</b> {pustaka[n - 1]}
          </span>
        ))}
      </span>
    </span>
  )
}

/** Untuk teks dari file data (mis. pembahasan kuis): ubah [n] menjadi <Cite />. */
export function TeksSitasi({ children }: { children: string }) {
  const out: ReactNode[] = []
  let akhir = 0
  for (const m of children.matchAll(POLA_SITASI)) {
    out.push(children.slice(akhir, m.index), <Cite key={m.index} r={m[1]} />)
    akhir = m.index! + m[0].length
  }
  out.push(children.slice(akhir))
  return <>{out.map((x, i) => <Fragment key={i}>{x}</Fragment>)}</>
}
