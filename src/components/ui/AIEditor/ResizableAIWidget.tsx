/**
 * ResizableAIWidget stub for Open Studio
 * AI assistant widget (cloud-only feature)
 */

import React from 'react'

export interface ResizableAIWidgetProps {
  className?: string
  children?: React.ReactNode
  editor?: any
  id?: string
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (prompt: string) => void
  onClose?: () => void
  onAccept?: () => void
  onCancel?: () => void
  onReject?: () => void
  selectedDiffType?: string
  startLineNumber?: number
  endLineNumber?: number
  isDiffVisible?: boolean
  isLoading?: boolean
}

export const ResizableAIWidget: React.FC<ResizableAIWidgetProps> = ({ className, children }) => {
  // Stub: AI features not available in local mode
  return null
}

export default ResizableAIWidget
