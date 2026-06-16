import type { AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-6 py-3',
        'bg-ember-strong font-sans text-lead font-bold text-parchment',
        'transition duration-300 ease-out',
        'hover:shadow-[0_10px_40px_var(--color-ember-glow)] motion-safe:hover:-translate-y-0.5',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
