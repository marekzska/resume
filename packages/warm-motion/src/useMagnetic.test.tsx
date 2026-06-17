import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { useMagnetic } from './useMagnetic'
import { setMedia } from './test/media'

function Magnet() {
  const ref = useMagnetic<HTMLButtonElement>()
  return <button ref={ref}>cta</button>
}

function stubRect(el: Element) {
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    left: 100,
    top: 100,
    right: 200,
    bottom: 140,
    width: 100,
    height: 40,
    x: 100,
    y: 100,
    toJSON: () => ({}),
  } as DOMRect)
}

function pull(el: HTMLElement) {
  // Cursor right of the element center (150, 120) but inside the 190px radius.
  window.dispatchEvent(new MouseEvent('pointermove', { clientX: 300, clientY: 120 }))
  vi.advanceTimersByTime(800)
  return el
}

describe('useMagnetic', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('clamps the pull to maxOffset (does not fling the hit target away)', () => {
    const { container } = render(<Magnet />)
    const btn = container.querySelector('button')!
    stubRect(btn)
    pull(btn)
    // raw pull would be 150 * 0.35 = 52.5px; clamped to the 12px default.
    expect(btn.style.transform).toBe('translate(12.00px, 0.00px)')
  })

  it('snaps back to rest after the window loses focus', () => {
    const { container } = render(<Magnet />)
    const btn = container.querySelector('button')!
    stubRect(btn)
    pull(btn)
    expect(btn.style.transform).toBe('translate(12.00px, 0.00px)')

    window.dispatchEvent(new Event('blur'))
    vi.advanceTimersByTime(800)
    expect(btn.style.transform).toBe('')
  })

  it('is inert under reduced motion', () => {
    setMedia({ reducedMotion: true })
    const { container } = render(<Magnet />)
    const btn = container.querySelector('button')!
    stubRect(btn)
    pull(btn)
    expect(btn.style.transform).toBe('')
  })

  it('is inert on a coarse pointer', () => {
    setMedia({ pointerFine: false })
    const { container } = render(<Magnet />)
    const btn = container.querySelector('button')!
    stubRect(btn)
    pull(btn)
    expect(btn.style.transform).toBe('')
  })

  it('resets the transform and detaches window listeners on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { container, unmount } = render(<Magnet />)
    const btn = container.querySelector('button')!
    stubRect(btn)
    pull(btn)
    expect(btn.style.transform).toBe('translate(12.00px, 0.00px)')

    unmount()
    expect(btn.style.transform).toBe('')
    expect(removeSpy).toHaveBeenCalledWith('pointermove', expect.any(Function))
    removeSpy.mockRestore()
  })
})
