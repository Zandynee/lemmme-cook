'use client';
import { useState, useEffect } from 'react';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function BookmarkButton({ recipeId }) {
  const { user, bookmarks, refetchBookmarks } = useAuth();
  const router = useRouter();

  // State lokal untuk tampilan tombol
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sinkronkan state lokal dengan data global dari context
  useEffect(() => {
    setIsBookmarked(bookmarks.has(recipeId));
  }, [bookmarks, recipeId]);

  const toggleBookmark = async (e) => {
    e.preventDefault(); // Mencegah navigasi dari parent <Link>
    e.stopPropagation(); // Mencegah event bubbling

    if (!user) {
      alert('Please login to bookmark a recipe.');
      router.push('/login');
      return;
    }

    setIsLoading(true);

    if (isBookmarked) {
      // Hapus bookmark
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .match({ user_id: user.id, recipe_id: recipeId });
      
      if (error) {
        console.error('Detailed bookmark error:', JSON.stringify(error, null, 2));
        }
    } else {
      // Tambah bookmark
      const { error } = await supabase
        .from('bookmarks')
        .insert({ user_id: user.id, recipe_id: recipeId });
      
      if (error) {
        console.error('Error adding bookmark:', error);
      }
    }

    // Refresh data bookmark global setelah berhasil
    await refetchBookmarks();
    setIsLoading(false);
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={isLoading}
      className="text-2xl text-orange-500 hover:text-orange-600 disabled:text-gray-300 transition-colors"
      aria-label="Toggle bookmark"
    >
      {isBookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
    </button>
  );
}