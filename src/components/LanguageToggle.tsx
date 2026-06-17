import { flushSync } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { withViewTransition } from 'warm-motion'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'sk', label: 'SK' },
]

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage

  const switchTo = (code: string) => {
    if (code === current) return
    withViewTransition(() => {
      flushSync(() => {
        i18n.changeLanguage(code)
      })
    })
  }

  return (
    <div className="flex items-center gap-2 font-sans text-small">
      {LANGS.map((lang, index) => (
        <span key={lang.code} className="flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden className="text-muted/50">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(lang.code)}
            aria-pressed={current === lang.code}
            className={cn(
              'transition-colors',
              current === lang.code ? 'text-parchment' : 'text-muted hover:text-parchment',
            )}
          >
            {lang.label}
          </button>
        </span>
      ))}
    </div>
  )
}
