'use client';

import Image from "next/image";
import Link from "next/link";
// Tidak perlu import SearchBar lagi di sini

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      <Image
        src="/hero.jpg"
        alt="Background"
        fill
        className="object-cover opacity-20 pointer-events-none"
      />
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <Image
          src="/logoHero.png"
          alt="LemmeCook Logo"
          width={500}
          height={500}
          className="w-4/5 max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
        {/* SearchBar dihapus dari sini */}
      </div>
    </div>
  );
}