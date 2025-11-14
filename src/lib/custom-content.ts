/**
 * Custom content stub for Open Studio
 */

export interface CustomContent {
  docsRowLevelSecurityGuidePath?: string
  data?: any
  title?: string
  content?: string
}

export const useCustomContent = () => {
  return {
    data: null as CustomContent | null,
    isLoading: false,
    error: undefined,
  }
}
