import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Reveal } from './Reveal'
import { setMedia } from './test/media'

describe('Reveal', () => {
  it('renders a plain wrapper with no entrance animation under reduced motion', () => {
    setMedia({ reducedMotion: true })
    render(
      <Reveal>
        <span>alpha</span>
      </Reveal>,
    )
    const wrapper = screen.getByText('alpha').parentElement
    expect(wrapper?.style.opacity).toBe('')
    expect(screen.getByText('alpha')).toBeInTheDocument()
  })

  it('starts hidden (opacity 0) before entering the viewport otherwise', () => {
    setMedia({ reducedMotion: false })
    render(
      <Reveal>
        <span>beta</span>
      </Reveal>,
    )
    const wrapper = screen.getByText('beta').parentElement
    expect(wrapper?.style.opacity).toBe('0')
  })
})
