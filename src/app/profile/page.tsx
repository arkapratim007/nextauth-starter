import { Suspense } from "react";
import { connection } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";


async function ProfileData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  await connection(); 

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      id: string;
      username: string;
      email: string;
    };

    const user = {
      id: decoded.id,
      name: decoded.username,
      email: decoded.email,
    };

    return <DashboardClient user={user} />;
  } catch (error) {
    redirect("/login");
  }
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <ProfileData />
    </Suspense>
  );
}