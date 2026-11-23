import { Children, cloneElement, isValidElement, useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactElement, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ISTILAH, kunciIstilah, pecahIstilah } from '@/data/istilah'

/**
 * Istilah dengan penjelasan: muncul langsung saat disorot (desktop) atau diketuk (ponsel),
 * menggantikan tooltip bawaan browser (`title`) yang lambat dan memunculkan kursor "?".
 */
export function Istilah({ k, children }: { k: string; children?: ReactNode }) {
  const data = ISTILAH[k] ?? ISTILAH[kunciIstilah(k) ?? '']
  const [buka, setBuka] = useState(false)
  const [pos, setPos] = useState<{ left: number; top: number; bawah: boolean } | null>(null)
  const ref = useRef<HTMLSpanElement>(null)
  const popRef = useRef<HTMLSpanElement>(null)
  const tutupT = useRef<number>(undefined)
  const sentuh = useRef(false)
  const id = useId()

  const tutup = useCallback(() => setBuka(false), [])
  const tahan = () => window.clearTimeout(tutupT.current)
  const tundaTutup = () => {
    tahan()
    tutupT.current = window.setTimeout(tutup, 120)
  }

  useLayoutEffect(() => {
    if (!buka || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const w = Math.min(320, window.innerWidth - 24)
    const left = Math.max(12, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 12))
    const bawah = r.top < 200
    setPos({ left, top: bawah ? r.bottom + 8 : r.top - 8, bawah })
  }, [buka])

  useEffect(() => {
    if (!buka) return
    const luar = (e: Event) => {
      const t = e.target as Node
      if (!ref.current?.contains(t) && !popRef.current?.contains(t)) tutup()
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && tutup()
    document.addEventListener('pointerdown', luar)
    document.addEventListener('keydown', esc)
    window.addEventListener('scroll', tutup, { passive: true, capture: true })
    window.addEventListener('resize', tutup)
    return () => {
      document.removeEventListener('pointerdown', luar)
      document.removeEventListener('keydown', esc)
      window.removeEventListener('scroll', tutup, { capture: true })
      window.removeEventListener('resize', tutup)
    }
  }, [buka, tutup])

  if (!data) return <>{children ?? k}</>

  return (
    <>
      <span
        ref={ref}
        className="istilah"
        role="button"
        tabIndex={0}
        aria-expanded={buka}
        aria-describedby={buka ? id : undefined}
        onPointerDown={(e) => (sentuh.current = e.pointerType !== 'mouse')}
        onMouseEnter={() => {
          if (sentuh.current) return
          tahan()
          setBuka(true)
        }}
        onMouseLeave={() => !sentuh.current && tundaTutup()}
        onFocus={() => setBuka(true)}
        onBlur={tundaTutup}
        onClick={(e) => {
          // Jangan ikut mencentang kotak bila istilah berada di dalam <label>.
          e.preventDefault()
          e.stopPropagation()
          if (sentuh.current) setBuka((b) => !b)
          else setBuka(true)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            setBuka((b) => !b)
          }
        }}
      >
        {children ?? k}
      </span>
      {buka &&
        pos &&
        createPortal(
          <span
            ref={popRef}
            id={id}
            role="tooltip"
            className={`istilah-pop ${pos.bawah ? 'bawah' : ''}`}
            style={{ left: pos.left, top: pos.top }}
            onMouseEnter={tahan}
            onMouseLeave={tundaTutup}
          >
            <b>{data.judul}</b>
            <span>{data.isi}</span>
          </span>,
          document.body,
        )}
    </>
  )
}

function tandai(teks: string, sekali?: Set<string>): ReactNode[] {
  return pecahIstilah(teks).map((p, i) => {
    if (!p.kunci || sekali?.has(p.kunci)) return p.teks
    sekali?.add(p.kunci)
    return (
      <Istilah key={i} k={p.kunci}>
        {p.teks}
      </Istilah>
    )
  })
}

/** Teks biasa dengan istilah glosarium yang otomatis bisa disorot/diketuk. */
export function TeksIstilah({ children }: { children: string }) {
  return <>{tandai(children)}</>
}

function proses(node: ReactNode, sekali: Set<string>): ReactNode {
  if (typeof node === 'string') return <>{tandai(node, sekali)}</>
  if (!isValidElement(node)) return node
  const el = node as ReactElement<{ children?: ReactNode; 'data-polos'?: boolean }>
  if (el.type === Istilah || el.props['data-polos'] || typeof el.type !== 'string') return el
  if (el.props.children == null) return el
  return cloneElement(el, undefined, Children.map(el.props.children, (c) => proses(c, sekali)))
}

/**
 * Bungkus konten (JSX) agar setiap istilah glosarium diberi penjelasan, hanya pada kemunculan
 * pertama di dalam blok ini supaya teks tidak penuh garis bawah.
 */
export function Glosarium({ children }: { children: ReactNode }) {
  const sekali = new Set<string>()
  return <>{Children.map(children, (c) => proses(c, sekali))}</>
}
