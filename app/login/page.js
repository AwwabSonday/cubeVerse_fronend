"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-950 bg-[url('/random/loginBg.png')] bg-cover bg-center bg-no-repeat px-4 py-12">
      {/* Dynamic Dark Gradient Overlay to ensure crisp contrast over the cube background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/95 backdrop-blur-[2px]" />

      {/* Main Glassmorphic Container */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10">
        
        {/* Cube Branding Badge & Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            <svg
              className="h-8 w-8 text-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Isometric Cube Icon */}
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CubeVerse</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Ready for your next sub-X solve? Log in to sync stats.
          </p>
        </div>

        {/* Form */}
        <form action="login.php" method="POST" className="space-y-5">
          {/* Username / Email */}
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Username or Email
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                name="username"
                placeholder="cubemaster or you@domain.com"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-500/80 focus:bg-slate-900/90 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-emerald-400 transition hover:text-emerald-300 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-500/80 focus:bg-slate-900/90 focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-200"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-bold tracking-wide text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition duration-200 hover:from-emerald-400 hover:to-teal-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] active:scale-[0.99]"
          >
            Sign In to CubeVerse
          </button>

          {/* Footer Register Link */}
          <div className="pt-2 text-center">
            <p className="text-sm text-slate-400">
              New solver?{" "}
              <Link
                href="/register"
                className="font-semibold text-emerald-400 transition hover:text-emerald-300 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}