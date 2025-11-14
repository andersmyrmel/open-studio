/**
 * Vault secrets keys stub for Open Studio
 * Vault not available in standalone mode
 */

export const vaultSecretsKeys = {
  list: (projectRef?: string) => ['projects', projectRef, 'vault', 'secrets'] as const,
  detail: (id: string) => ['vault', 'secrets', id] as const,
}
