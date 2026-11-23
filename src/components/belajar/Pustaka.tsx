import { Fragment } from 'react'
import { DOI } from '@/data/doi'
import { kunciRujukan } from '@/lib/pustakaGabungan'

/** Pecah teks pada URL dan "doi:10.xxx" agar keduanya bisa diklik. */
const POLA = /(https?:\/\/\S+?(?=[.,;)]?(?:\s|$))|doi:\s?10\.\S+?(?=[.,;)]?(?:\s|$)))/i

/** Tampilkan teks rujukan dengan URL/DOI sebagai tautan. DOI ditambahkan dari src/data/doi.ts bila teks belum memuatnya. */
export function TeksRujukan({ children }: { children: string }) {
  const sudahAda = /https?:\/\/|doi:/i.test(children)
  const doi = sudahAda ? undefined : DOI[kunciRujukan(children)]
  const bagian = children.split(POLA)
  return (
    <>
      {bagian.map((b, i) => {
        if (/^https?:\/\//.test(b))
          return (
            <a key={i} href={b} target="_blank" rel="noopener">
              {b}
            </a>
          )
        if (/^doi:/i.test(b)) {
          const id = b.replace(/^doi:\s?/i, '')
          return (
            <a key={i} href={`https://doi.org/${id}`} target="_blank" rel="noopener">
              {b}
            </a>
          )
        }
        return <Fragment key={i}>{b}</Fragment>
      })}
      {doi && (
        <>
          {' '}
          <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener">
            doi:{doi}
          </a>
        </>
      )}
    </>
  )
}
