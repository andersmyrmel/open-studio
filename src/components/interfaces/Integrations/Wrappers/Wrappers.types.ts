/**
 * Wrappers types stub for Open Studio
 */

export interface AvailableColumn {
  name: string
  type: string
}

export interface WrapperMeta {
  name: string
  handler: string
  validator?: string
  options?: Record<string, any>
}
