/**
 * ThemeProvider stub for Open Studio
 */

import React, { createContext } from 'react'
import defaultTheme from '../../lib/theme/defaultTheme'

export interface ThemeContextValue {
  theme: any
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: defaultTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
