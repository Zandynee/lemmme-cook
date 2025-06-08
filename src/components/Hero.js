'use client';

import Image from "next/image";
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
