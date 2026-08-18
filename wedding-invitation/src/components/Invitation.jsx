import { useCallback, useState } from 'react'
import { CONFIG } from '../config.js'
import { readStore, writeStore } from '../lib/storage.js'
import { cn } from '../lib/cn.js'
import { useMusic } from '../hooks/useMusic.js'
import { useReveal } from '../hooks/useReveal.js'
import { useScrollEffects } from '../hooks/useScrollEffects.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import { SvgSprites } from './Ornaments.jsx'
import { MusicControl, PetalsCanvas } from './Experience.jsx'
import { Hero } from './Hero.jsx'
import { CouplePhotos } from './CouplePhotos.jsx'
import { Countdown } from './Countdown.jsx'
import { Details } from './Details.jsx'
import { PhotoUpload } from './PhotoUpload.jsx'
import { Rsvp } from './Rsvp.jsx'
import { Wishes } from './Wishes.jsx'
import { Finale } from './Finale.jsx'

export default function Invitation() {
  const [opened, setOpened] = useState(false)
  const [wishes, setWishes] = useState(() => readStore(CONFIG.storage.wishes, []))
  const music = useMusic()
  const prefersReduced = usePrefersReducedMotion()

  useReveal(opened)
  useScrollEffects(opened)

  const addWish = useCallback((name, text, silent = false) => {
    setWishes((current) => {
      const next = [
        { name, text, date: new Date().toISOString().slice(0, 10), fresh: true },
        ...current,
      ].slice(0, 60)
      writeStore(CONFIG.storage.wishes, next)
      return next
    })

    if (!silent) {
      window.setTimeout(() => {
        document.querySelector('#wishes article')?.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'center',
        })
      }, 0)
    }
  }, [prefersReduced])

  return (
    <>
      <SvgSprites />
      <PetalsCanvas active />
      <div
        className={cn(
          'progress pointer-events-none fixed top-0 left-0 z-[700] h-0.5 bg-[linear-gradient(120deg,var(--color-gold-deep),var(--color-gold-soft)_45%,var(--color-gold)_72%,var(--color-gold-deep))] transition-opacity duration-[600ms] ease-luxe',
          opened ? 'opacity-[0.85]' : 'opacity-0',
        )}
        id="progress"
        aria-hidden="true"
      />
      <MusicControl ready={opened} playing={music.playing} onToggle={music.toggle} />

      <Hero
        opened={opened}
        onOpen={() => {
          music.start()
          setOpened(true)
        }}
      />

      <main id="story-flow" hidden={!opened}>
        {CONFIG.sections.couplePhotos ? <CouplePhotos /> : null}
        <Countdown />
        <Details />
        <PhotoUpload />
        {CONFIG.sections.rsvp ? <Rsvp onWish={addWish} /> : null}
        {CONFIG.sections.wishes ? <Wishes items={wishes} onAdd={addWish} /> : null}
        <Finale />
      </main>
    </>
  )
}
