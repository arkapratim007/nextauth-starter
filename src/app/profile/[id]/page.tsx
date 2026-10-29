import Link from "next/link";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserProfile({ params }: PageProps) {
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
    <main className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <span aria-hidden>←</span> Back to Dashboard
        </Link>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="px-6 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-indigo-600 text-3xl font-bold text-white shadow-md dark:border-zinc-900">
                  {initial}
                </div>
                <div className="pb-1">
                  {/* Name! */}
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {user.name}
                  </h1>
                  <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex w-full gap-2 sm:w-auto">
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-none dark:focus:ring-offset-zinc-900"
                >
                  Edit profile
                </button>
              </div>
            </div>

            <hr className="my-6 border-zinc-200 dark:border-zinc-800" />

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Account Type
                </dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                  {user.isAdmin ? "Administrator" : "Member"}
                </dd>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Verified
                </dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                  {user.isVerified ? "Yes" : "No"}
                </dd>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Status
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  Active
                </dd>
              </div>
            </dl>

            <section className="mt-8">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">About</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                This user is a registered member of Auth-App. Their database ID is{" "}
                <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400">{id}</span>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}