import { CONFIG } from '../config.js'

export function Finale() {
  return (
    <section className="relative grid min-h-[92svh] place-items-center bg-[radial-gradient(ellipse_110%_75%_at_50%_100%,var(--color-baby-pink)_0%,transparent_56%),radial-gradient(ellipse_90%_60%_at_12%_8%,var(--color-lavender)_0%,transparent_50%),radial-gradient(ellipse_90%_60%_at_88%_12%,var(--color-peach)_0%,transparent_50%),var(--color-ivory)] px-6 py-[clamp(4rem,10vw,7rem)] text-center">
      <div className="relative z-[3] grid justify-items-center gap-2.5">
        <p className="reveal font-body text-[0.68rem] tracking-[0.42em] uppercase text-gold-deep">And so</p>
        <p className="reveal font-display text-[clamp(2.4rem,11vw,5.4rem)] font-light leading-[1.06] text-ink" data-delay="1">
          {CONFIG.bride} <span className="font-script text-dusty-rose">&amp;</span> {CONFIG.groom}
        </p>
        <p className="reveal mt-3.5 font-script text-[clamp(1.5rem,6vw,2.4rem)] text-dusty-rose" data-delay="2">our forever begins…</p>
        <p className="reveal mt-6 text-[0.66rem] tracking-[0.4em] uppercase text-gold-deep" data-delay="3">{CONFIG.displayDate}</p>
        <p className="reveal mt-10 text-[0.82rem] tracking-[0.1em] text-ink-faint" data-delay="4">Thank you for being part of our story.</p>
      </div>
    </section>
  )
}
