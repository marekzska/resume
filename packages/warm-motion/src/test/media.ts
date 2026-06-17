type MediaState = { pointerFine: boolean; reducedMotion: boolean }

const state: MediaState = { pointerFine: true, reducedMotion: false }
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

/** Override the mocked media state for the current test (notifies subscribers). */
export function setMedia(next: Partial<MediaState>) {
  Object.assign(state, next)
  notify()
}

/** Reset to defaults (fine pointer, motion allowed) and notify subscribers. */
export function resetMedia() {
  state.pointerFine = true
  state.reducedMotion = false
  notify()
}

/**
 * A `window.matchMedia` mock driven by `state`. `matches` is a live getter, and
 * `change` listeners are actually invoked on `setMedia`/`resetMedia` so consumers
 * that cache the result (framer-motion's `useReducedMotion`) stay in sync. Note
 * framer queries `(prefers-reduced-motion)` without `: reduce`, so we match the
 * prefix.
 */
export function matchMediaImpl(query: string): MediaQueryList {
  const isReduced = query.includes('prefers-reduced-motion')
  const isFine = query.includes('pointer: fine')

  const register = (listener: () => void) => listeners.add(listener)
  const unregister = (listener: () => void) => listeners.delete(listener)

  return {
    get matches() {
      if (isReduced) return state.reducedMotion
      if (isFine) return state.pointerFine
      return false
    },
    media: query,
    onchange: null,
    addEventListener: (_type: string, listener: () => void) => register(listener),
    removeEventListener: (_type: string, listener: () => void) => unregister(listener),
    addListener: register,
    removeListener: unregister,
    dispatchEvent: () => false,
  } as MediaQueryList
}
