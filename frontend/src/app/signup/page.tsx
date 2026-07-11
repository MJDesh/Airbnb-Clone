"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"guest" | "host">("guest");

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
        name,
        email,
        role,
      })
    );

    window.location.href = "/"; 
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="mb-8 text-center text-4xl font-bold">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl border p-4"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border p-4"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border p-4"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <div className="space-y-3">
            <p className="font-medium">
                Join as
            </p>

            <label className="flex items-center gap-2">

                <input
                type="radio"
                name="role"
                value="guest"
                checked={role === "guest"}
                onChange={() => setRole("guest")}
                />

                Guest

            </label>

            <label className="flex items-center gap-2">

                <input
                type="radio"
                name="role"
                value="host"
                checked={role === "host"}
                onChange={() => setRole("host")}
                />

                Host

            </label>

            </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#FF385C] py-4 font-semibold text-white"
          >
            Create Account
          </button>

        </form>

        <p className="mt-6 text-center text-sm">

          Already have an account?{" "}

          <Link
            href="/login"
            className="font-semibold text-[#FF385C]"
          >
            Login
          </Link>

        </p>

      </div>

    </main>
  );
}