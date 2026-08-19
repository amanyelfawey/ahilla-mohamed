import { useState } from 'react'
import { CONFIG } from '../config.js'
import { readStore, writeStore } from '../lib/storage.js'
import { Button, Card, Field, FormError, Section, controlClass } from './ui.jsx'
import { Reveal } from './Motion.jsx'
import { SectionHeading } from './Ornaments.jsx'

function successCopy(data, returning) {
  if (data.attending === 'yes') {
    return {
      title: "We can't wait to celebrate with you 🤍",
      text: returning
        ? `Welcome back, ${data.name}. We have you down for ${data.guests} ${data.guests === '1' ? 'guest' : 'guests'}.`
        : `Thank you, ${data.name}. ${data.guests === '1' ? 'Your seat is' : `All ${data.guests} seats are`} saved.`,
    }
  }
  return {
    title: 'You will be dearly missed 🤍',
    text: `Thank you for letting us know, ${data.name}.`,
  }
}

export function Rsvp({ onWish }) {
  const [done, setDone] = useState(() => Boolean(readStore(CONFIG.storage.rsvp, null)?.name))
  const [copy, setCopy] = useState(() => {
    const saved = readStore(CONFIG.storage.rsvp, null)
    return saved?.name ? successCopy(saved, true) : { title: '', text: '' }
  })
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const name = form.querySelector('#rsvp-name').value.trim()
    const attending = form.querySelector('input[name="attending"]:checked')

    if (name.length < 2) {
      setError('Please enter your name.')
      return
    }
    if (!attending) {
      setError('Please let us know whether you can join us.')
      return
    }

    const data = {
      name,
      guests: form.querySelector('#rsvp-guests').value,
      attending: attending.value,
      message: form.querySelector('#rsvp-message').value.trim(),
      at: new Date().toISOString(),
    }

    writeStore(CONFIG.storage.rsvp, data)
    setCopy(successCopy(data, false))
    setDone(true)
    setError('')
    if (data.message) onWish(data.name, data.message, true)
  }

  return (
    <Section tint="blush" narrow id="rsvp">
      <SectionHeading
        eyebrow="Kindly reply"
        title="Will you join us?"
        note="Please let us know by 1 September 2026 so we can save your seat."
        noteClassName="mb-10"
      />

      <Reveal variant="scale" index={2}>
        <Card className="rounded-[28px]">
        {!done ? (
          <form id="rsvp-form" noValidate onSubmit={submit}>
            <Field label="Your name" htmlFor="rsvp-name">
              <input type="text" id="rsvp-name" placeholder="Full name" maxLength={80} autoComplete="name" required className={controlClass} />
            </Field>

            <Field label="Number of guests" htmlFor="rsvp-guests">
              <select id="rsvp-guests" defaultValue="1" className={controlClass}>
                <option value="1">Just me</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5 guests</option>
              </select>
            </Field>

            <Field label="Will you attend?">
              <div className="grid grid-cols-1 gap-2.5 min-[561px]:grid-cols-2">
                <label className="relative grid min-h-[68px] cursor-pointer place-items-center gap-1 rounded-2xl border border-gold/30 bg-white/70 px-3 py-3.5 text-center text-[0.82rem] transition duration-[400ms] ease-luxe hover:-translate-y-0.5 hover:border-gold has-[:checked]:border-gold has-[:checked]:bg-[linear-gradient(150deg,var(--color-blush),var(--color-peach))] has-[:checked]:shadow-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold">
                  <input type="radio" name="attending" value="yes" required className="pointer-events-none absolute opacity-0" />
                  <em className="font-script text-[1.05rem] not-italic text-dusty-rose">Joyfully</em>
                  <span>I will be there</span>
                </label>
                <label className="relative grid min-h-[68px] cursor-pointer place-items-center gap-1 rounded-2xl border border-gold/30 bg-white/70 px-3 py-3.5 text-center text-[0.82rem] transition duration-[400ms] ease-luxe hover:-translate-y-0.5 hover:border-gold has-[:checked]:border-gold has-[:checked]:bg-[linear-gradient(150deg,var(--color-blush),var(--color-peach))] has-[:checked]:shadow-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold">
                  <input type="radio" name="attending" value="no" className="pointer-events-none absolute opacity-0" />
                  <em className="font-script text-[1.05rem] not-italic text-dusty-rose">Regretfully</em>
                  <span>I cannot come</span>
                </label>
              </div>
            </Field>

            <Field label="A message for us" hint="(optional)" htmlFor="rsvp-message">
              <textarea id="rsvp-message" placeholder="Anything you would like us to know…" maxLength={400} className={`${controlClass} min-h-[110px] resize-y leading-[1.7]`} />
            </Field>

            <FormError>{error}</FormError>

            <Button type="submit" variant="solid" wide className="mt-2">
              Send my reply
            </Button>
          </form>
        ) : (
          <div className="px-2 py-[clamp(1.5rem,5vw,2.5rem)] text-center" role="status">
            <svg className="mx-auto mb-5 size-[92px] animate-bloom" viewBox="0 0 64 64" aria-hidden="true"><use href="#peony" /></svg>
            <h3 className="mb-2.5 font-heading text-[clamp(1.35rem,4.4vw,1.85rem)] font-normal">{copy.title}</h3>
            <p className="text-[0.92rem] text-ink-soft">{copy.text}</p>
            <button
              type="button"
              className="mt-6 border-b border-gold/40 pb-0.5 text-[0.62rem] tracking-[0.2em] uppercase text-ink-faint hover:text-gold-deep"
              onClick={() => {
                setDone(false)
                window.setTimeout(() => document.getElementById('rsvp-name')?.focus(), 0)
              }}
            >
              Change my reply
            </button>
          </div>
        )}
        </Card>
      </Reveal>
    </Section>
  )
}
