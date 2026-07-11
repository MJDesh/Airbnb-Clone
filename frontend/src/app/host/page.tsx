"use client";

import { useEffect, useState } from "react";
import { getListings, deleteListing } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Listing = {
  id: number;
  title: string;
  description: string;
  city: string;
  state: string;
  price: number;
};

export default function HostPage() {
  const router = useRouter();

  const [listings, setListings] = useState<Listing[]>([]);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
  const stored = localStorage.getItem("user");

  if (!stored) {
    router.replace("/login");
    return;
  }

  try {
    const user = JSON.parse(stored);

    if (user?.role === "host") {
      setAuthorized(true);
    } else {
      alert("Only hosts can access the Host Dashboard.");
      router.replace("/");
    }
  } catch {
    localStorage.removeItem("user");
    router.replace("/login");
  }
}, [router]);

  useEffect(() => {
    if (authorized) {
      loadListings();
    }
  }, [authorized]);

  async function loadListings() {
    const data = await getListings();
    setListings(data);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this listing?")) return;

    await deleteListing(id);
    loadListings();
  }

  if (!authorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1400px] px-10 py-10">

      <div className="mb-10 flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Host Dashboard
        </h1>

        <Link
          href="/host/new"
          className="rounded-xl bg-[#FF385C] px-6 py-3 font-semibold text-white transition hover:bg-[#E31C5F]"
        >
          + Add Listing
        </Link>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {listings.map((listing) => (

          <div
            key={listing.id}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
          >

            <h2 className="text-2xl font-semibold">
              {listing.title}
            </h2>

            <p className="mt-2 text-gray-500">
              {listing.city}, {listing.state}
            </p>

            <p className="mt-4 text-xl font-semibold">
              ₹{listing.price.toLocaleString()}
            </p>

            <div className="mt-6 flex gap-3">

              <Link
              href={`/host/edit/${listing.id}`}
              className="flex-1 rounded-lg border py-2 text-center transition hover:bg-gray-100"
            >
              Edit
            </Link>

              <button
                onClick={() => handleDelete(listing.id)}
                className="flex-1 rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}