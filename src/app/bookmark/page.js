// /src/app/bookmarks/page.js

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import RecipeCard from '@/components/RecipeCard';
import Sidebar from '@/components/Sidebar';

export default function BookmarksPage() {
  const { session, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Penjaga rute
  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login');
    }
  }, [session, authLoading, router]);
  
  // Ambil resep yang di-bookmark
  useEffect(() => {
    const fetchBookmarkedRecipes = async () => {
      if (!user) return;
      setLoading(true);

      // Query canggih: mulai dari 'bookmarks', ambil semua data dari 'recipes' yang berelasi
      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          recipes (
            *,
            users!recipes_user_id_fkey (username),
            categories (id, category_name)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookmarks:', error);
      } else {
        // Hasilnya adalah array objek { recipes: {...} }, jadi kita perlu map
        const recipes = data.map(item => item.recipes);
        setBookmarkedRecipes(recipes);
      }
      setLoading(false);
    };

    if (user) {
      fetchBookmarkedRecipes();
    }
  }, [user]);

  if (authLoading || !session) {
    return <p>Loading or redirecting...</p>;
  }

  return (
    <div className="relative">
      <Sidebar />
      <main className="md:ml-[80px] p-6 md:p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Bookmarks</h1>
        {loading ? (
          <p>Loading your bookmarked recipes...</p>
        ) : (
          bookmarkedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bookmarkedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  href={`/recipe/${recipe.id}`}
                  imageSrc={recipe.photo_url}
                  title={recipe.title}
                  user={recipe.users ? recipe.users.username : 'Anonymous'}
                  categories={recipe.categories}
                />
              ))}
            </div>
          ) : (
            <p>You haven't bookmarked any recipes yet.</p>
          )
        )}
      </main>
    </div>
  );
}