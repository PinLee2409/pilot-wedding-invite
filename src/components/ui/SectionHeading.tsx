import { Plane } from 'lucide-react'
import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  kicker?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  tone?: 'navy' | 'light'
}

/** Reusable section header: gold kicker, serif title, plane hairline divider. */
export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'center',
  tone = 'navy',
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        isCenter ? 'items-center text-center' : 'items-start text-left',
      )}
    >
      {kicker && (
        <span className="label-caps text-[clamp(0.6rem,2.4vw,0.72rem)] text-gold">
          {kicker}
        </span>
      )}
      <h2
        className={cn(
          'text-section text-balance',
          tone === 'light' ? 'text-warm-white' : 'text-navy',
        )}
      >
        {title}
      </h2>

      <div
        className={cn(
          'mt-1 flex items-center gap-2 text-gold',
          isCenter ? 'justify-center' : 'justify-start',
        )}
        aria-hidden="true"
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
        <Plane className="h-3.5 w-3.5 -rotate-12" strokeWidth={1.5} />
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
      </div>

      {subtitle && (
        <p
          className={cn(
            'max-w-xl text-balance text-sm leading-relaxed sm:text-base',
            tone === 'light' ? 'text-sky-soft' : 'text-navy-400',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
