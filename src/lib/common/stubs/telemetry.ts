/**
 * Telemetry stubs for Open-Studio
 * Since we removed Supabase telemetry, these are no-op stubs
 */

/**
 * Stub for sending telemetry events - does nothing
 */
export function sendTelemetryEvent(event: string, properties?: Record<string, any>) {
  // No-op in standalone
  if (process.env.NODE_ENV === 'development') {
    console.debug('Telemetry event (not sent):', event, properties)
  }
}

/**
 * Stub for PageTelemetry component
 */
export function PageTelemetry({ pageName }: { pageName: string }) {
  return null
}

/**
 * Stub for tracking consent - always returns true (no tracking)
 */
export function hasConsented(): boolean {
  return false // No telemetry in standalone
}

/**
 * Stub for consent state
 */
export function useConsentState() {
  return {
    hasConsented: false,
    setConsent: () => {},
  }
}
