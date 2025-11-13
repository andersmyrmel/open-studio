/**
 * Vault query keys for Open Studio
 */

export const vaultKeys = {
  list: (projectRef: string | undefined) => ['projects', projectRef, 'vault'] as const,
  secrets: (projectRef: string | undefined) => ['projects', projectRef, 'vault', 'secrets'] as const,
}
