import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE, REVEAL_DURATION, REVEAL_RISE } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  rise?: boolean
  className?: string
}

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
