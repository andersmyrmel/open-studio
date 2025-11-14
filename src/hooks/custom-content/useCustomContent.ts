/**
 * Custom content hook stub for Open Studio
 * Cloud-only feature for custom branding/content
 */

export interface CustomContent {
  logo?: string
  brandName?: string
  brandColor?: string
  customCss?: string
  [key: string]: any
}

export function useCustomContent(keys?: string[]) {
  // Stub: return null for local mode (no custom branding)
  return {
    data: null as CustomContent | null,
    isLoading: false,
    error: undefined,
    docsRowLevelSecurityGuidePath: undefined,
  }
}

export default useCustomContent
