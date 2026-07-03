import { Plane } from 'lucide-react'
import { cn } from '../../lib/cn'

/** A dashed flight-route line with endpoint dots and a plane — used between sections. */
export function RouteDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn('relative mx-auto w-full max-w-sm px-6 py-2', className)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 44" className="w-full text-gold/70" focusable="false">
        <circle cx="8" cy="30" r="4" fill="currentColor" />
        <circle cx="8" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path
          d="M12 30 Q 200 -4 388 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 7"
          strokeLinecap="round"
        />
        <circle cx="392" cy="30" r="4" fill="currentColor" />
        <circle cx="392" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
      <Plane
        className="absolute left-1/2 top-[26%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 text-gold"
        strokeWidth={1.5}
      />
    </div>
  )
}
