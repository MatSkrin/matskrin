import { Fragment } from 'react'

/** Judul dari atribut string: *teks* ditampilkan miring (istilah asing). */
export function TeksJudul({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\*[^*]+\*)/).map((b, i) =>
        b.startsWith('*') && b.endsWith('*') && b.length > 2 ? <em key={i}>{b.slice(1, -1)}</em> : <Fragment key={i}>{b}</Fragment>,
      )}
    </>
  )
}
