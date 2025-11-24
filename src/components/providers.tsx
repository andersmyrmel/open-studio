'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { getQueryClient } from '@/data/query-client'
import { ThemeProvider } from '@/lib/ui/components/ThemeProvider/ThemeProvider'

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
