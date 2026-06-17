import type { AnchorHTMLAttributes, Ref } from 'react'
import { cn } from '@/lib/cn'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  ref?: Ref<HTMLAnchorElement>
}

export function Button({ className, children, ref, ...props }: ButtonProps) {
  return (
    <a
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-7 py-3.5',
        'border border-ember/50 bg-ember/5 font-sans text-lead font-medium text-parchment',
        // Animate only colors + shadow on hover; leave `transform` to useMagnetic's JS spring.
        'transition-[color,background-color,border-color,box-shadow] duration-300 ease-out',
        'hover:border-ember hover:bg-ember/10 hover:shadow-[0_12px_44px_var(--color-ember-glow)]',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
