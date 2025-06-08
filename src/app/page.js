"use client";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import { useState } from "react";

export default function Home() {
  const [blurActive, setBlurActive] = useState(false);

  return (
    <div className="relative max-w-screen overflow-hidden">
      

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="ml-[60px] relative z-0">
        {/* your page content here */}
      </main>

      {/* Blur overlay – placed LAST so it overlays everything */}
      <div
        className={`fixed inset-0 z-50 transition duration-300 pointer-events-none ${
          blurActive ? 'backdrop-blur-sm' : 'backdrop-blur-0'
        }`}
      />
      {/* Sidebar */}
      <Sidebar setBlurActive={setBlurActive} />
    </div>
  );
}
