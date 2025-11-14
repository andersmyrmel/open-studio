/**
 * Type declarations for dayjs with utc and timezone plugins
 */

import 'dayjs'

declare module 'dayjs' {
  interface Dayjs {
    utc(keepLocalTime?: boolean): Dayjs
    tz(timezone?: string, keepLocalTime?: boolean): Dayjs
  }

  export function utc(
    date?: string | number | Date | Dayjs,
    format?: string,
    strict?: boolean
  ): Dayjs

  export function utc(date?: string | number | Date | Dayjs, strict?: boolean): Dayjs

  export function tz(
    date?: string | number | Date | Dayjs,
    timezone?: string
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
