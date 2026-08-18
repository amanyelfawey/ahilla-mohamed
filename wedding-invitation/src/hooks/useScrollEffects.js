import { useEffect } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js'

export function useScrollEffects(active) {
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!active) return

    const progress = document.getElementById('progress')
    const parallaxNodes = prefersReduced
      ? []
      : Array.from(document.querySelectorAll('[data-parallax]'))
    let queued = false

    const update = () => {
      const scrolled = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progress) {
        progress.style.width = `${max > 0 ? (scrolled / max) * 100 : 0}%`
      }

      parallaxNodes.forEach((node) => {
        const rate = parseFloat(node.dataset.parallax) || 0.05
        node.style.transform = `translate3d(0, ${(scrolled * rate).toFixed(2)}px, 0)`
      })

      queued = false
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => window.removeEventListener('scroll', onScroll)
  }, [active, prefersReduced])
}
