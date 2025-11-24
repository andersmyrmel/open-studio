/**
 * Policies API Route
 *
 * Replaces Supabase's /platform/pg-meta/{ref}/policies endpoint
 * with direct PostgreSQL queries to pg_catalog.
 */

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface Policy {
  id: number
  schema: string
  table: string
  table_id: number
  name: string
  action: string
  roles: string[]
  command: string
  definition: string | null
  check: string | null
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includedSchemas = searchParams.get('included_schemas')

    let schemaFilter = ''
    if (includedSchemas) {
      schemaFilter = `AND n.nspname = ANY($1::text[])`
    }

    const policiesQuery = `
      SELECT
        p.oid::int AS id,
        n.nspname AS schema,
        c.relname AS table,
        c.oid::int AS table_id,
        p.polname AS name,
        CASE p.polcmd
          WHEN 'r' THEN 'SELECT'
          WHEN 'a' THEN 'INSERT'
          WHEN 'w' THEN 'UPDATE'
          WHEN 'd' THEN 'DELETE'
          WHEN '*' THEN 'ALL'
        END AS command,
        CASE
          WHEN p.polroles = '{0}' THEN ARRAY['public']
          ELSE ARRAY(
            SELECT rolname
            FROM pg_roles
            WHERE oid = ANY(p.polroles)
          )
        END AS roles,
        CASE p.polpermissive
          WHEN true THEN 'PERMISSIVE'
          ELSE 'RESTRICTIVE'
        END AS action,
        pg_get_expr(p.polqual, p.polrelid) AS definition,
        pg_get_expr(p.polwithcheck, p.polrelid) AS check
      FROM pg_policy p
      JOIN pg_class c ON c.oid = p.polrelid
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
        ${schemaFilter}
      ORDER BY n.nspname, c.relname, p.polname
    `

    const result = includedSchemas
      ? await query<Policy>(policiesQuery, [includedSchemas.split(',').map(s => s.trim())])
      : await query<Policy>(policiesQuery)

    return NextResponse.json(result.rows, { status: 200 })
  } catch (error: any) {
    console.error('Policies query error:', error)

    return NextResponse.json(
      {
        error: 'Database error',
        message: error.message || 'Failed to fetch policies',
      },
      { status: 500 }
    )
  }
}
