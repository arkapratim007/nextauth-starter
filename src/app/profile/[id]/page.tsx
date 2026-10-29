import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserProfile({ params }: PageProps) {
  const { id } = await params;

  const initial = id?.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <div className="mx-auto w-full max-w-2xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <span aria-hidden>←</span> Back home
        </Link>

        {/* Profile card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Cover / banner */}
          <div className="h-28 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500" />

          {/* Header */}
          <div className="px-6 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                {/* Avatar */}
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-orange-500 text-3xl font-bold text-black shadow-md">
                  {initial}
                </div>
                <div className="pb-1">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Profile
                  </h1>
                  <p className="mt-0.5 text-sm text-gray-500">
                    User ID{" "}
                    <span className="ml-1 rounded-md bg-orange-100 px-2 py-0.5 font-mono text-xs font-semibold text-orange-700">
                      {id}
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex w-full gap-2 sm:w-auto">
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:flex-none"
                >
                  Edit profile
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 sm:flex-none"
                >
                  Share
                </button>
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Meta / stats */}
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Member since
                </dt>
                <dd className="mt-1 text-sm font-semibold text-gray-900">
                  Jan 2026
                </dd>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Role
                </dt>
                <dd className="mt-1 text-sm font-semibold text-gray-900">
                  Member
                </dd>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Status
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Active
                </dd>
              </div>
            </dl>

            {/* About */}
            <section className="mt-6">
              <h2 className="text-sm font-semibold text-gray-900">About</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                This is where you can add a short bio, contact details, or any
                other profile information tied to user{" "}
                <span className="font-mono text-xs text-orange-700">{id}</span>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}