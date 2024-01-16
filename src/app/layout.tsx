import '~/styles/globals.css'

import { Inter } from 'next/font/google'
import { headers } from 'next/headers'

import { TRPCReactProvider } from '~/trpc/react'
import { NextThemeProvider } from '../components/common/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Nutripod',
  description: 'Application generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} max-h-screen`}>
        <NextThemeProvider attribute="class" defaultTheme="dark">
          <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        </NextThemeProvider>
      </body>
    </html>
  )
}
