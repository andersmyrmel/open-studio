/**
 * SupportLink stub for Open Studio
 * Link component for support/contact (no-op in local mode)
 */

import React from 'react'
import Link from 'next/link'

export interface SupportLinkProps {
  children?: React.ReactNode
  queryParams?: {
    orgSlug?: string
    projectRef?: string
    category?: string
    subject?: string
    message?: string
    sid?: string
  }
  className?: string
  href?: string
}

export const SupportLink: React.FC<SupportLinkProps> = ({
  children,
  queryParams,
  className,
  href = '#',
}) => {
  // In local mode, support links don't go anywhere
  // In production Supabase, this would link to support forms
  return (
    <Link href={href} className={className}>
      {children || 'Contact Support'}
    </Link>
  )
}

export default SupportLink
