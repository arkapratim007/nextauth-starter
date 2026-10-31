"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/users/resetpassword", { token, newPassword: password });
      toast.success("Password reset successfully. Please login.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Set New Password</h2>
      
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-4"
        required
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 rounded mb-4"
        required
      />
      
      <button disabled={loading} type="submit" className="bg-indigo-600 text-white p-2 rounded disabled:opacity-50">
        {loading ? "Updating..." : "Reset Password"}
      </button>
    </form>
  );
}
export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading form...</div>}>
      <ResetForm />
    </Suspense>
  );
}