/**
 * ConfirmationModal stub for Open Studio
 * Minimal implementation using shadcn/ui components
 */

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/lib/ui/alert-dialog'
import { Button } from '@/lib/ui'

export interface ConfirmationModalProps {
  visible?: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  size?: 'tiny' | 'small' | 'medium' | 'large'
  variant?: 'default' | 'destructive' | 'warning'
  confirmLabel?: string
  confirmLabelLoading?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  loading?: boolean
  disabled?: boolean
  children?: React.ReactNode
}

const ConfirmationModal = ({
  visible = false,
  title,
  description,
  size = 'medium',
  variant = 'default',
  confirmLabel = 'Confirm',
  confirmLabelLoading = 'Loading...',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  disabled = false,
  children,
}: ConfirmationModalProps) => {
  return (
    <AlertDialog open={visible} onOpenChange={(open) => !open && onCancel?.()}>
      <AlertDialogContent className={`sm:max-w-${size === 'small' ? 'sm' : size === 'large' ? 'xl' : 'md'}`}>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        {children && <div className="py-4">{children}</div>}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={disabled || loading}
            className={variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
          >
            {loading ? confirmLabelLoading : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmationModal
