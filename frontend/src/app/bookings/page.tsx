"use client";

import { useEffect, useState } from "react";
import { getBookings } from "@/services/api";

type Booking = {
  id: number;
  listing_id: number;
  user_id: number;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
};

export default function MyTripsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-10 py-10">

      <h1 className="mb-10 text-4xl font-bold">
        My Trips
      </h1>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border p-10 text-center text-gray-500">
          You haven't booked any trips yet.
        </div>
      ) : (
        <div className="space-y-6">

          {bookings.map((booking) => (

            <div
              key={booking.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >

              <h2 className="text-2xl font-semibold">
                Booking #{booking.id}
              </h2>

              <p className="mt-3">
                Listing ID: {booking.listing_id}
              </p>

              <p>
                Check-in: {booking.check_in}
              </p>

              <p>
                Check-out: {booking.check_out}
              </p>

              <p>
                Guests: {booking.guests}
              </p>

              <p className="mt-3 text-xl font-semibold">
                ₹{booking.total_price.toLocaleString()}
              </p>

            </div>

          ))}

        </div>
      )}

    </main>
  );
}