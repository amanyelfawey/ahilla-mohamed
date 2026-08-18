import { CONFIG } from '../config.js'
import { useCountdown } from '../hooks/useCountdown.js'
import { cn } from '../lib/cn.js'
import { Divider } from './Ornaments.jsx'

function Digit({ value, turning, size = 'lg' }) {
  return (
    <span
      className={cn(
        'inline-block tabular-nums font-display font-light leading-none text-ink transition duration-300 ease-luxe',
        size === 'xl' && 'text-[clamp(5.4rem,18vw,8.5rem)] tracking-[-0.04em]',
        size === 'lg' && 'text-[clamp(2.1rem,7vw,3.1rem)] tracking-[-0.02em]',
        turning && '-translate-y-2 scale-95 opacity-20 blur-[2px]',
      )}
    >
      {value}
    </span>
  )
}

function Unit({ value, label, turning, size = 'lg' }) {
  return (
    <div className="grid justify-items-center gap-2">
      <Digit value={value} turning={turning} size={size} />
      <span className="text-[0.58rem] tracking-[0.32em] uppercase text-gold-deep">{label}</span>
    </div>
  )
}

function Colon() {
  return (
    <span
      className="mt-[0.12em] select-none font-display text-[clamp(1.6rem,5vw,2.4rem)] font-light leading-none text-gold animate-colon"
      aria-hidden="true"
    >
      :
    </span>
  )
}

export function Countdown() {
  const { time, turning } = useCountdown()

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-cream)_0%,var(--color-ivory)_58%,var(--color-baby-pink)_140%)] px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4.5rem,11vw,8rem)]">
      <div className="relative z-[2] mx-auto max-w-[560px]">
        <div className="reveal reveal-scale rounded-[2px] border border-gold/35 bg-ivory/80 p-1.5 shadow-lift backdrop-blur-sm" data-delay="1">
          <div className="border border-gold/20 px-[clamp(1.4rem,5vw,3rem)] py-[clamp(2.4rem,7vw,3.8rem)] text-center">
            <p className="text-[0.68rem] tracking-[0.42em] uppercase text-gold-deep">Save the date</p>
            <h2 className="mt-3 font-heading text-[clamp(1.7rem,5vw,2.4rem)] font-normal leading-snug text-ink">Until we say I do</h2>
            <Divider className="mb-2" />

            {time ? (
              <div id="countdown" role="timer" aria-live="off">
                <div className="grid justify-items-center">
                  <Digit value={time.d} turning={turning.d} size="xl" />
                  <span className="-mt-1 text-[0.62rem] tracking-[0.4em] uppercase text-gold-deep">Days</span>
                </div>

                <div className="mx-auto my-8 h-px max-w-[180px] bg-[linear-gradient(90deg,transparent,var(--color-gold-soft),transparent)]" aria-hidden="true" />

                <div className="flex items-start justify-center gap-[clamp(0.55rem,2.8vw,1.25rem)]">
                  <Unit value={time.h} label="Hours" turning={turning.h} />
                  <Colon />
                  <Unit value={time.m} label="Minutes" turning={turning.m} />
                  <Colon />
                  <Unit value={time.s} label="Seconds" turning={turning.s} />
                </div>
              </div>
            ) : (
              <p className="font-script text-[clamp(2rem,7vw,3.2rem)] text-dusty-rose">Today, our forever begins</p>
            )}

            <p className="mt-10 font-script text-[1.45rem] text-dusty-rose">{CONFIG.bride} &amp; {CONFIG.groom}</p>
            <p className="mt-2 text-[0.68rem] tracking-[0.28em] uppercase text-ink-faint">{CONFIG.displayDate}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
