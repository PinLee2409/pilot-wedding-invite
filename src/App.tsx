import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { weddingConfig } from './config/wedding.config'
import { useGuestName } from './hooks/useGuestName'
import { useAudio } from './hooks/useAudio'
import { HeroSection } from './components/sections/HeroSection'
import { GuestNameGate } from './components/sections/GuestNameGate'
import { DownloadInvitation } from './components/sections/DownloadInvitation'
import { FlightTimeline } from './components/sections/FlightTimeline'
import { MediaGallery } from './components/sections/MediaGallery'
import { WeddingDetails } from './components/sections/WeddingDetails'
import { LoveMessage } from './components/sections/LoveMessage'
import { GuestLinkGenerator } from './components/sections/GuestLinkGenerator'
import { FinalThankYou } from './components/sections/FinalThankYou'
import { RouteDivider } from './components/decorations/RouteDivider'
import { FloatingDecor } from './components/decorations/FloatingDecor'
import { MusicToggle } from './components/ui/MusicToggle'
import { BackToTop } from './components/ui/BackToTop'

function App() {
  const reduce = useReducedMotion()
  const { guestName, setGuestName } = useGuestName()
  const { isPlaying, toggle, enabled: musicEnabled } = useAudio(
    weddingConfig.music.src,
  )

  // Show the name gate on every page load / reload.
  const [gateDismissed, setGateDismissed] = useState(false)
  const gateOpen = !gateDismissed

  // Always open at the top. Disable scrollRestoration so the browser doesn't
  // jump to the previous position on reload / back-forward navigation.
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div
      className="relative min-h-screen"
      initial={reduce ? false : { opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloatingDecor />

      <GuestNameGate
        open={gateOpen}
        onSubmit={(name) => {
          setGuestName(name)
          setGateDismissed(true)
        }}
        onSkip={() => setGateDismissed(true)}
      />

      <main className="relative z-10">
        <HeroSection
          config={weddingConfig}
          guestName={guestName}
          isMusicPlaying={isPlaying}
          onToggleMusic={toggle}
          musicEnabled={musicEnabled}
        />

        <DownloadInvitation config={weddingConfig} guestName={guestName} />

        <RouteDivider className="bg-cream" />

        <FlightTimeline config={weddingConfig} />

        <MediaGallery config={weddingConfig} />

        <WeddingDetails config={weddingConfig} />

        <LoveMessage config={weddingConfig} />

        <GuestLinkGenerator />

        <FinalThankYou config={weddingConfig} />
      </main>

      {/* Floating controls */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
        <BackToTop />
        {musicEnabled && (
          <MusicToggle
            isPlaying={isPlaying}
            onToggle={toggle}
            title={weddingConfig.music.title}
          />
        )}
      </div>
    </motion.div>
  )
}

export default App
