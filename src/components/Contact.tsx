import { Mail } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button'
import { work } from '@/data/work'
import { useMagnetic } from 'warm-motion'
import { EASE, REVEAL_DURATION, REVEAL_RISE, REVEAL_STAGGER } from '@/lib/motion'

const EMAIL = 'marekzska@gmail.com'
const GITHUB_URL = 'https://github.com/marekzska'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: REVEAL_STAGGER } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_RISE },
  visible: { opacity: 1, y: 0, transition: { duration: REVEAL_DURATION, ease: EASE } },
}

export function Contact() {
  const { t } = useTranslation()
  const magneticRef = useMagnetic<HTMLAnchorElement>()
  const reduced = useReducedMotion()

  // Reduced motion → motion.* render as plain elements with no animation props.
  const group = reduced
    ? {}
    : {
        variants: containerVariants,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, margin: '-15%' },
      }
  const item = reduced ? {} : { variants: itemVariants }

  return (
    <section id="contact" className="px-gutter py-section">
      <motion.div className="mx-auto max-w-6xl" {...group}>
        <motion.h2 {...item} className="lit font-display text-h1">
          {t('contact.title')}
        </motion.h2>
        <motion.p {...item} className="mt-6 max-w-2xl font-sans text-lead text-muted">
          {t('contact.line')}
        </motion.p>
        <motion.div {...item} className="mt-10">
          <Button ref={magneticRef} href={`mailto:${EMAIL}`}>
            <Mail aria-hidden className="size-4" />
            {t('contact.email')}
          </Button>
        </motion.div>
        <motion.ul
          {...item}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-sans text-small"
        >
          <li>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t('contact.github')} ${t('a11y.newTab')}`}
              className="link-underline text-muted transition-colors hover:text-parchment"
            >
              {t('contact.github')}
            </a>
          </li>
          {work.map((item) => (
            <li key={item.key}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${item.name} ${t('a11y.newTab')}`}
                className="link-underline text-muted transition-colors hover:text-parchment"
              >
                {item.name}
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
