import { useCallback, useState } from 'react'
import { CONFIG } from '../config.js'
import { readStore, writeStore } from '../lib/storage.js'
import { useMusic } from '../hooks/useMusic.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import { SvgSprites } from './Ornaments.jsx'
import { Envelope } from './Envelope.jsx'
import { MusicControl, PetalsCanvas } from './Experience.jsx'
import { ScrollProgress } from './ScrollProgress.jsx'
import { Hero } from './Hero.jsx'
import { OurStory } from './OurStory.jsx'
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

  const handleOpen = useCallback(() => {
    music.start()
    setOpened(true)
  }, [music])

  return (
    <>
      <SvgSprites />
      <PetalsCanvas active />
      <ScrollProgress active={opened} />
      <MusicControl ready={opened} playing={music.playing} onToggle={music.toggle} />

      {!opened ? <Envelope onOpen={handleOpen} /> : null}

      <Hero opened={opened} />

      <main id="story-flow" hidden={!opened}>
        <OurStory />
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
