import { useCallback, useEffect, useRef, useState } from 'react'
import { CONFIG } from '../config.js'

export function useMusic() {
  const audioRef = useRef(null)
  const ctxRef = useRef(null)
  const timerRef = useRef(null)
  const usingSynthRef = useRef(false)
  const startedRef = useRef(false)
  const playingRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  const setState = useCallback((on) => {
    playingRef.current = on
    setPlaying(on)
  }, [])

  const fadeTo = useCallback((target, ms) => {
    const el = audioRef.current
    if (!el) return
    const from = el.volume
    const t0 = performance.now()
    const step = (now) => {
      const k = Math.min(1, (now - t0) / ms)
      if (audioRef.current) audioRef.current.volume = from + (target - from) * k
      if (k < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [])

  const stopSynth = useCallback(() => {
    window.clearTimeout(timerRef.current)
  }, [])

  const playSynth = useCallback(() => {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    ctxRef.current = ctxRef.current || new AC()
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()

    const scale = [392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 659.25, 523.25]
    let i = 0

    const note = () => {
      const ctx = ctxRef.current
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 1400
      osc.type = 'triangle'
      osc.frequency.value = scale[i % scale.length]
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.12)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.4)
      osc.connect(filter).connect(gain).connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 2.5)
      i += 1
      timerRef.current = window.setTimeout(note, 1150)
    }

    note()
  }, [])

  const startSynth = useCallback(() => {
    usingSynthRef.current = true
    audioRef.current = null
    playSynth()
    setState(true)
  }, [playSynth, setState])

  const start = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    setStarted(true)

    const audio = new Audio(CONFIG.music.src)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    audio.addEventListener(
      'error',
      () => {
        if (!CONFIG.music.fallbackToSynth) {
          setState(false)
          return
        }
        startSynth()
      },
      { once: true },
    )

    audio
      .play()
      .then(() => {
        setState(true)
        fadeTo(0.55, 2600)
      })
      .catch(() => {
        if (!CONFIG.music.fallbackToSynth) {
          setState(false)
          return
        }
        startSynth()
      })
  }, [fadeTo, setState, startSynth])

  const toggle = useCallback(() => {
    if (!startedRef.current) {
      start()
      return
    }

    if (playingRef.current) {
      if (audioRef.current) audioRef.current.pause()
      else stopSynth()
      setState(false)
    } else {
      if (audioRef.current) audioRef.current.play().catch(() => {})
      else playSynth()
      setState(true)
    }
  }, [playSynth, setState, start, stopSynth])

  useEffect(() => {
    return () => {
      stopSynth()
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (ctxRef.current) ctxRef.current.close().catch(() => {})
    }
  }, [stopSynth])

  return { playing, started, start, toggle }
}
