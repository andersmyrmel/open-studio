/**
 * Subscription types for Open Studio
 * Type definitions for billing and subscription management
 */

export type SubscriptionTier = 'free' | 'pro' | 'team' | 'enterprise'

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'incomplete'

export interface SubscriptionPlan {
  id: string
  name: string
  tier: SubscriptionTier
  price_monthly: number
  price_yearly: number
  features: string[]
  limits: {
    max_projects: number
    max_storage_gb: number
    max_bandwidth_gb: number
    max_database_size_gb: number
  }
}

export interface Subscription {
  id: string
  organization_id: string
  plan: SubscriptionPlan
  tier: SubscriptionTier
  status: SubscriptionStatus
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  billing_cycle: 'monthly' | 'yearly'
  payment_method?: {
    type: 'card' | 'paypal'
    last4?: string
    brand?: string
  }
  created_at: string
  updated_at: string
}

export interface Usage {
  projects: number
  storage_gb: number
  bandwidth_gb: number
  database_size_gb: number
}

export interface Invoice {
  id: string
  subscription_id: string
  amount: number
  currency: string
  status: 'paid' | 'pending' | 'failed'
  invoice_date: string
  due_date: string
  pdf_url?: string
}

export const SUBSCRIPTION_TIER_NAMES: Record<SubscriptionTier, string> = {
  free: 'Free',
  pro: 'Pro',
  team: 'Team',
  enterprise: 'Enterprise',
}

export const SUBSCRIPTION_STATUS_LABELS: Record<SubscriptionStatus, string> = {
  active: 'Active',
  trialing: 'Trial',
  past_due: 'Past Due',
  canceled: 'Canceled',
  unpaid: 'Unpaid',
  incomplete: 'Incomplete',
}

export function isSubscriptionActive(subscription: Subscription): boolean {
  return subscription.status === 'active' || subscription.status === 'trialing'
}

export function getSubscriptionTierName(tier: SubscriptionTier): string {
  return SUBSCRIPTION_TIER_NAMES[tier] ?? tier
}

export function getSubscriptionStatusLabel(status: SubscriptionStatus): string {
  return SUBSCRIPTION_STATUS_LABELS[status] ?? status
}

// Project addon variant metadata
export interface ProjectAddonVariantMeta {
  identifier: string
  name: string
  price: number
  features: {
    cpu_cores?: number
    memory_gb?: number
    storage_gb?: number
    connections?: number
  }
}
