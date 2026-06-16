import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/cn'
import { REVEAL_STAGGER } from '@/lib/motion'

const PARAGRAPHS = ['p1', 'p2', 'p3']

const NUMERAL: Record<string, string> = {
  approach: '01',
  about: '02',
}

type ProseSectionProps = {
  ns: 'approach' | 'about'
}

export function ProseSection({ ns }: ProseSectionProps) {
  const { t } = useTranslation()
  const flip = ns === 'about'

  const quoteBlock = (
    <Reveal delay={REVEAL_STAGGER} className={cn('lg:col-span-4', flip ? 'lg:text-left' : 'lg:text-right')}>
      <span aria-hidden className="block font-display text-h2 tabular-nums text-muted/40">
        {NUMERAL[ns]}
      </span>
      <p className="mt-3 font-sans text-mono-ish uppercase text-gold">{t(`${ns}.quoteLabel`)}</p>
      <p className="mt-4 font-display text-h2 text-parchment lg:text-h1">{t(`${ns}.quote`)}</p>
      <span aria-hidden className={cn('mt-6 block h-px w-12 bg-ember', !flip && 'lg:ml-auto')} />
    </Reveal>
  )

  const proseBlock = (
    <div className="space-y-6 lg:col-span-7">
      {PARAGRAPHS.map((paragraph, index) => (
        <Reveal key={paragraph} delay={index * REVEAL_STAGGER}>
          <p className="font-sans text-body text-muted">{t(`${ns}.${paragraph}`)}</p>
        </Reveal>
      ))}
    </div>
  )

  return (
    <section id={ns} className="px-gutter py-section">
      <div className="mx-auto max-w-6xl">
        <Reveal rise={false}>
          <h2 className="lit font-display text-h1">{t(`${ns}.title`)}</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-16">
          {flip ? proseBlock : quoteBlock}
          {flip ? quoteBlock : proseBlock}
        </div>
      </div>
    </section>
  )
}
