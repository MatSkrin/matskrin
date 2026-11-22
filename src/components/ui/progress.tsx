import { cn } from '@/lib/utils'

// Diadaptasi dari shadcn/ui (MIT), tanpa dependensi Radix.
export function Progress({ value, className, label }: { value: number; className?: string; label: string }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-line', className)}
    >
      <div className="h-full rounded-full bg-ok transition-[width] duration-500" style={{ width: `${v}%` }} />
    </div>
  )
}
