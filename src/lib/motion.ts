/** Shared Motion variants — consistent, soft, romantic. */

import type { Variants } from 'motion/react'

export const easeLux = [0.22, 1, 0.36, 1] as const

/** Fade + rise + subtle blur — the house reveal. */
export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: easeLux },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeLux } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: easeLux } },
}

/** Premium card entrance: fade + lift + slight scale/tilt. */
export const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeLux },
  },
}

/** Parent that reveals children one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}

/** Standard "reveal on scroll" viewport config. */
export const viewportOnce = { once: true, amount: 0.25 } as const
