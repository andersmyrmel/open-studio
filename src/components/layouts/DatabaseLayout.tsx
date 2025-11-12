'use client'

import { ReactNode } from 'react'
import { ProductMenu } from '@/components/ui/ProductMenu'
import { DATABASE_MENU } from '@/lib/constants/menu'

interface DatabaseLayoutProps {
  children: ReactNode
  page?: string
}

export function DatabaseLayout({ children, page }: DatabaseLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background-default">
      {/* Sidebar with ProductMenu */}
      <aside className="flex w-64 flex-col border-r border-border-default bg-background-surface-100 overflow-y-auto">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-border-default">
          <Database className="h-5 w-5" />
          <h1 className="text-base font-semibold text-foreground-default">Open Studio</h1>
        </div>
        <div className="flex-1 p-4">
          <ProductMenu page={page} menu={DATABASE_MENU} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}

function Database({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  )
}
