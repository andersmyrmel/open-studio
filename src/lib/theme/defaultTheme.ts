/**
 * Default theme for Open Studio
 */

export interface Theme {
  name: string
  colors: {
    background: string
    foreground: string
    primary: string
    secondary: string
    accent: string
    muted: string
    border: string
    [key: string]: string
  }
  alert: {
    variant: {
      [key: string]: {
        base: string
        icon?: string
      }
    }
  }
}

export const defaultTheme: Theme = {
  name: 'default',
  colors: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(240 10% 3.9%)',
    primary: 'hsl(142.1 76.2% 36.3%)',
    secondary: 'hsl(240 4.8% 95.9%)',
    accent: 'hsl(240 4.8% 95.9%)',
    muted: 'hsl(240 4.8% 95.9%)',
    border: 'hsl(240 5.9% 90%)',
  },
  alert: {
    variant: {
      success: { base: 'bg-green-50 text-green-900 border-green-200' },
      danger: { base: 'bg-red-50 text-red-900 border-red-200' },
      warning: { base: 'bg-yellow-50 text-yellow-900 border-yellow-200' },
      info: { base: 'bg-blue-50 text-blue-900 border-blue-200' },
      neutral: { base: 'bg-gray-50 text-gray-900 border-gray-200' },
    },
  },
}

export default defaultTheme
