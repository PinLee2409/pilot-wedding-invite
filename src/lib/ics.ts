/** Generate an .ics calendar file entirely on the client (no backend). */

import type { WeddingConfig } from '../config/wedding.config'

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/** Format a Date as an iCalendar UTC timestamp: YYYYMMDDTHHMMSSZ */
function toICSDate(date: Date): string {
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  )
}

/** Escape reserved iCalendar characters. */
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

export function buildICS(config: WeddingConfig): string {
  const start = new Date(config.date.iso)
  const end = new Date(
    start.getTime() + config.date.durationHours * 60 * 60 * 1000,
  )
  const title = `Đám cưới ${config.couple.groom.name} & ${config.couple.bride.name}`
  const location = [config.venue.name, config.venue.hall, config.venue.address]
    .filter(Boolean)
    .join(', ')
  const description = `${config.event.tagline} — ${config.event.kicker}`
  const uid = `wedding-${start.getTime()}@flight-to-forever`

  // Note: lines are joined with CRLF per RFC 5545.
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Flight to Forever//Wedding Invitation//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${escapeICS(title)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

/** Build the .ics and trigger a download. */
export function downloadICS(config: WeddingConfig): void {
  const blob = new Blob([buildICS(config)], {
    type: 'text/calendar;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'flight-to-forever.ics'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
