'use client';

import { IoSearch } from 'react-icons/io5';

export default function SearchBar({ query, onQueryChange }) {
  return (
    <div className="relative w-full">
      {/* Ikon diletakkan di dalam input field */}
      <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
      <input
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search for titles, ingredients..."
        // Padding kiri ditambah agar teks tidak menimpa ikon
        className="w-full p-3 pl-12 rounded-lg text-gray-800 border-2 border-transparent focus:outline-none focus:border-orange-500 transition-colors"
      />
    </div>
  );
}