import { useTranslation } from 'react-i18next'
import { work } from '@/data/work'
import { WorkItem } from '@/components/WorkItem'
import { Reveal } from 'warm-motion'

export function Work() {
  const { t } = useTranslation()

  return (
    <section id="work" className="px-gutter py-section">
      <div className="mx-auto max-w-6xl">
        <Reveal rise={false}>
          <h2 className="lit font-display text-h1">{t('work.title')}</h2>
        </Reveal>
        <div className="mt-12">
          {work.map((item, index) => (
            <WorkItem key={item.key} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
