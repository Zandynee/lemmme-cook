// /src/components/Hero.js

'use client';

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

// 1. Import hook useAuth
import { useAuth } from "@/context/AuthContext";

export default function Hero() {
  // 2. Gunakan hook untuk mendapatkan data sesi
  const { session } = useAuth();

  return (
    // Kita tambahkan padding kiri jika ada sesi, agar tidak tertutup sidebar
    <div className={`relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ${session ? 'md:pl-[80px]' : ''}`}>
      {/* Faded background image */}
      <Image
        src="/hero.jpg"
        alt="Background"
        fill
        className="object-cover opacity-20 pointer-events-none"
      />

      {/* Foreground content (selalu tampil) */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <Image
          src="/logoHero.png"
          alt="LemmeCook Logo"
          width={500}
          height={500}
          className="w-4/5 max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
        <div className="mt-6 w-full flex justify-center">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}