import { useCallback, useEffect, useRef, useState } from 'react'
import { CONFIG } from '../config.js'

export function useMusic() {
  const audioRef = useRef(null)
  const ctxRef = useRef(null)
  const timerRef = useRef(null)
  const usingSynthRef = useRef(false)
  const startedRef = useRef(false)
  const playingRef = useRef(false)
  const mutedRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)

  const TARGET_VOLUME = 0.55

  const setPlayingState = useCallback((on) => {
    playingRef.current = on
    setPlaying(on)
  }, [])

  const setMutedState = useCallback((on) => {
    mutedRef.current = on
    setMuted(on)
    setPlayingState(!on)
  }, [setPlayingState])

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
    setMutedState(false)
  }, [playSynth, setMutedState])

  useEffect(() => {
    const audio = new Audio(CONFIG.music.src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
    audioRef.current = audio

    return () => {
      audio.pause()
      if (audioRef.current === audio) audioRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    setStarted(true)

    if (!audioRef.current) {
      const created = new Audio(CONFIG.music.src)
      created.loop = true
      created.volume = 0
      audioRef.current = created
    }

    const el = audioRef.current
    el.volume = 0

    el.addEventListener(
      'error',
      () => {
        if (!CONFIG.music.fallbackToSynth) {
          setMutedState(true)
          return
        }
        startSynth()
      },
      { once: true },
    )

    el
      .play()
      .then(() => {
        setMutedState(false)
        fadeTo(TARGET_VOLUME, 2600)
      })
      .catch(() => {
        if (!CONFIG.music.fallbackToSynth) {
          setMutedState(true)
          return
        }
        startSynth()
      })
  }, [fadeTo, setMutedState, startSynth])

  const toggle = useCallback(() => {
    if (!startedRef.current) {
      start()
      return
    }

    if (usingSynthRef.current) {
      if (playingRef.current) {
        stopSynth()
        setMutedState(true)
      } else {
        playSynth()
        setMutedState(false)
      }
      return
    }

    const el = audioRef.current
    if (!el) return

    if (mutedRef.current) {
      el.play().catch(() => {})
      fadeTo(TARGET_VOLUME, 500)
      setMutedState(false)
      return
    }

    fadeTo(0, 500)
    setMutedState(true)
  }, [fadeTo, playSynth, setMutedState, start, stopSynth])

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

  return { playing, muted, started, start, toggle }
}
