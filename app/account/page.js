"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../context/AuthContext";

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading, changePassword } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [authLoading, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const form = e.currentTarget;
    const data = new FormData(form);
    const current = data.get("currentPassword");
    const next = data.get("newPassword");

    if (next !== data.get("confirmPassword")) {
      setError("New passwords do not match.");
      return;
    }
    if (next.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (next === current) {
      setError("New password must be different from the current one.");
      return;
    }

    setLoading(true);
    try {
      await changePassword(current, next);
      form.reset();
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) return null;

  return (
    <AuthLayout>
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
          Change password
        </h1>
        <p className="mt-1 text-sm text-muted">
          Signed in as {user.displayName || user.email}. Other devices will be logged out.
        </p>
      </div>

      <div aria-live="polite">
        {error && (
          <div className="mb-3 rounded-md border-2 border-cube-red bg-cube-red/10 px-3 py-2 text-xs font-semibold text-cube-red">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 rounded-md border-2 border-cube-green bg-cube-green/10 px-3 py-2 text-xs font-semibold text-ink">
            Password updated.
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <PasswordField
          id="currentPassword"
          name="currentPassword"
          label="Current password"
          autoComplete="current-password"
        />
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
          className="mt-1 w-full rounded-md border-2 border-ink bg-ink py-2.5 px-4 text-sm font-bold text-paper shadow-[3px_3px_0px_0px_rgba(27,26,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>
    </AuthLayout>
  );
}
