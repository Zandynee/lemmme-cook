"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const recipeData = {
  1: {
    title: "Tomato Soup",
    image: "/logo.png",
    ingredients: "- Tomatoes\n- Onion\n- Garlic\n- Olive oil\n- Salt & Pepper",
    steps: "1. Sauté onion and garlic\n2. Add tomatoes\n3. Simmer for 20 mins\n4. Blend and serve"
  },
  2: {
    title: "Beef Ramen",
    image: "/logo.png",
    ingredients: "- Beef\n- Noodles\n- Broth\n- Egg\n- Green Onion",
    steps: "1. Boil broth\n2. Add beef & noodles\n3. Cook egg\n4. Combine and garnish"
  }
};

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [blurActive, setBlurActive] = useState(false);
  const recipe = recipeData[id];

  if (!recipe) {
    return <div className="p-10 text-red-500">Recipe not found.</div>;
  }

  return (
    <div className="min-h-screen relative flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar setBlurActive={setBlurActive} />

      {/* Main Content */}
      <div className={`flex-1 flex justify-center items-center transition duration-300 ${blurActive ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="bg-white p-8 rounded-2xl shadow-md w-full m-[5vw] max-w-xl">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full max-h-64 object-contain rounded border mb-6"
          />

          <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>

          <h2 className="text-lg font-semibold mb-2">Ingredients</h2>
          <p className="whitespace-pre-wrap mb-6">{recipe.ingredients}</p>

          <h2 className="text-lg font-semibold mb-2">Steps</h2>
          <p className="whitespace-pre-wrap">{recipe.steps}</p>
        </div>
      </div>
    </div>
  );
}
