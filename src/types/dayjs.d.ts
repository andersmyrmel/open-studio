/**
 * Type declarations for dayjs with utc and timezone plugins
 */

import type { Dayjs } from 'dayjs'

// Augment the default export to have static methods
interface TzFunc {
  (date?: string | number | Date | Dayjs, format?: string, timezone?: string): Dayjs
  guess(): string
  setDefault(timezone?: string): void
}

interface DayjsStatic {
  (date?: string | number | Date | Dayjs, format?: string, strict?: boolean): Dayjs
  utc(date?: string | number | Date | Dayjs, format?: string, strict?: boolean): Dayjs
  tz: TzFunc
  extend(plugin: any, option?: any): DayjsStatic
}

declare module 'dayjs' {
  const dayjs: DayjsStatic
  export default dayjs

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

  interface TzFunc {
    (date?: string | number | Date | Dayjs, format?: string, timezone?: string): Dayjs
    guess(): string
    setDefault(timezone?: string): void
  }

  export const tz: TzFunc

  export function extend(plugin: any, option?: any): typeof dayjs
}
