import * as A from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

// Diadaptasi dari shadcn/ui (MIT).
export const Accordion = A.Root

export function AccordionItem({ className, ...props }: ComponentProps<typeof A.Item>) {
  return <A.Item className={cn('rounded-card border border-line bg-surface', className)} {...props} />
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof A.Trigger>) {
  return (
    <A.Header className="m-0 flex">
      <A.Trigger
        className={cn(
          'group flex flex-1 cursor-pointer items-center justify-between gap-3 border-0 bg-transparent px-4 py-3 text-left font-[inherit] text-[0.95rem] text-ink hover:text-accent',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </A.Trigger>
    </A.Header>
  )
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof A.Content>) {
  return (
    <A.Content className="overflow-hidden" {...props}>
      <div className={cn('px-4 pb-4', className)}>{children}</div>
    </A.Content>
  )
}
