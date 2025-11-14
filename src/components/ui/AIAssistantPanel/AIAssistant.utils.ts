/**
 * AIAssistant utilities stub for Open Studio
 */

export const parseMessageContent = (content: string) => {
  return content
}

export const formatSuggestion = (suggestion: string) => {
  return suggestion
}

export const containsUnknownFunction = (sql: string): boolean => {
  return false
}

export const isReadOnlySelect = (sql: string): boolean => {
  const trimmed = sql.trim().toLowerCase()
  return trimmed.startsWith('select')
}
