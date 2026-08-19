import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../lib/cn.js'
import {
  REVEAL,
  REVEAL_LEFT,
  REVEAL_REDUCED,
  REVEAL_RIGHT,
  REVEAL_SCALE,
  VIEWPORT,
  revealTransition,
} from '../lib/motion.js'

const VARIANTS = {
  default: REVEAL,
  scale: REVEAL_SCALE,
  left: REVEAL_LEFT,
  right: REVEAL_RIGHT,
}

export function Reveal({
  children,
  className,
  variant = 'default',
  index = 0,
  as: Tag = 'div',
  viewport = VIEWPORT,
  ...props
}) {
  const reduced = useReducedMotion()
  const Component = motion[Tag] || motion.div

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reduced ? REVEAL_REDUCED : VARIANTS[variant] || REVEAL}
      transition={revealTransition(index, reduced)}
      {...props}
    >
      {children}
    </Component>
  )
}

export function RevealText({
  lines,
  className,
  lineClassName,
  as: Tag = 'div',
}) {
  const reduced = useReducedMotion()
  const Component = motion[Tag] || motion.div

  return (
    <Component className={className}>
      {lines.map((line, i) => (
        <Component
          key={line.key ?? i}
          className={cn('overflow-hidden', lineClassName, line.className)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={
            reduced
              ? REVEAL_REDUCED
              : {
                  hidden: { opacity: 0, y: '110%' },
                  visible: { opacity: 1, y: 0 },
                }
          }
          transition={revealTransition(i, reduced)}
        >
          {line.content}
        </Component>
      ))}
    </Component>
  )
}
