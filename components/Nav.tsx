'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Writing' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#e8e8e8]">
      <nav className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight hover:opacity-60 transition-opacity duration-150"
        >
          Your Name
        </Link>

        <ul className="flex items-center gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'text-sm transition-opacity duration-150',
                  pathname === href || pathname.startsWith(href + '/')
                    ? 'text-[#0a0a0a] font-medium'
                    : 'text-[#737373] hover:text-[#0a0a0a]'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
