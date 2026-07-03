import { useState } from 'react'
import { Plane } from 'lucide-react'
import { cn } from '../../lib/cn'

interface SmartImageProps {
  src?: string
  alt: string
  /** Classes for the wrapper (control aspect-ratio / rounding here). */
  className?: string
  /** Classes for the <img> itself. */
  imgClassName?: string
  /** Caption shown on the elegant fallback when the image is missing. */
  label?: string
  /** Loading strategy for the underlying image. */
  loading?: 'lazy' | 'eager'
  /** 'full' shows an icon + label on the fallback; 'bare' is gradient only
   *  (used behind text, e.g. the hero background). */
  placeholder?: 'full' | 'bare'
}

/**
 * An <img> that degrades to a refined, on-brand placeholder when the source
 * is missing or fails to load — so the site looks intentional before the
 * couple adds their real photos.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  label,
  loading = 'lazy',
  placeholder = 'full',
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed

  return (
    <div className={cn('relative overflow-hidden bg-ivory-deep', className)}>
      {showPlaceholder ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-sky-soft via-ivory to-ivory-deep">
          {placeholder === 'full' && (
            <>
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40"
                aria-hidden="true"
              >
                <Plane className="h-6 w-6 text-gold" strokeWidth={1.3} />
              </span>
              <span className="label-caps px-4 text-center text-[10px] text-navy-400">
                {label ?? alt}
              </span>
            </>
          )}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onError={() => setFailed(true)}
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      )}
    </div>
  )
}
