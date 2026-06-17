import { describe, it, expect, vi, afterEach } from 'vitest'
import { withViewTransition } from './viewTransition'
import { setMedia } from './test/media'

type DocVT = { startViewTransition?: (cb: () => void) => unknown }

afterEach(() => {
  delete (document as unknown as DocVT).startViewTransition
})

describe('withViewTransition', () => {
  it('runs the update synchronously when the API is unavailable', () => {
    const update = vi.fn()
    withViewTransition(update)
    expect(update).toHaveBeenCalledTimes(1)
  })

  it('routes through startViewTransition when available', () => {
    const update = vi.fn()
    const svt = vi.fn((cb: () => void) => {
      cb()
      return { finished: Promise.resolve() }
    })
    ;(document as unknown as DocVT).startViewTransition = svt
    withViewTransition(update)
    expect(svt).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledTimes(1)
  })

  it('skips the transition under reduced motion even when available', () => {
    setMedia({ reducedMotion: true })
    const update = vi.fn()
    const svt = vi.fn()
    ;(document as unknown as DocVT).startViewTransition = svt
    withViewTransition(update)
    expect(svt).not.toHaveBeenCalled()
    expect(update).toHaveBeenCalledTimes(1)
  })
})
