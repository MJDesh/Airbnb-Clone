"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, Menu, CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name?: string;
  email: string;
  role: "guest" | "host";
};

export default function UserMenu() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  function logout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

    function becomeHost() {
    router.push("/host/login");
    }

    function handleHostButton() {
    if (!user) {
        router.push("/host/login");
        return;
    }

    if (user.role === "host") {
        router.push("/host");
        return;
    }

    router.push("/host/login");
    }

  return (
    <div className="relative flex items-center gap-4">

      <button
        onClick={handleHostButton}
        className="hidden text-sm font-medium hover:underline md:block"
      >
        {user?.role === "host"
          ? "Host Dashboard"
          : "Become a host"}
      </button>

      <button className="rounded-full p-2 hover:bg-gray-100">
        <Globe size={20} />
      </button>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-full border px-3 py-2 shadow-sm hover:shadow-md"
      >
        <Menu size={18} />
        <CircleUserRound size={30} />
      </button>

      {open && (
        <div className="absolute right-0 top-16 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">

          {!user ? (
            <>
              <Link
                href="/signup"
                className="block px-5 py-3 font-semibold hover:bg-gray-100"
              >
                Sign up
              </Link>

              <Link
                href="/login"
                className="block px-5 py-3 hover:bg-gray-100"
              >
                Log in
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/bookings"
                className="block px-5 py-3 hover:bg-gray-100"
              >
                My Trips
              </Link>

              {user.role === "host" ? (
                <Link
                  href="/host"
                  className="block px-5 py-3 hover:bg-gray-100"
                >
                  Host Dashboard
                </Link>
              ) : (
                <button
                  onClick={becomeHost}
                  className="w-full px-5 py-3 text-left hover:bg-gray-100"
                >
                  Become a Host
                </button>
              )}

              <button
                onClick={logout}
                className="w-full px-5 py-3 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </div>
  );
}