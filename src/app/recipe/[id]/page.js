// /src/app/recipe/[id]/page.js

import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { notFound } from 'next/navigation';
// Hanya import ikon yang kita perlukan
import { IoTimeOutline } from 'react-icons/io5';
import Link from 'next/link';

// Komponen Server, tidak menggunakan 'use client'
export default async function RecipeDetailPage({ params: { id } }) {
  
  if (!id) {
    notFound();
  }

  // 1. Query sudah diperbaiki untuk mengambil data 'categories'
  const { data: recipe, error } = await supabase
    .from('recipes')
    .select(`
      *,
      users!recipes_user_id_fkey (username, photo_url),
      categories (id, category_name)
    `)
    .eq('id', id)
    .single();

  if (error || !recipe) {
    console.error('Error fetching recipe:', error);
    notFound();
  }

  // 2. Data placeholder 'servings' dan 'difficulty' sudah dihapus
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        
        {/* Header Resep */}
        <div className="text-center md:text-left mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Recipes</Link>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-tight">
            {recipe.title}
          </h1>
          <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
            <Image 
              src={recipe.users?.photo_url || '/default-avatar.png'}
              alt={recipe.users?.username || 'Author'}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <p className="text-lg text-gray-600">
              By <span className="font-semibold text-gray-800">@{recipe.users?.username || 'Unknown User'}</span>
            </p>
          </div>
          {/* Menampilkan Kategori di bawah info penulis */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            {recipe.categories.map(category => (
              <Link 
                href={`/category/${category.category_name.toLowerCase().replace(/\s+/g, '-')}`} 
                key={category.id} 
                className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
              >
                {category.category_name}
              </Link>
            ))}
          </div>
        </div>

        {/* Layout Utama Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">

          {/* Kolom Kiri: Gambar & Konten Utama */}
          <div className="lg:col-span-2">
            <div className="relative w-full h-72 md:h-[500px] mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={recipe.photo_url || '/default-image.jpg'}
                alt={`Image of ${recipe.title}`}
                fill 
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              {recipe.description && (
                <div className="prose max-w-none mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Ingredients</h2>
                  <p className="text-gray-700">{recipe.description}</p>
                </div>
              )}
              
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Instructions</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {recipe.instructions}
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Info Detail (Sticky) */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-8 bg-white p-6 rounded-2xl shadow-lg border">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Recipe Details</h3>
              <div className="space-y-5">
                {recipe.cook_time_minutes && (
                  <div className="flex items-center gap-4">
                    <IoTimeOutline className="text-3xl text-orange-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Cook Time</p>
                      <p className="font-bold text-lg text-gray-800">{recipe.cook_time_minutes} min</p>
                    </div>
                  </div>
                )}
                {/* Bagian Servings dan Difficulty sudah dihapus */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}