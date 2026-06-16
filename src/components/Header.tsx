import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { useScrolled } from '@/hooks/useScrolled'
import { LanguageToggle } from '@/components/LanguageToggle'
import { NAV_DELAY, NAV_DURATION } from '@/lib/motion'

const SECTION_IDS = ['work', 'approach', 'about', 'contact']

export function Header() {
  const { t } = useTranslation()
  const scrolled = useScrolled()
  const reduced = useReducedMotion()

  const cluster = (
    <div className="flex items-center gap-6">
      <nav className="hidden items-center gap-6 md:flex">
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="link-underline font-sans text-small text-muted transition-colors hover:text-parchment"
          >
            {t(`nav.${id}`)}
          </a>
        ))}
      </nav>
      <LanguageToggle />
    </div>
  )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled
          ? 'border-hairline bg-canvas/70 backdrop-blur-md'
          : 'border-transparent',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between py-5">
        <a href="#hero" className="font-display text-body lowercase text-parchment">
          marek žiška
        </a>
        {reduced ? (
          cluster
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: NAV_DELAY, duration: NAV_DURATION }}
          >
            {cluster}
          </motion.div>
        )}
      </div>
    </header>
  )
}
