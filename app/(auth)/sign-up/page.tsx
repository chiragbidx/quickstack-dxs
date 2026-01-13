"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Sign Up – SaaS To Do List",
  description: "Create a new SaaS To Do List account.",
};

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Placeholder for sign up logic
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simulate account creation then redirect
    router.push("/todos");
  }

  return (
    <main className="flex flex-col items-center min-h-screen justify-center px-4 py-24">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-1 text-center">Sign up</h2>
        <p className="text-gray-500 text-center mb-6">
          Create your account and start managing tasks.
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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              maxLength={100}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full font-medium transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-orange-600 font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}