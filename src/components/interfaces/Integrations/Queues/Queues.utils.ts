/**
 * Queues utility functions for Open Studio
 * PostgreSQL message queue utilities (pgmq)
 */

/**
 * Validates queue name format
 * Queue names must be valid PostgreSQL identifiers
 */
export const isQueueNameValid = (name: string): boolean => {
  if (!name || name.length === 0) return false

  // PostgreSQL identifier rules:
  // - Start with letter or underscore
  // - Can contain letters, digits, underscores, and dollar signs
  // - Max 63 characters
  const validNamePattern = /^[a-zA-Z_][a-zA-Z0-9_$]*$/

  return name.length <= 63 && validNamePattern.test(name)
}

/**
 * Sanitizes queue name to make it valid
 */
export const sanitizeQueueName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9_$]/g, '_')
    .replace(/^[^a-z_]/, '_')
    .slice(0, 63)
}
