import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

export type SpotlightOptions = {
  /** Easing factor per frame toward the cursor (0–1). Lower = laggier. */
  lerp?: number
  /** Fallback `--mx` when the pointer is coarse or motion is reduced. */
  staticX?: string
  /** Fallback `--my` when the pointer is coarse or motion is reduced. */
  staticY?: string
}

/**
 * Tracks the cursor into two CSS custom properties (`--mx`, `--my`) on the
 * document root via an rAF lerp loop, and toggles a `spotlight-live` class. The
 * loop idles when the position settles and restarts on the next pointer move, so
 * a stationary cursor costs nothing. Pair with the package stylesheet to light up
 * `.lit` headings.
 *
 * No-ops (writes static fallbacks) under reduced motion or a coarse pointer.
 */
export function useSpotlight({
  lerp = 0.1,
  staticX = '82%',
  staticY = '16%',
}: SpotlightOptions = {}) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = document.documentElement
    const fine = window.matchMedia('(pointer: fine)').matches

    if (reduced || !fine) {
      root.style.setProperty('--mx', staticX)
      root.style.setProperty('--my', staticY)
      return
    }

    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 }
    const pos = { ...target }
    let raf = 0

    const tick = () => {
      pos.x += (target.x - pos.x) * lerp
      pos.y += (target.y - pos.y) * lerp
      if (Math.abs(target.x - pos.x) < 0.5 && Math.abs(target.y - pos.y) < 0.5) {
        pos.x = target.x
        pos.y = target.y
      }
      root.style.setProperty('--mx', `${pos.x}px`)
      root.style.setProperty('--my', `${pos.y}px`)
      raf = pos.x !== target.x || pos.y !== target.y ? requestAnimationFrame(tick) : 0
    }

    const ensureLoop = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      ensureLoop()
    }

    root.classList.add('spotlight-live')
    root.style.setProperty('--mx', `${pos.x}px`)
    root.style.setProperty('--my', `${pos.y}px`)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      root.classList.remove('spotlight-live')
    }
  }, [reduced, lerp, staticX, staticY])
}
