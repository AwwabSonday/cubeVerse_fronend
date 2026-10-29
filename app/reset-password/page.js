"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import PasswordField from "../components/PasswordField";
import { apiResetPassword } from "../services/api";

function ResetForm() {
  const token = useSearchParams().get("token") || "";
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = new FormData(e.currentTarget);
    const next = data.get("newPassword");

    if (next !== data.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }
    if (next.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await apiResetPassword(token, next);
      setDone(true);
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">Password reset</h1>
        <p className="mt-1 mb-4 text-sm text-muted">Your password has been updated.</p>
        <Link
          href="/login"
          className="block w-full rounded-md border-2 border-ink bg-ink py-2.5 px-4 text-center text-sm font-bold text-paper shadow-[3px_3px_0px_0px_rgba(27,26,23,1)]"
        >
          Log in
        </Link>
      </>
    );
  }

  if (!token) {
    return (
      <>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">Invalid link</h1>
        <p className="mt-1 mb-4 text-sm text-muted">
          This reset link is missing its token. Request a new one.
        </p>
        <Link href="/forgot-password" className="font-bold text-ink underline underline-offset-2">
          Request a new link
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">Choose a new password</h1>
        <p className="mt-1 text-sm text-muted">You&apos;ll be logged out of all other devices.</p>
      </div>

      <div aria-live="polite">
        {error && (
          <div className="mb-3 rounded-md border-2 border-cube-red bg-cube-red/10 px-3 py-2 text-xs font-semibold text-cube-red">
            {error}{" "}
            {/expired|invalid/i.test(error) && (
              <Link href="/forgot-password" className="underline">
                Request a new link
              </Link>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <PasswordField
          id="newPassword"
          name="newPassword"
          label="New password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm new password"
          autoComplete="new-password"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md border-2 border-ink bg-ink py-2.5 px-4 text-sm font-bold text-paper shadow-[3px_3px_0px_0px_rgba(27,26,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
        >
          {loading ? "Updating..." : "Reset password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={null}>
        <ResetForm />
      </Suspense>
    </AuthLayout>
  );
}
