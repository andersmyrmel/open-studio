/**
 * Feature Preview Context for Open Studio
 * Cloud-only beta features management
 */

import React, { createContext, useContext } from 'react'

export interface FeaturePreviewContextValue {
  isEnabled: (feature: string) => boolean
  enableFeature: (feature: string) => void
  disableFeature: (feature: string) => void
}

const FeaturePreviewContext = createContext<FeaturePreviewContextValue>({
  isEnabled: () => false,
  enableFeature: () => {},
  disableFeature: () => {},
})

export const useFeaturePreview = () => useContext(FeaturePreviewContext)

export const FeaturePreviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value: FeaturePreviewContextValue = {
    isEnabled: () => false,
    enableFeature: () => {},
    disableFeature: () => {},
  }

  return <FeaturePreviewContext.Provider value={value}>{children}</FeaturePreviewContext.Provider>
}

export default FeaturePreviewContext
