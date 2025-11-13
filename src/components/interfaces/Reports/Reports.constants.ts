/**
 * Reports constants stub for Open Studio
 * Reports/Analytics are cloud-only features
 */

import dayjs from 'dayjs'

export enum REPORT_DATERANGE_HELPER_LABELS {
  LAST_60_MINUTES = 'Last 60 minutes',
  LAST_24_HOURS = 'Last 24 hours',
  LAST_7_DAYS = 'Last 7 days',
  LAST_30_DAYS = 'Last 30 days',
}

export interface ReportsDatetimeHelper {
  text: string
  calcFrom: () => string
  calcTo: () => string
  default?: boolean
  disabled?: boolean
  availableIn?: string[]
}

export const REPORTS_DATEPICKER_HELPERS: ReportsDatetimeHelper[] = [
  {
    text: REPORT_DATERANGE_HELPER_LABELS.LAST_60_MINUTES,
    calcFrom: () => dayjs().subtract(60, 'minute').toISOString(),
    calcTo: () => dayjs().toISOString(),
    default: true,
    availableIn: ['free', 'pro', 'team', 'enterprise'],
  },
  {
    text: REPORT_DATERANGE_HELPER_LABELS.LAST_24_HOURS,
    calcFrom: () => dayjs().subtract(24, 'hour').toISOString(),
    calcTo: () => dayjs().toISOString(),
    availableIn: ['free', 'pro', 'team', 'enterprise'],
  },
  {
    text: REPORT_DATERANGE_HELPER_LABELS.LAST_7_DAYS,
    calcFrom: () => dayjs().subtract(7, 'day').toISOString(),
    calcTo: () => dayjs().toISOString(),
    availableIn: ['pro', 'team', 'enterprise'],
  },
  {
    text: REPORT_DATERANGE_HELPER_LABELS.LAST_30_DAYS,
    calcFrom: () => dayjs().subtract(30, 'day').toISOString(),
    calcTo: () => dayjs().toISOString(),
    availableIn: ['team', 'enterprise'],
  },
]
