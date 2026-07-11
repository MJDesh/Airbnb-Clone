"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

type Listing = {
  id: number;
  title: string;
  city: string;
  state: string;
  price: number;
  rating: number;
  images: {
    image_url: string;
  }[];
};

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listing/${listing.id}`}>

      <div className="group cursor-pointer">

        <div className="relative overflow-hidden rounded-2xl">

          <Image
            src={listing.images[0]?.image_url || "/images/placeholder.jpg"}
            alt={listing.title}
            width={500}
            height={350}
            className="h-[260px] w-full object-cover transition duration-300 group-hover:scale-105"
          />

          <button className="absolute right-3 top-3 rounded-full bg-black/20 p-1 backdrop-blur-sm">
            <Heart className="stroke-white" size={20} />
          </button>

        </div>

        <div className="mt-3">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold">
              {listing.title}
            </h3>

            <div className="flex items-center gap-1 text-sm">

              <Star
                size={13}
                fill="black"
              />

              {listing.rating}

            </div>

          </div>

          <p className="text-sm text-gray-500">
            {listing.city}, {listing.state}
          </p>

          <p className="mt-1">
            <span className="font-semibold">
              ₹{listing.price.toLocaleString()}
            </span>{" "}
            night
          </p>

        </div>

      </div>

    </Link>
  );
}