import React from 'react'
import { Loader2 } from 'lucide-react'
import styleHandler from 'lib/theme/styleHandler'
import { cn } from '@/lib/utils/cn'

interface Props {
  children: React.ReactNode
  active: boolean
  isFullHeight?: boolean
}
export default function Loading({ children, active, isFullHeight = false }: Props) {
  const __styles = styleHandler('loading')

  const classNames = [__styles.base]

  const contentClasses = [__styles.content.base]

  if (active) {
    contentClasses.push(__styles.content.active)
  }

  const spinnerClasses = [__styles.spinner]

  return (
    <div className={cn(classNames.join(' '), isFullHeight && 'h-full')}>
      <div className={cn(contentClasses.join(' '), isFullHeight && 'h-full')}>{children}</div>
      {active && <Loader2 size={24} className={spinnerClasses.join(' ')} />}
    </div>
  )
}
