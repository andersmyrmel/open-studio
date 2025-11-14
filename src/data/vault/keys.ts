/**
 * Vault secrets keys stub for Open Studio
 * Vault not available in standalone mode
 */

export const vaultSecretsKeys = {
  list: () => ['vault', 'secrets'],
  detail: (id: string) => ['vault', 'secrets', id],
}
