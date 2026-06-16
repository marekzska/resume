import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

const STATIC_X = '82%'
const STATIC_Y = '16%'
const LERP = 0.1

export function useSpotlight() {
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = document.documentElement
    const fine = window.matchMedia('(pointer: fine)').matches

    if (reduced || !fine) {
      root.style.setProperty('--mx', STATIC_X)
      root.style.setProperty('--my', STATIC_Y)
      return
    }

    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 }
    const pos = { ...target }
    let raf = 0

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * LERP
      pos.y += (target.y - pos.y) * LERP
      root.style.setProperty('--mx', `${pos.x}px`)
      root.style.setProperty('--my', `${pos.y}px`)
      raf = requestAnimationFrame(tick)
    }

    root.classList.add('spotlight-live')
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      root.classList.remove('spotlight-live')
    }
  }, [reduced])
}
