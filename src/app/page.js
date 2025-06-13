"use client";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  const [blurActive, setBlurActive] = useState(false);

  // Generate mock recipe data
  const recipes = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    imageSrc: "/logo.png",
    href: "",
    title: getRandomTitle(),
    user: getRandomUser(),
    category: getRandomCategory(),
  }));

  return (
    <div className="relative max-w-screen overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="ml-[10vw] relative z-0 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              imageSrc={recipe.imageSrc}
              title={recipe.title}
              user={recipe.user}
              category={recipe.category}
              href={recipe.href}
            />
          ))}
        </div>
      </main>

      {/* Blur overlay */}
      <div
        className={`fixed inset-0 z-50 transition duration-300 pointer-events-none ${
          blurActive ? "backdrop-blur-sm" : "backdrop-blur-0"
        }`}
      />

      {/* Sidebar */}
      <Sidebar setBlurActive={setBlurActive} />
    </div>
  );
}

// Random data generators
function getRandomTitle() {
  const titles = [
    "Spicy Tuna Roll",
    "Creamy Carbonara",
    "Avocado Toast Deluxe",
    "Garlic Butter Shrimp",
    "Beef Rendang",
    "Vegan Buddha Bowl",
    "Chicken Teriyaki",
    "Cheesy Baked Pasta",
    "Thai Green Curry",
    "Crispy Tofu Stir-fry",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomUser() {
  const users = [
    "chef_luna",
    "spoonmaster",
    "kitchenqueen",
    "grillguy88",
    "riceboss",
    "noodle_ninja",
    "bakerella",
    "panpal",
    "forkandflame",
    "herbs_and_spice",
  ];
  return users[Math.floor(Math.random() * users.length)];
}

function getRandomCategory() {
  const categories = [
    "Dinner",
    "Vegan",
    "Spicy",
    "Comfort Food",
    "Asian",
    "Healthy",
    "Snack",
    "Dessert",
    "Quick & Easy",
    "Meal Prep",
  ];
  return categories[Math.floor(Math.random() * categories.length)];
}
