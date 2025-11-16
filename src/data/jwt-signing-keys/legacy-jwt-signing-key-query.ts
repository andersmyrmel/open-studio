/**
 * Legacy JWT signing key query stub for Open Studio
 */

export interface LegacyJwtSigningKey {
  status?: 'active' | 'revoked' | 'previously_used'
  api_key?: string
}

export const useLegacyJwtSigningKeyQuery = (_params?: any): {
  data: LegacyJwtSigningKey | undefined
  isLoading: boolean
  error: any
} => {
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
  }
}
