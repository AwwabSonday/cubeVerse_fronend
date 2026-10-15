"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null); // 'oll' | 'pll' | 'trainers' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null); // 'oll' | 'pll' | 'trainers' | null

  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  // Close everything on route change
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (key) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileSubmenu = (key) => {
    setMobileSubmenu((prev) => (prev === key ? null : key));
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-x-3 px-4 py-2 sm:px-6">
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

        {/* Desktop Navigation Menu (Visible md: and up) */}
        <nav
          ref={navRef}
          aria-label="Main"
          className="hidden items-center gap-1.5 md:flex"
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
            onMouseEnter={() => handleMouseEnter("oll")}
            onMouseLeave={handleMouseLeave}
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
              <div
                className="absolute left-0 top-full z-50 pt-2"
                onMouseEnter={() => handleMouseEnter("oll")}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-52 rounded-xl border-2 border-ink bg-white p-1.5 shadow-lg before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-['']">
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
              </div>
            )}
          </div>

          {/* PLL Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("pll")}
            onMouseLeave={handleMouseLeave}
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
              <div
                className="absolute left-0 top-full z-50 pt-2"
                onMouseEnter={() => handleMouseEnter("pll")}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-52 rounded-xl border-2 border-ink bg-white p-1.5 shadow-lg before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-['']">
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
              </div>
            )}
          </div>

          {/* Trainers Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("trainers")}
            onMouseLeave={handleMouseLeave}
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
              <div
                className="absolute left-0 top-full z-50 pt-2"
                onMouseEnter={() => handleMouseEnter("trainers")}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-48 rounded-xl border-2 border-ink bg-white p-1.5 shadow-lg before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-['']">
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

        {/* Right Actions: Log in / User Profile + Mobile Toggle */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-md border-2 border-ink bg-white px-2.5 py-1 text-xs font-bold sm:text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cube-yellow text-[10px] font-black text-ink">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || "U"}
                </span>
                <span className="max-w-[90px] truncate sm:max-w-[130px]">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-md border-2 border-ink bg-paper px-2.5 py-1 text-xs font-bold text-muted transition hover:border-cube-red hover:bg-cube-red hover:text-paper sm:text-xs"
                title="Log out"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              aria-current={pathname === "/login" ? "page" : undefined}
              className="rounded-md border-2 border-ink px-3 py-1.5 text-xs font-bold transition hover:bg-ink hover:text-paper sm:px-3.5 sm:text-sm"
            >
              Log in
            </Link>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-ink bg-white text-ink transition hover:bg-ink hover:text-paper md:hidden"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Visible on phones/tablets < md) */}
      {mobileMenuOpen && (
        <div className="border-t-2 border-ink bg-paper px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1.5">
            {/* Notation */}
            <Link
              href="/notation"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                pathname === "/notation" ? "bg-ink text-paper" : "bg-white border border-ink/20 hover:bg-ink/5"
              }`}
            >
              Cube Notations
            </Link>

            {/* OLL Accordion */}
            <div className="overflow-hidden rounded-lg border border-ink/20 bg-white">
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("oll")}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-bold"
              >
                <span>OLL Algorithms</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mobileSubmenu === "oll" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileSubmenu === "oll" && (
                <div className="border-t border-ink/10 bg-paper/50 p-1.5">
                  <Link
                    href="/beginnerOll"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/10"
                  >
                    Beginner OLL (2-Look / 10 cases)
                  </Link>
                  <Link
                    href="/ollAlgorithm"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/10"
                  >
                    Full OLL (57 cases)
                  </Link>
                  <Link
                    href="/ollTrainer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/10"
                  >
                    OLL Trainer
                  </Link>
                </div>
              )}
            </div>

            {/* PLL Accordion */}
            <div className="overflow-hidden rounded-lg border border-ink/20 bg-white">
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("pll")}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-bold"
              >
                <span>PLL Algorithms</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mobileSubmenu === "pll" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileSubmenu === "pll" && (
                <div className="border-t border-ink/10 bg-paper/50 p-1.5">
                  <Link
                    href="/beginnerPll"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/10"
                  >
                    Beginner PLL (2-Look / 6 cases)
                  </Link>
                  <Link
                    href="/pllAlgorithm"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/10"
                  >
                    Full PLL (21 cases)
                  </Link>
                  <Link
                    href="/pllTrainer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/10"
                  >
                    PLL Trainer
                  </Link>
                </div>
              )}
            </div>

            {/* Trainers Accordion */}
            <div className="overflow-hidden rounded-lg border border-ink/20 bg-white">
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("trainers")}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-bold"
              >
                <span>Trainers</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mobileSubmenu === "trainers" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileSubmenu === "trainers" && (
                <div className="border-t border-ink/10 bg-paper/50 p-1.5">
                  <Link
                    href="/ollTrainer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/10"
                  >
                    OLL Trainer
                  </Link>
                  <Link
                    href="/pllTrainer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/10"
                  >
                    PLL Trainer
                  </Link>
                </div>
              )}
            </div>

            {/* Timer */}
            <Link
              href="/trainer"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                pathname === "/trainer" ? "bg-ink text-paper" : "bg-white border border-ink/20 hover:bg-ink/5"
              }`}
            >
              Cube Timer
            </Link>

            <div className="my-1 border-t border-ink/10" />

            {/* Mobile Auth Button */}
            {user ? (
              <div className="flex items-center justify-between rounded-lg border border-ink/20 bg-white p-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cube-yellow text-xs font-black text-ink">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || "U"}
                  </span>
                  <span className="text-xs font-bold text-ink">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-md border border-cube-red/40 bg-cube-red/10 px-2.5 py-1 text-xs font-semibold text-cube-red hover:bg-cube-red hover:text-paper"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center rounded-lg border-2 border-ink bg-ink px-3 py-2 text-sm font-bold text-paper transition hover:bg-muted"
              >
                Log in / Register
              </Link>
            )}
          </div>
        </div>
      )}

    </header>
  );
}