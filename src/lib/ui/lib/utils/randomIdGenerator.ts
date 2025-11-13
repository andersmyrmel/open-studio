/**
 * Random ID generator utility for Open Studio
 */

export function generateUID(): string {
  const random = Math.random().toString(36).substr(2, 9)
  const timestamp = Date.now()
  return `uid-${random}-${timestamp}`
}
