import Link from "next/link";
import AuthLayout from "../components/AuthLayout";
import PasswordField, { inputClass } from "../components/PasswordField";

export default function Page() {
  return (
    <AuthLayout
      title="Log in"
      subtitle="Ready for your next sub-X solve? Log in to sync stats."
    >
      <form action="login.php" method="POST" className="space-y-5">
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
          <Link href="/forgot-password" className="text-sm font-semibold underline underline-offset-2 hover:text-ink">
            Forgot password?
          </Link>
        </PasswordField>

        <button
          type="submit"
          className="w-full rounded-md border-2 border-ink bg-ink px-4 py-3 font-semibold text-paper shadow-[3px_3px_0px_0px_rgba(27,26,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(27,26,23,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          Log in
        </button>

        <p className="text-sm text-muted text-center pt-2">
          New solver?{" "}
          <Link href="/register" className="font-semibold text-ink underline underline-offset-2 hover:text-muted">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
