import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'sk', label: 'SK' },
]

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage

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
            onClick={() => i18n.changeLanguage(lang.code)}
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
