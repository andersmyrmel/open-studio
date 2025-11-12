/**
 * Tables API Route
 *
 * This replaces Supabase's /platform/pg-meta/{ref}/tables endpoint
 * with direct PostgreSQL queries to information_schema and pg_catalog.
 */

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface TableColumn {
  id: string
  schema: string
  table: string
  name: string
  format: string
  data_type: string
  is_nullable: boolean
  is_identity: boolean
  identity_generation: string | null
  is_generated: boolean
  is_updatable: boolean
  ordinal_position: number
  default_value: string | null
  comment: string | null
  enums: string[]
}

interface Table {
  id: number
  schema: string
  name: string
  rls_enabled: boolean
  rls_forced: boolean
  replica_identity: string
  bytes: number
  size: string
  live_rows_estimate: number
  dead_rows_estimate: number
  comment: string | null
  columns?: TableColumn[]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeColumns = searchParams.get('include_columns') === 'true'
    const includedSchemas = searchParams.get('included_schemas')

    // Build the WHERE clause for schema filtering
    let schemaFilter = ''
    if (includedSchemas) {
      const schemas = includedSchemas.split(',').map(s => s.trim())
      schemaFilter = `AND n.nspname = ANY($1::text[])`
    }

    // Query to get all tables
    const tablesQuery = `
      SELECT
        c.oid::int AS id,
        n.nspname AS schema,
        c.relname AS name,
        (c.relrowsecurity)::boolean AS rls_enabled,
        (c.relforcerowsecurity)::boolean AS rls_forced,
        CASE c.relreplident
          WHEN 'd' THEN 'DEFAULT'
          WHEN 'n' THEN 'NOTHING'
          WHEN 'f' THEN 'FULL'
          WHEN 'i' THEN 'INDEX'
        END AS replica_identity,
        pg_total_relation_size(c.oid) AS bytes,
        pg_size_pretty(pg_total_relation_size(c.oid)) AS size,
        COALESCE(s.n_live_tup, 0)::bigint AS live_rows_estimate,
        COALESCE(s.n_dead_tup, 0)::bigint AS dead_rows_estimate,
        obj_description(c.oid, 'pg_class') AS comment
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      LEFT JOIN pg_stat_user_tables s ON s.relid = c.oid
      WHERE c.relkind IN ('r', 'p')  -- regular tables and partitioned tables
        AND n.nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        AND n.nspname NOT LIKE 'pg_temp_%'
        AND n.nspname NOT LIKE 'pg_toast_temp_%'
        ${schemaFilter}
      ORDER BY n.nspname, c.relname
    `

    const tablesResult = includedSchemas
      ? await query<Table>(tablesQuery, [includedSchemas.split(',').map(s => s.trim())])
      : await query<Table>(tablesQuery)

    let tables = tablesResult.rows

    // If columns are requested, fetch them for each table
    if (includeColumns && tables.length > 0) {
      const columnsQuery = `
        SELECT
          a.attrelid::text || '.' || a.attnum::text AS id,
          n.nspname AS schema,
          c.relname AS table,
          a.attname AS name,
          format_type(a.atttypid, a.atttypmod) AS format,
          t.typname AS data_type,
          NOT a.attnotnull AS is_nullable,
          a.attidentity != '' AS is_identity,
          CASE a.attidentity
            WHEN 'a' THEN 'ALWAYS'
            WHEN 'd' THEN 'BY DEFAULT'
            ELSE NULL
          END AS identity_generation,
          a.attgenerated != '' AS is_generated,
          pg_catalog.pg_get_expr(ad.adbin, ad.adrelid) AS default_value,
          col_description(a.attrelid, a.attnum) AS comment,
          a.attnum AS ordinal_position,
          CASE
            WHEN t.typtype = 'e' THEN
              ARRAY(
                SELECT enumlabel
                FROM pg_enum
                WHERE enumtypid = t.oid
                ORDER BY enumsortorder
              )
            ELSE ARRAY[]::text[]
          END AS enums,
          true AS is_updatable
        FROM pg_attribute a
        JOIN pg_class c ON c.oid = a.attrelid
        JOIN pg_namespace n ON n.oid = c.relnamespace
        JOIN pg_type t ON t.oid = a.atttypid
        LEFT JOIN pg_attrdef ad ON ad.adrelid = a.attrelid AND ad.adnum = a.attnum
        WHERE c.relkind IN ('r', 'p')
          AND a.attnum > 0
          AND NOT a.attisdropped
          AND n.nspname NOT IN ('pg_catalog', 'information_schema')
          ${schemaFilter.replace('c.relname', 'c.relname')}
        ORDER BY c.oid, a.attnum
      `

      const columnsResult = includedSchemas
        ? await query<TableColumn>(columnsQuery, [includedSchemas.split(',').map(s => s.trim())])
        : await query<TableColumn>(columnsQuery)

      const columnsByTable = new Map<string, TableColumn[]>()
      for (const column of columnsResult.rows) {
        const key = `${column.schema}.${column.table}`
        if (!columnsByTable.has(key)) {
          columnsByTable.set(key, [])
        }
        columnsByTable.get(key)!.push(column)
      }

      // Add columns to tables
      tables = tables.map(table => ({
        ...table,
        columns: columnsByTable.get(`${table.schema}.${table.name}`) || []
      }))
    }

    return NextResponse.json(tables, { status: 200 })
  } catch (error: any) {
    console.error('Tables query error:', error)

    return NextResponse.json(
      {
        error: 'Database error',
        message: error.message || 'Failed to fetch tables',
      },
      { status: 500 }
    )
  }
}
