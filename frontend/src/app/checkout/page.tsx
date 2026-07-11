"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBooking } from "@/services/api";

export default function CheckoutPage() {
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

    async function handlePayment(e: React.FormEvent) {
        e.preventDefault();

        try {
            const booking = JSON.parse(
            sessionStorage.getItem("pendingBooking") || "{}"
            );

            await createBooking(booking);

            sessionStorage.removeItem("pendingBooking");

            alert("✅ Payment Successful!");

            router.push("/booking-success");
        } catch (err) {
            console.error(err);
            alert("Payment failed.");
        }
        }

  return (
    <main className="mx-auto w-full max-w-5xl px-10 py-12">

      <h1 className="mb-10 text-4xl font-bold">
        Checkout
      </h1>

      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">

        {/* Payment Form */}

        <form
          onSubmit={handlePayment}
          className="space-y-6 rounded-3xl border p-8 shadow-sm"
        >

          <h2 className="text-2xl font-semibold">
            Payment Details
          </h2>

          <input
            type="text"
            placeholder="Cardholder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border p-4"
            required
          />

          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full rounded-xl border p-4"
            required
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="rounded-xl border p-4"
              required
            />

            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="rounded-xl border p-4"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#FF385C] py-4 font-semibold text-white hover:bg-[#E31C5F]"
          >
            Pay Now
          </button>

        </form>

        {/* Booking Summary */}

        <div className="rounded-3xl border p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-semibold">
            Booking Summary
          </h2>

          <div className="space-y-4 text-gray-700">

            <div className="flex justify-between">
              <span>Nightly Rate</span>
              <span>₹5,500</span>
            </div>

            <div className="flex justify-between">
              <span>Nights</span>
              <span>3</span>
            </div>

            <div className="flex justify-between">
              <span>Cleaning Fee</span>
              <span>₹1,000</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹17,500</span>
            </div>

          </div>

          <p className="mt-8 rounded-xl bg-yellow-100 p-4 text-sm text-yellow-900">
            ⚠️ This is a mocked payment page for demonstration purposes.
            No real payment is processed.
          </p>

        </div>

      </div>

    </main>
  );
}