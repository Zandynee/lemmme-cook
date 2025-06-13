'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import RecipeCard from '@/components/RecipeCard';
import Sidebar from '@/components/Sidebar';
import { useState, useEffect, useMemo } from 'react';

const recipes = [
  {
    id: 1,
    title: 'Tomato Soup',
    user: 'souperb',
    category: 'Comfort',
    imageSrc: '/logo.png',
    ingredients: '- Tomatoes\n- Onion\n- Garlic\n- Olive oil\n- Salt & Pepper',
    steps: '1. Sauté onion and garlic\n2. Add tomatoes\n3. Simmer for 20 mins\n4. Blend and serve',
  },
  {
    id: 2,
    title: 'Beef Ramen',
    user: 'noodleGuy',
    category: 'Asian',
    imageSrc: '/logo.png',
    ingredients: '- Beef\n- Noodles\n- Broth\n- Egg\n- Green Onion',
    steps: '1. Boil broth\n2. Add beef & noodles\n3. Cook egg\n4. Combine and garnish',
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);
  const [blurActive, setBlurActive] = useState(false);

  // Optional: sync state with URL changes (in case of back/forward navigation)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filtered = useMemo(() => {
    return recipes.filter((r) =>
      r.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search bar again */}
      <form onSubmit={handleSearch} className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by category..."
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-6xl">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} href={`/recipe/${recipe.id}`} />
        ))}
      </div>

      <Sidebar setBlurActive={setBlurActive} />
    </div>
  );
}
