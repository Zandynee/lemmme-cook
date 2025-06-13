'use client';

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Faded background image */}
      <Image
        src="/hero.jpg"
        alt="Background"
        fill
        className="object-cover opacity-20 pointer-events-none"
      />

      {/* Top-right buttons */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <Link href="/login">
          <button className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">
            Sign Up
          </button>
        </Link>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/logoHero.png"
          alt="Logo"
          width={500}
          height={500}
          className="w-[35vw] h-auto"
        />
        <div className="mt-6 w-full flex justify-center">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
