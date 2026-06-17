import { useEffect, useRef } from 'react'

export type MagneticOptions = {
  /** Fraction of cursor distance applied as pull. */
  strength?: number
  /** Activation radius (px) measured from the element's edge. */
  radius?: number
  /** Maximum translation (px) per axis — clamps the pull so the hit target never flies away. */
  maxOffset?: number
  /** Per-frame smoothing factor (0–1) for both follow and snap-back. */
  smoothing?: number
}

/**
 * Returns a ref for an element that is magnetically attracted toward the cursor
 * once it enters an activation radius. The pull is clamped, and the follow +
 * snap-back are both driven by an in-hook spring (no reliance on a CSS
 * transition). The rAF loop stops when the element settles and restarts on the
 * next pointer change — no perpetual frame loop. Scroll/resize re-measure the
 * element so a parked cursor never leaves a stale offset.
 *
 * No-ops under reduced motion or a coarse pointer.
 */
export function useMagnetic<T extends HTMLElement>({
  strength = 0.35,
  radius = 140,
  maxOffset = 12,
  smoothing = 0.15,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let dirty = false
    let raf = 0

    const clamp = (v: number) => Math.max(-maxOffset, Math.min(maxOffset, v))

    const tick = () => {
      if (dirty) {
        dirty = false
        const rect = el.getBoundingClientRect()
        const dx = pointer.x - (rect.left + rect.width / 2)
        const dy = pointer.y - (rect.top + rect.height / 2)
        const range = radius + Math.max(rect.width, rect.height) / 2
        const inRange = dx * dx + dy * dy < range * range
        target.x = inRange ? clamp(dx * strength) : 0
        target.y = inRange ? clamp(dy * strength) : 0
      }

      current.x += (target.x - current.x) * smoothing
      current.y += (target.y - current.y) * smoothing
      if (Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05) {
        current.x = target.x
        current.y = target.y
      }

      el.style.transform =
        current.x === 0 && current.y === 0
          ? ''
          : `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`

      if (dirty || current.x !== target.x || current.y !== target.y) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0 // settled — idle until the next pointer change
      }
    }

    const ensureLoop = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      dirty = true
      ensureLoop()
    }

    // The element can move under a stationary cursor; re-measure on reflow.
    const onReflow = () => {
      dirty = true
      ensureLoop()
    }

    const reset = () => {
      pointer.x = Number.NEGATIVE_INFINITY
      pointer.y = Number.NEGATIVE_INFINITY
      dirty = true
      ensureLoop()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onReflow, { passive: true, capture: true })
    window.addEventListener('resize', onReflow, { passive: true })
    window.addEventListener('blur', reset)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onReflow, { capture: true } as EventListenerOptions)
      window.removeEventListener('resize', onReflow)
      window.removeEventListener('blur', reset)
      el.style.transform = ''
    }
  }, [strength, radius, maxOffset, smoothing])

  return ref
}
