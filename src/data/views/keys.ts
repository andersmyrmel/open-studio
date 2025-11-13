/**
 * Views query keys for Open Studio
 */

export const viewsKeys = {
  list: (projectRef: string | undefined, schema?: string) =>
    ['projects', projectRef, 'views', schema].filter(Boolean) as const,
}
