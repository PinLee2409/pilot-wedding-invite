import { useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, Copy, ExternalLink, Link2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { buildGuestUrl } from '../../lib/guest'
import { cn } from '../../lib/cn'

/**
 * A frontend-only helper for the couple: type a guest's name, get a
 * personalised invitation link, copy it, and share. Collapsed by default so
 * it doesn't distract guests.
 */
export function GuestLinkGenerator() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [copied, setCopied] = useState(false)
  const urlInputRef = useRef<HTMLInputElement>(null)

  const url = useMemo(
    () => (name.trim() ? buildGuestUrl(name) : ''),
    [name],
  )

  const handleCopy = async () => {
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: select the field so the user can copy manually.
      urlInputRef.current?.select()
    }
  }

  return (
    <section
      id="guest-link"
      className="bg-ivory px-5 pb-20"
      aria-label="Công cụ tạo liên kết mời"
    >
      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-2xl border border-navy/10 bg-warm-white shadow-sm">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
          >
            <span className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-navy/5 text-gold">
                <Link2 className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-medium text-navy">
                  Tạo liên kết mời riêng
                </span>
                <span className="block text-xs text-navy-400">
                  Dành cho cô dâu &amp; chú rể
                </span>
              </span>
            </span>
            <ChevronDown
              className={cn(
                'h-5 w-5 shrink-0 text-navy-400 transition-transform',
                open && 'rotate-180',
              )}
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3 border-t border-navy/10 px-5 py-5">
                  <label
                    htmlFor="link-guest-name"
                    className="label-caps text-[10px] text-navy-400"
                  >
                    Tên khách mời
                  </label>
                  <input
                    id="link-guest-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: Gia đình bác Hoàng"
                    className="w-full rounded-xl border border-navy/15 bg-ivory px-4 py-2.5 text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                  />

                  <label
                    htmlFor="link-guest-url"
                    className="label-caps mt-1 text-[10px] text-navy-400"
                  >
                    Liên kết cá nhân hoá
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="link-guest-url"
                      ref={urlInputRef}
                      type="text"
                      readOnly
                      value={url}
                      placeholder="Nhập tên để tạo liên kết…"
                      onFocus={(e) => e.target.select()}
                      className="min-w-0 flex-1 rounded-xl border border-navy/15 bg-white px-4 py-2.5 font-mono text-xs text-navy-400 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
                      disabled={!url}
                      aria-label="Sao chép liên kết"
                      className="flex shrink-0 items-center gap-1.5 rounded-xl bg-navy px-4 py-2.5 text-sm font-medium text-warm-white transition enabled:hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {copied ? 'Đã chép' : 'Chép'}
                    </button>
                  </div>

                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 self-start text-xs text-gold-dark underline-offset-4 hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Mở thử liên kết
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
