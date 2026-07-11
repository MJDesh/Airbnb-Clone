"use client";

import { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import { getListings } from "@/services/api";

export default function ListingSection({
  searchTerm,
}: {
  searchTerm: string;
}) {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function fetchListings() {
        try {
        setLoading(true);

        const data = await getListings(searchTerm);

        setListings(data);

        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    }

    fetchListings();
    }, [searchTerm]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading listings...
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-[1700px] px-8">

      <h2 className="mb-8 text-3xl font-semibold">
        Explore stays
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">

        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
          />
        ))}

      </div>

    </div>
  );
}