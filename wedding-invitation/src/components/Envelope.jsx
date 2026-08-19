import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CONFIG } from '../config.js'
import { cn } from '../lib/cn.js'
import { EASE_LUXE } from '../lib/motion.js'

function Seal({ initials, opening }) {
  return (
    <motion.div
      className="absolute left-1/2 top-[52%] z-[5] -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 1, rotate: 0, opacity: 1 }}
      animate={
        opening === 'idle'
          ? { y: [0, -2, 0], scale: 1 }
          : opening === 'press'
            ? { scale: 0.94, y: 0 }
            : { scale: 0.3, rotate: 24, y: -80, opacity: 0 }
      }
      transition={
        opening === 'idle'
          ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          : opening === 'press'
            ? { duration: 0.25, ease: EASE_LUXE }
            : { duration: 0.55, ease: EASE_LUXE }
      }
    >
      <div className="relative">
        <svg className="size-[72px] drop-shadow-[0_8px_20px_rgb(0_0_0/0.35)]" viewBox="0 0 80 80" aria-hidden="true">
          <use href="#seal" />
        </svg>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-heading text-[0.72rem] font-normal tracking-[0.12em] text-gold-deep">
          {initials}
        </span>
        {opening === 'idle' ? (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(120deg,transparent_35%,rgb(255_255_255/0.55)_50%,transparent_65%)]"
            animate={{ x: ['-120%', '120%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
            aria-hidden="true"
          />
        ) : null}
      </div>
    </motion.div>
  )
}

function EnvelopePuff({ show }) {
  if (!show) return null
  const petals = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i / 8) * Math.PI * 2,
    dist: 28 + (i % 3) * 12,
    size: 4 + (i % 2) * 3,
    color: ['#C17B82', '#D4BC86', '#E0B8BD', '#B8944A'][i % 4],
  }))

  return (
    <div className="pointer-events-none absolute left-1/2 top-[52%] z-[6] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: 0,
            top: 0,
          }}
          initial={{ opacity: 0.9, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist - 16,
            scale: 0.2,
          }}
          transition={{ duration: 0.7, ease: EASE_LUXE }}
        />
      ))}
    </div>
  )
}

export function Envelope({ onOpen }) {
  const reduced = useReducedMotion()
  const openedRef = useRef(false)
  const [phase, setPhase] = useState('idle')
  const [sealPhase, setSealPhase] = useState('idle')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.classList.add('is-locked')
    return () => document.body.classList.remove('is-locked')
  }, [])

  const finish = useCallback(() => {
    setVisible(false)
    document.body.classList.remove('is-locked')
    onOpen()
  }, [onOpen])

  const open = useCallback(() => {
    if (openedRef.current) return
    openedRef.current = true

    if (reduced) {
      setPhase('exit')
      window.setTimeout(finish, 400)
      return
    }

    setSealPhase('press')
    window.setTimeout(() => setSealPhase('break'), 280)
    window.setTimeout(() => setPhase('flap'), 420)
    window.setTimeout(() => setPhase('card'), 900)
    window.setTimeout(() => setPhase('exit'), 1550)
    window.setTimeout(finish, 2100)
  }, [finish, reduced])

  const initials = `${CONFIG.bride[0]}${CONFIG.groom[0]}`.toUpperCase()

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="envelope fixed inset-0 z-[900] grid place-items-center bg-[#1c1416]"
          role="dialog"
          tabIndex={0}
          aria-label={`Wedding invitation of ${CONFIG.bride} and ${CONFIG.groom}. Tap to open.`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.4 : 0.55, ease: EASE_LUXE }}
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              open()
            }
          }}
        >
          <motion.div
            className="relative w-[min(88vw,380px)] cursor-pointer"
            animate={phase === 'idle' ? { y: [0, -6, 0] } : { y: 0 }}
            transition={phase === 'idle' ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
          >
            <p className="mb-5 text-center font-script text-[1.35rem] text-gold-soft">To our dear guest</p>

            <div
              className="relative mx-auto aspect-[1.45/1] [perspective:1400px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 rounded-sm border border-gold/25 bg-[linear-gradient(165deg,#F7F1E8,#E8DCCE)] shadow-lift" />

              <motion.div
                className="absolute inset-x-[8%] bottom-[18%] top-[22%] overflow-hidden rounded-[2px] border border-gold/30 bg-ivory shadow-[0_16px_40px_-12px_rgb(0_0_0/0.4)]"
                initial={{ y: '40%' }}
                animate={
                  phase === 'card' || phase === 'exit'
                    ? { y: '-8%', boxShadow: '0 28px 60px -16px rgb(0 0 0 / 0.35)' }
                    : phase === 'flap'
                      ? { y: '10%' }
                      : { y: '40%' }
                }
                transition={{ duration: 0.65, ease: EASE_LUXE }}
              >
                <img
                  src={CONFIG.photos.cover}
                  alt=""
                  className="h-full w-full object-cover object-[center_40%] saturate-[0.88] brightness-[0.82]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgb(18_10_12/0.75))]" />
                <div className="absolute inset-x-0 bottom-0 px-4 pb-4 text-center">
                  <p className="font-display text-[1.6rem] font-light leading-none text-cover">{CONFIG.bride}</p>
                  <p className="my-0.5 font-script text-gold-soft">&amp;</p>
                  <p className="font-display text-[1.6rem] font-light leading-none text-cover">{CONFIG.groom}</p>
                </div>
              </motion.div>

              <div
                className="absolute inset-y-0 left-0 w-[14%] bg-[linear-gradient(90deg,#DCC7A8,#E8DCCE)] opacity-60"
                style={{ clipPath: 'polygon(0 0, 100% 18%, 100% 82%, 0 100%)' }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-y-0 right-0 w-[14%] bg-[linear-gradient(270deg,#DCC7A8,#E8DCCE)] opacity-60"
                style={{ clipPath: 'polygon(0 18%, 100% 0, 100% 100%, 0 82%)' }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(0deg,#DCC7A8,#E8DCCE)] opacity-70"
                style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
                aria-hidden="true"
              />

              <motion.div
                className="absolute inset-x-0 top-0 z-[4] h-[52%] origin-top bg-[linear-gradient(180deg,#F3EBE3,#E8DCCE)]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                initial={{ rotateX: 0 }}
                animate={
                  phase === 'flap' || phase === 'card' || phase === 'exit'
                    ? { rotateX: -180, zIndex: 1 }
                    : { rotateX: 0, zIndex: 4 }
                }
                transition={{ duration: 0.7, ease: EASE_LUXE }}
              />

              <Seal initials={initials} opening={sealPhase} />
              <EnvelopePuff show={sealPhase === 'break'} />
            </div>

            <motion.div
              className={cn(
                'mt-8 grid justify-items-center gap-2 text-center',
                phase !== 'idle' && 'pointer-events-none opacity-0',
              )}
              animate={phase === 'idle' ? { opacity: 1 } : { opacity: 0 }}
            >
              <span className="text-[0.62rem] tracking-[0.28em] uppercase text-gold-soft/70">Tap to open</span>
              <motion.span
                className="block h-[38px] w-px origin-top bg-[linear-gradient(180deg,var(--color-gold-soft),transparent)]"
                animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>

          {phase === 'exit' && !reduced ? (
            <motion.div
              className="pointer-events-none fixed inset-0 z-[910] bg-[#1c1416]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE_LUXE }}
              aria-hidden="true"
            />
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
