/**
 * SQL Query Execution API Route
 *
 * This replaces Supabase's /platform/pg-meta/{ref}/query endpoint
 * with direct PostgreSQL execution.
 */

import { NextRequest, NextResponse } from 'next/server'
import { query, parsePostgresError } from '@/lib/db/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface QueryRequestBody {
  query: string
  disable_statement_timeout?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: QueryRequestBody = await request.json()
    const { query: sql, disable_statement_timeout = false } = body

    if (!sql || typeof sql !== 'string') {
      return NextResponse.json(
        {
          error: 'Invalid request',
          message: 'Query parameter is required and must be a string',
        },
        { status: 400 }
      )
    }

    // Check SQL size (matching Supabase's 1MB limit)
    const sqlSize = new Blob([sql]).size
    const MB = 1024 * 1024
    if (sqlSize > 0.98 * MB) {
      return NextResponse.json(
        {
          error: 'Query too large',
          message: 'Query is too large to be run via the SQL Editor',
        },
        { status: 413 }
      )
    }

    // Set statement timeout if not disabled
    // Default to 10 seconds for safety
    const statementTimeout = disable_statement_timeout ? 0 : 10000

    // Execute query with timeout
    let result
    try {
      if (statementTimeout > 0) {
        // Set statement timeout for this session
        await query(`SET statement_timeout = ${statementTimeout}`)
      }

      result = await query(sql)

      // Reset statement timeout
      if (statementTimeout > 0) {
        await query(`SET statement_timeout = DEFAULT`)
      }
    } catch (queryError: any) {
      // Reset statement timeout on error
      if (statementTimeout > 0) {
        try {
          await query(`SET statement_timeout = DEFAULT`)
        } catch {
          // Ignore timeout reset errors
        }
      }

      // Parse and return PostgreSQL error
      const parsedError = parsePostgresError(queryError)

      return NextResponse.json(
        {
          ...parsedError,
          message: parsedError.message,
        },
        { status: 400 }
      )
    }

    // Return query results
    return NextResponse.json(result.rows, { status: 200 })
  } catch (error: any) {
    console.error('SQL execution error:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    )
  }
}
