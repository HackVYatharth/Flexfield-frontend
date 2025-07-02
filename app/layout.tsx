import type { Metadata } from 'next'
import { AuthProvider } from './_context/AuthContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlexField',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
