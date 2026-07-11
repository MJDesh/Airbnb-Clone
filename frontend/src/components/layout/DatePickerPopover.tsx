"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

type Props = {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
};

export default function DatePickerPopover({
  range,
  setRange,
}: Props) {
  return (
    <div className="absolute top-full left-0 mt-4 rounded-3xl bg-white shadow-2xl border p-6 z-50">

      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
      />

    </div>
  );
}