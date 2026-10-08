import Link from "next/link";
import Navbar from "../components/Navbar";
import PasswordField, { inputClass } from "../components/PasswordField";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="px-4 py-12">
        <div className="mx-auto w-full max-w-md rounded-xl border-2 border-ink bg-white p-6 sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight">Create account</h1>
          <p className="mt-2 text-muted">Track your PB, master algorithms, and level up your solves.</p>

          <form id="input-form" action="register.php" method="POST" className="mt-6 space-y-5">
            <div>
              <label htmlFor="username" className="mb-1.5 block font-semibold">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                autoComplete="username"
                placeholder="cubemaster"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block font-semibold">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@domain.com"
                required
                className={inputClass}
              />
            </div>

            <PasswordField id="pass1" name="password" label="Password" placeholder="Create a strong password" autoComplete="new-password" />
            <PasswordField id="pass2" name="confirm_password" label="Confirm password" placeholder="Repeat your password" autoComplete="new-password" />

            <button
              id="register"
              type="submit"
              className="w-full rounded-md border-2 border-ink bg-ink px-4 py-3 font-semibold text-paper transition hover:bg-muted"
            >
              Create account
            </button>

            <p className="text-muted">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-ink underline underline-offset-2">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
