/**
 * Functions API Route
 *
 * Replaces Supabase's /platform/pg-meta/{ref}/functions endpoint
 * with direct PostgreSQL queries to pg_catalog.
 */

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface Function {
  id: number
  schema: string
  name: string
  language: string
  definition: string
  argument_types: string
  return_type: string
  security_definer: boolean
  config_params: Record<string, string> | null
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includedSchemas = searchParams.get('included_schemas')

    let schemaFilter = ''
    if (includedSchemas) {
      schemaFilter = `AND n.nspname = ANY($1::text[])`
    }

    const functionsQuery = `
      SELECT
        p.oid::int AS id,
        n.nspname AS schema,
        p.proname AS name,
        l.lanname AS language,
        pg_get_functiondef(p.oid) AS definition,
        pg_get_function_arguments(p.oid) AS argument_types,
        pg_get_function_result(p.oid) AS return_type,
        p.prosecdef AS security_definer,
        p.proconfig AS config_params
      FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
      JOIN pg_language l ON l.oid = p.prolang
      WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
        AND n.nspname NOT LIKE 'pg_temp_%'
        ${schemaFilter}
      ORDER BY n.nspname, p.proname
    `

    const result = includedSchemas
      ? await query<Function>(functionsQuery, [includedSchemas.split(',').map(s => s.trim())])
      : await query<Function>(functionsQuery)

    return NextResponse.json(result.rows, { status: 200 })
  } catch (error: any) {
    console.error('Functions query error:', error)

    return NextResponse.json(
      {
        error: 'Database error',
        message: error.message || 'Failed to fetch functions',
      },
      { status: 500 }
    )
  }
}
