import { useEffect, useRef } from 'react'

export function useMagnetic<T extends HTMLElement>(strength = 0.3, radius = 140) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    let frame = 0

    const reset = () => {
      el.style.transform = ''
    }

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        // Attract once the cursor enters a radius around the element, not just on hover.
        const range = radius + Math.max(rect.width, rect.height) / 2

        if (Math.hypot(dx, dy) < range) {
          el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
        } else {
          reset()
        }
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('blur', reset)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('blur', reset)
      reset()
    }
  }, [strength, radius])

  return ref
}
