import { createContext, useContext } from 'react'
import type { useProgres } from '@/lib/progres'

export type KonteksPelajaran = {
  pustaka: string[]
  ringkas: boolean
} & ReturnType<typeof useProgres>

export const Pelajaran = createContext<KonteksPelajaran | null>(null)

export function usePelajaran() {
  const k = useContext(Pelajaran)
  if (!k) throw new Error('Komponen pelajaran harus berada di dalam <Pelajaran.Provider>')
  return k
}
