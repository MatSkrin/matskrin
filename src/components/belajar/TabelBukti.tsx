import type { ReactNode } from 'react'
import { Table2 } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { TeksSitasi } from './Cite'
import { idRujukan } from './Rujuk'
import { TeksJudul } from './TeksJudul'

/** Tabel bukti yang bisa dibuka-tutup, lengkap dengan baris sumber. */
export function TabelBukti({
  judul,
  sumber,
  terbuka = false,
  children,
}: {
  judul: string
  sumber?: string
  terbuka?: boolean
  children: ReactNode
}) {
  const [nomor, ...sisa] = judul.split('. ')
  return (
    <Accordion type="single" collapsible defaultValue={terbuka ? 'isi' : undefined} className="kunci my-5 scroll-mt-28" data-slot="tabel-bukti" id={/^Tabel \d+\.\d+$/.test(nomor) ? idRujukan('Tabel', nomor.slice(6)) : undefined}>
      <AccordionItem value="isi">
        <AccordionTrigger>
          <span className="flex items-start gap-2">
            <Table2 className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
            <span>
              <strong>{nomor}.</strong> <TeksJudul>{sisa.join('. ')}</TeksJudul>
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="[&_table]:my-0">
          {children}
          {sumber && (
            <p className="catatan">
              <TeksSitasi>{sumber}</TeksSitasi>
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
