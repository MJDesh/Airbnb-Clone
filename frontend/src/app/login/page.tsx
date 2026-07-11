"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    localStorage.removeItem("user");

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
        email,
        role: "guest",
      })
    );

    window.location.href = "/";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="mb-8 text-center text-4xl font-bold">
          Guest Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border p-4"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border p-4"
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-[#FF385C] py-4 font-semibold text-white"
          >
            Login as Guest
          </button>

        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold text-[#FF385C]">
            Sign up
          </Link>
        </p>

      </div>
    </main>
  );
}