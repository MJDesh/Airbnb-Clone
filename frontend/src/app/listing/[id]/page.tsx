"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { getListing, createBooking } from "@/services/api";

type Listing = {
  id: number;
  title: string;
  description: string;
  city: string;
  state: string;
  price: number;
  rating: number;
  images: {
    image_url: string;
  }[];
};

export default function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();

  const [listing, setListing] = useState<Listing | null>(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    async function fetchListing() {
      try {
        const data = await getListing(Number(id));
        setListing(data);
      } catch (err) {
        console.error(err);
        alert("Booking failed.");
        }
    }

    fetchListing();
  }, [id]);

    const handleReserve = async () => {
    try {
        await createBooking({
        user_id: 1,
        listing_id: listing!.id,
        check_in: checkIn,
        check_out: checkOut,
        guests,
        total_price: totalPrice,
        });

        alert("Booking confirmed!");
        setCheckIn("");
        setCheckOut("");
        setGuests(1);
        router.push("/bookings");
    } catch (err) {
        console.error(err);
        alert("Booking failed.");
    }
    };

  if (!listing) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut).getTime() -
              new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1;
    

  const totalPrice = nights * listing.price;

  return (
    <main className="mx-auto w-full max-w-[1500px] px-12 py-8">

      {/* Back Button */}

      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 rounded-full px-3 py-2 hover:bg-gray-100"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Title */}

      <h1 className="text-4xl font-semibold">
        {listing.title}
      </h1>

      {/* Rating */}

      <div className="mt-3 flex items-center gap-4 text-sm">

        <div className="flex items-center gap-1">
          <Star size={15} fill="black" />
          <span>{listing.rating}</span>
        </div>

        <span className="text-gray-600">
          {listing.city}, {listing.state}
        </span>

      </div>

      {/* Hero Image */}

      <div className="mt-8 w-full">
        <div className="h-[500px] w-full overflow-hidden rounded-3xl">
          <Image
            src={listing.images[0].image_url}
            alt={listing.title}
            width={1600}
            height={900}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Main Content */}

      <div className="mt-10 grid grid-cols-[2fr_1fr] gap-12">

        {/* Left */}

        <div>

          <h2 className="text-2xl font-semibold">
            About this place
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            {listing.description}
          </p>

          <hr className="my-10" />

          <h2 className="text-2xl font-semibold">
            What this place offers
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-y-5">

            <p>✓ Wifi</p>
            <p>✓ Kitchen</p>

            <p>✓ Free parking</p>
            <p>✓ Air Conditioning</p>

            <p>✓ Swimming Pool</p>
            <p>✓ Television</p>

          </div>

          <hr className="my-10" />

            <h2 className="text-2xl font-semibold">
            Hosted by John Doe
            </h2>

            <div className="mt-5 rounded-2xl border p-6">

            <p className="font-semibold">
                ⭐ Superhost
            </p>

            <p className="mt-2 text-gray-600">
                Hosting for 4 years
            </p>

            <p className="mt-4 text-gray-600">
                Passionate about creating memorable stays for guests from around the world.
            </p>

            </div>

            <hr className="my-10" />

<h2 className="text-2xl font-semibold">
  Guest Reviews
</h2>

<div className="mt-6 space-y-6">

  <div className="rounded-2xl border p-5">

    <div className="flex items-center justify-between">

      <div>
        <h3 className="font-semibold">
          Alice Johnson
        </h3>

        <p className="text-sm text-gray-500">
          Stayed in June 2026
        </p>
      </div>

      <span className="font-medium">
        ⭐⭐⭐⭐⭐
      </span>

    </div>

    <p className="mt-3 text-gray-600 leading-7">
      Amazing stay! The place was spotless, beautifully decorated, and exactly as shown in the photos. Would definitely book again.
    </p>

  </div>

  <div className="rounded-2xl border p-5">

    <div className="flex items-center justify-between">

      <div>
        <h3 className="font-semibold">
          Rahul Sharma
        </h3>

        <p className="text-sm text-gray-500">
          Stayed in May 2026
        </p>
      </div>

      <span className="font-medium">
        ⭐⭐⭐⭐⭐
      </span>

    </div>

    <p className="mt-3 text-gray-600 leading-7">
      Excellent location with all the amenities we needed. Check-in was seamless and the host was very responsive throughout our stay.
    </p>

  </div>

  <div className="rounded-2xl border p-5">

    <div className="flex items-center justify-between">

      <div>
        <h3 className="font-semibold">
          Emma Wilson
        </h3>

        <p className="text-sm text-gray-500">
          Stayed in April 2026
        </p>
      </div>

      <span className="font-medium">
        ⭐⭐⭐⭐☆
      </span>

    </div>

    <p className="mt-3 text-gray-600 leading-7">
      Beautiful property with comfortable rooms and a great location. Would happily stay here again on my next trip.
    </p>

  </div>

</div>

        </div>

        {/* Reservation Card */}

        <div>

          <div className="sticky top-28 rounded-3xl border p-7 shadow-lg">

            <h2 className="text-3xl font-semibold">
              ₹{listing.price.toLocaleString()}
              <span className="text-lg font-normal text-gray-600">
                {" "}
                / night
              </span>
            </h2>

            <div className="mt-6 space-y-4">

              <div>
                <label className="text-sm font-medium">
                  Check-in
                </label>

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-1 w-full rounded-xl border p-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Check-out
                </label>

                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-1 w-full rounded-xl border p-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Guests
                </label>

                <input
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border p-3"
                />
              </div>

            </div>

            <hr className="my-6" />

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span>
                  ₹{listing.price.toLocaleString()} × {nights} night{nights > 1 ? "s" : ""}
                </span>

                <span>
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between font-semibold text-lg">

                <span>Total</span>

                <span>
                  ₹{totalPrice.toLocaleString()}
                </span>

              </div>

            </div>

            <button onClick={() => {
                    sessionStorage.setItem(
                        "pendingBooking",
                        JSON.stringify({
                        user_id: 1,
                        listing_id: listing.id,
                        check_in: checkIn,
                        check_out: checkOut,
                        guests,
                        total_price: totalPrice,
                        })
                    );

                    router.push("/checkout");
                    }}
              className="mt-8 w-full rounded-xl bg-[#FF385C] py-4 font-semibold text-white transition hover:bg-[#E31C5F]"
            >
              Reserve
            </button>

          </div>

        </div>

      </div>

    </main>
  );
  
}