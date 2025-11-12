/**
 * Schemas API Route
 *
 * Replaces Supabase's /platform/pg-meta/{ref}/schemas endpoint
 * with direct PostgreSQL queries to pg_catalog.
 */

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface Schema {
  id: number
  name: string
  owner: string
}

export async function GET(request: NextRequest) {
  try {
    const schemasQuery = `
      SELECT
        oid::int AS id,
        nspname AS name,
        pg_get_userbyid(nspowner) AS owner
      FROM pg_namespace
      WHERE nspname NOT IN ('pg_toast', 'pg_catalog', 'information_schema')
        AND nspname NOT LIKE 'pg_temp_%'
        AND nspname NOT LIKE 'pg_toast_temp_%'
      ORDER BY nspname
    `

    const result = await query<Schema>(schemasQuery)

    return NextResponse.json(result.rows, { status: 200 })
  } catch (error: any) {
    console.error('Schemas query error:', error)

    return NextResponse.json(
      {
        error: 'Database error',
        message: error.message || 'Failed to fetch schemas',
      },
      { status: 500 }
    )
  }
}
