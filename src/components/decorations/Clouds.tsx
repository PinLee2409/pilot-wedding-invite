import { useReducedMotion } from 'motion/react'
import { cn } from '../../lib/cn'

interface CloudDef {
  top: string
  /** Visual scale of the cloud. */
  scale: number
  opacity: number
  /** Drift duration in seconds. */
  duration: number
  /** Negative delay to distribute clouds across the sky at load. */
  delay: number
  /** Static horizontal position used when motion is reduced. */
  staticLeft: string
}

const CLOUDS: CloudDef[] = [
  { top: '10%', scale: 1.0, opacity: 0.9, duration: 70, delay: 0, staticLeft: '6%' },
  { top: '24%', scale: 0.6, opacity: 0.6, duration: 95, delay: -30, staticLeft: '68%' },
  { top: '44%', scale: 1.3, opacity: 0.45, duration: 120, delay: -75, staticLeft: '32%' },
  { top: '62%', scale: 0.8, opacity: 0.7, duration: 85, delay: -50, staticLeft: '82%' },
  { top: '78%', scale: 1.1, opacity: 0.35, duration: 110, delay: -15, staticLeft: '14%' },
]

function CloudShape() {
  return (
    <svg
      viewBox="0 0 220 90"
      width="220"
      height="90"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        <ellipse cx="70" cy="58" rx="55" ry="26" />
        <ellipse cx="120" cy="48" rx="45" ry="34" />
        <ellipse cx="160" cy="60" rx="45" ry="24" />
        <ellipse cx="100" cy="66" rx="70" ry="20" />
      </g>
    </svg>
  )
}

interface CloudsProps {
  className?: string
  /** Colour of the clouds. */
  tone?: 'white' | 'sky'
}

/** Soft, drifting cloud field for the sky background. */
export function Clouds({ className, tone = 'white' }: CloudsProps) {
  const reduce = useReducedMotion()
  const color = tone === 'white' ? 'text-white' : 'text-sky-soft'

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        color,
        className,
      )}
      aria-hidden="true"
    >
      {CLOUDS.map((cloud, i) => (
        // Outer layer owns the horizontal drift transform...
        <div
          key={i}
          className={cn('absolute left-0 will-change-transform', !reduce && 'animate-drift-slow')}
          style={{
            top: cloud.top,
            ...(reduce
              ? { left: cloud.staticLeft }
              : {
                  animationDuration: `${cloud.duration}s`,
                  animationDelay: `${cloud.delay}s`,
                }),
          }}
        >
          {/* ...inner layer owns scale + opacity so they aren't overwritten. */}
          <div style={{ transform: `scale(${cloud.scale})`, opacity: cloud.opacity }}>
            <CloudShape />
          </div>
        </div>
      ))}
    </div>
  )
}
