import { useEffect, useState } from 'react'
import { CONFIG } from '../config.js'
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js'

function pad(n) {
  return String(n).padStart(2, '0')
}

function remaining(target) {
  const diff = target - Date.now()
  if (diff <= 0) return null
  return {
    d: pad(Math.floor(diff / 86400000)),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
  }
}

export function useCountdown() {
  const prefersReduced = usePrefersReducedMotion()
  const target = new Date(CONFIG.weddingDateISO).getTime()
  const [time, setTime] = useState(() => remaining(target))
  const [turning, setTurning] = useState({})

  useEffect(() => {
    let last = remaining(target)

    const tick = () => {
      const next = remaining(target)
      if (!next) {
        setTime(null)
        return
      }

      const changed = {}
      for (const key of ['d', 'h', 'm', 's']) {
        if (last?.[key] !== next[key]) changed[key] = true
      }

      if (Object.keys(changed).length) {
        setTurning(changed)
        window.setTimeout(() => {
          setTime(next)
          setTurning({})
        }, prefersReduced ? 0 : 170)
      }

      last = next
    }

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [prefersReduced, target])

  return { time, turning }
}
