"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Sign In – SaaS To Do List",
  description: "Access your SaaS To Do List account.",
};

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Placeholder for authentication logic
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simulate login, then redirect:
    router.push("/todos");
  }

  return (
    <main className="flex flex-col items-center min-h-screen justify-center px-4 py-24">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-1 text-center">Sign in</h2>
        <p className="text-gray-500 text-center mb-6">
          Welcome back! Sign in to manage your tasks.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={50}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={100}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full font-medium transition"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-orange-600 font-medium hover:underline">
            Create one
          </Link>
        </div>
      </div>
    </main>
  );
}