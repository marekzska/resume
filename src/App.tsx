import { MotionConfig } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Spotlight } from '@/components/Spotlight'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Work } from '@/components/Work'
import { ProseSection } from '@/components/ProseSection'
import { Contact } from '@/components/Contact'

function App() {
  const { t } = useTranslation()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only font-sans text-small text-parchment focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-canvas focus:px-4 focus:py-2"
      >
        {t('a11y.skip')}
      </a>
      <Spotlight />
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <ProseSection ns="approach" />
        <ProseSection ns="about" />
        <Contact />
      </main>
    </MotionConfig>
  )
}

export default App
