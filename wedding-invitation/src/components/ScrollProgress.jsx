import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { cn } from '../lib/cn.js'

export function ScrollProgress({ active }) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const progress = reduced ? scrollYProgress : smooth
  const scaleX = useTransform(progress, [0, 1], [0, 1])

  return (
    <motion.div
      className={cn(
        'progress pointer-events-none fixed top-0 left-0 z-[700] h-0.5 w-full origin-left bg-[linear-gradient(120deg,var(--color-gold-deep),var(--color-gold-soft)_45%,var(--color-gold)_72%,var(--color-gold-deep))] transition-opacity duration-[600ms] ease-luxe',
        active ? 'opacity-[0.85]' : 'opacity-0',
      )}
      id="progress"
      aria-hidden="true"
      style={{ scaleX }}
    />
  )
}
