'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Impor semua komponen yang akan kita tampilkan
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from '@/components/SearchBar';
import SearchableCategoryFilter from '@/components/SearchableCategoryFilter';

export default function Home() {
  // State untuk efek UI
  const [blurActive, setBlurActive] = useState(false);
  const [loading, setLoading] = useState(true);

  // State untuk data resep
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // State untuk filter dan search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); 

  // Mengambil semua resep dari database, hanya dijalankan sekali
  useEffect(() => {
    const fetchAllRecipes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          id, title, photo_url,
          users!recipes_user_id_fkey (username),
          categories (id, category_name)
        `)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        const recipesData = data || [];
        setAllRecipes(recipesData);
        setFilteredRecipes(recipesData);
      }
      setLoading(false);
    };

    fetchAllRecipes();
  }, []);

  // Menjalankan filter setiap kali query atau kategori berubah
  useEffect(() => {
    let recipes = allRecipes;

    // Filter berdasarkan kategori
    if (selectedCategory && selectedCategory.value !== 'all') {
      recipes = recipes.filter(recipe => 
        recipe.categories.some(cat => cat.id === selectedCategory.value)
      );
    }

    // Filter berdasarkan teks pencarian
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      recipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(lowercasedQuery) ||
        (recipe.users && recipe.users.username.toLowerCase().includes(lowercasedQuery))
      );
    }
    
    setFilteredRecipes(recipes);
  }, [searchQuery, selectedCategory, allRecipes]);

  return (
    <div className="relative bg-gray-50">
      {/* Sidebar selalu dirender */}
      <Sidebar setBlurActive={setBlurActive} />
      
      {/* Konten utama dengan margin kiri permanen */}
      <div className={`transition-all duration-300 ease-in-out md:ml-[80px] ${blurActive ? 'blur-sm' : ''}`}>
        
        {/* Hero selalu dirender */}
        <Hero />
        
        <main className="container mx-auto px-4 py-12 -mt-48 md:-mt-32 relative z-10">
          
          {/* Panel Kontrol untuk Search & Filter */}
          <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-4">
              <div className="flex-grow w-full">
                <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
              </div>
              <div className="hidden md:block h-8 w-px bg-gray-200"></div>
              <div className="w-full md:w-64">
                <SearchableCategoryFilter 
                  selectedOption={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {searchQuery || (selectedCategory && selectedCategory.label !== 'All Categories') ? 'Filtered Recipes' : 'Latest Recipes'}
          </h2>
          
          {/* Grid untuk menampilkan resep */}
          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading recipes...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    id={recipe.id} 
                    href={`/recipe/${recipe.id}`} 
                    imageSrc={recipe.photo_url} 
                    title={recipe.title} 
                    user={recipe.users ? recipe.users.username : 'Anonymous'} 
                    categories={recipe.categories} 
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 py-10">No recipes found matching your criteria.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}