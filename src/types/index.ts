/**
 * Common type definitions used throughout Open Studio
 * Extracted from Supabase Studio monorepo
 */

import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

// ============================================================================
// Common Utility Types
// ============================================================================

/**
 * Generic dictionary/map type
 */
export interface Dictionary<T> {
  [Key: string]: T
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Custom error class for API responses
 */
export class ResponseError extends Error {
  code?: number
  requestId?: string
  retryAfter?: number
  requestPathname?: string

  constructor(message: string, code?: number, requestId?: string, retryAfter?: number, requestPathname?: string) {
    super(message)
    this.name = 'ResponseError'
    this.code = code
    this.requestId = requestId
    this.retryAfter = retryAfter
    this.requestPathname = requestPathname
  }
}

// ============================================================================
// React Query Custom Types
// ============================================================================

/**
 * Custom query options extending react-query's UseQueryOptions
 */
export type UseCustomQueryOptions<
  TData = unknown,
  TError = ResponseError,
  TQueryFnData = TData,
  TQueryKey extends readonly unknown[] = readonly unknown[]
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>

/**
 * Custom mutation options extending react-query's UseMutationOptions
 */
export type UseCustomMutationOptions<
  TData = unknown,
  TError = ResponseError,
  TVariables = void,
  TContext = unknown
> = UseMutationOptions<TData, TError, TVariables, TContext>

// ============================================================================
// Organization Types
// ============================================================================

export interface Organization {
  id: number
  slug: string
  name: string
  billing_email?: string
  is_owner?: boolean
  stripe_customer_id?: string
  opt_in_tags?: never[]
  plan?: {
    id: string
    name: string
  }
}

// ============================================================================
// SQL Editor Types
// ============================================================================

/**
 * User content types (SQL snippets, folders, etc.)
 */
export interface UserContent<T = any> {
  id: string
  name: string
  description?: string
  type: 'sql' | 'folder' | 'query' | 'snippet'
  content?: T
  visibility: 'user' | 'project' | 'public'
  owner_id?: number
  project_id?: number
  created_at?: string
  updated_at?: string
  folder_id?: string | null
}

export interface SqlSnippet {
  id: string
  name: string
  description?: string
  content: {
    content_id: string
    sql: string
    schema_version?: string
    favorite?: boolean
  }
  visibility?: 'user' | 'project' | 'org'
  owner_id?: number
  project_id?: number
  created_at?: string
  updated_at?: string
}

export namespace SqlSnippets {
  export interface Content {
    content_id: string
    sql: string
    schema?: string
    favorite?: boolean
    chart?: any
  }
}

export interface SqlSnippets {
  [id: string]: SqlSnippet
}

// ============================================================================
// Database Types
// ============================================================================

export interface Database {
  id: number
  ref: string
  name: string
  status: string
  host?: string
  inserted_at?: string
}

export interface Project {
  id: number
  ref: string
  name: string
  organization_id: number
  cloud_provider?: string
  region?: string
  status?: string
}
