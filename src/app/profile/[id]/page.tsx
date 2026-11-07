import { Suspense } from "react";
import Link from "next/link";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { notFound } from "next/navigation";

// 1. The dynamic data component
async function UserProfileData({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await connect();
  let user = null;
  try {
    user = await User.findById(id).select("-password");
  } catch (error) {
    user = null;
  }

  if (!user) {
    notFound();
  }

  const initial = user.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      <div className="px-6 pb-6 sm:px-8">
        <div className="-mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-indigo-600 text-3xl font-bold text-white shadow-md dark:border-zinc-900">
              {initial}
            </div>
            <div className="pb-1">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {user.name}
              </h1>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                {user.email}
              </p>
            </div>
          </div>
        </div>
        <hr className="my-6 border-zinc-200 dark:border-zinc-800" />
        {/* ... Rest of your profile UI ... */}
      </div>
    </div>
  );
}

// 2. The Static Page Shell
export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <span aria-hidden>←</span> Back to Dashboard
        </Link>

        {/* 3. Suspense Boundary */}
        <Suspense fallback={
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="animate-pulse space-y-4">
              <div className="h-32 rounded-xl bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="h-8 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800"></div>
            </div>
          </div>
        }>
          <UserProfileData params={params} />
        </Suspense>
      </div>
    </main>
  );
}