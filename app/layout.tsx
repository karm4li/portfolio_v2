import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Your Name — Portfolio',
    template: '%s — Your Name',
  },
  description:
    'Designer, engineer, and curious mind. Building things that matter.',
  openGraph: {
    title: 'Your Name',
    description: 'Designer, engineer, and curious mind.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-[#0a0a0a] font-sans antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
