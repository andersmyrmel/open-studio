/**
 * React Query keys for content queries
 */

export const contentKeys = {
  list: (projectRef?: string) => ['content', projectRef] as const,
  content: (id?: string) => ['content', id] as const,
  folders: (projectRef?: string) => ['content', 'folders', projectRef] as const,
  snippets: (projectRef?: string) => ['content', 'snippets', projectRef] as const,
}
