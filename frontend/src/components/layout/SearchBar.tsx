"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { getSuggestions } from "@/services/api";
import { DateRange } from "react-day-picker";
import DatePickerPopover from "./DatePickerPopover";
import GuestPopover from "./GuestPopover";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;

  guests: number;
  setGuests: (value: number) => void;
};

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  dateRange,
  setDateRange,
  guests,
  setGuests,
}: Props) {
  const [input, setInput] = useState(searchTerm);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuests, setShowGuests] = useState(false);

  useEffect(() => {
  async function fetchSuggestions() {
    if (input.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const data = await getSuggestions(input);
      setSuggestions(data);
    } catch (err) {
      console.error(err);
    }
  }

  fetchSuggestions();
}, [input]);

  return (
    <div className="border-b bg-white">
      <div className="mx-auto max-w-[1500px] px-10 pb-8">

        <div className="mx-auto flex h-18 w-[980px] items-center rounded-full border bg-white shadow-lg">

          {/* WHERE */}
          <div className="relative flex-1 rounded-full px-10 py-4">

            <p className="text-xs font-semibold">
              Where
            </p>

            <input
              value={input}
              onChange={(e) => { setInput(e.target.value);
                setShowSuggestions(true);}
              }
              placeholder="Search destinations"
              className="w-full bg-transparent text-gray-500 outline-none"
            />

            {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 top-full mt-3 w-full rounded-3xl border bg-white shadow-xl overflow-hidden z-50">

                {suggestions.map((item) => (

                <button
                    key={item}
                    onClick={() => {
                    setInput(item);
                    setSearchTerm(item);
                    setShowSuggestions(false);
                    }}
                    className="flex w-full items-center gap-4 px-6 py-4 hover:bg-gray-100 transition"
                >
                    <div className="rounded-full bg-gray-100 p-2">
                    <MapPin size={18} />
                    </div>

                    <span>{item}</span>

                </button>

                ))}

            </div>
            )}

          </div>

          <div className="h-8 border-r" />

          {/* WHEN */}
          <div className="relative flex-1">

    <button
    onClick={() => setShowCalendar(!showCalendar)}
        className="w-full rounded-full px-10 py-4 text-left hover:bg-gray-100"
    >

        <p className="text-xs font-semibold">
        When
        </p>

        <p className="text-gray-500">
        {dateRange?.from
            ? `${dateRange.from.toLocaleDateString()} ${
                dateRange.to
                ? `- ${dateRange.to.toLocaleDateString()}`
                : ""
            }`
            : "Add dates"}
        </p>

    </button>

    {showCalendar && (
        <DatePickerPopover
        range={dateRange}
        setRange={setDateRange}
        />
    )}

    </div>

          <div className="h-8 border-r" />

          {/* WHO */}
          <div className="relative flex-1">
            <button
                onClick={() => setShowGuests(!showGuests)}
                className="w-full rounded-full px-10 py-4 text-left hover:bg-gray-100"
            >
                <p className="text-xs font-semibold">
                Who
                </p>

                <p className="text-gray-500">
                {guests} guest{guests > 1 ? "s" : ""}
                </p>
            </button>

            {showGuests && (
                <GuestPopover
                guests={guests}
                setGuests={setGuests}
                />
            )}

            </div>

          <button
            onClick={() => setSearchTerm(input)}
            className="mr-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF385C] text-white hover:bg-[#E31C5F]"
          >
            <Search size={24} />
          </button>

        </div>

      </div>
    </div>
  );
}