import { useEffect } from 'react'

export function useReveal(active) {
  useEffect(() => {
    if (!active) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    const observe = () => {
      document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => io.observe(el))
    }

    observe()
    const frame = requestAnimationFrame(observe)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
    }
  }, [active])
}
