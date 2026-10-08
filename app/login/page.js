import Link from "next/link";
import Navbar from "../components/Navbar";
import PasswordField, { inputClass } from "../components/PasswordField";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="px-4 py-12">
        <div className="mx-auto w-full max-w-md rounded-xl border-2 border-ink bg-white p-6 sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight">Log in</h1>
          <p className="mt-2 text-muted">Ready for your next sub-X solve? Log in to sync stats.</p>

          <form action="login.php" method="POST" className="mt-6 space-y-5">
            <div>
              <label htmlFor="username" className="mb-1.5 block font-semibold">
                Username or email
              </label>
              <input
                id="username"
                type="text"
                name="username"
                autoComplete="username"
                placeholder="cubemaster or you@domain.com"
                required
                className={inputClass}
              />
            </div>

            <PasswordField id="password" name="password" label="Password" placeholder="Your password" autoComplete="current-password">
              <Link href="/forgot-password" className="text-sm font-semibold underline underline-offset-2">
                Forgot password?
              </Link>
            </PasswordField>

            <button
              type="submit"
              className="w-full rounded-md border-2 border-ink bg-ink px-4 py-3 font-semibold text-paper transition hover:bg-muted"
            >
              Log in
            </button>

            <p className="text-muted">
              New solver?{" "}
              <Link href="/register" className="font-semibold text-ink underline underline-offset-2">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
