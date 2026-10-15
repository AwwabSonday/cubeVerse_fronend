import Link from "next/link";
import React from "react";
import Navbar from "../components/Navbar";
import Timer from "../components/pllTimer.jsx";

export default function page() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <h1 className="text-3xl font-bold tracking-tight">PLL Trainer</h1>
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
