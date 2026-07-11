"use client";

import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">

        <div className="text-7xl">
          🎉
        </div>

        <h1 className="mt-6 text-4xl font-bold">
          Booking Confirmed!
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Your payment was successful and your reservation has been confirmed.
        </p>
        <div className="mt-8 rounded-2xl bg-green-50 p-5">

  <p className="font-semibold text-green-700">
    ✓ Reservation Confirmed
  </p>

  <p className="mt-2 text-sm text-green-600">
    A confirmation email would normally be sent to your registered email address.
  </p>

</div>

        <div className="mt-10 flex justify-center gap-4">

          <Link
            href="/bookings"
            className="rounded-xl bg-[#FF385C] px-6 py-3 font-semibold text-white hover:bg-[#E31C5F]"
          >
            View My Trips
          </Link>

          <Link
            href="/"
            className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-100"
          >
            Continue Exploring
          </Link>

        </div>

      </div>

    </main>
  );
}