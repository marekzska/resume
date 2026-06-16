export function Atmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, transparent 58%, var(--vignette-edge) 100%)',
        }}
      />
      <svg
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
        style={{ opacity: 'var(--grain-opacity)' }}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </>
  )
}
