import { motion, useReducedMotion } from 'motion/react'
import { CONFIG, mapsUrl } from '../config.js'
import { EASE_LUXE, SPRING_SOFT, VIEWPORT } from '../lib/motion.js'
import { Button, Section } from './ui.jsx'
import { Reveal } from './Motion.jsx'
import { Divider } from './Ornaments.jsx'

function mapEmbedUrl(query) {
  // Google Maps embeds are picky about parameter order; this format is reliable in iframes.
  return `https://maps.google.com/maps?output=embed&z=14&q=${encodeURIComponent(query)}&hl=en`
}

export function Details() {
  const { venue } = CONFIG
  const reduced = useReducedMotion()

  return (
    <Section tint="sky">
      <Reveal className="mx-auto max-w-[720px] text-center" index={1}>
        <p className="text-[0.68rem] tracking-[0.42em] uppercase text-gold-deep">When &amp; where</p>
        <h2 className="mt-3 font-heading text-[clamp(1.8rem,5vw,2.7rem)] font-normal text-ink">One celebration</h2>
        <Divider index={1} />
        <p className="mx-auto mb-10 max-w-[38ch] text-[0.94rem] text-ink-soft">
          Join us at {CONFIG.venue.name}, {CONFIG.venue.area}, {CONFIG.venue.city}.
        </p>
      </Reveal>

      <Reveal variant="scale" index={2}>
        <motion.article
          className="mx-auto max-w-[720px] overflow-hidden rounded-[2px] border border-gold/35 bg-ivory/80 p-1.5 shadow-lift"
          initial={reduced ? { opacity: 0 } : { opacity: 0, rotateX: 8, y: 30 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 1, ease: EASE_LUXE }}
          style={{ transformPerspective: 1200 }}
        >
          <div className="overflow-hidden border border-gold/20">
            <motion.div
              className="relative h-[240px] min-[700px]:h-[300px]"
              initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE_LUXE, delay: 0.15 }}
            >
              <iframe
                title={`${venue.area}, ${venue.city}`}
                src={mapEmbedUrl(venue.mapQuery)}
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.25] contrast-[1.05]"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(243_235_227/0.92))]" />
            </motion.div>

            <div className="relative -mt-16 px-[clamp(1.4rem,5vw,3rem)] pb-[clamp(2rem,6vw,3.2rem)] pt-2 text-center">
              <motion.svg
                className="mx-auto mb-3 size-12 text-dusty-rose"
                viewBox="0 0 48 48"
                aria-hidden="true"
                initial={reduced ? { opacity: 0 } : { y: -24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ ...SPRING_SOFT, delay: 0.35 }}
              >
                <use href="#i-pin" />
              </motion.svg>
              <p className="font-script text-[2rem] text-dusty-rose">{venue.name}</p>
              <h3 className="mt-1 font-display text-[clamp(2.1rem,10vw,4.4rem)] font-light leading-none text-ink">
                {venue.area}
              </h3>
              <p className="mt-2 text-[0.72rem] tracking-[0.38em] uppercase text-gold-deep">{venue.city}</p>

              <div className="mx-auto my-8 grid max-w-[420px] grid-cols-2 gap-px bg-gold/25">
                <div className="bg-ivory/90 px-4 py-5">
                  <p className="text-[0.55rem] tracking-[0.28em] uppercase text-gold-deep">Date</p>
                  <p className="mt-2 font-heading text-[1.02rem] text-ink">{venue.date}</p>
                </div>
                <div className="bg-ivory/90 px-4 py-5">
                  <p className="text-[0.55rem] tracking-[0.28em] uppercase text-gold-deep">Time</p>
                  <p className="mt-2 font-heading text-[1.02rem] text-ink">{venue.time}</p>
                </div>
              </div>

              <p className="mb-7 text-[0.92rem] text-ink-soft">{venue.address}</p>

              <Button
                href={venue.mapLink || mapsUrl(venue.mapQuery)}
                target="_blank"
                rel="noopener"
              >
                <svg width="15" height="15" viewBox="0 0 48 48" aria-hidden="true"><use href="#i-pin" /></svg>
                View on Maps
              </Button>
            </div>
          </div>
        </motion.article>
      </Reveal>
    </Section>
  )
}
