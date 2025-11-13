/**
 * Logs utilities stub for Open Studio
 */

export function formatLogTimestamp(timestamp: string | number): string {
  return new Date(timestamp).toISOString()
}

export function parseLogLevel(level: string): 'info' | 'warn' | 'error' | 'debug' {
  const normalized = level.toLowerCase()
  if (['info', 'warn', 'error', 'debug'].includes(normalized)) {
    return normalized as 'info' | 'warn' | 'error' | 'debug'
  }
  return 'info'
}
