"use client";

type Props = {
  guests: number;
  setGuests: (value: number) => void;
};

export default function GuestPopover({
  guests,
  setGuests,
}: Props) {
  return (
    <div className="absolute top-full left-0 mt-4 w-80 rounded-3xl border bg-white p-6 shadow-2xl z-50">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-semibold">Guests</h3>
          <p className="text-sm text-gray-500">
            Number of guests
          </p>
        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() => setGuests(Math.max(1, guests - 1))}
            className="h-8 w-8 rounded-full border"
          >
            −
          </button>

          <span className="w-6 text-center">
            {guests}
          </span>

          <button
            onClick={() => setGuests(guests + 1)}
            className="h-8 w-8 rounded-full border"
          >
            +
          </button>

        </div>

      </div>

    </div>
  );
}