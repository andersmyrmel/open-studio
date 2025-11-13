/**
 * TimestampInfo stub for Open Studio
 * Timestamp display and formatting utilities
 */

import React from 'react'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// Extend dayjs with relativeTime plugin for fromNow() support
dayjs.extend(relativeTime)

export interface TimestampInfoProps {
  value?: string | number | Date
  format?: string
  className?: string
  showRelative?: boolean
}

export const TimestampInfo: React.FC<TimestampInfoProps> = ({
  value,
  format = 'YYYY-MM-DD HH:mm:ss',
  className,
  showRelative = false,
}) => {
  if (!value) return null

  const formattedDate = dayjs(value).format(format)
  const relativeDate = dayjs(value).fromNow()

  return (
    <span className={cn('text-sm text-foreground-light', className)}>
      {showRelative ? relativeDate : formattedDate}
    </span>
  )
}

/**
 * Formatter for timestamp fields to local timezone
 */
export const timestampLocalFormatter = (value: string | number | Date | null | undefined): string => {
  if (!value) return ''

  try {
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
  } catch {
    return String(value)
  }
}

export default TimestampInfo
