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

// Check if subscription has HIPAA add-on (cloud-only feature)
export function subscriptionHasHipaaAddon(subscription: any): boolean {
  // Stub: HIPAA add-ons not available in local mode
  return false
}

// Get add-ons from subscription (cloud-only feature)
export function getAddons(subscription: any): Array<{ type: string; variant: string }> {
  // Stub: return empty array for local mode
  return []
}
