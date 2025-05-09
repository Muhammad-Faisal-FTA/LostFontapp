import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
// import { AuthProvider } from '@/context/AuthContext'
import Routeloader from '@/components/Routeloader'
// import { UserProvider } from '@/context/UserContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lost and Found app',
  description: 'Lost something? Find lost items or report found belongings with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* rap children in layout */}
        {/* <AuthProvider> */}
        <Navbar />
        <Routeloader />
        {children}
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}
