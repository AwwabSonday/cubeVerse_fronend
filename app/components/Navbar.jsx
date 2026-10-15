"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null); // 'oll' | 'pll' | 'trainers' | null
  const navRef = useRef(null);

  // Close dropdown on route navigation
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isOllActive =
    pathname === "/ollAlgorithm" ||
    pathname === "/beginnerOll" ||
    pathname === "/beginner-oll";

  const isPllActive =
    pathname === "/pllAlgorithm" ||
    pathname === "/beginnerPll" ||
    pathname === "/beginner-pll";

  const isTrainersActive =
    pathname === "/ollTrainer" || pathname === "/pllTrainer";

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-x-4 px-4 py-2 sm:px-6">
        {/* Brand / Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/random/logo.png"
            height={36}
            width={36}
            alt="CubeVerse Logo"
            className="rounded-md"
          />
          <span className="text-lg font-bold tracking-tight text-ink sm:text-xl">
            CubeVerse
          </span>
        </Link>

        {/* Compact Navigation Menu */}
        <nav
          ref={navRef}
          aria-label="Main"
          className="flex items-center gap-1 sm:gap-1.5"
        >
          {/* Notation */}
          <Link
            href="/notation"
            aria-current={pathname === "/notation" ? "page" : undefined}
            className={`rounded-md px-2.5 py-1.5 text-xs font-bold transition sm:text-sm ${
              pathname === "/notation"
                ? "bg-ink text-paper"
                : "text-ink hover:bg-ink/10"
            }`}
          >
            Notation
          </Link>

          {/* OLL Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("oll")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("oll")}
              aria-expanded={openDropdown === "oll"}
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-bold transition sm:text-sm ${
                isOllActive || openDropdown === "oll"
                  ? "bg-ink text-paper"
                  : "text-ink hover:bg-ink/10"
              }`}
            >
              <span>OLL</span>
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  openDropdown === "oll" ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openDropdown === "oll" && (
              <div className="absolute left-0 top-full z-50 mt-1.5 w-52 rounded-xl border-2 border-ink bg-white p-1.5 shadow-lg">
                <Link
                  href="/beginnerOll"
                  className={`flex flex-col rounded-lg px-3 py-2 transition ${
                    pathname === "/beginnerOll" || pathname === "/beginner-oll"
                      ? "bg-cube-yellow text-ink font-bold"
                      : "hover:bg-ink/5"
                  }`}
                >
                  <span className="text-xs font-bold sm:text-sm">Beginner OLL</span>
                  <span className="text-[11px] text-muted font-medium">2-Look (10 Algorithms)</span>
                </Link>
                <Link
                  href="/ollAlgorithm"
                  className={`flex flex-col rounded-lg px-3 py-2 transition ${
                    pathname === "/ollAlgorithm"
                      ? "bg-cube-yellow text-ink font-bold"
                      : "hover:bg-ink/5"
                  }`}
                >
                  <span className="text-xs font-bold sm:text-sm">Full OLL</span>
                  <span className="text-[11px] text-muted font-medium">All 57 Cases</span>
                </Link>
                <div className="my-1 border-t border-ink/10" />
                <Link
                  href="/ollTrainer"
                  className={`flex flex-col rounded-lg px-3 py-2 transition ${
                    pathname === "/ollTrainer"
                      ? "bg-cube-yellow text-ink font-bold"
                      : "hover:bg-ink/5"
                  }`}
                >
                  <span className="text-xs font-bold sm:text-sm">OLL Trainer</span>
                  <span className="text-[11px] text-muted font-medium">Timer & Scrambler</span>
                </Link>
              </div>
            )}
          </div>

          {/* PLL Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("pll")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("pll")}
              aria-expanded={openDropdown === "pll"}
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-bold transition sm:text-sm ${
                isPllActive || openDropdown === "pll"
                  ? "bg-ink text-paper"
                  : "text-ink hover:bg-ink/10"
              }`}
            >
              <span>PLL</span>
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  openDropdown === "pll" ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openDropdown === "pll" && (
              <div className="absolute left-0 top-full z-50 mt-1.5 w-52 rounded-xl border-2 border-ink bg-white p-1.5 shadow-lg">
                <Link
                  href="/beginnerPll"
                  className={`flex flex-col rounded-lg px-3 py-2 transition ${
                    pathname === "/beginnerPll" || pathname === "/beginner-pll"
                      ? "bg-cube-yellow text-ink font-bold"
                      : "hover:bg-ink/5"
                  }`}
                >
                  <span className="text-xs font-bold sm:text-sm">Beginner PLL</span>
                  <span className="text-[11px] text-muted font-medium">2-Look (6 Algorithms)</span>
                </Link>
                <Link
                  href="/pllAlgorithm"
                  className={`flex flex-col rounded-lg px-3 py-2 transition ${
                    pathname === "/pllAlgorithm"
                      ? "bg-cube-yellow text-ink font-bold"
                      : "hover:bg-ink/5"
                  }`}
                >
                  <span className="text-xs font-bold sm:text-sm">Full PLL</span>
                  <span className="text-[11px] text-muted font-medium">All 21 Cases</span>
                </Link>
                <div className="my-1 border-t border-ink/10" />
                <Link
                  href="/pllTrainer"
                  className={`flex flex-col rounded-lg px-3 py-2 transition ${
                    pathname === "/pllTrainer"
                      ? "bg-cube-yellow text-ink font-bold"
                      : "hover:bg-ink/5"
                  }`}
                >
                  <span className="text-xs font-bold sm:text-sm">PLL Trainer</span>
                  <span className="text-[11px] text-muted font-medium">Timer & Scrambler</span>
                </Link>
              </div>
            )}
          </div>

          {/* Trainers Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("trainers")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("trainers")}
              aria-expanded={openDropdown === "trainers"}
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-bold transition sm:text-sm ${
                isTrainersActive || openDropdown === "trainers"
                  ? "bg-ink text-paper"
                  : "text-ink hover:bg-ink/10"
              }`}
            >
              <span>Trainers</span>
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  openDropdown === "trainers" ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openDropdown === "trainers" && (
              <div className="absolute left-0 top-full z-50 mt-1.5 w-48 rounded-xl border-2 border-ink bg-white p-1.5 shadow-lg">
                <Link
                  href="/ollTrainer"
                  className={`flex flex-col rounded-lg px-3 py-2 transition ${
                    pathname === "/ollTrainer"
                      ? "bg-cube-yellow text-ink font-bold"
                      : "hover:bg-ink/5"
                  }`}
                >
                  <span className="text-xs font-bold sm:text-sm">OLL Trainer</span>
                  <span className="text-[11px] text-muted font-medium">Beginner & Full</span>
                </Link>
                <Link
                  href="/pllTrainer"
                  className={`flex flex-col rounded-lg px-3 py-2 transition ${
                    pathname === "/pllTrainer"
                      ? "bg-cube-yellow text-ink font-bold"
                      : "hover:bg-ink/5"
                  }`}
                >
                  <span className="text-xs font-bold sm:text-sm">PLL Trainer</span>
                  <span className="text-[11px] text-muted font-medium">Beginner & Full</span>
                </Link>
              </div>
            )}
          </div>

          {/* Timer */}
          <Link
            href="/trainer"
            aria-current={pathname === "/trainer" ? "page" : undefined}
            className={`rounded-md px-2.5 py-1.5 text-xs font-bold transition sm:text-sm ${
              pathname === "/trainer"
                ? "bg-ink text-paper"
                : "text-ink hover:bg-ink/10"
            }`}
          >
            Timer
          </Link>
        </nav>

        {/* Log in Button */}
        <Link
          href="/login"
          aria-current={pathname === "/login" ? "page" : undefined}
          className="shrink-0 rounded-md border-2 border-ink px-3.5 py-1.5 text-xs font-bold transition hover:bg-ink hover:text-paper sm:text-sm"
        >
          Log in
        </Link>
      </div>
    </header>
  );
}