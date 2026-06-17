import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Project } from '@/data/work'
import { cn } from '@/lib/cn'
import { Reveal } from 'warm-motion'
import { WorkPreview } from '@/components/WorkPreview'

type WorkItemProps = {
  item: Project
  index: number
}

export function WorkItem({ item, index }: WorkItemProps) {
  const { t } = useTranslation()
  const flip = index % 2 === 1
  const numeral = String(index + 1).padStart(2, '0')

  return (
    <Reveal rise={false}>
      <article className="group relative border-t border-hairline py-10">
        <div
          className={cn(
            'grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10 lg:max-w-xl',
            flip && 'lg:ml-auto',
          )}
        >
          <span className="font-display text-h2 tabular-nums text-muted/40 transition-colors duration-300 group-hover:text-ember">
            {numeral}
          </span>
          <div>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${item.name} — ${t('work.viewSite')} ${t('a11y.newTab')}`}
              className="inline-flex items-baseline gap-2"
            >
              <h3 className="lit link-underline font-display text-h1">{item.name}</h3>
              <ArrowUpRight
                aria-hidden
                className="size-5 shrink-0 text-muted transition duration-300 group-hover:text-ember motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
              />
            </a>
            <p className="mt-4 font-sans text-body text-muted">{t(`work.${item.key}.desc`)}</p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
              {item.stack.map((tag) => (
                <li key={tag} className="font-sans text-mono-ish uppercase text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <WorkPreview item={item} flip={flip} />
      </article>
    </Reveal>
  )
}
