"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";

import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/layout/SearchBar";
import ListingSection from "@/components/listing/ListingSection";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const [dateRange, setDateRange] = useState<DateRange>();

  const [guests, setGuests] = useState(1);

  return (
    <main>

      {/* <Navbar /> */}

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        dateRange={dateRange}
        setDateRange={setDateRange}
        guests={guests}
        setGuests={setGuests}
      />

      <ListingSection
        searchTerm={searchTerm}
      />

    </main>
  );
}