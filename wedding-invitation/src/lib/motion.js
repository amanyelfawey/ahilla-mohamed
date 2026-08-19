/** Shared motion vocabulary — mirrors --ease-luxe and theme tokens */

export const EASE_LUXE = [0.22, 1, 0.36, 1]

export const DURATION = {
  fast: 0.35,
  base: 0.65,
  slow: 1.15,
}

export const SPRING_SOFT = {
  type: 'spring',
  stiffness: 120,
  damping: 22,
  mass: 0.9,
}

export const SPRING_TIGHT = {
  type: 'spring',
  stiffness: 280,
  damping: 28,
  mass: 0.55,
}

export const REVEAL = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export const REVEAL_SCALE = {
  hidden: { opacity: 0, y: 26, scale: 0.965, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
}

export const REVEAL_LEFT = {
  hidden: { opacity: 0, x: -34, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
}

export const REVEAL_RIGHT = {
  hidden: { opacity: 0, x: 34, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
}

export const REVEAL_REDUCED = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const STAGGER = 0.14

export function staggerDelay(index = 0) {
  return index * STAGGER
}

export function revealTransition(index = 0, reduced = false) {
  if (reduced) {
    return { duration: DURATION.fast, ease: EASE_LUXE }
  }
  return {
    duration: DURATION.slow,
    ease: EASE_LUXE,
    delay: staggerDelay(index),
  }
}

export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' }
