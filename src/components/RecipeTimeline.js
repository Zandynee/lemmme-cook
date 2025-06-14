// /src/components/RecipeTimeline.js

'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import RecipeCard from './RecipeCard';

export default function RecipeTimeline() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          id,
          title,
          photo_url,
          users!recipes_user_id_fkey (username),
          categories (id, category_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all recipes:', error);
      } else {
        setRecipes(data);
      }
      setLoading(false);
    };

    fetchAllRecipes();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading awesome recipes...</p>;
  }
  
  if (recipes.length === 0) {
    return <p className="text-center text-gray-500">No recipes have been shared yet. Be the first!</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          href={`/recipe/${recipe.id}`}
          imageSrc={recipe.photo_url}
          title={recipe.title}
          user={recipe.users ? recipe.users.username : 'Anonymous'}
          categories={recipe.categories}
        />
      ))}
    </div>
  );
}