import { useRef } from 'react'
import { cn } from '../lib/cn.js'
import { usePetals } from '../hooks/useCanvasEffects.js'

export function MusicControl({ ready, playing, onToggle }) {
  return (
    <button
      className={cn(
        'group music pointer-events-none fixed right-[clamp(0.9rem,3vw,1.75rem)] bottom-[clamp(0.9rem,3vw,1.75rem)] z-[800] inline-flex min-h-[52px] items-center gap-2.5 rounded-full border border-gold/34 bg-ivory/82 px-[1.15rem] py-2 pl-[0.55rem] opacity-0 shadow-soft backdrop-blur-[14px] backdrop-saturate-[1.2] translate-y-3.5 transition duration-[900ms] ease-luxe delay-500 hover:border-gold hover:shadow-lift',
        ready && 'pointer-events-auto translate-y-0 opacity-100',
        'max-[560px]:px-2',
      )}
      id="music"
      aria-pressed={playing}
      aria-label={playing ? 'Pause our wedding song' : 'Play our wedding song'}
      onClick={onToggle}
    >
      <span
        className={cn(
          'relative grid size-[38px] shrink-0 place-items-center rounded-full bg-[conic-gradient(from_0deg,var(--color-blush),var(--color-champagne),var(--color-lavender),var(--color-blush))] shadow-[inset_0_0_0_1px_rgb(201_169_97/0.45)] before:absolute before:inset-[7px] before:rounded-full before:border before:border-dashed before:border-gold/50 after:absolute after:size-2 after:rounded-full after:bg-ivory after:shadow-[0_0_0_1px_rgb(201_169_97/0.5)]',
          playing && 'animate-disc',
        )}
        aria-hidden="true"
      />
      <span className={cn('absolute top-0.5 left-[26px] text-[0.72rem] text-dusty-rose opacity-0', playing && 'animate-note')} aria-hidden="true">♪</span>
      <span className={cn('absolute top-0.5 left-[26px] text-[0.72rem] text-dusty-rose opacity-0', playing && 'animate-note [animation-delay:0.9s]')} aria-hidden="true">♫</span>
      <span className="inline-flex h-3 items-end gap-0.5" aria-hidden="true">
        <i className={cn('w-0.5 rounded-[1px] bg-dusty-rose', playing ? 'h-3 animate-eq' : 'h-0.5')} />
        <i className={cn('w-0.5 rounded-[1px] bg-dusty-rose', playing ? 'h-3 animate-eq [animation-delay:0.16s]' : 'h-0.5')} />
        <i className={cn('w-0.5 rounded-[1px] bg-dusty-rose', playing ? 'h-3 animate-eq [animation-delay:0.32s]' : 'h-0.5')} />
      </span>
      <span className="whitespace-nowrap text-[0.63rem] tracking-[0.2em] uppercase text-ink-soft max-[560px]:hidden" id="music-label">
        {playing ? 'Music On' : 'Music Off'}
      </span>
    </button>
  )
}

export function PetalsCanvas({ active }) {
  const canvasRef = useRef(null)
  usePetals(canvasRef, active)
  return <canvas className="petals pointer-events-none fixed inset-0 z-[6]" id="petals" ref={canvasRef} aria-hidden="true" />
}
