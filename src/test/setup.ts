import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { matchMediaImpl, resetMedia } from './media'

vi.stubGlobal('matchMedia', matchMediaImpl)

afterEach(() => {
  cleanup()
  resetMedia()
})
