"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export default function DashboardClient({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-[#09090b]/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Auth<span className="text-indigo-600 dark:text-indigo-400">-App</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden text-sm font-medium text-zinc-600 transition hover:text-zinc-900 sm:block dark:text-zinc-400 dark:hover:text-white">
              Homepage
            </Link>
            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 hidden sm:block" />
            <button
              onClick={handleLogout}
              disabled={loading}
              className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 dark:bg-zinc-800/50 dark:text-red-400 dark:hover:bg-red-950/30 disabled:opacity-50"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, {user.name}!
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Here is an overview of your account.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white shadow-inner">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</p>
              </div>
            </div>
            
            <div className="mt-6 flex-1 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800/50">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Status</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800/50">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Role</span>
                <span className="text-sm font-medium">Member</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Link
              href={`/profile/${user.id}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-indigo-500"
            >
              <div>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold">View Public Profile</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  See your dynamic `[id]` page.
                </p>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Go to profile <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>

            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50">
               <div>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                </div>
                <h3 className="font-semibold">Settings</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Update your preferences.
                </p>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-zinc-400">
                Coming soon
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}