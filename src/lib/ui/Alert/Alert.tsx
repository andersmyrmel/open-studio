'use client'

import React, { useState } from 'react'

import styleHandler from 'lib/theme/styleHandler'
import { AlertOctagon, CheckCircle, AlertTriangle, Info, X } from 'lucide-react'

export interface AlertProps {
  variant?: AlertVariant
  className?: string
  title: string | React.ReactNode
  withIcon?: boolean
  closable?: boolean
  children?: React.ReactNode
  icon?: React.ReactNode
  actions?: React.ReactNode
}

export type AlertVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral'

const icons: Record<AlertVariant, React.ReactElement> = {
  danger: <AlertOctagon strokeWidth={1.5} size={18} />,
  success: <CheckCircle strokeWidth={1.5} size={18} />,
  warning: <AlertTriangle strokeWidth={1.5} size={18} />,
  info: <Info strokeWidth={1.5} size={18} />,
  neutral: <></>,
}

/**
 * @deprecated Use `import { Alert_Shadcn_ } from "ui"` instead. For studio use `Admonition`
 */
export function Alert({
  variant = 'neutral',
  className,
  title,
  withIcon,
  closable,
  children,
  icon,
  actions,
}: AlertProps) {
  const __styles = styleHandler('alert')

  const [visible, setVisible] = useState(true)

  const containerClasses = [__styles.base]
  containerClasses.push(__styles.variant[variant].base)

  if (className) containerClasses.push(className)

  const descriptionClasses = [__styles.description, __styles.variant[variant].description]
  const closeButtonClasses = [__styles.close]

  return (
    <>
      {visible && (
        <div className={containerClasses.join(' ')}>
          {withIcon ? (
            <div className={__styles.variant[variant].icon}>{withIcon && icons[variant]}</div>
          ) : null}
          {icon && icon}
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h3 className={[__styles.variant[variant].header, __styles.header].join(' ')}>
                {title}
              </h3>
              <div className={descriptionClasses.join(' ')}>{children}</div>
            </div>
            {actions}
          </div>
          {closable && (
            <button
              aria-label="Close alert"
              onClick={() => setVisible(false)}
              className={closeButtonClasses.join(' ')}
            >
              <X strokeWidth={2} size={16} />
            </button>
          )}
        </div>
      )}
    </>
  )
}
