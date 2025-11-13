/**
 * Subscription utilities stub for Open Studio
 * Cloud-only billing utilities
 */

export type SubscriptionTier = 'free' | 'pro' | 'team' | 'enterprise'

export function getSubscriptionTierName(tier: SubscriptionTier): string {
  const names: Record<SubscriptionTier, string> = {
    free: 'Free',
    pro: 'Pro',
    team: 'Team',
    enterprise: 'Enterprise',
  }
  return names[tier] || 'Unknown'
}

export function isFreeTier(tier: SubscriptionTier): boolean {
  return tier === 'free'
}

export function isPaidTier(tier: SubscriptionTier): boolean {
  return tier !== 'free'
}

export function canUpgrade(currentTier: SubscriptionTier): boolean {
  // In local mode, always return false (no upgrades available)
  return false
}

export function getUpgradeUrl(orgSlug: string): string {
  return `/org/${orgSlug}/billing`
}
