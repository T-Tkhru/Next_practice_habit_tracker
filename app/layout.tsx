import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '習慣トラッカー',
  description: '毎日の習慣を記録するアプリ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <nav className="border-b px-6 py-3 flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:underline">今日の習慣</Link>
          <Link href="/habits" className="hover:underline">習慣を管理</Link>
          <Link href="/history" className="hover:underline">達成履歴</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
