/**
 * Config query keys for Open Studio
 */

export const configKeys = {
  settings: (projectRef: string | undefined) => ['projects', projectRef, 'config', 'settings'] as const,
  api: (projectRef: string | undefined) => ['projects', projectRef, 'config', 'api'] as const,
  upgradeEligibility: (projectRef: string | undefined) => ['projects', projectRef, 'upgrade-eligibility'] as const,
}
