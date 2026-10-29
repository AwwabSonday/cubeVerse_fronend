"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "../components/AuthLayout";
import { inputClass } from "../components/PasswordField";
import { apiForgotPassword } from "../services/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiForgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
          Forgot password
        </h1>
        <p className="mt-1 text-sm text-muted">
          Enter your email and we&apos;ll send you a link to choose a new password.
        </p>
      </div>

      <div aria-live="polite">
        {error && (
          <div className="mb-3 rounded-md border-2 border-cube-red bg-cube-red/10 px-3 py-2 text-xs font-semibold text-cube-red">
            {error}
          </div>
        )}
        {sent && (
          <div className="mb-3 rounded-md border-2 border-cube-green bg-cube-green/10 px-3 py-2 text-xs font-semibold text-ink">
            If that email is registered, a reset link is on its way. It expires in 30 minutes.
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="email" className="mb-1.5 block font-semibold">
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
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md border-2 border-ink bg-ink py-2.5 px-4 text-sm font-bold text-paper shadow-[3px_3px_0px_0px_rgba(27,26,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
        >
          {loading ? "Sending..." : sent ? "Send again" : "Send reset link"}
        </button>

        <p className="pt-1 text-center text-xs sm:text-sm text-muted">
          Remembered it?{" "}
          <Link href="/login" className="font-bold text-ink underline underline-offset-2 hover:text-muted">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
