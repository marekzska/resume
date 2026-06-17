import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import i18n from '@/lib/i18n'
import { setMedia } from '@/test/media'
import { Contact } from './Contact'

describe('Contact', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders the email CTA and the work/GitHub links', () => {
    render(<Contact />)
    expect(screen.getByText('marekzska@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('renders content visible (not pinned hidden) under reduced motion', () => {
    setMedia({ reducedMotion: true })
    render(<Contact />)
    const heading = screen.getByRole('heading', { name: i18n.t('contact.title') })
    // Reduced path spreads {} onto motion.* → no initial="hidden", so no opacity:0.
    expect(heading.style.opacity).toBe('')
    expect(heading).toBeInTheDocument()
  })
})
