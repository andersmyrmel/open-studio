/**
 * AI Assistant State for Open Studio
 * Stub implementation - AI features not available in local mode
 */

import { proxy, useSnapshot } from 'valtio'

export type AiAssistantState = {
  isOpen: boolean
  isEnabled: boolean
  messages: any[]
  currentContext?: string
  newChat?: (options: {
    name?: string
    initialInput?: string
    suggestions?: { title: string; prompts?: string[] }
  }) => void
}

// Create a simple valtio state
export const aiAssistantState = proxy<AiAssistantState>({
  isOpen: false,
  isEnabled: false,
  messages: [],
  currentContext: undefined,
  newChat: (options) => {
    // Stub implementation - AI features not available in local mode
    console.log('AI Assistant newChat called (stub):', options)
  },
})

export const useAiAssistantStateSnapshot = (
  options?: Parameters<typeof useSnapshot>[1]
) => {
  return useSnapshot(aiAssistantState, options)
}

export const openAiAssistant = (context?: string) => {
  aiAssistantState.isOpen = true
  aiAssistantState.currentContext = context
}

export const closeAiAssistant = () => {
  aiAssistantState.isOpen = false
  aiAssistantState.currentContext = undefined
}

export const toggleAiAssistant = () => {
  aiAssistantState.isOpen = !aiAssistantState.isOpen
}
