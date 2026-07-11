"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHostListing, updateListing } from "@/services/api";

export default function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function loadListing() {
      try {
        const listing = await getHostListing(Number(id));

        setTitle(listing.title);
        setDescription(listing.description);
        setCity(listing.city);
        setState(listing.state);
        setPrice(String(listing.price));

        if (listing.images.length > 0) {
          setImageUrl(listing.images[0].image_url);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadListing();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await updateListing(Number(id), {
        title,
        description,
        city,
        state,
        price: Number(price),
        image_url: imageUrl,
      });

      alert("Listing updated!");

      router.push("/host");
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-10 py-10">

      <h1 className="mb-10 text-4xl font-bold">
        Edit Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border p-4"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full rounded-xl border p-4"
          required
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-xl border p-4"
          required
        />

        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full rounded-xl border p-4"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-xl border p-4"
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full rounded-xl border p-4"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-[#FF385C] py-4 font-semibold text-white hover:bg-[#E31C5F]"
        >
          Save Changes
        </button>

      </form>

    </main>
  );
}