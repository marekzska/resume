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

  it('goes live on a fine pointer and tracks the cursor into CSS vars', () => {
    const setProp = vi.spyOn(document.documentElement.style, 'setProperty')

    const { unmount } = renderHook(() => useSpotlight())
    expect(document.documentElement.classList.contains('spotlight-live')).toBe(true)

    window.dispatchEvent(new MouseEvent('pointermove', { clientX: 200, clientY: 150 }))
    vi.advanceTimersByTime(64)
    expect(setProp).toHaveBeenCalledWith('--mx', expect.stringContaining('px'))

    unmount()
    expect(document.documentElement.classList.contains('spotlight-live')).toBe(false)
  })
})
