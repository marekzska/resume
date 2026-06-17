import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { matchMediaImpl, resetMedia } from './media'

vi.stubGlobal('matchMedia', matchMediaImpl)

// framer-motion's whileInView needs IntersectionObserver; jsdom lacks it.
class NoopIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}
vi.stubGlobal('IntersectionObserver', NoopIntersectionObserver)

afterEach(() => {
  cleanup()
  resetMedia()
})
