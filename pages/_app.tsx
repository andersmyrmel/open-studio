import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/pages'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NuqsAdapter>
      <div className={inter.className}>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </div>
    </NuqsAdapter>
  )
}
