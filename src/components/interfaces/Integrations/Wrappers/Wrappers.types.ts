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
  label?: string
  handlerName?: string
  validatorName?: string
  server?: {
    options: Array<{
      name: string
      encrypted?: boolean
      [key: string]: any
    }>
    [key: string]: any
  }
}
