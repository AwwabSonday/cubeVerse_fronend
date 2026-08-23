import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
  return (
<nav className="flex items-center justify-between px-8 py-4 shadow-md">
  <Image
    src="/random/logo.png"
    height={70}
    width={70}
    alt="logo"
    className="rounded-full"
  />

  <p className="text-2xl font-bold text-slate-800">
    CubeVerse
  </p>

  <Link
    href="/login"
    className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
  >
    Login
  </Link>
</nav>
  )
}

export default Navbar