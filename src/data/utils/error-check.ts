/**
 * Error checking utilities for Open Studio
 */

export function isError(error: any): error is Error {
  return error instanceof Error
}

export function getErrorMessage(error: unknown): string {
  if (isError(error)) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unknown error occurred'
}

export function hasErrorCode(error: any): boolean {
  return error && typeof error.code !== 'undefined'
}
