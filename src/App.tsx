import { MotionConfig } from 'framer-motion'
import { Spotlight } from '@/components/Spotlight'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Work } from '@/components/Work'

const PLACEHOLDERS = [
  { id: 'approach', label: 'Approach' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Spotlight />
      <Header />
      <main>
        <Hero />
        <Work />
        {PLACEHOLDERS.map((section) => (
          <section key={section.id} id={section.id} className="px-gutter py-section">
            <div className="mx-auto max-w-6xl">
              <p className="font-display text-h1 text-muted/40">{section.label}</p>
            </div>
          </section>
        ))}
      </main>
    </MotionConfig>
  )
}

export default App
