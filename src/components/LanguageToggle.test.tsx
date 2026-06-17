import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import i18n from '@/lib/i18n'
import { LanguageToggle } from './LanguageToggle'

describe('LanguageToggle', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('reflects the active language with aria-pressed', () => {
    render(<LanguageToggle />)
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'SK' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('switches language on click', async () => {
    render(<LanguageToggle />)
    fireEvent.click(screen.getByRole('button', { name: 'SK' }))
    await waitFor(() => expect(i18n.resolvedLanguage).toBe('sk'))
    expect(screen.getByRole('button', { name: 'SK' })).toHaveAttribute('aria-pressed', 'true')
  })
})
