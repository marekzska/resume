import { describe, it, expect } from 'vitest'
import i18n from './i18n'

describe('i18n side-effects', () => {
  it('syncs <html lang> and document.title on language change', async () => {
    await i18n.changeLanguage('sk')
    expect(document.documentElement.lang).toBe('sk')
    expect(document.title).toBe('Marek Žiška — Frontend vývojár')

    await i18n.changeLanguage('en')
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe('Marek Žiška — Front-End Developer')
  })
})
