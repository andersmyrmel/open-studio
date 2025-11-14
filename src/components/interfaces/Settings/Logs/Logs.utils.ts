/**
 * Logs utilities stub for Open Studio
 */

export const maybeShowUpgradePrompt = (params: any) => {
  // No upgrade prompts in standalone mode
  return false
}

export const formatLogTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleString()
}
