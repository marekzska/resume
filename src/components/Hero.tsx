import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { EASE, HERO_DELAY, HERO_DURATION, HERO_RISE } from '@/lib/motion'

export function Hero() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <section id="hero" className="flex min-h-dvh flex-col justify-center px-gutter">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="lit font-display text-display">{t('hero.name')}</h1>
          <p className="mt-6 max-w-2xl font-sans text-lead text-muted">{t('hero.stance')}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="hero" className="flex min-h-dvh flex-col justify-center px-gutter">
      <div className="mx-auto w-full max-w-6xl">
        <motion.h1
          className="lit font-display text-display"
          initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: HERO_DURATION, ease: EASE }}
        >
          {t('hero.name')}
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl font-sans text-lead text-muted"
          initial={{ opacity: 0, y: HERO_RISE }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: HERO_DURATION, ease: EASE, delay: HERO_DELAY + 0.2 }}
        >
          {t('hero.stance')}
        </motion.p>
      </div>
    </section>
  )
}
