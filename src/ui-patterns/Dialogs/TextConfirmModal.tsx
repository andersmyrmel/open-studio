/**
 * TextConfirmModal stub for Open Studio
 * Confirmation dialog that requires user to type a specific text to confirm
 */

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Input,
} from '@/lib/ui'

export interface TextConfirmModalProps {
  visible?: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  confirmString?: string
  confirmLabel?: string
  confirmLabelLoading?: string
  confirmPlaceholder?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  loading?: boolean
  variant?: 'default' | 'destructive' | 'warning'
  size?: 'tiny' | 'small' | 'medium' | 'large'
  children?: React.ReactNode
  text?: React.ReactNode
  alert?: React.ReactNode | { title?: React.ReactNode; description?: React.ReactNode }
}

const TextConfirmModal = ({
  visible = false,
  title,
  description,
  confirmString = '',
  confirmLabel = 'Confirm',
  confirmLabelLoading = 'Loading...',
  confirmPlaceholder = 'Type to confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  variant = 'default',
  size = 'medium',
  children,
}: TextConfirmModalProps) => {
  const [inputValue, setInputValue] = useState('')
  const isConfirmEnabled = inputValue === confirmString

  const handleConfirm = () => {
    if (isConfirmEnabled && !loading) {
      onConfirm?.()
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setInputValue('')
      onCancel?.()
    }
  }

  return (
    <AlertDialog open={visible} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          {children}
          <div>
            <Input
              type="text"
              placeholder={confirmPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!isConfirmEnabled || loading}
            className={variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
          >
            {loading ? confirmLabelLoading : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TextConfirmModal
