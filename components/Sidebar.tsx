'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: '今日', href: '/' },
  { label: '習慣管理', href: '/habits' },
  { label: '履歴', href: '/history' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* デスクトップ: サイドバー */}
      <aside className="hidden md:flex w-48 border-r flex-col">
        <div className="px-5 py-4 border-b font-medium text-sm">HabitLog</div>
        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded text-sm ${
                pathname === item.href
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* モバイル: ボトムナビ */}
      <nav className="fixed bottom-0 left-0 right-0 flex md:hidden border-t bg-background z-10">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 py-3 text-center text-xs ${
              pathname === item.href
                ? 'text-primary font-medium'
                : 'text-muted-foreground'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
