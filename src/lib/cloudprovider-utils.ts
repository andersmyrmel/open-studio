/**
 * Cloud provider utilities for Open Studio
 * Handles cloud provider identification and region mapping
 */

export type CloudProvider = 'AWS' | 'GCP' | 'Azure' | 'Fly' | 'local'

export interface Region {
  key: string
  name: string
  displayName: string
  provider: CloudProvider
  location: string
}

export const PROVIDERS: Record<CloudProvider, { name: string; displayName: string }> = {
  AWS: { name: 'AWS', displayName: 'Amazon Web Services' },
  GCP: { name: 'GCP', displayName: 'Google Cloud Platform' },
  Azure: { name: 'Azure', displayName: 'Microsoft Azure' },
  Fly: { name: 'Fly', displayName: 'Fly.io' },
  local: { name: 'local', displayName: 'Local' },
}

export const REGIONS: Region[] = [
  {
    key: 'us-east-1',
    name: 'us-east-1',
    displayName: 'US East (N. Virginia)',
    provider: 'AWS',
    location: 'Virginia, USA',
  },
  {
    key: 'us-west-1',
    name: 'us-west-1',
    displayName: 'US West (N. California)',
    provider: 'AWS',
    location: 'California, USA',
  },
  {
    key: 'eu-west-1',
    name: 'eu-west-1',
    displayName: 'EU West (Ireland)',
    provider: 'AWS',
    location: 'Dublin, Ireland',
  },
  {
    key: 'local',
    name: 'local',
    displayName: 'Local',
    provider: 'local',
    location: 'Localhost',
  },
]

export function getCloudProvider(region: string): CloudProvider {
  const foundRegion = REGIONS.find((r) => r.key === region)
  return foundRegion?.provider ?? 'local'
}

export function getCloudProviderDisplayName(provider: CloudProvider): string {
  return PROVIDERS[provider]?.displayName ?? provider
}

export function getRegionDisplayName(regionKey: string): string {
  const region = REGIONS.find((r) => r.key === regionKey)
  return region?.displayName ?? regionKey
}

export function getRegion(regionKey: string): Region | undefined {
  return REGIONS.find((r) => r.key === regionKey)
}

export function getRegionsByProvider(provider: CloudProvider): Region[] {
  return REGIONS.filter((r) => r.provider === provider)
}
