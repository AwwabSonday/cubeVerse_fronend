"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/trainer");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
          Log in
        </h1>
        <p className="mt-1 text-sm text-muted">
          Ready for your next sub-X solve? Log in to sync stats.
        </p>
      </div>

      {error && (
        <div className="mb-3 rounded-md border-2 border-cube-red bg-cube-red/10 px-3 py-2 text-xs font-semibold text-cube-red">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="email" className="mb-1 block font-semibold text-xs sm:text-sm">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="cubemaster@domain.com"
            required
            className="w-full rounded-md border-2 border-ink bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none"
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="password" className="font-semibold text-xs sm:text-sm">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-muted underline hover:text-ink"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              required
              className="w-full rounded-md border-2 border-ink bg-white px-3.5 py-2.5 pr-14 text-sm text-ink placeholder:text-muted focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted hover:text-ink"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full rounded-md border-2 border-ink bg-ink py-2.5 px-4 text-sm font-bold text-paper shadow-[3px_3px_0px_0px_rgba(27,26,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="pt-1 text-center text-xs sm:text-sm text-muted">
          New solver?{" "}
          <Link
            href="/register"
            className="font-bold text-ink underline underline-offset-2 hover:text-muted"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
