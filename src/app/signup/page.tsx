"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }

  async function onSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/users/signup", form);
      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch (err: any) {
      const message =
        err?.response?.data?.error ?? err?.message ?? "Signup failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Auth <span className="text-indigo-600">App</span>
          </Link>
          <h1 className="mt-6 text-2xl font-semibold text-zinc-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Start your free Auth account. No headache required LOL
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <form onSubmit={onSignup} className="space-y-5" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:text-white"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 pr-16 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-2 my-auto h-7 rounded-md px-2 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                At least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:text-white"
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="font-medium text-indigo-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-medium text-indigo-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-zinc-900"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}