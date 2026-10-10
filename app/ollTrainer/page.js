import Link from "next/link";
import React from "react";
import Navbar from "../components/Navbar";
import Timer from "../components/ollTimer.jsx";

export default function page() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <main className="min-h-0 flex-1 px-4 py-4 sm:px-6">
        <div className="mx-auto flex h-full max-w-6xl flex-col gap-4">
          <div className="flex flex-wrap items-baseline gap-x-4">
            <h1 className="text-3xl font-bold tracking-tight">OLL Trainer</h1>
            <Link
              href="/ollAlgorithm"
              className="font-semibold underline underline-offset-4"
            >
              View all algorithms
            </Link>
          </div>

          <Timer />
        </div>
      </main>
    </div>
  );
}
