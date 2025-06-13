"use client";
import Image from "next/image";
import { IoBookmarkOutline, IoPersonOutline } from "react-icons/io5";
import Link from "next/link";

export default function RecipeCard({ imageSrc, category, title, href, user }) {
  return (
    <Link href={href} className="block">
      <div className="relative rounded-2xl overflow-hidden shadow-md w-[320px] h-[440px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute inset-0 p-4 flex flex-col justify-end text-white space-y-3">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <span className="bg-white text-black text-sm font-medium rounded-lg px-3 py-1">
              {category}
            </span>
            <div className="flex items-center text-sm gap-1">
              <IoPersonOutline />
              <span>{user}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold">{title}</h2>

          {/* Bottom Row */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-white text-xl hover:text-orange-400 transition"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigating when clicking the bookmark
                // Add bookmark logic here
              }}
            >
              <IoBookmarkOutline />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
