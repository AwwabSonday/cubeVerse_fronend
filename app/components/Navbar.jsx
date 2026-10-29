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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null); // 'oll' | 'pll' | 'trainers' | null

  const navRef = useRef(null);
  const userMenuRef = useRef(null);
  const timeoutRef = useRef(null);

  // Close everything on route change
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(null);
    setUserMenuOpen(false);
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
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
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
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition sm:text-sm ${
              pathname === "/trainer"
                ? "bg-ink text-paper shadow-sm"
                : "text-ink hover:bg-ink/10"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Timer</span>
          </Link>
        </nav>

        {/* Right Actions: Log in / User Profile + Mobile Toggle */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative flex items-center gap-2" ref={userMenuRef}>
              {/* User Profile Pill Trigger */}
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                aria-expanded={userMenuOpen}
                className={`group flex items-center gap-2 rounded-xl border-2 border-ink bg-white py-1 pl-1.5 pr-2.5 text-xs font-bold sm:text-sm shadow-[2px_2px_0px_0px_rgba(27,26,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(27,26,23,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                  userMenuOpen ? "bg-paper/70 ring-2 ring-ink" : ""
                }`}
              >
                {/* Avatar with Status Pip */}
                <div className="relative flex h-7 w-7 items-center justify-center rounded-lg border-2 border-ink bg-cube-yellow font-black text-xs text-ink shadow-[1px_1px_0px_0px_rgba(27,26,23,1)]">
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : user.email?.charAt(0).toUpperCase() || "U"}
                  <span
                    className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-ink bg-emerald-500"
                    title="Active session"
                  />
                </div>

                {/* Username */}
                <span className="max-w-[85px] truncate font-bold text-ink sm:max-w-[125px]">
                  {user.displayName || user.email?.split("@")[0]}
                </span>

                {/* Rotating Chevron */}
                <svg
                  className={`h-3.5 w-3.5 text-muted transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Quick 1-Click Logout Button */}
              <button
                type="button"
                onClick={logout}
                title="Log out"
                className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-white text-muted shadow-[2px_2px_0px_0px_rgba(27,26,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:border-cube-red hover:bg-cube-red hover:text-white hover:shadow-[1px_1px_0px_0px_rgba(27,26,23,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>

              {/* Floating Dropdown Card */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border-2 border-ink bg-white p-3 shadow-[4px_4px_0px_0px_rgba(27,26,23,1)] z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* Profile Header */}
                  <div className="rounded-xl border-2 border-ink/10 bg-paper/60 p-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-cube-yellow text-sm font-black text-ink shadow-[2px_2px_0px_0px_rgba(27,26,23,1)]">
                        {user.displayName
                          ? user.displayName.charAt(0).toUpperCase()
                          : user.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-xs font-black text-ink sm:text-sm">
                            {user.displayName || user.email?.split("@")[0]}
                          </p>
                          <span className="rounded bg-cube-yellow/40 px-1 py-0.2 text-[9px] font-black uppercase text-ink">
                            Cuber
                          </span>
                        </div>
                        <p className="truncate text-[11px] font-medium text-muted">
                          {user.email || "Speed solver"}
                        </p>
                      </div>
                    </div>

                    {/* Quick Stats Pill */}
                    <div className="mt-2.5 grid grid-cols-2 gap-1.5 rounded-lg border border-ink/10 bg-white p-1.5 text-center">
                      <div className="border-r border-ink/10 pr-1">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">Personal Best</span>
                        <span className="text-xs font-black text-ink">
                          {user.bestTime !== null && user.bestTime !== undefined && user.bestTime > 0
                            ? `${(user.bestTime / 1000).toFixed(2)}s`
                            : "--"}
                        </span>
                      </div>
                      <div className="pl-1">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">Solves</span>
                        <span className="text-xs font-black text-ink">
                          {user.solvesCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Links */}
                  <div className="mt-2 space-y-1">
                    <Link
                      href="/trainer"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-ink transition hover:bg-ink/5"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-md border border-ink/20 bg-paper text-xs">⏱️</span>
                      <span>Cube Timer</span>
                    </Link>
                    <Link
                      href="/pllTrainer"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-ink transition hover:bg-ink/5"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-md border border-ink/20 bg-paper text-xs">🧩</span>
                      <span>PLL Trainer</span>
                    </Link>
                    <Link
                      href="/ollTrainer"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-ink transition hover:bg-ink/5"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-md border border-ink/20 bg-paper text-xs">⚡</span>
                      <span>OLL Trainer</span>
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-ink transition hover:bg-ink/5"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-md border border-ink/20 bg-paper text-xs">🔒</span>
                      <span>Change password</span>
                    </Link>
                  </div>

                  <div className="my-2 border-t-2 border-ink/10" />

                  {/* Sign Out Button in Dropdown */}
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-bold text-cube-red transition hover:bg-cube-red/10"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log out
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted/60">Exit</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              aria-current={pathname === "/login" ? "page" : undefined}
              className="rounded-xl border-2 border-ink bg-white px-3.5 py-1.5 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(27,26,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-ink hover:text-paper hover:shadow-[1px_1px_0px_0px_rgba(27,26,23,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:text-sm"
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
              <div className="rounded-xl border-2 border-ink bg-white p-3 shadow-[2px_2px_0px_0px_rgba(27,26,23,1)]">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-ink bg-cube-yellow text-xs font-black text-ink shadow-[1px_1px_0px_0px_rgba(27,26,23,1)]">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || "U"}
                      <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-ink bg-emerald-500" />
                    </div>
                    <div className="min-w-0">
                      <span className="block truncate text-xs font-black text-ink">
                        {user.displayName || user.email?.split("@")[0]}
                      </span>
                      <span className="block truncate text-[11px] font-medium text-muted">
                        {user.email || ""}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border-2 border-cube-red bg-cube-red/10 px-2.5 py-1.5 text-xs font-bold text-cube-red transition hover:bg-cube-red hover:text-white"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Log out</span>
                  </button>
                </div>
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