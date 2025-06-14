// /src/components/MyRecipesList.js

'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import RecipeCard from './RecipeCard';

export default function MyRecipesList() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect yang mengisi 'recipes' ada di sini (sudah benar)
  useEffect(() => {
    const fetchMyRecipes = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select(`*, categories (id, category_name)`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching my recipes:', error);
      } else {
        setRecipes(data);
      }
      setLoading(false);
    };
    fetchMyRecipes();
  }, [user]);

  if (loading) {
    return <p>Loading your recipes...</p>;
  }
  
  if (recipes.length === 0) {
    return <p>You haven't uploaded any recipes yet. Time to share your creation!</p>
  }

  // .map() untuk 'recipes' digunakan di sini
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id} // <-- PERBAIKAN KUNCI ADA DI SINI
          href={`/recipe/${recipe.id}`}
          imageSrc={recipe.photo_url}
          title={recipe.title}
          user="You"
          categories={recipe.categories}
        />
      ))}
    </div>
  );
}