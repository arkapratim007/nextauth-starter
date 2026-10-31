"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email });
      setSuccess(true);
      toast.success("Email sent!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Show this if the request was successful
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Check your email</h2>
          <p className="text-gray-500 mb-4">We sent a password reset link to {email}</p>
          <Link href="/login" className="text-indigo-600 hover:underline">Back to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 p-6 border rounded-xl">
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        <p className="text-sm text-gray-500">Enter your email to receive a reset link.</p>
        
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded-lg"
        />
        
        <button disabled={loading} type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-lg">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}