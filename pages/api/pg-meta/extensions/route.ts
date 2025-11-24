/**
 * Extensions API Route
 *
 * Replaces Supabase's /platform/pg-meta/{ref}/extensions endpoint
 * with direct PostgreSQL queries to pg_catalog.
 */

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface Extension {
  name: string
  schema: string | null
  default_version: string
  installed_version: string | null
  comment: string | null
}

export async function GET(request: NextRequest) {
  try {
    // Get all available extensions and their installation status
    const extensionsQuery = `
      SELECT
        ae.name,
        e.extnamespace::regnamespace::text AS schema,
        ae.default_version,
        e.extversion AS installed_version,
        ae.comment
      FROM pg_available_extensions ae
      LEFT JOIN pg_extension e ON e.extname = ae.name
      ORDER BY ae.name
    `

    const result = await query<Extension>(extensionsQuery)

    return NextResponse.json(result.rows, { status: 200 })
  } catch (error: any) {
    console.error('Extensions query error:', error)

    return NextResponse.json(
      {
        error: 'Database error',
        message: error.message || 'Failed to fetch extensions',
      },
      { status: 500 }
    )
  }
}
