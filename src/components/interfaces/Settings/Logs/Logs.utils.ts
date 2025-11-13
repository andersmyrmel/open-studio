/**
 * Logs utilities for Open Studio
 */

export function maybeShowUpgradePromptIfNotEntitled(
  isEntitled: boolean,
  showUpgradePrompt: () => void
): boolean {
  if (!isEntitled) {
    showUpgradePrompt()
    return true
  }
  return false
}

export function formatLogTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString()
}

export function parseLogLevel(level: string): 'info' | 'warn' | 'error' | 'debug' {
  const normalized = level.toLowerCase()
  if (['info', 'warn', 'error', 'debug'].includes(normalized)) {
    return normalized as 'info' | 'warn' | 'error' | 'debug'
  }
  return 'info'
}

/**
 * Check if timestamp is in Unix microseconds format
 */
export function isUnixMicro(timestamp: string | number): boolean {
  if (typeof timestamp === 'string') {
    timestamp = Number(timestamp)
  }
  // Unix microseconds is a 16-digit number (seconds * 1000000)
  return timestamp > 1000000000000000
}

/**
 * Convert Unix microseconds to ISO timestamp
 */
export function unixMicroToIsoTimestamp(unixMicro: string | number): string {
  const microseconds = typeof unixMicro === 'string' ? Number(unixMicro) : unixMicro
  const milliseconds = Math.floor(microseconds / 1000)
  return new Date(milliseconds).toISOString()
}
