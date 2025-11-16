/**
 * Privileges query keys for Open Studio
 */

export const privilegesKeys = {
  columnPrivileges: (projectRef: string | undefined, schema?: string, table?: string) =>
    ['projects', projectRef, 'privileges', 'columns', schema, table].filter(Boolean) as const,
  columnPrivilegesList: (projectRef: string | undefined, schema?: string, table?: string) =>
    ['projects', projectRef, 'privileges', 'columns', schema, table].filter(Boolean) as const,
  tablePrivileges: (projectRef: string | undefined, schema?: string) =>
    ['projects', projectRef, 'privileges', 'tables', schema].filter(Boolean) as const,
  tablePrivilegesList: (projectRef: string | undefined, schema?: string) =>
    ['projects', projectRef, 'privileges', 'tables', schema].filter(Boolean) as const,
}

// Alias for backwards compatibility (singular form)
export const privilegeKeys = privilegesKeys
