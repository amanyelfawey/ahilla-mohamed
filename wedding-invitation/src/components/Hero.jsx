import { useCallback, useRef } from 'react'
import { CONFIG } from '../config.js'
import { cn } from '../lib/cn.js'
import { Button } from './ui.jsx'

export function Hero({ opened, onOpen }) {
  const openedRef = useRef(false)

  const open = useCallback(() => {
    if (openedRef.current) return
    openedRef.current = true
    onOpen()
    document.body.classList.remove('is-locked')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [onOpen])

  return (
    <section
      className={cn('cover relative grid min-h-svh items-end overflow-hidden bg-[#1c1416] text-cover', opened ? 'cursor-default' : 'cursor-pointer')}
      id="top"
      role={opened ? undefined : 'dialog'}
      tabIndex={opened ? undefined : 0}
      aria-label={opened ? undefined : `Wedding invitation of ${CONFIG.bride} and ${CONFIG.groom}. Tap to open.`}
      onClick={opened ? undefined : open}
      onKeyDown={opened ? undefined : (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          open()
        }
      }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={CONFIG.photos.cover}
          alt={`${CONFIG.bride} and ${CONFIG.groom}`}
          width={1600}
          height={2200}
          fetchPriority="high"
          className="h-full w-full origin-center scale-[1.06] object-cover object-[center_22%] saturate-[0.88] contrast-[1.08] brightness-[0.78] animate-cover-drift"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(22_14_16/0.38)_0%,rgb(22_14_16/0.08)_28%,rgb(22_14_16/0.22)_55%,rgb(18_10_12/0.88)_100%),radial-gradient(ellipse_90%_55%_at_50%_100%,rgb(154_90_98/0.28),transparent_62%)]"
        aria-hidden="true"
      />

      <div className="relative z-[7] mx-auto grid w-full max-w-[720px] justify-items-center px-[clamp(1.4rem,5vw,2.5rem)] pt-[clamp(2.5rem,8vh,4.5rem)] pb-[clamp(2.2rem,6vh,3.4rem)] text-center">
        <p className="text-[0.68rem] tracking-[0.46em] uppercase text-gold-soft [text-shadow:0_8px_24px_rgb(0_0_0/0.35)]">The wedding of</p>
        <h1 className="mt-3.5 grid gap-[0.05em] font-display text-[clamp(3.4rem,14vw,6.8rem)] font-light leading-[0.92] tracking-[0.01em] text-cover [text-shadow:0_12px_40px_rgb(0_0_0/0.45)]">
          <span>{CONFIG.bride}</span>
          <em className="block font-script text-[0.42em] not-italic leading-[1.15] text-gold-soft">&amp;</em>
          <span>{CONFIG.groom}</span>
        </h1>
        <p className="mt-[1.15rem] text-[0.72rem] tracking-[0.38em] uppercase text-gold-soft">{CONFIG.displayDate}</p>

        <div className={cn(
          'relative z-[8] mt-[1.7rem] grid justify-items-center gap-2.5 transition duration-700 ease-luxe',
          opened && 'pointer-events-none m-0 h-0 overflow-hidden opacity-0 translate-y-2.5',
        )}>
          <Button
            variant="cover"
            onClick={(e) => {
              e.stopPropagation()
              open()
            }}
          >
            Open the invitation
          </Button>
          <p className="text-[0.62rem] tracking-[0.22em] uppercase text-cover/60">Tap to enter · music will play</p>
        </div>

        <div
          className={cn('pointer-events-none mt-6 grid justify-items-center gap-2 text-[0.58rem] tracking-[0.32em] uppercase text-cover/45', opened ? 'opacity-100' : 'opacity-0')}
          aria-hidden="true"
        >
          <span>Scroll</span>
          <i className="block h-[46px] w-px origin-top bg-[linear-gradient(180deg,var(--color-gold-soft),transparent)] animate-cue" />
        </div>
      </div>
    </section>
  )
}
