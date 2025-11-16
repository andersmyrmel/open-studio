import { RingBuffer } from './ringBuffer'

// Minimal Breadcrumb type for Open Studio
type Breadcrumb = {
  message?: string
  category?: string
  level?: string
  timestamp?: number
  data?: Record<string, any>
}

export const MIRRORED_BREADCRUMBS = new RingBuffer<Breadcrumb>(50)

export const getMirroredBreadcrumbs = (): Breadcrumb[] => {
  return MIRRORED_BREADCRUMBS.toArray()
}

let BREADCRUMB_SNAPSHOT: Breadcrumb[] | null = null

export const takeBreadcrumbSnapshot = (): void => {
  BREADCRUMB_SNAPSHOT = getMirroredBreadcrumbs()
}

export const getOwnershipOfBreadcrumbSnapshot = (): Breadcrumb[] | null => {
  const snapshot = BREADCRUMB_SNAPSHOT
  BREADCRUMB_SNAPSHOT = null
  return snapshot
}
