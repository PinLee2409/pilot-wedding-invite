import { cn } from '../../lib/cn'

interface RunwayLightsProps {
  count?: number
  className?: string
}

/** A row of runway-edge lights that pulse in a gentle sequence. */
export function RunwayLights({ count = 12, className }: RunwayLightsProps) {
  return (
    <div
      className={cn('flex items-center justify-center gap-2.5 text-gold', className)}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-current animate-runway"
          style={{ animationDelay: `${(i % 6) * 0.16}s` }}
        />
      ))}
    </div>
  )
}
