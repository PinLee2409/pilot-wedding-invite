/** Helpers for reading / writing the `?guest=` query param (frontend-only). */

export const GUEST_PARAM = 'guest'

/** Read + decode the guest name from the current (or given) query string. */
export function getGuestFromUrl(search: string = window.location.search): string {
  const params = new URLSearchParams(search)
  const raw = params.get(GUEST_PARAM)
  return raw ? raw.trim() : ''
}

/** Update the `guest` param in the address bar WITHOUT reloading the page. */
export function updateGuestInUrl(name: string): void {
  const url = new URL(window.location.href)
  const trimmed = name.trim()
  if (trimmed) {
    url.searchParams.set(GUEST_PARAM, trimmed)
  } else {
    url.searchParams.delete(GUEST_PARAM)
  }
  window.history.replaceState({}, '', url.toString())
}

/**
 * Build a shareable, personalised invitation URL for a guest.
 * Uses encodeURIComponent so names with spaces / diacritics stay valid.
 */
export function buildGuestUrl(name: string, baseUrl?: string): string {
  const base =
    baseUrl ?? `${window.location.origin}${window.location.pathname}`
  const trimmed = name.trim()
  if (!trimmed) return base
  return `${base}?${GUEST_PARAM}=${encodeURIComponent(trimmed)}`
}
