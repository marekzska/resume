import { useState } from 'react'
import type { Project } from '@/data/work'
import { cn } from '@/lib/cn'

type WorkPreviewProps = {
  item: Project
  flip: boolean
}

export function WorkPreview({ item, flip }: WorkPreviewProps) {
  const [failed, setFailed] = useState(false)

  // No screenshot for this project → render no hover card at all (not an empty box).
  if (failed) return null

  return (
    <div
      className={cn(
        'pointer-events-none hidden aspect-[16/10] w-56 overflow-hidden rounded-sm border border-hairline opacity-0 transition duration-500 ease-out group-hover:opacity-100 motion-safe:translate-y-3 motion-safe:group-hover:translate-y-0 lg:absolute lg:top-10 lg:block xl:w-64',
        flip ? 'lg:left-0' : 'lg:right-0',
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, var(--color-ember-glow), transparent 70%)',
        }}
      />
      <img
        src={`/work/${item.key}.webp`}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className="relative size-full object-cover object-top [filter:grayscale(1)_brightness(0.6)_contrast(1.05)]"
      />
      <div aria-hidden className="absolute inset-0 bg-ember opacity-50 mix-blend-color" />
    </div>
  )
}
