import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plane, Ticket } from 'lucide-react'

interface GuestNameGateProps {
  open: boolean
  onSubmit: (name: string) => void
  onSkip: () => void
}

/**
 * Elegant modal shown on every page load. Lets the visitor type
 * their name to "unlock" the personalised invitation.
 */
export function GuestNameGate({ open, onSubmit, onSkip }: GuestNameGateProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Autofocus the field and lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 400)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSkip()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = original
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onSkip])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Dark elegant backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-navy/75 backdrop-blur-md"
            onClick={onSkip}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Floating ambient sparkles behind the card */}
          <motion.div
            className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-gold/40"
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 h-1.5 w-1.5 rounded-full bg-gold-light/50"
            animate={{
              y: [0, -20, 0],
              x: [0, -10, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.6, 1.3, 0.6],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 h-1 w-1 rounded-full bg-gold/30"
            animate={{
              y: [0, -25, 0],
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />

          {/* Card */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-gold/30 bg-warm-white shadow-2xl"
            style={{ boxShadow: '0 25px 60px -15px rgba(27, 42, 74, 0.4), 0 0 40px rgba(200, 164, 92, 0.1)' }}
            initial={{ opacity: 0, y: 40, scale: 0.92, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {/* Ticket header strip with subtle gradient */}
            <motion.div
              className="flex items-center justify-between bg-gradient-to-r from-ivory-deep via-cream to-ivory-deep px-6 py-3 text-navy border-b border-gold/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <span className="label-caps text-[10px] text-navy-400 font-medium">
                Boarding Pass
              </span>
              <motion.div
                animate={{ rotate: [0, 10, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Plane className="h-4 w-4 rotate-45 text-gold" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            <div className="flex flex-col items-center gap-4 px-6 py-8 text-center">
              {/* Icon with glow ring animation */}
              <motion.span
                className="grid h-16 w-16 place-items-center rounded-full border-2 border-gold/30 text-gold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }}
                style={{ boxShadow: '0 0 20px rgba(200, 164, 92, 0.15)' }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Ticket className="h-7 w-7" strokeWidth={1.4} />
                </motion.div>
              </motion.span>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2
                  id="gate-title"
                  className="font-display text-2xl text-navy font-semibold"
                >
                  Chào mừng quý khách
                </h2>
                <p className="mt-1.5 text-sm text-navy-400">
                  Nhập tên của bạn để mở thiệp mời
                </p>
              </motion.div>

              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label htmlFor="guest-name" className="sr-only">
                  Tên của bạn
                </label>
                <input
                  id="guest-name"
                  ref={inputRef}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Ví dụ: Anh Tuấn & Chị Lan"
                  autoComplete="name"
                  className="w-full rounded-xl border border-navy/10 bg-ivory px-4 py-3.5 text-center text-navy outline-none transition-all duration-300 focus:border-gold focus:ring-2 focus:ring-gold/25 focus:shadow-[0_0_16px_rgba(200,164,92,0.12)]"
                />
              </motion.div>

              <motion.div
                className="w-full flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <button
                  type="submit"
                  disabled={!value.trim()}
                  className="btn btn-primary w-full"
                >
                  Mở thiệp mời
                  <Plane className="h-4 w-4 rotate-45" strokeWidth={1.6} />
                </button>

                <button
                  type="button"
                  onClick={onSkip}
                  className="text-xs text-navy-400 underline-offset-4 transition-all duration-300 hover:text-gold-dark hover:underline"
                >
                  Xem thiệp mà không cần nhập tên
                </button>
              </motion.div>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
