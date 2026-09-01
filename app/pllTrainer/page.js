import Link from 'next/link'
import React from 'react'
import Timer from '../components/pllTimer.jsx';
export default function page() {
  return (
    <>
  <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6">
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
          PLL Trainer
        </h1>

        <Link
          href="/pllAlgorithm"
          className="mt-3 inline-block text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
        >
          Algorithms
        </Link>
      </div>

      {/* Algorithm */}
      <Timer />

    </div>
  </main>
</>
  )
}
