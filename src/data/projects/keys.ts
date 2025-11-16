/**
 * Project keys stub for Open Studio
 */

export const projectKeys = {
  list: () => ['projects'],
  detail: (ref: string) => ['projects', ref],
  settings: (ref: string) => ['projects', ref, 'settings'],
}
