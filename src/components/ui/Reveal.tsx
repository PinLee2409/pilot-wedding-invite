import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/cn'
import { easeLux } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Vertical travel distance in px. */
  y?: number
  /** Add a subtle blur to the reveal. */
  blur?: boolean
  /** Render as a different element if needed (defaults to div). */
  as?: 'div' | 'li' | 'section'
}

/** Fade + rise (optionally blur) into view once, honouring reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  blur = true,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  const hidden = blur
    ? { opacity: 0, y, filter: 'blur(6px)' }
    : { opacity: 0, y }
  const shown = blur
    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
    : { opacity: 1, y: 0 }

  return (
    <MotionTag
      className={cn(className)}
      initial={reduce ? false : hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: easeLux, delay }}
    >
      {children}
    </MotionTag>
  )
}
