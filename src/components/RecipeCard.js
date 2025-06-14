// /src/components/RecipeCard.js
'use client';
import Image from "next/image";
import { IoPersonOutline } from "react-icons/io5";
import Link from "next/link";
import BookmarkButton from './BookmarkButton';

// PASTIKAN 'id' ADA DI SINI
export default function RecipeCard({ id, imageSrc, categories, title, href, user }) {
  
  // (Fungsi handleBookmarkClick tidak lagi dibutuhkan di sini)

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col">
      <Link href={href || '#'} className="block">
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc || '/default-image.jpg'}
            alt={title || 'Recipe Image'}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            // TAMBAHKAN PROP INI
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <div className="flex flex-wrap gap-2">
                {Array.isArray(categories) && categories.slice(0, 2).map((cat) => (
                    <span key={cat.id} className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">{cat.category_name}</span>
                ))}
            </div>
          
          {/* PASTIKAN ANDA MENGIRIM prop recipeId={id} DI SINI */}
          <BookmarkButton recipeId={id} />

        </div>
        <Link href={href || '#'} className="block">
          <h2 className="text-xl font-bold text-gray-800 leading-tight line-clamp-2 hover:text-blue-600 transition-colors">{title || 'Untitled Recipe'}</h2>
        </Link>
        <div className="flex-grow"></div>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <IoPersonOutline className="text-gray-500" />
            <span className="text-sm text-gray-600">{user || 'Anonymous'}</span>
        </div>
      </div>
    </div>
  );
}