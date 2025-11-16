/**
 * Temp API keys query stub for Open Studio
 */

export interface TempApiKey {
  api_key?: string
}

export const useTempApiKeysQuery = (_params?: any): {
  data: TempApiKey | undefined
  isLoading: boolean
  error: any
} => {
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
  }
}
