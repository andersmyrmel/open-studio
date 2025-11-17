/**
 * Theme style handler for Open Studio
 * Handles dynamic theming and style management
 */

import { useContext } from 'react'
import defaultTheme from '@/lib/ui/lib/theme/defaultTheme'
import { ThemeContext } from '@/lib/ui/components/ThemeProvider/ThemeProvider'

export default function useStyleHandler(target: string) {
  let {
    theme: { [target]: __styles },
  }: any = useContext(ThemeContext)

  if (!__styles) __styles = defaultTheme[target as keyof typeof defaultTheme]

  // Normalize whitespace in CSS class strings
  __styles = JSON.stringify(__styles).replace(/\\n/g, '').replace(/\s\s+/g, ' ')
  __styles = JSON.parse(__styles)

  return __styles
}

// Export as both names for backward compatibility
export const styleHandler = useStyleHandler
export const getStyleHandler = () => useStyleHandler
