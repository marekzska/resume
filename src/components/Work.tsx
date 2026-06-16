import { useTranslation } from 'react-i18next'
import { work } from '@/data/work'
import { WorkItem } from '@/components/WorkItem'
import { Reveal } from '@/components/Reveal'

export function Work() {
  const { t } = useTranslation()

  return (
    <section id="work" className="px-gutter py-section">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-h1 text-parchment">{t('work.title')}</h2>
        </Reveal>
        <div className="mt-16 space-y-16">
          {work.map((item) => (
            <WorkItem key={item.key} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
