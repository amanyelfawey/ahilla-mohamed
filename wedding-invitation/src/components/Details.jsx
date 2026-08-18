import { CONFIG, mapsUrl } from '../config.js'
import { Button, Section } from './ui.jsx'
import { Divider } from './Ornaments.jsx'

function mapEmbedUrl(query) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`
}

export function Details() {
  const { venue } = CONFIG

  return (
    <Section tint="sky">
      <div className="reveal mx-auto max-w-[720px] text-center" data-delay="1">
        <p className="text-[0.68rem] tracking-[0.42em] uppercase text-gold-deep">When &amp; where</p>
        <h2 className="mt-3 font-heading text-[clamp(1.8rem,5vw,2.7rem)] font-normal text-ink">One celebration</h2>
        <Divider className="mb-2" />
        <p className="mx-auto mb-10 max-w-[38ch] text-[0.94rem] text-ink-soft">
          Ceremony and reception, together, in a hall in Maadi.
        </p>
      </div>

      <article className="reveal reveal-scale mx-auto max-w-[720px] overflow-hidden rounded-[2px] border border-gold/35 bg-ivory/80 p-1.5 shadow-lift" data-delay="2">
        <div className="overflow-hidden border border-gold/20">
          <div className="relative h-[240px] min-[700px]:h-[300px]">
            <iframe
              title={`${venue.area}, ${venue.city}`}
              src={mapEmbedUrl(venue.mapQuery)}
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.25] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(243_235_227/0.92))]" />
          </div>

          <div className="relative -mt-16 px-[clamp(1.4rem,5vw,3rem)] pb-[clamp(2rem,6vw,3.2rem)] pt-2 text-center">
            <svg className="mx-auto mb-3 size-12 text-dusty-rose" viewBox="0 0 48 48" aria-hidden="true">
              <use href="#i-pin" />
            </svg>
            <p className="font-script text-[1.45rem] text-dusty-rose">{venue.name}</p>
            <h3 className="mt-1 font-display text-[clamp(2.6rem,10vw,4.4rem)] font-light leading-none text-ink">
              {venue.area}
            </h3>
            <p className="mt-2 text-[0.72rem] tracking-[0.38em] uppercase text-gold-deep">{venue.city}</p>

            <div className="mx-auto my-8 grid max-w-[420px] grid-cols-2 gap-px bg-gold/25">
              <div className="bg-ivory/90 px-4 py-5">
                <p className="text-[0.55rem] tracking-[0.28em] uppercase text-gold-deep">Date</p>
                <p className="mt-2 font-heading text-[1.02rem] text-ink">{venue.date}</p>
              </div>
              <div className="bg-ivory/90 px-4 py-5">
                <p className="text-[0.55rem] tracking-[0.28em] uppercase text-gold-deep">Time</p>
                <p className="mt-2 font-heading text-[1.02rem] text-ink">{venue.time}</p>
              </div>
            </div>

            <p className="mb-7 text-[0.92rem] text-ink-soft">{venue.address}</p>

            <Button href={mapsUrl(venue.mapQuery)} target="_blank" rel="noopener">
              <svg width="15" height="15" viewBox="0 0 48 48" aria-hidden="true"><use href="#i-pin" /></svg>
              View on Maps
            </Button>
          </div>
        </div>
      </article>
    </Section>
  )
}
