type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown
}

export function withViewTransition(update: () => void) {
  const doc = document as ViewTransitionDocument
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduced || typeof doc.startViewTransition !== 'function') {
    update()
    return
  }

  doc.startViewTransition(update)
}
