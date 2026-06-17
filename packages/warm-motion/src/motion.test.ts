import { describe, it, expect } from 'vitest'
import { EASE, REVEAL_DURATION, REVEAL_RISE, REVEAL_STAGGER } from './motion'

describe('motion constants', () => {
  it('exposes a stable public shape', () => {
    expect(EASE).toEqual([0.22, 1, 0.36, 1])
    expect(REVEAL_DURATION).toBe(0.6)
    expect(REVEAL_RISE).toBe(16)
    expect(REVEAL_STAGGER).toBe(0.08)
  })
})
