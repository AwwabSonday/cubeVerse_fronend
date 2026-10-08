"use client";

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/notation', label: 'Notation' },
  { href: '/ollAlgorithm', label: 'OLL' },
  { href: '/pllAlgorithm', label: 'PLL' },
  { href: '/ollTrainer', label: 'OLL Trainer' },
  { href: '/pllTrainer', label: 'PLL Trainer' },
  { href: '/trainer', label: 'Timer' },
]

function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b-2 border-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/random/logo.png" height={44} width={44} alt="" className="rounded-md" />
          <span className="text-xl font-bold tracking-tight">CubeVerse</span>
        </Link>

        <Link
          href="/login"
          aria-current={pathname === '/login' ? 'page' : undefined}
          className="rounded-md border-2 border-ink px-4 py-2 font-semibold transition hover:bg-ink hover:text-paper md:order-3"
        >
          Log in
        </Link>

        {/* Scrolls sideways inside itself on narrow screens */}
        <nav aria-label="Main" className="-mx-1 flex w-full gap-1 overflow-x-auto md:order-2 md:mx-0 md:w-auto md:flex-1">
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`whitespace-nowrap rounded-md px-3 py-2 font-semibold transition ${
                  active ? 'bg-ink text-paper' : 'hover:bg-ink/10'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
