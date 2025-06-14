"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import RecipeCard from "@/components/RecipeCard";

export default function MyRecipePage() {
  const [blurActive, setBlurActive] = useState(false);

  const bookmarks = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    imageSrc: "/logo.png",
    href: "",
    title: getRandomTitle(),
    user: getRandomUser(),
    category: getRandomCategory(),
  }));

  return (
    <div className="relative max-w-screen overflow-hidden">
      <main className="ml-[10vw] relative z-0 p-6 ">
        <h1 className="text-3xl font-bold mb-6 ">Your Recipe</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {bookmarks.map((item) => (
            <RecipeCard
              key={item.id}
              imageSrc={item.imageSrc}
              title={item.title}
              user={item.user}
              category={item.category}
              href={item.href}
            />
          ))}
        </div>
      </main>

      <div
        className={`fixed inset-0 z-50 transition duration-300 pointer-events-none ${
          blurActive ? "backdrop-blur-sm" : "backdrop-blur-0"
        }`}
      />
      <Sidebar setBlurActive={setBlurActive} />
    </div>
  );
}

// Helpers
function getRandomTitle() {
  const titles = [
    "Matcha Pancakes",
    "Lemon Chicken",
    "Beef Bulgogi",
    "Sambal Fried Rice",
    "Creamy Ramen",
    "Pumpkin Soup",
    "Chili Garlic Noodles",
    "Miso Glazed Tofu",
    "Teriyaki Burger",
    "Tom Yum Soup",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomUser() {
  const users = [
    "cookiediva",
    "hotpanchef",
    "flavorfiend",
    "bakehacker",
    "umamiking",
    "wokthisway",
    "dailybite",
    "saltandsizzle",
    "chef_on_call",
    "midnightbaker",
  ];
  return users[Math.floor(Math.random() * users.length)];
}

function getRandomCategory() {
  const categories = [
    "Breakfast",
    "Asian",
    "Spicy",
    "Comfort",
    "Vegan",
    "Fusion",
    "Classic",
    "Grill",
    "Soup",
    "Quick Fix",
  ];
  return categories[Math.floor(Math.random() * categories.length)];
}
