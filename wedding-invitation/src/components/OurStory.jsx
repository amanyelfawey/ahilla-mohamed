import { motion, useReducedMotion } from 'motion/react'
import { CONFIG } from '../config.js'
import { EASE_LUXE, VIEWPORT } from '../lib/motion.js'
import { Reveal } from './Motion.jsx'
import { Divider } from './Ornaments.jsx'
import { Section } from './ui.jsx'

export function OurStory() {
  const reduced = useReducedMotion()
  const { story } = CONFIG

  return (
    <Section tint="blush" id="our-story" className="!pt-[clamp(2.5rem,6vw,4.5rem)]">
      <div className="grid items-center gap-[clamp(2rem,6vw,4rem)] min-[820px]:grid-cols-[0.92fr_1.08fr]">
        <Reveal variant="scale" index={1}>
          <figure className="relative mx-auto w-full max-w-[440px]">
            <motion.div
              className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-arch)] border border-gold/20 bg-cream shadow-lift"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.1, ease: EASE_LUXE, delay: 0.1 }}
            >
              <img
                src={CONFIG.photos.portrait}
                alt={`${CONFIG.bride} and ${CONFIG.groom} smiling together`}
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[center_18%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(47_38_41/0.18))]" aria-hidden="true" />
            </motion.div>
            <figcaption className="mt-4 text-center font-script text-[1.45rem] text-dusty-rose">
              {CONFIG.bride} &amp; {CONFIG.groom}
            </figcaption>
          </figure>
        </Reveal>

        <div className="mx-auto max-w-[34rem] text-center min-[820px]:text-left">
          <Reveal index={1}>
            <p className="text-[0.68rem] tracking-[0.42em] uppercase text-gold-deep">{story.eyebrow}</p>
          </Reveal>
          <Reveal index={2}>
            <h2 className="mt-3 font-heading text-[clamp(1.9rem,5vw,2.8rem)] font-normal leading-[1.16] text-ink">
              {story.title}
            </h2>
          </Reveal>
          <Divider index={2} className="min-[820px]:mx-0" />
          <Reveal index={3}>
            <p className="font-script text-[clamp(1.35rem,4.5vw,1.85rem)] leading-[1.55] text-dusty-rose">
              {story.lead}
            </p>
          </Reveal>
          <Reveal index={4}>
            <p className="mt-6 text-[0.96rem] leading-[1.85] text-ink-soft">{story.body}</p>
          </Reveal>
          <Reveal index={5}>
            <p className="mt-5 text-[0.82rem] tracking-[0.12em] text-ink-faint italic">{story.closing}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
