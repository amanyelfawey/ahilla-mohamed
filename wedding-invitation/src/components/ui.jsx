import { cn } from '../lib/cn.js'

export function Button({ variant = 'outline', wide, className, href, ...props }) {
  const classes = cn(
    'relative isolate inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full border px-[2.1rem] py-[0.95rem] font-body text-[0.72rem] font-normal tracking-[0.24em] uppercase no-underline transition duration-[450ms] ease-luxe hover:-translate-y-0.5 hover:shadow-soft active:translate-y-0 active:scale-[0.985] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:transform-none',
    variant === 'outline' && 'border-gold-soft bg-white/60 text-ink hover:border-gold',
    variant === 'solid' && 'border-transparent bg-[linear-gradient(120deg,var(--color-blush),var(--color-peach)_60%,var(--color-champagne))] text-ink shadow-soft',
    variant === 'cover' && 'min-w-[230px] border-transparent bg-[linear-gradient(120deg,rgb(154_90_98/0.92),rgb(184_148_74/0.88))] text-cover shadow-[0_18px_40px_-18px_rgb(0_0_0/0.55)] hover:text-white',
    variant === 'ghost' && 'border-gold-soft bg-transparent text-ink',
    wide && 'w-full',
    className,
  )

  if (href) {
    return <a href={href} className={classes} {...props} />
  }

  return <button className={classes} {...props} />
}

export function Field({ label, hint, htmlFor, children }) {
  return (
    <div className="mb-5 grid gap-2 text-left">
      <label htmlFor={htmlFor} className="text-[0.58rem] tracking-[0.26em] uppercase text-gold-deep">
        {label}
        {hint ? <span className="ml-1 text-[0.72rem] font-normal normal-case tracking-normal text-ink-faint">{hint}</span> : null}
      </label>
      {children}
    </div>
  )
}

export const controlClass =
  'w-full min-h-12 rounded-[14px] border border-gold/30 bg-white/80 px-[1.1rem] py-[0.85rem] font-body text-[0.95rem] font-light text-ink transition duration-300 ease-luxe placeholder:text-ink-faint focus:border-gold focus:bg-white focus:shadow-[0_0_0_4px_rgb(201_169_97/0.12)] focus:outline-none'

export function Section({ tint = 'ivory', narrow, className, innerClassName, children, ...props }) {
  const tints = {
    cream: 'bg-cream',
    blush: 'bg-[linear-gradient(170deg,var(--color-baby-pink),var(--color-ivory)_62%)]',
    peach: 'bg-[linear-gradient(190deg,var(--color-peach),var(--color-cream)_58%)]',
    sky: 'bg-[linear-gradient(180deg,var(--color-powder-blue),var(--color-ivory)_55%)]',
    ivory: 'bg-ivory',
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4.5rem,11vw,8.5rem)] before:pointer-events-none before:absolute before:inset-0 before:opacity-35 before:content-[\'\'] before:bg-[radial-gradient(circle_at_18%_12%,rgb(255_255_255/0.9),transparent_42%),radial-gradient(circle_at_82%_84%,rgb(255_255_255/0.75),transparent_46%)]',
        tints[tint],
        className,
      )}
      {...props}
    >
      <div className={cn('relative z-[2] mx-auto max-w-[1120px]', narrow && 'max-w-[720px]', innerClassName)}>
        {children}
      </div>
    </section>
  )
}

export function Card({ className, children, ...props }) {
  return (
    <div className={cn('relative rounded-[26px] border border-gold/30 bg-white/74 p-[clamp(1.5rem,4.5vw,2.75rem)] shadow-soft backdrop-blur-md', className)} {...props}>
      {children}
    </div>
  )
}

export function FormError({ children }) {
  if (!children) return <p className="hidden" role="alert" />
  return (
    <p className="mt-3.5 rounded-xl border border-rose-deep/35 bg-blush/75 px-4 py-3 text-center text-[0.82rem] text-rose-deep" role="alert">
      {children}
    </p>
  )
}

export function Eyebrow({ className, children }) {
  return (
    <p className={cn('font-body text-[0.68rem] font-normal tracking-[0.42em] uppercase text-gold-deep', className)}>
      {children}
    </p>
  )
}
