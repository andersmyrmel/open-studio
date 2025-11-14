/**
 * Type declarations for dayjs with utc and timezone plugins
 */

import type { Dayjs } from 'dayjs'

declare module 'dayjs' {
  interface Dayjs {
    utc(keepLocalTime?: boolean): Dayjs
    tz(timezone?: string, keepLocalTime?: boolean): Dayjs
    utcOffset(offset?: number | string, keepLocalTime?: boolean): Dayjs | number
  }

  namespace Dayjs {
    function utc(
      date?: string | number | Date | Dayjs,
      format?: string,
      strict?: boolean
    ): Dayjs

    function tz(
      date?: string | number | Date | Dayjs,
      format?: string,
      timezone?: string
    ): Dayjs

    namespace tz {
      function guess(): string
    }
  }

  export function utc(
    date?: string | number | Date | Dayjs,
    format?: string,
    strict?: boolean
  ): Dayjs

  export function tz(
    date?: string | number | Date | Dayjs,
    format?: string,
    timezone?: string
  ): Dayjs

  namespace tz {
    function guess(): string
  }
}
