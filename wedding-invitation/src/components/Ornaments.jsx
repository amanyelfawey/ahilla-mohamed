export function SvgSprites() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A88742" />
          <stop offset="45%" stopColor="#E3CFA3" />
          <stop offset="72%" stopColor="#C9A961" />
          <stop offset="100%" stopColor="#A88742" />
        </linearGradient>
        <radialGradient id="gStar" cx="50%" cy="45%" r="62%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="38%" stopColor="#FDEDF1" />
          <stop offset="68%" stopColor="#F8E2E5" />
          <stop offset="100%" stopColor="#EBE5F3" />
        </radialGradient>
        <radialGradient id="gStarCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".95" />
          <stop offset="100%" stopColor="#FCE6D8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gRose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8E2E5" />
          <stop offset="100%" stopColor="#D3A2A6" />
        </linearGradient>
        <linearGradient id="gLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C6D2C1" />
          <stop offset="100%" stopColor="#93A38D" />
        </linearGradient>

        <symbol id="rose" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="19" fill="url(#gRose)" opacity=".55" />
          <path d="M30 12c8 0 14 6 14 13s-6 14-14 14-14-6-14-14 6-13 14-13z" fill="url(#gRose)" opacity=".75" />
          <path d="M30 18c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9z" fill="#FFFDF9" opacity=".55" />
          <path d="M30 23c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5z" fill="url(#gRose)" />
          <path d="M30 28c1.6 0 2.6 1.1 2.6 2.4" stroke="#B9868B" strokeWidth=".9" fill="none" strokeLinecap="round" />
        </symbol>

        <symbol id="peony" viewBox="0 0 64 64">
          <g opacity=".85">
            <ellipse cx="32" cy="20" rx="11" ry="9" fill="#FDEDF1" />
            <ellipse cx="45" cy="30" rx="10" ry="9" fill="#F8E2E5" />
            <ellipse cx="40" cy="44" rx="10" ry="8" fill="#FCE6D8" />
            <ellipse cx="24" cy="44" rx="10" ry="8" fill="#F8E2E5" />
            <ellipse cx="19" cy="30" rx="10" ry="9" fill="#FDEDF1" />
            <circle cx="32" cy="33" r="9" fill="url(#gRose)" opacity=".8" />
            <circle cx="32" cy="33" r="4" fill="#FFFDF9" opacity=".9" />
          </g>
        </symbol>

        <symbol id="babysbreath" viewBox="0 0 64 64">
          <g stroke="url(#gLeaf)" strokeWidth=".9" fill="none" opacity=".8">
            <path d="M32 60V26M32 34l-10-9M32 40l10-8M32 30l-8-11M32 24l9-10" />
          </g>
          <g fill="#FFFDF9" stroke="#E3CFA3" strokeWidth=".5">
            <circle cx="22" cy="25" r="3.2" />
            <circle cx="42" cy="32" r="3" />
            <circle cx="24" cy="19" r="2.6" />
            <circle cx="41" cy="14" r="3.2" />
            <circle cx="32" cy="24" r="3.6" />
            <circle cx="15" cy="31" r="2.4" />
            <circle cx="49" cy="23" r="2.6" />
            <circle cx="33" cy="12" r="2.4" />
          </g>
        </symbol>

        <symbol id="sprig" viewBox="0 0 64 64">
          <path d="M32 62C32 40 30 22 20 6" stroke="url(#gLeaf)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <g fill="url(#gLeaf)" opacity=".8">
            <ellipse cx="24" cy="44" rx="8" ry="3.4" transform="rotate(-24 24 44)" />
            <ellipse cx="38" cy="38" rx="8" ry="3.4" transform="rotate(22 38 38)" />
            <ellipse cx="24" cy="30" rx="7" ry="3" transform="rotate(-28 24 30)" />
            <ellipse cx="35" cy="24" rx="7" ry="3" transform="rotate(26 35 24)" />
            <ellipse cx="24" cy="17" rx="6" ry="2.6" transform="rotate(-32 24 17)" />
          </g>
        </symbol>

        <symbol id="corner-bouquet" viewBox="0 0 240 240">
          <g fill="none" stroke="url(#gLeaf)" strokeWidth="1.2" strokeLinecap="round" opacity=".9">
            <path d="M4 4c34 10 62 30 84 58 16 20 26 44 30 70" />
            <path d="M4 30c30 14 54 34 70 60" />
            <path d="M30 4c22 16 40 38 52 64" />
          </g>
          <g opacity=".9">
            <ellipse cx="44" cy="36" rx="13" ry="5.5" transform="rotate(38 44 36)" fill="url(#gLeaf)" />
            <ellipse cx="74" cy="66" rx="14" ry="6" transform="rotate(40 74 66)" fill="url(#gLeaf)" />
            <ellipse cx="104" cy="102" rx="12" ry="5" transform="rotate(44 104 102)" fill="url(#gLeaf)" />
            <ellipse cx="26" cy="70" rx="11" ry="4.6" transform="rotate(-14 26 70)" fill="url(#gLeaf)" opacity=".75" />
            <ellipse cx="70" cy="24" rx="11" ry="4.6" transform="rotate(70 70 24)" fill="url(#gLeaf)" opacity=".75" />
          </g>
          <use href="#peony" x="6" y="8" width="70" height="70" />
          <use href="#rose" x="62" y="46" width="52" height="52" />
          <use href="#rose" x="20" y="76" width="40" height="40" />
          <use href="#babysbreath" x="92" y="86" width="46" height="46" />
          <use href="#babysbreath" x="52" y="4" width="38" height="38" />
        </symbol>

        <symbol id="orn-leaf" viewBox="0 0 24 24">
          <path d="M12 2c4 5 6 9 6 12a6 6 0 0 1-12 0c0-3 2-7 6-12z" fill="currentColor" opacity=".55" />
          <path d="M12 6v14" stroke="currentColor" strokeWidth=".8" opacity=".7" />
        </symbol>

        <symbol id="i-rings" viewBox="0 0 48 48">
          <circle cx="19" cy="29" r="11" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="30" cy="29" r="11" fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".65" />
          <path d="M24 6l3.2 6.4L34 13l-5 4.6 1.4 6.8L24 21l-6.4 3.4L19 17.6 14 13l6.8-.6z" fill="currentColor" opacity=".5" />
        </symbol>
        <symbol id="i-glasses" viewBox="0 0 48 48">
          <path d="M12 8h10l-3 13a4 4 0 0 1-8 0z" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M26 8h10l-3 13a4 4 0 0 1-8 0z" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M16 26v12M31 26v12M11 40h10M26 40h10" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <circle cx="24" cy="14" r="2" fill="currentColor" opacity=".6" />
        </symbol>
        <symbol id="i-camera" viewBox="0 0 48 48">
          <rect x="5" y="14" width="38" height="26" rx="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M17 14l3-5h8l3 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="24" cy="27" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="24" cy="27" r="3.4" fill="currentColor" opacity=".45" />
          <circle cx="37" cy="20" r="1.6" fill="currentColor" />
        </symbol>
        <symbol id="i-close" viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
          <path d="M14 25l7 7 14-16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-pin" viewBox="0 0 48 48">
          <path d="M24 43s13-14 13-23A13 13 0 0 0 11 20c0 9 13 23 13 23z" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <use href="#rose" x="14" y="10" width="20" height="20" />
        </symbol>
      </defs>
    </svg>
  )
}

export function Divider({ className = 'reveal', delay = '1' }) {
  return (
    <div
      className={`mx-auto my-5 mb-9 flex max-w-[260px] items-center justify-center gap-3.5 ${className}`.trim()}
      data-delay={delay}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--color-gold-soft),transparent)]" />
      <svg className="size-[26px] shrink-0 text-dusty-rose">
        <use href="#orn-leaf" />
      </svg>
      <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--color-gold-soft),transparent)]" />
    </div>
  )
}

export function FloralFrame({ position, parallax, sway = '', style, className = '', delay }) {
  return (
    <div
      className={`floral-frame floral-frame--${position} ${className}`.trim()}
      data-parallax={parallax}
      data-delay={delay}
      style={style}
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 240" className={`sway ${sway}`.trim()}>
        <use href="#corner-bouquet" />
      </svg>
    </div>
  )
}

export function SectionHeading({ eyebrow, title, note, noteClassName }) {
  return (
    <div className="text-center">
      <p className="reveal font-body text-[0.68rem] font-normal tracking-[0.42em] uppercase text-gold-deep">{eyebrow}</p>
      <h2 className="reveal font-heading text-[clamp(2rem,5.4vw,3.15rem)] font-normal leading-[1.18] tracking-[-0.005em] text-ink" data-delay="1">{title}</h2>
      <Divider />
      {note ? (
        <p className={`reveal mx-auto max-w-[46ch] text-[0.94rem] text-ink-soft ${noteClassName || ''}`.trim()} data-delay="2">
          {note}
        </p>
      ) : null}
    </div>
  )
}
