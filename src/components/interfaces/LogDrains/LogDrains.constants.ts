/**
 * Log drains constants for Open Studio
 * Cloud-only log streaming feature
 */

export const LOG_DRAIN_TYPES = {
  WEBHOOK: 'webhook',
  DATADOG: 'datadog',
  SPLUNK: 'splunk',
  S3: 's3',
} as const

export type LogDrainType = (typeof LOG_DRAIN_TYPES)[keyof typeof LOG_DRAIN_TYPES]

export const LOG_DRAIN_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ERROR: 'error',
} as const

export type LogDrainStatus = (typeof LOG_DRAIN_STATUS)[keyof typeof LOG_DRAIN_STATUS]
