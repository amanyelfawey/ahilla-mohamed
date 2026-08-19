import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CONFIG } from '../config.js'
import { useCountdown } from '../hooks/useCountdown.js'
import { cn } from '../lib/cn.js'
import { EASE_LUXE, SPRING_TIGHT, VIEWPORT } from '../lib/motion.js'
import { Reveal } from './Motion.jsx'
import { Divider } from './Ornaments.jsx'

function RollingDigit({ value, size = 'lg' }) {
  const reduced = useReducedMotion()

  return (
    <span
      className={cn(
        'relative inline-grid overflow-hidden tabular-nums',
        size === 'xl' && 'h-[clamp(5.4rem,18vw,8.5rem)] min-w-[1.1em]',
        size === 'lg' && 'h-[clamp(2.1rem,7vw,3.1rem)] min-w-[1.2em]',
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className={cn(
            'col-start-1 row-start-1 inline-block font-display font-light leading-none text-ink',
            size === 'xl' && 'text-[clamp(5.4rem,18vw,8.5rem)] tracking-[-0.04em]',
            size === 'lg' && 'text-[clamp(2.1rem,7vw,3.1rem)] tracking-[-0.02em]',
          )}
          initial={reduced ? { opacity: 0 } : { y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
          transition={reduced ? { duration: 0.2 } : SPRING_TIGHT}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Unit({ value, label, size = 'lg' }) {
  return (
    <div className="grid justify-items-center gap-2">
      <RollingDigit value={value} size={size} />
      <span className="text-[0.58rem] tracking-[0.32em] uppercase text-gold-deep">{label}</span>
    </div>
  )
}

function Colon() {
  return (
    <motion.span
      className="mt-[0.12em] select-none font-display text-[clamp(1.6rem,5vw,2.4rem)] font-light leading-none text-gold"
      animate={{ opacity: [1, 0.22, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'steps(1, end)' }}
      aria-hidden="true"
    >
      :
    </motion.span>
  )
}

function ShimmerBorder() {
  return (
    <motion.span
      className="pointer-events-none absolute inset-0 rounded-[2px] bg-[linear-gradient(105deg,transparent_35%,rgb(212_188_134/0.55)_50%,transparent_65%)]"
      initial={{ x: '-120%' }}
      whileInView={{ x: '120%' }}
      viewport={VIEWPORT}
      transition={{ duration: 1.4, ease: EASE_LUXE, delay: 0.3 }}
      aria-hidden="true"
    />
  )
}

export function Countdown() {
  const { time } = useCountdown()

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-cream)_0%,var(--color-ivory)_58%,var(--color-baby-pink)_140%)] px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4.5rem,11vw,8rem)]">
      <div className="relative z-[2] mx-auto max-w-[560px]">
        <Reveal variant="scale" index={1}>
          <div className="relative overflow-hidden rounded-[2px] border border-gold/35 bg-ivory/80 p-1.5 shadow-lift backdrop-blur-sm">
            <ShimmerBorder />
            <div className="relative border border-gold/20 px-[clamp(1.4rem,5vw,3rem)] py-[clamp(2.4rem,7vw,3.8rem)] text-center">
              <p className="text-[0.68rem] tracking-[0.42em] uppercase text-gold-deep">Save the date</p>
              <h2 className="mt-3 font-heading text-[clamp(1.7rem,5vw,2.4rem)] font-normal leading-snug text-ink">Until we say I do</h2>
              <Divider index={1} />

              {time ? (
                <div id="countdown" role="timer" aria-live="off">
                  <div className="grid justify-items-center">
                    <RollingDigit value={time.d} size="xl" />
                    <span className="-mt-1 text-[0.62rem] tracking-[0.4em] uppercase text-gold-deep">Days</span>
                  </div>

                  <div className="mx-auto my-8 h-px max-w-[180px] bg-[linear-gradient(90deg,transparent,var(--color-gold-soft),transparent)]" aria-hidden="true" />

                  <div className="flex items-start justify-center gap-[clamp(0.55rem,2.8vw,1.25rem)]">
                    <Unit value={time.h} label="Hours" />
                    <Colon />
                    <Unit value={time.m} label="Minutes" />
                    <Colon />
                    <Unit value={time.s} label="Seconds" />
                  </div>
                </div>
              ) : (
                <p className="font-script text-[clamp(2rem,7vw,3.2rem)] text-dusty-rose">Today, our forever begins</p>
              )}

              <p className="mt-10 font-script text-[1.45rem] text-dusty-rose">{CONFIG.bride} &amp; {CONFIG.groom}</p>
              <p className="mt-2 text-[0.68rem] tracking-[0.28em] uppercase text-ink-faint">{CONFIG.displayDate}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
