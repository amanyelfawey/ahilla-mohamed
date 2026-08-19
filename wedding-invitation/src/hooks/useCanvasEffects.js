import { useEffect } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js'

const ROSE_COLORS = ['#C17B82', '#D4A0A5', '#B86B74', '#E4C4C8', '#9A5A62']
const PETAL_COLORS = ['#C17B82', '#D8A8AD', '#B05C66', '#E8C9CE', '#A66A72']

/** Module-level registry for one-shot petal bursts from Finale */
let burstHandler = null

export function registerPetalBurst(handler) {
  burstHandler = handler
}

export function burstPetals(options = {}) {
  burstHandler?.(options)
}

function drawBloom(ctx, flower) {
  ctx.save()
  ctx.translate(flower.x, flower.y)
  ctx.rotate(flower.rot)
  ctx.globalAlpha = flower.a

  const petals = flower.petals
  for (let i = 0; i < petals; i += 1) {
    ctx.save()
    ctx.rotate((Math.PI * 2 * i) / petals)
    ctx.beginPath()
    ctx.ellipse(0, -flower.r * 0.42, flower.r * 0.32, flower.r * 0.58, 0, 0, Math.PI * 2)
    ctx.fillStyle = flower.c
    ctx.fill()
    ctx.restore()
  }

  ctx.beginPath()
  ctx.arc(0, 0, flower.r * 0.18, 0, Math.PI * 2)
  ctx.fillStyle = flower.center
  ctx.fill()
  ctx.restore()
}

function drawPetal(ctx, petal) {
  ctx.save()
  ctx.translate(petal.x, petal.y)
  ctx.rotate(petal.rot)
  ctx.globalAlpha = petal.a
  ctx.fillStyle = petal.c
  ctx.beginPath()
  ctx.moveTo(0, -petal.r)
  ctx.bezierCurveTo(petal.r * 0.9, -petal.r * 0.35, petal.r * 0.55, petal.r * 0.45, 0, petal.r)
  ctx.bezierCurveTo(-petal.r * 0.55, petal.r * 0.45, -petal.r * 0.9, -petal.r * 0.35, 0, -petal.r)
  ctx.fill()
  ctx.restore()
}

function spawnBloom(w, h) {
  const r = 7 + Math.random() * 11
  return {
    kind: 'bloom',
    x: Math.random() * w,
    y: Math.random() * h,
    r,
    vy: 0.35 + Math.random() * 0.7,
    vx: (Math.random() - 0.5) * 0.45,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.012,
    a: 0.45 + Math.random() * 0.4,
    c: ROSE_COLORS[(Math.random() * ROSE_COLORS.length) | 0],
    center: '#F3E0D4',
    petals: 5 + ((Math.random() * 2) | 0),
    burst: false,
    life: 0,
  }
}

function spawnPetal(w, h) {
  return {
    kind: 'petal',
    x: Math.random() * w,
    y: Math.random() * h,
    r: 6 + Math.random() * 10,
    vy: 0.45 + Math.random() * 0.85,
    vx: (Math.random() - 0.5) * 0.55,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.03,
    a: 0.4 + Math.random() * 0.45,
    c: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
    burst: false,
    life: 0,
  }
}

function spawnBurstParticle(origin, w, h) {
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4
  const speed = 3 + Math.random() * 6
  const isBloom = Math.random() < 0.35
  const base = isBloom
    ? spawnBloom(w, h)
    : spawnPetal(w, h)

  return {
    ...base,
    x: origin?.x ?? w * 0.5,
    y: origin?.y ?? h * 0.85,
    vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
    vy: Math.sin(angle) * speed - 2,
    burst: true,
    life: 1,
    decay: 0.008 + Math.random() * 0.012,
    gravity: 0.12 + Math.random() * 0.08,
    drag: 0.985,
  }
}

export function usePetals(canvasRef, active) {
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !active || prefersReduced) return

    const ctx = canvas.getContext('2d')
    let w
    let h
    let flowers
    let raf
    let running = true

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = w < 640 ? 22 : 36
      flowers = Array.from({ length: count }, (_, i) => (
        i % 3 === 0 ? spawnBloom(w, h) : spawnPetal(w, h)
      ))
    }

    const addBurst = ({ count = 40, origin } = {}) => {
      const ox = origin?.x != null ? origin.x * w : w * 0.5
      const oy = origin?.y != null ? origin.y * h : h * 0.85
      for (let i = 0; i < count; i += 1) {
        flowers.push(spawnBurstParticle({ x: ox, y: oy }, w, h))
      }
    }

    registerPetalBurst(addBurst)

    const wrap = (item) => {
      if (item.burst) {
        item.vy += item.gravity
        item.vx *= item.drag
        item.vy *= item.drag
        item.x += item.vx
        item.y += item.vy
        item.rot += item.vr
        item.life -= item.decay
        item.a = Math.max(0, item.life * 0.85)
        return item.life > 0
      }

      item.y += item.vy
      item.x += item.vx + Math.sin(item.y / 70) * 0.45
      item.rot += item.vr
      if (item.y - item.r > h) {
        item.y = -18
        item.x = Math.random() * w
      }
      if (item.x < -28) item.x = w + 28
      if (item.x > w + 28) item.x = -28
      return true
    }

    const frame = () => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      flowers = flowers.filter((item) => {
        const alive = wrap(item)
        if (!alive) return false
        if (item.kind === 'bloom') drawBloom(ctx, item)
        else drawPetal(ctx, item)
        return true
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      running = !document.hidden
      if (running) frame()
      else cancelAnimationFrame(raf)
    }

    size()
    window.addEventListener('resize', size)
    document.addEventListener('visibilitychange', onVisibility)
    frame()

    return () => {
      running = false
      registerPetalBurst(null)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [active, canvasRef, prefersReduced])
}
