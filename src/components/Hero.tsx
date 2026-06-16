import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { EASE, HERO_DURATION, HERO_RISE, REVEAL_STAGGER } from '@/lib/motion'

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: REVEAL_STAGGER, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: HERO_RISE },
  shown: { opacity: 1, y: 0, transition: { duration: HERO_DURATION, ease: EASE } },
}

export function Hero() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <section id="hero" className="flex min-h-dvh flex-col justify-center px-gutter">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="font-display text-display text-parchment">{t('hero.name')}</h1>
          <p className="mt-6 max-w-2xl font-sans text-lead text-muted">{t('hero.stance')}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="hero" className="flex min-h-dvh flex-col justify-center px-gutter">
      <motion.div
        className="mx-auto w-full max-w-6xl"
        variants={container}
        initial="hidden"
        animate="shown"
      >
        <motion.h1 variants={item} className="font-display text-display text-parchment">
          {t('hero.name')}
        </motion.h1>
        <motion.p variants={item} className="mt-6 max-w-2xl font-sans text-lead text-muted">
          {t('hero.stance')}
        </motion.p>
      </motion.div>
    </section>
  )
}
