"use client";

import Image from "next/image";
import Link from "next/link";

import TopTabs from "./TopTabs";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-24 max-w-[1500px] items-center justify-between px-10">

        <Link href="/">
          <Image
            src="/images/airbnb-com-wordmark.png"
            alt="Airbnb"
            width={118}
            height={36}
            priority
            className="cursor-pointer"
          />
        </Link>

        <TopTabs />

        <UserMenu />

      </div>
    </header>
  );
}