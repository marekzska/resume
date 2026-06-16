import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/Button'
import { work } from '@/data/work'
import { REVEAL_STAGGER } from '@/lib/motion'

const EMAIL = 'marekzska@gmail.com'
const GITHUB_URL = 'https://github.com/marekzska'

export function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="px-gutter py-section">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-h1 text-parchment">{t('contact.title')}</h2>
        </Reveal>
        <Reveal delay={REVEAL_STAGGER}>
          <p className="mt-6 max-w-2xl font-sans text-lead text-muted">{t('contact.line')}</p>
        </Reveal>
        <Reveal delay={REVEAL_STAGGER * 2}>
          <div className="mt-10">
            <Button href={`mailto:${EMAIL}`}>
              <Mail aria-hidden className="size-4" />
              {t('contact.email')}
            </Button>
          </div>
        </Reveal>
        <Reveal delay={REVEAL_STAGGER * 3}>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-sans text-small">
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t('contact.github')} ${t('a11y.newTab')}`}
                className="text-muted transition-colors hover:text-parchment"
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
                  className="text-muted transition-colors hover:text-parchment"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
