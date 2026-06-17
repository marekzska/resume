import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrolled } from './useScrolled'

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', { value, writable: true, configurable: true })
}

describe('useScrolled', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setScrollY(0)
  })
  afterEach(() => vi.useRealTimers())

  it('is false at the top and true past the threshold', () => {
    const { result } = renderHook(() => useScrolled(16))
    expect(result.current).toBe(false)

    setScrollY(100)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      vi.advanceTimersByTime(32)
    })
    expect(result.current).toBe(true)
  })

  it('coalesces a burst of scroll events into a single rAF update', () => {
    renderHook(() => useScrolled(16))
    const raf = vi.spyOn(window, 'requestAnimationFrame')

    act(() => {
      for (let i = 0; i < 5; i++) window.dispatchEvent(new Event('scroll'))
    })

    expect(raf).toHaveBeenCalledTimes(1)
    raf.mockRestore()
  })

  it('removes its scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrolled(16))
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeSpy.mockRestore()
  })
})
