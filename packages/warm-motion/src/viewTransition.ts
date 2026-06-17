type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown
}

/**
 * Runs `update` inside a View Transition when supported, otherwise applies it
 * synchronously. Skips the transition entirely under reduced motion.
 */
export function withViewTransition(update: () => void) {
  const doc = document as ViewTransitionDocument
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduced || typeof doc.startViewTransition !== 'function') {
    update()
    return
  }

  doc.startViewTransition(update)
}
