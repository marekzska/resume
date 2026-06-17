import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE, REVEAL_DURATION, REVEAL_RISE } from './motion'

export type RevealProps = {
  children: ReactNode
  /** Delay (s) before the reveal begins. */
  delay?: number
  /** Whether the content rises as it fades in. */
  rise?: boolean
  className?: string
}

/**
 * Fades (and optionally rises) its children into view once, when scrolled near.
 * Under reduced motion it renders a plain wrapper with no animation at all.
 */
export function Reveal({ children, delay = 0, rise = true, className }: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  const variants: Variants = rise
    ? { hidden: { opacity: 0, y: REVEAL_RISE }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0 }, visible: { opacity: 1 } }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: REVEAL_DURATION, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
