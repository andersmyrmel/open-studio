/**
 * Roles API Route
 *
 * Replaces Supabase's /platform/pg-meta/{ref}/roles endpoint
 * with direct PostgreSQL queries to pg_catalog.
 */

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface Role {
  id: number
  name: string
  is_superuser: boolean
  can_create_db: boolean
  can_create_role: boolean
  inherit_role: boolean
  can_login: boolean
  is_replication_role: boolean
  can_bypass_rls: boolean
  connection_limit: number
  password: string | null
  valid_until: string | null
  config: string[] | null
}

export async function GET(request: NextRequest) {
  try {
    const rolesQuery = `
      SELECT
        oid::int AS id,
        rolname AS name,
        rolsuper AS is_superuser,
        rolcreatedb AS can_create_db,
        rolcreaterole AS can_create_role,
        rolinherit AS inherit_role,
        rolcanlogin AS can_login,
        rolreplication AS is_replication_role,
        rolbypassrls AS can_bypass_rls,
        rolconnlimit AS connection_limit,
        '********' AS password,
        rolvaliduntil AS valid_until,
        rolconfig AS config
      FROM pg_roles
      ORDER BY rolname
    `

    const result = await query<Role>(rolesQuery)

    return NextResponse.json(result.rows, { status: 200 })
  } catch (error: any) {
    console.error('Roles query error:', error)

    return NextResponse.json(
      {
        error: 'Database error',
        message: error.message || 'Failed to fetch roles',
      },
      { status: 500 }
    )
  }
}
