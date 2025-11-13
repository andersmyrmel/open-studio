/**
 * Constants for shadcn UI components
 */

export const INPUT_MAX_LENGTH = 5000
export const TEXTAREA_MAX_LENGTH = 10000

/**
 * Size variants for UI components
 */
export const SIZE_VARIANTS = {
  tiny: 'h-6 px-2 py-1 text-xs',
  small: 'h-8 px-3 py-1.5 text-sm',
  medium: 'h-10 px-4 py-2 text-base',
  large: 'h-12 px-5 py-3 text-lg',
  xlarge: 'h-14 px-6 py-3.5 text-xl',
} as const

export const SIZE_VARIANTS_DEFAULT = 'small' as const
