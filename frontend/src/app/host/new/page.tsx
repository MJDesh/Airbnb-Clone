"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewListingPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <main className="mx-auto max-w-3xl px-8 py-10">

      <h1 className="mb-8 text-4xl font-bold">
        Create New Listing
      </h1>

      <div className="space-y-5">

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border p-4"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-32 w-full rounded-xl border p-4"
        />

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-xl border p-4"
        />

        <input
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full rounded-xl border p-4"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-xl border p-4"
        />

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full rounded-xl border p-4"
        />

        <button
          className="w-full rounded-xl bg-[#FF385C] py-4 font-semibold text-white"
        >
          Create Listing
        </button>

      </div>

    </main>
  );
}