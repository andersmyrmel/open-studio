/**
 * Upgrade prompt for logs feature
 * Cloud-only feature for Open Studio
 */

import React from 'react'

export interface UpgradePromptProps {
  feature?: string
  children?: React.ReactNode
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({ feature, children }) => {
  // Stub: no upgrade prompts in local mode
  return null
}

export default UpgradePrompt
