import { useCallback, useEffect, useRef, useState } from 'react'

const TARGET_VOLUME = 0.55
const FADE_STEP = 0.05
const FADE_INTERVAL_MS = 60

/**
 * Background-music controller. Never autoplays with sound — playback only
 * starts after the user taps the toggle (browser gesture requirement).
 * Fades in/out gently for a premium feel.
 */
export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeTimer = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!src) return
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
    audioRef.current = audio

    return () => {
      if (fadeTimer.current !== null) window.clearInterval(fadeTimer.current)
      audio.pause()
      audioRef.current = null
    }
  }, [src])

  const clearFade = () => {
    if (fadeTimer.current !== null) {
      window.clearInterval(fadeTimer.current)
      fadeTimer.current = null
    }
  }

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const audio = audioRef.current
    if (!audio) return
    clearFade()
    fadeTimer.current = window.setInterval(() => {
      if (!audioRef.current) {
        clearFade()
        return
      }
      const current = audioRef.current.volume
      if (Math.abs(current - target) <= FADE_STEP) {
        audioRef.current.volume = target
        clearFade()
        onDone?.()
      } else {
        audioRef.current.volume =
          current < target ? current + FADE_STEP : current - FADE_STEP
      }
    }, FADE_INTERVAL_MS)
  }, [])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try {
        await audio.play()
        setIsPlaying(true)
        fadeTo(TARGET_VOLUME)
      } catch {
        // Autoplay blocked or user dismissed — stay silent.
        setIsPlaying(false)
      }
    } else {
      fadeTo(0, () => audioRef.current?.pause())
      setIsPlaying(false)
    }
  }, [fadeTo])

  return { isPlaying, toggle, enabled: Boolean(src) }
}
