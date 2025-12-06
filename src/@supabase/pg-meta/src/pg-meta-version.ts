import { z } from 'zod'
import { VERSION_SQL } from './sql/version'

export const pgVersionZod = z.object({
  version: z.string(),
  version_number: z.number(),
  active_connections: z.number(),
  max_connections: z.number(),
})

export type PGVersion = z.infer<typeof pgVersionZod>

function retrieve() {
  return {
    sql: VERSION_SQL,
    zod: pgVersionZod,
  }
}

export default {
  retrieve,
  zod: pgVersionZod,
}
