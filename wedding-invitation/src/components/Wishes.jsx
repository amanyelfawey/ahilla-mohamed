import { useState } from 'react'
import { CONFIG } from '../config.js'
import { cn } from '../lib/cn.js'
import { Button, Card, Field, FormError, Section, controlClass } from './ui.jsx'
import { SectionHeading } from './Ornaments.jsx'

export function Wishes({ items, onAdd }) {
  const [error, setError] = useState('')
  const all = [...items, ...CONFIG.seedWishes]

  const submit = (event) => {
    event.preventDefault()
    const name = event.currentTarget.querySelector('#wish-name').value.trim()
    const text = event.currentTarget.querySelector('#wish-text').value.trim()
    if (name.length < 2) {
      setError('Please enter your name.')
      return
    }
    if (text.length < 4) {
      setError('Please write a short wish.')
      return
    }
    onAdd(name, text)
    event.currentTarget.reset()
    setError('')
  }

  return (
    <Section tint="cream">
      <SectionHeading
        eyebrow="With love"
        title="Wedding wishes"
        note="Leave a few words for us to keep forever."
        noteClassName="mb-9"
      />

      <Card className="reveal mx-auto max-w-[560px]" data-delay="2">
        <form id="wish-form" noValidate onSubmit={submit}>
          <Field label="Your name" htmlFor="wish-name">
            <input type="text" id="wish-name" placeholder="Your name" maxLength={60} autoComplete="name" required className={controlClass} />
          </Field>
          <Field label="Your wish" htmlFor="wish-text">
            <textarea id="wish-text" placeholder="Wishing you both…" maxLength={400} required className={`${controlClass} min-h-[110px] resize-y leading-[1.7]`} />
          </Field>
          <FormError>{error}</FormError>
          <Button type="submit" wide>Leave a wish</Button>
        </form>
      </Card>

      <div className="mt-[clamp(2rem,5vw,3rem)] grid grid-cols-[repeat(auto-fill,minmax(258px,1fr))] gap-[clamp(0.85rem,2.5vw,1.35rem)]" id="wishes">
        {all.map((wish, index) => (
          <article
            className={cn(
              'relative rounded-[18px] border border-gold/22 p-6 pt-6 shadow-soft animate-wish',
              index % 3 === 0 && 'bg-[linear-gradient(160deg,rgb(248_226_229/0.6),rgb(255_255_255/0.78))] [animation-delay:-1.6s]',
              index % 3 === 1 && 'bg-[linear-gradient(160deg,rgb(235_229_243/0.6),rgb(255_255_255/0.78))] [animation-delay:-3.4s]',
              index % 3 === 2 && 'bg-[linear-gradient(160deg,rgb(252_230_216/0.6),rgb(255_255_255/0.78))] [animation-delay:-5.2s]',
              wish.fresh && 'animate-preview',
            )}
            key={`${wish.name}-${wish.date}-${index}`}
          >
            <svg className="absolute -top-2.5 right-2.5 size-10 text-sage-deep/60" viewBox="0 0 64 64" aria-hidden="true"><use href="#sprig" /></svg>
            <p className="font-heading text-[1.05rem] text-ink">{wish.name}</p>
            <p className="mt-2 text-[0.9rem] leading-[1.75] text-ink-soft italic">{wish.text}</p>
            <p className="mt-3.5 text-[0.58rem] tracking-[0.2em] uppercase text-ink-faint">{wish.date || ''}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
