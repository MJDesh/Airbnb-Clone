"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HostLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 2,
        email,
        role: "host",
      })
    );

    window.location.href = "/host";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="mb-2 text-center text-4xl font-bold">
          Host Login
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Manage your Airbnb listings
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

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
            Login as Host
          </button>

        </form>

      </div>

    </main>
  );
}