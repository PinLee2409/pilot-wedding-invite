import { CalendarPlus, MapPin } from 'lucide-react'
import type { WeddingConfig } from '../../config/wedding.config'
import { downloadICS } from '../../lib/ics'
import { SectionHeading } from '../ui/SectionHeading'
import { Countdown } from '../ui/Countdown'
import { Reveal } from '../ui/Reveal'

export function WeddingDetails({ config }: { config: WeddingConfig }) {
  const { date, venue } = config

  return (
    <section
      id="details"
      className="bg-navy px-5 py-20 text-warm-white"
      aria-label="Thông tin buổi lễ"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            kicker="Flight Details"
            title="Thông tin chuyến bay"
            subtitle="Rất mong được đón tiếp bạn tại cổng khởi hành đúng giờ."
            tone="light"
          />
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-stretch">
          {/* Details card */}
          <Reveal className="flex flex-col gap-6 rounded-3xl border border-warm-white/15 bg-white/5 p-7 backdrop-blur-sm">
            <div>
              <span className="label-caps text-[10px] text-gold">
                Ngày khởi hành
              </span>
              <p className="mt-1 font-display text-4xl font-semibold text-warm-white">
                {date.displayDate}
              </p>
              <p className="mt-1 text-sm text-sky-soft">
                {date.weekday} · Boarding lúc {date.time}
              </p>
            </div>

            <div className="h-px w-full bg-warm-white/15" />

            <div>
              <span className="label-caps text-[10px] text-gold">Địa điểm</span>
              <p className="mt-1 font-display text-xl text-warm-white">
                {venue.name}
              </p>
              {venue.hall && (
                <p className="mt-0.5 text-sm text-sky-soft">{venue.hall}</p>
              )}
              <p className="mt-1 flex items-start gap-1.5 text-sm text-warm-white/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {venue.address}
              </p>
            </div>

            <Countdown iso={date.iso} tone="light" className="mt-1" />

            <div className="mt-1 flex flex-col gap-3 sm:flex-row">
              {venue.mapLink && (
                <a
                  href={venue.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold flex-1"
                >
                  <MapPin className="h-4 w-4" />
                  Mở Google Maps
                </a>
              )}
              <button
                type="button"
                onClick={() => downloadICS(config)}
                className="btn btn-ghost flex-1"
              >
                <CalendarPlus className="h-4 w-4" />
                Thêm vào lịch
              </button>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1} className="min-h-[300px]">
            {venue.mapEmbedUrl ? (
              <iframe
                title={`Bản đồ đến ${venue.name}`}
                src={venue.mapEmbedUrl}
                className="h-full min-h-[300px] w-full rounded-3xl border border-gold/25 shadow-xl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="grid h-full min-h-[300px] place-items-center rounded-3xl border border-warm-white/15 bg-white/5 text-center text-sky-soft">
                <span className="label-caps text-[10px]">
                  Bản đồ sẽ được cập nhật
                </span>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
