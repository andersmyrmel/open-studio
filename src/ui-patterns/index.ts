/**
 * ui-patterns barrel export
 * Central export point for all ui-patterns components
 */

// Dialogs
export { default as ConfirmationModal } from './Dialogs/ConfirmationModal'
export type { ConfirmationModalProps } from './Dialogs/ConfirmationModal'

export { default as TextConfirmModal } from './Dialogs/TextConfirmModal'
export type { TextConfirmModalProps } from './Dialogs/TextConfirmModal'

export { default as ConfirmDialog } from './Dialogs/ConfirmDialog'
export type { ConfirmDialogProps } from './Dialogs/ConfirmDialog'

// Inputs
export { Input } from './DataInputs/Input'
export type { InputProps } from './DataInputs/Input'

// Loaders
export { default as ShimmeringLoader, GenericSkeletonLoader } from './ShimmeringLoader'
export type { ShimmeringLoaderProps, GenericSkeletonLoaderProps } from './ShimmeringLoader'

// Form components
export { FormItemLayout } from './form/FormItemLayout/FormItemLayout'
export type { FormItemLayoutProps } from './form/FormItemLayout/FormItemLayout'

export { FormLayout } from './form/Layout/FormLayout'
export type { FormLayoutProps } from './form/Layout/FormLayout'

// Utilities
export { InfoTooltip } from './info-tooltip'
export type { InfoTooltipProps } from './info-tooltip'

export { ComputeBadge } from './ComputeBadge'
export type { ComputeBadgeProps } from './ComputeBadge'

// Admonition
export { Admonition } from './Admonition'
export type { AdmonitionProps } from './Admonition'

// Timestamp
export { TimestampInfo, timestampLocalFormatter } from './TimestampInfo'
export type { TimestampInfoProps } from './TimestampInfo'

// MultiSelect (deprecated)
export { default as MultiSelect, MultiSelectV2 } from './MultiSelectDeprecated'
export type { MultiSelectProps, MultiSelectOption } from './MultiSelectDeprecated'
