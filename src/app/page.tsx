import Link from "next/link";
import { cookies } from "next/headers";
import { Suspense } from "react";

// --- Header Dynamic Buttons ---
async function AuthButtons() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <div className="flex items-center gap-3 text-sm font-medium">
      {token ? (
        <Link
          href="/profile/${user.id}"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-black"
        >
          Go to Profile
        </Link>
      ) : (
        <>
          <Link
            href="/login"
            className="rounded-lg px-3 py-1.5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-black"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}

// --- Hero Dynamic Buttons ---
async function HeroButtons() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      {token ? (
        // Logged In Hero CTA
        <Link
          href="/profile"
          className="flex h-11 w-full items-center justify-center rounded-lg bg-indigo-600 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto dark:focus:ring-offset-black"
        >
          Go to your Dashboard
        </Link>
      ) : (
        // Logged Out Hero CTA
        <>
          <Link
            href="/signup"
            className="flex h-11 w-full items-center justify-center rounded-lg bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto dark:focus:ring-offset-black"
          >
            Create an account
          </Link>
          <Link
            href="/login"
            className="flex h-11 w-full items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2 sm:w-auto dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:ring-offset-black"
          >
            Sign in
          </Link>
        </>
      )}
    </div>
  );
}

// --- Main Page Component ---
export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      
      {/* HEADER */}
      <header className="w-full border-b border-zinc-200 dark:border-zinc-800">
        <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
            Auth<span className="text-indigo-600 dark:text-indigo-400">-App</span>
          </Link>

          {/* Wrap Header Buttons in Suspense */}
          <Suspense fallback={
            <div className="flex items-center gap-3 text-sm font-medium">
              <div className="h-9 w-20 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-9 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            </div>
          }>
            <AuthButtons />
          </Suspense>
        </nav>
      </header>

      {/* HERO */}
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="w-full max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Next.js · MongoDB · JWT
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            A simple, secure <br className="hidden sm:block" />
            authentication starter
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            Sign up, verify your email, sign in, and reset your password — built
            from scratch with Next.js App Router and MongoDB.
          </p>

          {/* Wrap Hero Buttons in Suspense */}
          <Suspense fallback={
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
               <div className="h-11 w-full animate-pulse rounded-lg bg-zinc-200 sm:w-40 dark:bg-zinc-800" />
               <div className="h-11 w-full animate-pulse rounded-lg bg-zinc-200 sm:w-32 dark:bg-zinc-800" />
            </div>
          }>
            <HeroButtons />
          </Suspense>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto w-full max-w-5xl px-6 py-5 text-center text-xs text-zinc-500 dark:text-zinc-500">
          Built by arkapratim007 with ❤️
        </div>
      </footer>
    </div>
  );
}