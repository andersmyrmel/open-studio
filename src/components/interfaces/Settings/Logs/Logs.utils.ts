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
