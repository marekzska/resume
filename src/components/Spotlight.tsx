import { useSpotlight } from '@/hooks/useSpotlight'

export function Spotlight() {
  useSpotlight()

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_var(--mx)_var(--my),var(--color-ember-glow),transparent_40%)]"
    />
  )
}
