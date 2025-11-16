/**
 * Privileges query keys for Open Studio
 */

export const privilegesKeys = {
  columnPrivileges: (projectRef: string | undefined, schema?: string, table?: string) =>
    ['projects', projectRef, 'privileges', 'columns', schema, table].filter(Boolean),
  columnPrivilegesList: (projectRef: string | undefined, schema?: string, table?: string) =>
    ['projects', projectRef, 'privileges', 'columns', schema, table].filter(Boolean),
  tablePrivileges: (projectRef: string | undefined, schema?: string) =>
    ['projects', projectRef, 'privileges', 'tables', schema].filter(Boolean),
  tablePrivilegesList: (projectRef: string | undefined, schema?: string) =>
    ['projects', projectRef, 'privileges', 'tables', schema].filter(Boolean),
}

// Alias for backwards compatibility (singular form)
export const privilegeKeys = privilegesKeys
