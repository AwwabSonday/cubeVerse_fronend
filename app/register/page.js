"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle } = useAuth();

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
      if (err.code === "auth/email-already-in-use") {
        setError("This email address is already registered. Try logging in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Failed to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push("/trainer");
    } catch (err) {
      console.error("Google sign in failed:", err);
      if (err.code !== "auth/popup-closed-by-user") {
        setError(err.message || "Failed to sign up with Google.");
      }
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

      {/* Firebase Google Sign-In Button (Commented out for now) */}
      {/*
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="mb-3 flex w-full items-center justify-center gap-3 rounded-md border-2 border-ink bg-white py-2 px-4 text-xs sm:text-sm font-bold text-ink shadow-[3px_3px_0px_0px_rgba(27,26,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 17C3.7 20.7 7.5 23.5 12 23.5z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      <div className="relative mb-3 flex items-center justify-center">
        <div className="w-full border-t border-ink/20" />
        <span className="bg-white px-2.5 text-xs font-bold uppercase tracking-wider text-muted">
          Or with email
        </span>
      </div>
      */}

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
