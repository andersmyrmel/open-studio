/**
 * Telemetry stub for Open Studio
 * Cloud-only feature - not needed for local PostgreSQL usage
 */

import { useMutation } from '@tanstack/react-query'

export type SendEventVariables = {
  action: string
  properties?: Record<string, any>
  groups?: Record<string, string>
}

// Stub implementation - does nothing for local usage
export async function sendEvent(_variables: SendEventVariables): Promise<void> {
  // No-op for local Studio
  // In production Supabase, this would send analytics events
  return Promise.resolve()
}

export const useSendEventMutation = () => {
  return useMutation({
    mutationFn: sendEvent,
    onError: () => {
      // Silently fail - telemetry is optional
    },
  })
}
