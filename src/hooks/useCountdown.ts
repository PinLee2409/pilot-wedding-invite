import { useEffect, useState } from 'react'

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function computeDiff(target: number): Countdown {
  const now = Date.now()
  const isPast = target - now <= 0
  let delta = Math.max(0, target - now)

  const days = Math.floor(delta / 86_400_000)
  delta -= days * 86_400_000
  const hours = Math.floor(delta / 3_600_000)
  delta -= hours * 3_600_000
  const minutes = Math.floor(delta / 60_000)
  delta -= minutes * 60_000
  const seconds = Math.floor(delta / 1_000)

  return { days, hours, minutes, seconds, isPast }
}

/** Live countdown to an ISO date-time, ticking every second. */
export function useCountdown(iso: string): Countdown {
  const target = new Date(iso).getTime()
  const [state, setState] = useState<Countdown>(() => computeDiff(target))

  useEffect(() => {
    const id = window.setInterval(() => setState(computeDiff(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  return state
}
