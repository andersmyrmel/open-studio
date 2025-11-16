/**
 * Telemetry tracking stub for Open Studio
 * No-op implementation - telemetry not available in local mode
 */

export interface TrackEventProperties {
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

export function track(
  eventName: string,
  properties?: TrackEventProperties
): void {
  // No-op for local mode
  // In production, this would send events to analytics
}

export function trackPageView(path: string): void {
  // No-op for local mode
}

export function identifyUser(userId: string, traits?: Record<string, any>): void {
  // No-op for local mode
}

export function resetUser(): void {
  // No-op for local mode
}

// React hook for tracking
export function useTrack() {
  return {
    track,
    trackPageView,
    identifyUser,
    resetUser,
  }
}

export default track
