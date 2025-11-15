/**
 * AIEditor stub for Open Studio
 * AI features not available in standalone mode
 */

import React from 'react'

export interface AIEditorProps {
  className?: string
  onClose?: () => void
  autoFocus?: boolean
  language?: string
  value?: string
  onChange?: (value: string) => void
  aiEndpoint?: string
  aiMetadata?: any
  initialPrompt?: string
  options?: any
  openAIAssistantShortcutEnabled?: boolean
  executeQuery?: (sql: string) => void
  closeShortcutEnabled?: boolean
}

export const AIEditor: React.FC<AIEditorProps> = () => {
  return null
}

export default AIEditor
