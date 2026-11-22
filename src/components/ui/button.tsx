import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

// Diadaptasi dari shadcn/ui (MIT), memakai token warna MatSkrin.
const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-accent text-[var(--on-accent)] hover:opacity-90',
        outline: 'border-line bg-surface text-ink hover:border-accent hover:text-accent',
        ghost: 'border-transparent bg-transparent text-muted hover:bg-accent-soft hover:text-ink',
        success: 'border-transparent bg-ok text-white hover:opacity-90',
      },
      size: { default: 'h-10 px-4 sm:h-9', sm: 'h-10 px-3 text-xs sm:h-8', icon: 'size-10 sm:size-9' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export function Button({
  className,
  variant,
  size,
  type = 'button',
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return <button type={type} data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
