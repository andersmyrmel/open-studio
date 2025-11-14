/**
 * Augment dayjs with static utc and tz methods
 */

import 'dayjs'

declare module 'dayjs' {
  interface Dayjs {
    utc(keepLocalTime?: boolean): Dayjs
    tz(timezone?: string, keepLocalTime?: boolean): Dayjs
  }
}

// Augment default export to have static methods
import dayjs from 'dayjs'

declare module 'dayjs' {
  export interface Dayjs {
    utc(keepLocalTime?: boolean): Dayjs
    tz(timezone?: string, keepLocalTime?: boolean): Dayjs
  }

  export const utc: (
    date?: string | number | Date | Dayjs,
    format?: string,
    strict?: boolean
  ) => Dayjs

  export const tz: (
    date?: string | number | Date | Dayjs,
    format?: string,
    timezone?: string
  ) => Dayjs

  namespace tz {
    function guess(): string
  }
}
