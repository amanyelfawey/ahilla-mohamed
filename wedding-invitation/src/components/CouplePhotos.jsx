import { useState } from 'react'
import { CONFIG } from '../config.js'
import { Section } from './ui.jsx'
import { Reveal } from './Motion.jsx'
import { SectionHeading } from './Ornaments.jsx'

function Photo({ src, alt, width, height }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-[linear-gradient(150deg,var(--color-blush),var(--color-champagne)_55%,var(--color-peach))] p-4 text-center font-script text-[2.2rem] text-white/90">
        {CONFIG.bride[0]} & {CONFIG.groom[0]}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover transition duration-[1.4s] ease-luxe"
      onError={() => setFailed(true)}
    />
  )
}

export function CouplePhotos() {
  return (
    <Section tint="blush">
      <SectionHeading eyebrow="The two of us" title="A love worth celebrating" />

      <div className="grid grid-cols-1 items-center gap-[clamp(1.5rem,4vw,2.5rem)] min-[700px]:grid-cols-[1.05fr_0.95fr]">
        <Reveal variant="scale" index={1}>
          <figure className="relative mx-auto w-full max-w-[420px] p-3 before:absolute before:inset-0 before:rounded-[var(--radius-arch)] before:bg-[linear-gradient(120deg,var(--color-gold-deep),var(--color-gold-soft)_45%,var(--color-gold)_72%,var(--color-gold-deep))] before:opacity-55">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-arch)] bg-[linear-gradient(150deg,var(--color-blush),var(--color-champagne))] shadow-lift">
              <Photo
                src={CONFIG.photos.hero}
                alt={`${CONFIG.bride} and ${CONFIG.groom} together`}
                width={900}
                height={1200}
              />
            </div>
            <figcaption className="mt-3.5 text-center font-script text-[1.35rem] text-dusty-rose">{CONFIG.bride} & {CONFIG.groom}</figcaption>
          </figure>
        </Reveal>

        <Reveal variant="right" index={2}>
          <div className="grid grid-cols-2 gap-[clamp(0.75rem,2.5vw,1.25rem)]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[140px_140px_12px_12px] border border-gold/28 bg-[linear-gradient(150deg,var(--color-lavender),var(--color-powder-blue))] shadow-soft">
              <Photo src={CONFIG.photos.pair1} alt="An engagement portrait" width={700} height={900} />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[12px_12px_140px_140px] border border-gold/28 bg-[linear-gradient(150deg,var(--color-lavender),var(--color-powder-blue))] shadow-soft">
              <Photo src={CONFIG.photos.pair2} alt="A quiet moment together" width={700} height={900} />
            </div>
          </div>
          <p className="mt-6 text-center text-[0.94rem] text-ink-soft">
            Two families, one story — and a day we have dreamt of sharing with you.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
