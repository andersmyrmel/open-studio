/**
 * Logs utilities stub for Open Studio
 */

export const maybeShowUpgradePrompt = (from?: any, planId?: any) => {
  // No upgrade prompts in standalone mode
  return false
}

export const formatLogTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleString()
}

export const isUnixMicro = (timestamp: number | string): boolean => {
  const ts = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp
  // Unix microsecond timestamps are 16 digits, millisecond are 13
  return ts > 1e15
}

export const unixMicroToIsoTimestamp = (unixMicro: number | string): string => {
  const ts = typeof unixMicro === 'string' ? parseInt(unixMicro, 10) : unixMicro
  const milliseconds = ts / 1000
  return new Date(milliseconds).toISOString()
}
