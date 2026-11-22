import { Fragment } from 'react'

/** Tampilkan teks rujukan dengan URL (mis. DOI) sebagai tautan. */
export function TeksRujukan({ children }: { children: string }) {
  const bagian = children.split(/(https?:\/\/\S+?)(?=[.,;)]?(?:\s|$))/)
  return (
    <>
      {bagian.map((b, i) =>
        /^https?:\/\//.test(b) ? (
          <a key={i} href={b} target="_blank" rel="noopener">
            {b}
          </a>
        ) : (
          <Fragment key={i}>{b}</Fragment>
        ),
      )}
    </>
  )
}
