import Link from "next/link";
import React from "react";
import Navbar from "../components/Navbar";
import Timer from "../components/pllTimer.jsx";

export default function page() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper">
      <Navbar />
      <main className="flex min-h-0 flex-1 flex-col px-3 py-3 sm:px-6">
        <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-3">
          <div className="flex shrink-0 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">PLL Trainer</h1>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Link
                href="/beginnerPll"
                className="underline underline-offset-4 hover:text-muted"
              >
                Beginner PLL (6)
              </Link>
              <span className="text-muted">•</span>
              <Link
                href="/pllAlgorithm"
                className="underline underline-offset-4 hover:text-muted"
              >
                Full PLL (21)
              </Link>
            </div>
          </div>

          <Timer />
        </div>
      </main>
    </div>
  );
}
