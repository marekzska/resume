import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/Reveal'
import { REVEAL_STAGGER } from '@/lib/motion'

const PARAGRAPHS = ['p1', 'p2', 'p3']

type ProseSectionProps = {
  ns: 'approach' | 'about'
}

export function ProseSection({ ns }: ProseSectionProps) {
  const { t } = useTranslation()

  return (
    <section id={ns} className="px-gutter py-section">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-h1 text-parchment">{t(`${ns}.title`)}</h2>
        </Reveal>
        <div className="mt-10 max-w-2xl space-y-6">
          {PARAGRAPHS.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * REVEAL_STAGGER}>
              <p className="font-sans text-body text-muted">{t(`${ns}.${paragraph}`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
