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
}

export default defaultTheme
