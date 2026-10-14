import Link from "next/link";
import AuthLayout from "../components/AuthLayout";
import PasswordField, { inputClass } from "../components/PasswordField";

export default function Page() {
  return (
    <AuthLayout
      title="Create account"
      subtitle="Track your PB, master algorithms, and level up your solves."
    >
      <form id="input-form" action="register.php" method="POST" className="space-y-5">
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
          className="w-full rounded-md border-2 border-ink bg-ink px-4 py-3 font-semibold text-paper shadow-[3px_3px_0px_0px_rgba(27,26,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(27,26,23,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          Create account
        </button>

        <p className="text-sm text-muted text-center pt-2">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-ink underline underline-offset-2 hover:text-muted">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
