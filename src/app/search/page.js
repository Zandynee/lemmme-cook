"use client";
import RecipeCard from "@/components/RecipeCard";
import Link from "next/link";
import { useState } from "react";

const recipes = [
  {
    id: 1,
    title: "Tomato Soup",
    user: "souperb",
    category: "Comfort",
    imageSrc: "/logo.png",
    ingredients: "- Tomatoes\n- Onion\n- Garlic\n- Olive oil\n- Salt & Pepper",
    steps: "1. Sauté onion and garlic\n2. Add tomatoes\n3. Simmer for 20 mins\n4. Blend and serve"
  },
  {
    id: 2,
    title: "Beef Ramen",
    user: "noodleGuy",
    category: "Asian",
    imageSrc: "/logo.png",
    ingredients: "- Beef\n- Noodles\n- Broth\n- Egg\n- Green Onion",
    steps: "1. Boil broth\n2. Add beef & noodles\n3. Cook egg\n4. Combine and garnish"
  },
  // More recipes if needed
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filtered = recipes.filter((r) =>
    r.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by category..."
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-6xl">
        {filtered.map((recipe) => (
          <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
            <RecipeCard {...recipe} href="" />
          </Link>
        ))}
      </div>
    </div>
  );
}
