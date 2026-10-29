"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await register(email, password, username);
      router.push("/trainer");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-3">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
          Create account
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-muted">
          Track PB, master algorithms, and level up your solves.
        </p>
      </div>

      {error && (
        <div className="mb-2.5 rounded-md border-2 border-cube-red bg-cube-red/10 px-3 py-1.5 text-xs font-semibold text-cube-red">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div>
          <label htmlFor="username" className="mb-0.5 block font-semibold text-xs sm:text-sm">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            placeholder="cubemaster"
            required
            className="w-full rounded-md border-2 border-ink bg-white px-3.5 py-2 text-xs sm:text-sm text-ink placeholder:text-muted focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-0.5 block font-semibold text-xs sm:text-sm">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
            placeholder="you@domain.com"
            required
            className="w-full rounded-md border-2 border-ink bg-white px-3.5 py-2 text-xs sm:text-sm text-ink placeholder:text-muted focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label htmlFor="pass1" className="mb-0.5 block font-semibold text-xs sm:text-sm">
              Password
            </label>
            <input
              id="pass1"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 chars"
              autoComplete="new-password"
              required
              className="w-full rounded-md border-2 border-ink bg-white px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="pass2" className="mb-0.5 block font-semibold text-xs sm:text-sm">
              Confirm
            </label>
            <input
              id="pass2"
              name="confirm_password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat"
              autoComplete="new-password"
              required
              className="w-full rounded-md border-2 border-ink bg-white px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted focus:outline-none"
            />
          </div>
        </div>

        <button
          id="register"
          type="submit"
          disabled={loading}
          className="mt-1 w-full rounded-md border-2 border-ink bg-ink py-2.5 px-4 text-sm font-bold text-paper shadow-[3px_3px_0px_0px_rgba(27,26,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <p className="pt-1 text-center text-xs sm:text-sm text-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-ink underline underline-offset-2 hover:text-muted"
          >
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
