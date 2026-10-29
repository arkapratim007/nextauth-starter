"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";

type FormState = {
  email: string;
  password: string;
};

const initialState: FormState = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/users/login", form);
      toast.success("Login success");
      router.push("/profile");
    } catch (err: any) {
      const message = err?.response?.data?.error || err?.response?.data?.message || "Something went wrong.";
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
          <h1 className="mt-6 text-2xl font-semibold text-zinc-900 dark:text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to continue to your account.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                  autoComplete="current-password"
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
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="font-medium text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>

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
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-indigo-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}