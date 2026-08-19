import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CONFIG } from '../config.js'
import { burstPetals } from '../hooks/useCanvasEffects.js'
import { EASE_LUXE, VIEWPORT } from '../lib/motion.js'
import { Reveal } from './Motion.jsx'

export function Finale() {
  const reduced = useReducedMotion()
  const burstFired = useRef(false)

  const fireBurst = () => {
    if (burstFired.current || reduced) return
    burstFired.current = true
    burstPetals({ count: 48, origin: { x: 0.5, y: 0.85 } })
  }

  return (
    <motion.section
      className="relative grid min-h-[92svh] place-items-center bg-[radial-gradient(ellipse_110%_75%_at_50%_100%,var(--color-baby-pink)_0%,transparent_56%),radial-gradient(ellipse_90%_60%_at_12%_8%,var(--color-lavender)_0%,transparent_50%),radial-gradient(ellipse_90%_60%_at_88%_12%,var(--color-peach)_0%,transparent_50%),var(--color-ivory)] px-6 py-[clamp(4rem,10vw,7rem)] text-center"
      onViewportEnter={fireBurst}
      viewport={VIEWPORT}
    >
      <div className="relative z-[3] grid justify-items-center gap-2.5">
        <Reveal index={0}>
          <p className="font-body text-[0.68rem] tracking-[0.42em] uppercase text-gold-deep">And so</p>
        </Reveal>

        <Reveal index={1}>
          <motion.p
            className="font-display text-[clamp(2.4rem,11vw,5.4rem)] font-light leading-[1.06] bg-[linear-gradient(105deg,var(--color-ink)_0%,var(--color-gold-soft)_42%,var(--color-gold)_58%,var(--color-ink)_100%)] bg-[length:220%_100%] bg-clip-text text-transparent"
            initial={{ backgroundPosition: '120% 0' }}
            whileInView={{ backgroundPosition: '-20% 0' }}
            viewport={VIEWPORT}
            transition={{ duration: 1.8, ease: EASE_LUXE, delay: 0.2 }}
          >
            {CONFIG.bride} <span className="font-script text-dusty-rose">&amp;</span> {CONFIG.groom}
          </motion.p>
        </Reveal>

        <Reveal index={2}>
          <p className="mt-3.5 font-script text-[clamp(1.5rem,6vw,2.4rem)] text-dusty-rose">our forever begins…</p>
        </Reveal>

        <Reveal index={3} className="mt-6 grid justify-items-center gap-3">
          <motion.span
            className="block h-px w-0 max-w-[120px] bg-[linear-gradient(90deg,transparent,var(--color-gold-soft),transparent)]"
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.1 }}
            aria-hidden="true"
          />
          <p className="text-[0.66rem] tracking-[0.4em] uppercase text-gold-deep">{CONFIG.displayDate}</p>
        </Reveal>

        <Reveal index={4}>
          <p className="mt-10 text-[0.82rem] tracking-[0.1em] text-ink-faint">Thank you for being part of our story.</p>
        </Reveal>
      </div>
    </motion.section>
  )
}
