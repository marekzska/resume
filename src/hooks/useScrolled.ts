import { useEffect, useState } from 'react'

export function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const apply = () => {
      frame = 0
      setScrolled(window.scrollY > threshold)
    }

    apply() // synchronous initial read, no flash on mount

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(apply)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}
