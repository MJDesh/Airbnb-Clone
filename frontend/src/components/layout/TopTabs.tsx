"use client";

import { House, PartyPopper, Bell } from "lucide-react";

export default function TopTabs() {
  return (
    <div className="hidden md:flex items-center gap-10">
      <button className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className="text-lg font-medium">Homes</span>
        </div>

        <div className="mt-3 h-[2px] w-full rounded bg-black" />
      </button>

      <button className="flex items-center gap-2 text-gray-500 hover:text-black transition">
        <PartyPopper className="h-6 w-6" />

        <div className="flex flex-col">
          <span className="text-lg">Experiences</span>
          <span className="text-[10px] font-bold text-white bg-slate-700 rounded-full px-1 w-fit">
            NEW
          </span>
        </div>
      </button>

      <button className="flex items-center gap-2 text-gray-500 hover:text-black transition">
        <Bell className="h-6 w-6" />

        <div className="flex flex-col">
          <span className="text-lg">Services</span>
          <span className="text-[10px] font-bold text-white bg-slate-700 rounded-full px-1 w-fit">
            NEW
          </span>
        </div>
      </button>
    </div>
  );
}