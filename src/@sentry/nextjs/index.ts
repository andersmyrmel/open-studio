/**
 * Sentry stub for Open Studio
 * No-op implementation - error tracking not available in local mode
 */

export type Breadcrumb = {
  type?: string
  level?: string
  message?: string
  category?: string
  data?: any
  timestamp?: number
}

export type User = {
  id?: string
  email?: string
  username?: string
  [key: string]: any
}

export type Scope = {
  setUser: (user: User | null) => void
  setTag: (key: string, value: string) => void
  setContext: (name: string, context: any) => void
  addBreadcrumb: (breadcrumb: Breadcrumb) => void
  clear: () => void
}

export const Severity = {
  Fatal: 'fatal',
  Error: 'error',
  Warning: 'warning',
  Log: 'log',
  Info: 'info',
  Debug: 'debug',
} as const

// No-op functions
export function init(options?: any): void {}

export function captureException(exception: any, captureContext?: any): string {
  console.error('[Sentry stub] Exception:', exception)
  return 'stub-event-id'
}

export function captureMessage(message: string, captureContext?: any): string {
  console.log('[Sentry stub] Message:', message)
  return 'stub-event-id'
}

export function setUser(user: User | null): void {}

export function setTag(key: string, value: string): void {}

export function setContext(name: string, context: any): void {}

export function addBreadcrumb(breadcrumb: Breadcrumb): void {}

export function configureScope(callback: (scope: Scope) => void): void {
  const stubScope: Scope = {
    setUser: () => {},
    setTag: () => {},
    setContext: () => {},
    addBreadcrumb: () => {},
    clear: () => {},
  }
  callback(stubScope)
}

export function withScope(callback: (scope: Scope) => void): void {
  const stubScope: Scope = {
    setUser: () => {},
    setTag: () => {},
    setContext: () => {},
    addBreadcrumb: () => {},
    clear: () => {},
  }
  callback(stubScope)
}

export function startTransaction(context: any): any {
  return {
    setData: () => {},
    setStatus: () => {},
    finish: () => {},
    startChild: () => startTransaction({}),
  }
}

export const BrowserTracing = class {}
export const Integrations = {
  BrowserTracing,
}

export default {
  init,
  captureException,
  captureMessage,
  setUser,
  setTag,
  setContext,
  addBreadcrumb,
  configureScope,
  withScope,
  startTransaction,
  Severity,
  Integrations,
}
