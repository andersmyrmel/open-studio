/**
 * Triggers API Route
 *
 * Replaces Supabase's /platform/pg-meta/{ref}/triggers endpoint
 * with direct PostgreSQL queries to pg_catalog.
 */

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface Trigger {
  id: number
  table_id: number
  table_schema: string
  table_name: string
  name: string
  enabled_mode: string
  function_schema: string
  function_name: string
  function_args: string[]
  orientation: string
  activation: string
  events: string[]
  condition: string | null
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includedSchemas = searchParams.get('included_schemas')

    let schemaFilter = ''
    if (includedSchemas) {
      schemaFilter = `AND n.nspname = ANY($1::text[])`
    }

    const triggersQuery = `
      SELECT
        t.oid::int AS id,
        c.oid::int AS table_id,
        n.nspname AS table_schema,
        c.relname AS table_name,
        t.tgname AS name,
        CASE t.tgenabled
          WHEN 'O' THEN 'ORIGIN'
          WHEN 'D' THEN 'DISABLED'
          WHEN 'R' THEN 'REPLICA'
          WHEN 'A' THEN 'ALWAYS'
          ELSE 'ENABLED'
        END AS enabled_mode,
        np.nspname AS function_schema,
        p.proname AS function_name,
        t.tgargs AS function_args,
        CASE WHEN t.tgtype & 1 = 1 THEN 'ROW' ELSE 'STATEMENT' END AS orientation,
        CASE
          WHEN t.tgtype & 2 = 2 THEN 'BEFORE'
          WHEN t.tgtype & 64 = 64 THEN 'INSTEAD OF'
          ELSE 'AFTER'
        END AS activation,
        array_remove(ARRAY[
          CASE WHEN t.tgtype & 4 = 4 THEN 'INSERT' END,
          CASE WHEN t.tgtype & 8 = 8 THEN 'DELETE' END,
          CASE WHEN t.tgtype & 16 = 16 THEN 'UPDATE' END,
          CASE WHEN t.tgtype & 32 = 32 THEN 'TRUNCATE' END
        ], NULL) AS events,
        pg_get_triggerdef(t.oid) AS condition
      FROM pg_trigger t
      JOIN pg_class c ON c.oid = t.tgrelid
      JOIN pg_namespace n ON n.oid = c.relnamespace
      JOIN pg_proc p ON p.oid = t.tgfoid
      JOIN pg_namespace np ON np.oid = p.pronamespace
      WHERE NOT t.tgisinternal
        AND n.nspname NOT IN ('pg_catalog', 'information_schema')
        ${schemaFilter}
      ORDER BY n.nspname, c.relname, t.tgname
    `

    const result = includedSchemas
      ? await query<Trigger>(triggersQuery, [includedSchemas.split(',').map(s => s.trim())])
      : await query<Trigger>(triggersQuery)

    return NextResponse.json(result.rows, { status: 200 })
  } catch (error: any) {
    console.error('Triggers query error:', error)

    return NextResponse.json(
      {
        error: 'Database error',
        message: error.message || 'Failed to fetch triggers',
      },
      { status: 500 }
    )
  }
}
