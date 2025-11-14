/**
 * SQL title generation mutation stub for Open Studio
 * AI-powered SQL query title generation (cloud-only feature)
 */

import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export interface SqlTitleMutationVariables {
  sql: string
}

export async function generateSqlTitle({ sql }: SqlTitleMutationVariables): Promise<string> {
  // Stub: generate simple title from SQL for local mode
  // In cloud, this would use AI to generate a descriptive title

  // Extract first few words or table name
  const cleanSql = sql.trim().toLowerCase()

  if (cleanSql.startsWith('select')) {
    const fromMatch = cleanSql.match(/from\s+([a-z_][a-z0-9_]*)/i)
    if (fromMatch) {
      return `Query ${fromMatch[1]}`
    }
    return 'Select query'
  } else if (cleanSql.startsWith('insert')) {
    return 'Insert query'
  } else if (cleanSql.startsWith('update')) {
    return 'Update query'
  } else if (cleanSql.startsWith('delete')) {
    return 'Delete query'
  } else if (cleanSql.startsWith('create')) {
    return 'Create query'
  }

  return 'SQL query'
}

export function useSqlTitleMutation(
  options?: UseMutationOptions<string, Error, SqlTitleMutationVariables>
) {
  return useMutation<string, Error, SqlTitleMutationVariables>({
    mutationFn: generateSqlTitle,
    ...options,
  })
}

// Alias for backwards compatibility
export const useSqlTitleGenerateMutation = useSqlTitleMutation
