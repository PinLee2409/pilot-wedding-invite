import { motion } from 'motion/react'
import { Volume2, VolumeX } from 'lucide-react'
import { cn } from '../../lib/cn'

interface MusicToggleProps {
  isPlaying: boolean
  onToggle: () => void
  title?: string
  className?: string
  variant?: 'floating' | 'inline'
}

/** Accessible music on/off button. Never autoplays — only toggles on tap. */
export function MusicToggle({
  isPlaying,
  onToggle,
  title = 'nhạc nền',
  className,
  variant = 'floating',
}: MusicToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? `Tắt ${title}` : `Bật ${title}`}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        'group relative grid place-items-center rounded-full border text-navy transition-colors',
        variant === 'floating'
          ? 'h-12 w-12 border-gold/50 glass shadow-lg'
          : 'h-11 w-11 border-navy/20 bg-white/60 text-navy backdrop-blur-md shadow-sm',
        className,
      )}
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5" strokeWidth={1.6} />
      ) : (
        <VolumeX className="h-5 w-5" strokeWidth={1.6} />
      )}
      {isPlaying && (
        <span className="pointer-events-none absolute inset-0 animate-ping rounded-full border border-gold/50" />
      )}
    </motion.button>
  )
}
