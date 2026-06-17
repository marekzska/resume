import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSpotlight } from './useSpotlight'
import { setMedia } from './test/media'

describe('useSpotlight', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    vi.useRealTimers()
    document.documentElement.classList.remove('spotlight-live')
  })

  it('writes static fallback vars and stays inert under reduced motion', () => {
    setMedia({ reducedMotion: true })
    const setProp = vi.spyOn(document.documentElement.style, 'setProperty')

    renderHook(() => useSpotlight())

    expect(document.documentElement.classList.contains('spotlight-live')).toBe(false)
    expect(setProp).toHaveBeenCalledWith('--mx', '82%')
    expect(setProp).toHaveBeenCalledWith('--my', '16%')
  })

  it('goes live, eases --mx toward the cursor, then idles', () => {
    const mx: number[] = []
    vi.spyOn(document.documentElement.style, 'setProperty').mockImplementation((prop, value) => {
      if (prop === '--mx' && typeof value === 'string' && value.endsWith('px')) {
        mx.push(parseFloat(value))
      }
    })

    const { unmount } = renderHook(() => useSpotlight())
    expect(document.documentElement.classList.contains('spotlight-live')).toBe(true)
    const seed = mx.at(-1) ?? 0 // ~512 (jsdom innerWidth / 2)

    window.dispatchEvent(new MouseEvent('pointermove', { clientX: 200, clientY: 150 }))
    vi.advanceTimersByTime(1000)
    const settled = mx.at(-1) ?? 0
    expect(settled).toBeLessThan(seed) // actually moved from center toward the cursor
    expect(settled).toBeCloseTo(200, 0) // converged on clientX (proves onMove + lerp are wired)

    const writesAtSettle = mx.length
    vi.advanceTimersByTime(1000)
    expect(mx.length).toBe(writesAtSettle) // loop idled — no wasted frames on a still cursor

    unmount()
    expect(document.documentElement.classList.contains('spotlight-live')).toBe(false)
  })
})
