import { connection } from 'next/server';
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";


export default async function ProfilePage() {
  await connection();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let user = null;

  try {
    // Decoding JWT to get user data
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      id: string;
      username: string;
      email: string;
    };

    user = {
      id: decoded.id,
      name: decoded.username, //called it username in the login route token
      email: decoded.email,
    };
  } catch (error) {
    redirect("/login");
  }
  
  return <DashboardClient user={user} />;
}