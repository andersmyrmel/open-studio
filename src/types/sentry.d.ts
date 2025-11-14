/**
 * Sentry type declarations stub
 */

declare module '@sentry/nextjs' {
  export interface Scope {
    setExtra(key: string, value: any): void
    setTag(key: string, value: string): void
    setContext(key: string, context: any): void
  }

  export function captureException(exception: any): string
  export function captureMessage(message: string, level?: 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug'): string
  export function withScope(callback: (scope: Scope) => void): void
}
