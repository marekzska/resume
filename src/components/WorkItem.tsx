import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Project } from '@/data/work'
import { Reveal } from '@/components/Reveal'

type WorkItemProps = {
  item: Project
}

export function WorkItem({ item }: WorkItemProps) {
  const { t } = useTranslation()

  return (
    <Reveal>
      <article className="border-l-2 border-ember/40 pl-6 transition-colors hover:border-ember md:pl-8">
        <h3 className="font-display text-h2 text-parchment">{item.name}</h3>
        <p className="mt-3 max-w-2xl font-sans text-body text-muted">
          {t(`work.${item.key}.desc`)}
        </p>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${t('work.viewSite')} — ${item.name} ${t('a11y.newTab')}`}
            className="inline-flex items-center gap-1.5 self-start font-sans text-small text-muted transition-colors hover:text-parchment"
          >
            {t('work.viewSite')}
            <ExternalLink aria-hidden className="size-4" />
          </a>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {item.stack.map((tag) => (
              <li key={tag} className="font-sans text-mono-ish uppercase text-muted">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  )
}
